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
        <div class="flex justify-between">
            <div class="overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table v-if="fileCheck() == true" class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Proof of Payment for Application
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                <a :href="applicationPaymentURL" target="_blank" class="text-blue-400">Payment for Application</a>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <div class="noDataAvail h-full p-20 text-center">
                        No Data Available
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto shadow-md sm:rounded-lg w-full ml-4">
                <table v-if="fileCheck() == true" class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Proof of Payment For Inspection
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                <a :href="evaluationPaymentURL" target="_blank" class="text-blue-400">Payment For Inspection</a>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <div class="noDataAvail h-full p-20 text-center">
                        No Data Available
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center space-x-6 py-10">
            <div class="">
                <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" aria-label="Close">
                    <div>Dismiss</div>
                </button>
            </div>
            <!-- <div v-if="statusShow.includes('Disapproved')">
                <button @click="modalRevise()" for="for-revision" id="for-revision" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Revise
                </button>
            </div> -->
            <div v-if="fileCheck() == true">
                <button @click="modal()" for="for-approval" id="for-approval" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">PROCEED WITH INSPECTION?</div>

            <div class="modal-action">
                <label for="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-approval" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitChanges()">Continue</label>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">REVISE {{ type }}</div>
            <p class="py-2 text-sm">
                Are you sure??
            </p>
            <div class="modal-action">
                <label for="for-revision" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-revision" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitRevision()">Continue</label>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
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
            applicationPaymentURL: "",
            evaluationPaymentURL: "",
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
            fileCheker: false,
            statusTracker: [],
            rep: "",
            email: "",
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
    computed: {
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
        fileCheck() {
            return this.fileCheker;
        },
        async submitChanges() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();
                application.set("applicationStatus", "For Inspection");

                this.statusTracker.push({
                    status: "For Inspection",
                    detail: "Application was changed For Inspection",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been moved For Inspection",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);

                        this.$refs.Spinner.show();

                        toast(this.type.toLowerCase() + " has been moved for inspection", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,

                            }),
                            console.log("Object Updated: " + application.id);
                    })

                    const Notifications = Parse.Object.extend("Notifications");
                            const newNotification = new Notifications();

                            newNotification.set("message", "Your Application has been moved For Inspection");
                            newNotification.set("date_and_time", new Date());
                            newNotification.set("user", this.hei);
                            newNotification.set("isRead", false);

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

            } catch (error) {
                alert("Error" + error.message);
                console.log(error);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
        //Move application to For Revision due to wrong uploaded files
        async submitRevision() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

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
                application.set("applicationStatus", "For Revision");
                application.set("paymentStatus", "Verified");

                this.statusTracker.push({
                    status: "For Revision",
                    detail: "Application was made For Revision",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been moved for revision",
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
                const Notifications = Parse.Object.extend("Notifications");
                    const newNotification = new Notifications();

                    newNotification.set("message", "Your Application has been moved for revision please reupload Proof of Payment");
                    newNotification.set("date_and_time", new Date());
                    newNotification.set("user", this.hei);
                    newNotification.set("isRead", false);

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
                console.log(error);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },

        modal() {
            var has_error = 0;
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
        if (application.get("payment") != undefined && application.get("payment").length == 2) {
            this.applicationPaymentURL = application.get("payment")[0].file.url()
            this.evaluationPaymentURL = application.get("payment")[1].file.url()
            this.fileCheker = true;
        } else {
            this.fileCheker = false;
        }

        //Query Application Type
        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo(
            "objectId",
            application.get("applicationType")
        );

        const applicationType = await appTypeQuery.first();
        this.email = application.get("email");
        this.rep = application.get("pointPerson");
        this.statusTracker = application.get("statusTracker");
        this.hei = application.get("createdBy")

        //Query Supervisors
        const Designations = Parse.Object.extend("Designations");
        const queryDes = new Parse.Query(Designations);
        queryDes.equalTo("name", "EDUCATION SUPERVISOR");

        const desigQueryResult = await queryDes.first();

        const user = new Parse.Query(Parse.User);
        user.equalTo("designation", desigQueryResult.id);
        const supervisorResult = await user.find();

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
