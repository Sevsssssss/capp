<template>
<form v-on:submit.prevent="submit">
    <div class="mx-3">
        <div class="py-4 px-1">
            <div class="flex justify-start space-x-4">
                <div class="font-normal text-sm">
                    Point Person: <span class="font-semibold">{{ rep }}</span>
                </div>
                <div class="font-normal text-sm">
                    Email: <span class="font-semibold">{{ email }}</span>
                </div>
            </div>
        </div>
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                    <tr>
                        <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="table in searchHEI" :key="table" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            <a :href="table.file" target="_blank" class="text-blue-400">{{ table.credential }}</a>
                        </th>
                        <td class="px-6 py-4">
                            <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id - 1] = 'Approved'" value="Approved" class="radio" :v-model="statusShow[table.id - 1, v$.approved.$model]" />
                        </td>
                        <td class="px-6 py-4 ">
                            <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id - 1] = 'Disapproved'" value="Disapproved" class="radio" :v-model="statusShow[table.id - 1, v$.disapproved.$model]" />
                        </td>
                        <td class="px-6 py-4 w-2/5">
                            <textarea v-if=" statusShow[table.id - 1] === 'Disapproved' " id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." v-model="comment[table.id - 1]"></textarea>
                            <textarea v-else-if="statusShow[table.id - 1] === 'Approved' || statusShow[table.id - 1] === null " disabled id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Comment disabled..."></textarea>
                            <textarea v-else disabled id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Comment disabled..."></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-row justify-center items-center space-x-6 py-10">
            <div class="">
                <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" aria-label="Close">
                    <div>Dismiss</div>
                </button>
            </div>
            <div v-if="statusShow.includes('Disapproved')">
                <button @click="modalRevise()" for="for-revision" id="for-revision" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Revise
                </button>
            </div>
            <div v-else>
                <button @click="modal()" for="for-approval" id="for-approval" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ACCEPT APPLICATION?</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to accept the application?
            </p>
            <div class="modal-action">
                <label for="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-approval" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitApproval()">Continue</label>
            </div>
            <!-- <div class="flex flex-row py-6 justify-start items-start">
                <div class="month-sort flex flex-row border rounded-md w-full">
                    <select class="font-normal rounded-md select select-ghost select-sm w-full" style="outline: none" id="application_sort" v-model="selectedSupervisor">
                        <option disabled>
                            Select A Supervisor
                        </option>
                        <option v-for="supervisor in supervisors" :key="supervisor" :value="supervisor.id">
                            {{ supervisor.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="modal-action">
                <label for="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label :for="this.selectedSupervisor != 'Select A Supervisor' ? 'for-approval' : '' " class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="this.selectedSupervisor != 'Select A Supervisor' ? submitChanges() : showToastSupervisor()">Continue</label>
            </div> -->
        </div>
    </div>
    <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">REVISE {{ type }}</div>
            <p class="py-2 text-sm">
                Are you sure you want to revise the application?
            </p>
            <div class="modal-action">
                <label for="for-revision" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-revision" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitRevision()">Continue</label>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
</form>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";

const toast = useToast();

export default {
    props: ["appID"],
    name: "ForApproval",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            showModal1: false,
            showModal2: false,
            statusShow: [],
            v$: useVuelidate(),
            comment: [],
            type: "",
            supervisors: [],
            selectedSupervisor: "Select A Supervisor",
            el: document.body,
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "APPROVED",
                },
                {
                    title: "DISAPPROVED",
                },
                {
                    title: "COMMENTS",
                },
            ],
            tables: [],
            search: "",
            disapproved: '',
            approved: '',
            statusTracker: [],
            applicationHEI: "",
        };
    },
    validations() {
        return {
            approved: {
                required,
            },
            disapproved: {
                required,
            },
            comment: {
                required,
            },
        }
    },
    computed: {
        //For Search Function
        searchHEI() {
            return this.tables.filter((p) => {
                return (
                    p.credential.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
            });
        },
    },
    methods: {
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },
        validate2() {
            return this.showModal2;
        },
        //Move application to For Revision
        async submitRevision() {
            
            try {
                //Query Application
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();


                var requirements = [];

                //Get Requirements of the Application
                for (var i = 0; i < this.statusShow.length; i++) {
                    requirements.push({
                        id: application.get("requirements")[i].id,
                        file: application.get("requirements")[i].file,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }
                application.set("requirements", requirements);

                //Change Application Status to For Revision
                application.set("applicationStatus", "For Revision");


                //Add New Status to the Status Tracker
                this.statusTracker.push({
                    status: "For Revision",
                    detail: "Application was made For Revision",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                //Save changes to the application
                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application was made For Revision",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);

                        this.$refs.Spinner.show();

                        toast(this.type.toLowerCase() + " has been moved for revision", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,
                            }),
                            console.log("Object Updated: " + application.id);
                    })

                //Adding Notification
                const Notifications = Parse.Object.extend("Notifications");
                const newNotification = new Notifications();

                newNotification.set("message", "Application was made For Revision. Please Revise your application");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.applicationHEI);
                newNotification.set("isRead", false);

                //Save new Notification
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });


                setTimeout(() => {
                    this.$router.replace({
                        path: "/application/ " + this.appID.slice(0, 2).join(""),
                    })
                }, 2000);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (error) {
                alert("Error" + error.message);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },

        //Application updated for Payment
        async submitApproval() {
            
            try {
                //Query Application
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                //Get Requirements of the Application
                var requirements = [];

                for (var i = 0; i < this.statusShow.length; i++) {
                    requirements.push({
                        id: application.get("requirements")[i].id,
                        file: application.get("requirements")[i].file,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }
                application.set("requirements", requirements);

                //Change Application status to For Payment
                application.set("applicationStatus", "For Payment");

                //Add New Status to the Status Tracker
                this.statusTracker.push({
                    status: "For Payment",
                    detail: "Your Application has been moved for payment",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                //Save changes to the application
                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been moved for payment",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);

                        this.$refs.Spinner.show();

                        toast(this.type.toLowerCase() + " has been accepted and moved for payment", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,

                            }),
                            console.log("Object Updated: " + application.id);
                    })

                //Add new Notification
                const Notifications = Parse.Object.extend("Notifications");
                const newNotification = new Notifications();

                newNotification.set("message", this.type.toLowerCase() + " has been accepted and moved for payment");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.applicationHEI);
                newNotification.set("isRead", false)

                //Save new Notification
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });

                setTimeout(() => {
                    this.$router.push({
                        path: "/application/ " + this.appID.slice(0, 2).join(""),
                    })
                }, 2000);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                setTimeout(
                    function () {
                        this.$refs.Spinner.hide();
                    }.bind(this),
                    2000
                );

            } catch (error) {
                alert("Error" + error.message);
            }
        },
        modal() {
            var has_error = 0;
            //var error_text = "Account not created due to the following reasons:\n";
            if (
                this.statusShow.filter(x => x == "Approved").length != this.statusShow.length
            ) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;
            }
        },
        modalRevise() {
            var has_error = 0;
            var missing_comment = 0;
            //var error_text = "Account not created due to the following reasons:\n";
            for (var i = 0; i < this.statusShow.length; i++) {
                if (this.statusShow[i] == 'Disapproved' && this.comment[i] == '')
                    missing_comment++;
            }
            if (
                missing_comment > 0
            ) {
                toast("Please fill out the comment for disapproving the file", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal2 = !this.showModal2;
            }
        },
        showToastSupervisor() {
            toast("Please select the required supervisor", {
                type: TYPE.ERROR,
                timeout: 3000,
                hideProgressBar: true,
                position: POSITION.TOP_RIGHT,
            });
        }
    },

    mounted: async function () {
        var storedApplications = [];

        //Query Application
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();

        //Get Application Data
        this.type = application.get("applicationType");
        this.statusTracker = application.get("statusTracker");
        this.applicationHEI = application.get("createdBy");
        this.email = application.get("email");
        this.rep = application.get("pointPerson");

        //Query Application Type
        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo(
            "objectId",
            application.get("applicationType")
        );

        const applicationType = await appTypeQuery.first();


        //Query Supervisors
        const Designations = Parse.Object.extend("Designations");
        const queryDes = new Parse.Query(Designations);
        queryDes.equalTo("name", "EDUCATION SUPERVISOR");

        const desigQueryResult = await queryDes.first();

        //Get Education Supervisors
        const user = new Parse.Query(Parse.User);
        user.equalTo("designation", desigQueryResult.id);
        const supervisorResult = await user.find();

        //Store Supervisors
        var dbSupervisors = [];

        for (var j = 0; j < supervisorResult.length; j++) {
            const sup = supervisorResult[j];

            dbSupervisors.push({
                id: sup.id,
                name: sup.get("name")["lastname"] +
                    ", " +
                    sup.get("name")["firstname"] +
                    " " +
                    sup.get("name")["middleinitial"] +
                    ".",
            })
        }

        this.supervisors = dbSupervisors;

        //Get Application Requirements
        for (var i = 0; i < application.get("requirements").length; i++) {
            this.statusShow.push("");
            this.comment.push("");
            storedApplications.push({
                id: application.get("requirements")[i].id,
                credential: applicationType.get("applicationReqs")[i].applicationReq,
                file: application.get("requirements")[i].file.url(),
            });
        }

        this.tables = storedApplications;
    },
};
</script>

<style></style>
