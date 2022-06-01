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
        <div class="overflow-x-auto shadow-md sm:rounded-lg mb-5">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="divide-x-2">
                        <th scope="col" class="px-6 py-3">EVALUATION REMARKS</th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="divide-x-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white w-1/2">
                            <div class="flex flex-row justify-between">
                                <p class="py-2 font-semibold">Summary</p>
                            </div>
                            <span>{{summary}}</span>
                            <!-- <textarea id="summary" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="summary"></textarea> -->
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white w-1/2">
                            <p class="py-2 font-semibold">Recommendation</p>
                            <!-- <textarea id="recommendation" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="recommendation"></textarea> -->
                            <span>{{recommendation}}</span>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                    <tr>
                        <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="table in tables" :key="table" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            <a :href="table.file.url()" target="_blank" class="text-blue-400">{{ table.desc }}</a>
                        </th>
                        <td class="px-6 py-4">
                            <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id] = 'Approved'" value="Approved" class="radio" :v-model="statusShow[table.id, v$.approved.$model]" />
                        </td>
                        <td class="px-6 py-4 ">
                            <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id] = 'Disapproved'" value="Disapproved" class="radio" :v-model="statusShow[table.id, v$.disapproved.$model]" />
                        </td>
                        <td class="px-6 py-4 w-2/5">
                            <textarea v-if=" statusShow[table.id] === 'Disapproved' " id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." v-model="comment[table.id]"></textarea>
                            <textarea v-else-if="statusShow[table.id] === 'Approved' || statusShow[table.id] === null " disabled id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Comment disabled..."></textarea>
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
                <button @click="submitEvaluation()" for="for-approval" id="for-approval" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <!-- <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">SELECT SUPERVISOR</div>

            <div class="flex flex-row py-6 justify-start items-start">
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
            </div>
        </div>
    </div> -->
    <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">RETURN {{ type }}</div>
            <p class="py-2 text-sm">
                Are you sure??
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
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const toast = useToast();

export default {
    props: ["appID"],
    name: "ForApproval",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            show: false,
            showModal1: false,
            showModal2: false,
            statusShow: [],
            v$: useVuelidate(),
            comment: [],
            type: "",
            supervisors: [],
            selectedSupervisor: "Select A Supervisor",
            files: [],
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
            summary: "",
            recommendation: "",
            hei: "",
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
        async submitRevision() {
            try {

                //Query Application
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                //Store Files to be Resubmitted
                var filesToResubmit = [];

                for (var i = 0; i < this.statusShow.length; i++) {
                    filesToResubmit.push({
                        id: application.get("resubmittedFiles")[i].id,
                        file: application.get("resubmittedFiles")[i].file,
                        desc: application.get("resubmittedFiles")[i].desc,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }

                application.set("resubmittedFiles", filesToResubmit);
                application.set("applicationStatus", "For Compliance");

                //If the application is not in Compliance (first time compliance) add a new compliance Due Date
                if(application.get("inCompliance") == false){
                    application.set("inCompliance", true)
                    var currentDate = new Date();
                    var complianceDueDate = currentDate.setDate(currentDate.getDate() + 45);

                    application.set("complianceDueDate", new Date(complianceDueDate));
                }            

                //Add New Status to the Status Tracker
                this.statusTracker.push({
                    status: "For Compliance",
                    detail: "Application didn't Comply, updated to For Compliance status.",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                //Save Application
                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application didn't Comply, updated to For Compliance status.",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);

                        this.$refs.Spinner.show();

                        toast(this.type.toLowerCase() + " has been moved for compliance", {
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

                newNotification.set("message", "Your Application has been moved for compliance");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.hei);
                newNotification.set("isRead", false);

                //Save new Notification
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });

                setTimeout(() => {
                    this.$router.replace({
                        path: "/application",
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
        async submitEvaluation() {
            try {

                //Query Application
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                //Store Files to be Resubmitted
                var filesToResubmit = [];

                for (var i = 0; i < this.statusShow.length; i++) {
                    filesToResubmit.push({
                        id: application.get("resubmittedFiles")[i].id,
                        file: application.get("resubmittedFiles")[i].file,
                        desc: application.get("resubmittedFiles")[i].desc,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }

                application.set("resubmittedFiles", filesToResubmit);
                application.set("applicationStatus", "For Issuance");

                //Add New Status to the Status Tracker
                this.statusTracker.push({
                    status: "For Issuance",
                    detail: "Your Application has been moved for issuance",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                //Save Application
                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been moved for issuance",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);

                        this.$refs.Spinner.show();

                        toast(this.type.toLowerCase() + " has been moved for issuance", {
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

                newNotification.set("message", "Your Application has been processed. Please wait for Issuance");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.hei);
                newNotification.set("isRead", false);

                //Save new Notification
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });

                setTimeout(() => {
                    this.$router.replace({
                        path: "/application",
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
        this.type = application.get("applicationType");
        this.statusTracker = application.get("statusTracker");
        this.hei = application.get("createdBy");

        //Query Application Type
        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo(
            "objectId",
            application.get("applicationType")
        );

        this.email = application.get("email");
        this.rep = application.get("pointPerson");

        this.summary = application.get("summary");
        this.recommendation = application.get("recommendation");

        //Query Supervisors
        const Designations = Parse.Object.extend("Designations");
        const queryDes = new Parse.Query(Designations);
        queryDes.equalTo("name", "EDUCATION SUPERVISOR");

        const desigQueryResult = await queryDes.first();

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

        //Check if there are existing Resubmitted Files already
        for (var i = 0; i < application.get("resubmittedFiles").length; i++) {
            this.statusShow.push("");
            this.comment.push("");
            storedApplications.push({
                id: application.get("resubmittedFiles")[i].id,
                file: application.get("resubmittedFiles")[i].file,
                desc: application.get("resubmittedFiles")[i].desc,
            });
        }
        this.files = application.get("resubmittedFiles")

        this.tables = storedApplications;
    },
};
</script>

<style></style>
