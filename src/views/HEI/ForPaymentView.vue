<template>
<div>
    <div class="mx-3">
        <div class="flex justify-between items-start text-sm">
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal">
                        Type: <span class="font-semibold">{{ type }}</span>
                    </div>
                    <div class="font-normal">
                        Date Applied: <span class="font-semibold">{{ dateApplied }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal">
                        Status: <span class="font-semibold">{{ status }}</span>
                    </div>
                </div>
                <!-- <p>ID Number: {{id}}</p> -->
            </div>
        </div>
        <hr />

        <form @submit.prevent="submitPayment" class="m-5">
            <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <div>
                    <span class="">Please Proceed with payment to CHED Region V and upload the receipts here.</span>
                </div>
            </div>

            <div v-if="paymentStatus == 'For Revision'" class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" /></svg>
                <div>
                    <span class="">Payment has been marked for Revision: <span class="font-bold">{{revisionReason}}</span></span>
                </div>
            </div>

            <div class="overflow-x-auto shadow-lg rounded-lg p-5">
                <div class="">
                    <label class="label">
                        <span class="label-text">Upload Proof of Payment for Application:</span>

                    </label>
                    <input ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                </div>
                <div class="">
                    <label class="label">
                        <span class="label-text">Upload Proof of Payment for Evaluation:</span>

                    </label>
                    <input ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                </div>
            </div>

            <!-- BUTTONS -->
            <div class="space-x-6 p-10">
                <button @click="$router.go(-1)" type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                    Cancel
                </button>
                <button type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    Submit
                </button>
            </div>
        </form>
    </div>
    <div class="m-3">

    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";

const toast = useToast();

export default {
    props: ["id", "statusA"],
    name: "PaymentApplication",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: "",
            status: "",
            rep: "",
            email: "",
            type: "",
            dateApplied: "",
            program: "",
            disapprovedCount: 0,
            disapprovedReqs: [],
            payment: [],
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "FILES",
                },
            ],
            tables: [
            ],
            statusTracker: [],
            search: "",
            educationSupervisor: "",
            adminID: "",
        };
    },
    methods: {
        async submitPayment(values) {

            //count how many rows have uploader
            try {

                let pay = null;

                //Query Application
                const applications = Parse.Object.extend("Applications");
                const appQuery = new Parse.Query(applications);
                appQuery.equalTo("objectId", this.id);
                const application = await appQuery.first({
                    useMasterKey: true,
                });

                //Get Payment Files
                for (var i = 0; i < 2; i++) {
                    const file = values.target[i].files[0];
                    pay = new Parse.File(
                        file.name.replace(/[^a-zA-Z]/g, ""),
                        file,
                        file.type
                    );
                    this.payment.push({
                        file: pay,
                        paymentFor: i == 0 ? "Application" : "Evaluation",
                    })
                }

                this.statusTracker.push({
                    status: "For Verification",
                    detail: "Application moved to Verification by CHED",
                    dateTime: new Date(),
                });

                //Save Application Updates
                application
                    .save({
                        payment: this.payment,
                        paymentStatus: "For Verification",
                        statusTracker: this.statusTracker,
                    })
                    .then(
                        (application) => {
                            this.$refs.Spinner.show();

                            //Make a notification for Education SuperVisor selected
                            const Notifications = Parse.Object.extend("Notifications");
                            const newNotification = new Notifications();

                            newNotification.set("message", "An Application is open for verification for compliance");
                            newNotification.set("date_and_time", new Date());
                            newNotification.set("user", this.educationSupervisor);
                            newNotification.set("isRead", false);

                            //Make a new Notification for Admin
                            const newNotification2 = new Notifications();

                            newNotification2.set("message", "An Application is open for verification for compliance");
                            newNotification2.set("date_and_time", new Date());
                            newNotification2.set("user", this.adminID);
                            newNotification2.set("isRead", false);


                            //Save Notifications
                            newNotification.save().then((notif) => {
                                console.log("Notification Saved: " + notif.id);
                            }, (error) => {
                                console.log("Error: " + error.message);
                            });

                            newNotification2.save().then((notif) => {
                                console.log("Notification Saved: " + notif.id);
                            }, (error) => {
                                console.log("Error: " + error.message);
                            });
                            toast("Application Updated: " + application.id, {
                                    type: TYPE.SUCCESS,
                                    timeout: 3000,
                                    position: POSITION.TOP_RIGHT,
                                }),
                                setTimeout(() => {
                                    this.$router.replace({
                                        path: "/hei/application"
                                    });
                                }, 3000);
                        },
                        (e) => {
                            toast("Application Update Failed: " + e.message, {
                                type: TYPE.ERROR,
                                timeout: 2000,
                                hideProgressBar: true,
                                position: POSITION.TOP_RIGHT,
                            });
                            // alert("Access Type Adding Failed: " + error)
                        }
                    );
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === "/hei/home") {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            var storedReqs = [];
            // Query the application from the db
            const applications = Parse.Object.extend("Applications");
            const appQuery = new Parse.Query(applications);
            appQuery.equalTo("objectId", this.id);
            const application = await appQuery.first({
                useMasterKey: true,
            });

            //Query the program of the application
            const programs = Parse.Object.extend("Programs");
            const progQuery = new Parse.Query(programs);
            progQuery.equalTo("objectId", application.get("program"));
            const program = await progQuery.first();

            //Query the applicationType of the application
            const appTypes = Parse.Object.extend("ApplicationTypes");
            const appTypeQuery = new Parse.Query(appTypes);
            appTypeQuery.equalTo("objectId", application.get("applicationType"));
            const appType = await appTypeQuery.first();

            //Get Application Data
            this.status = application.get("applicationStatus");
            this.type = appType.get("applicationTypeName");
            this.program = program.get("programName");
            this.reqs = application.get("requirements");
            this.statusTracker = application.get("statusTracker");
            this.educationSupervisor = application.get("selectedSupervisor");
            this.paymentStatus = application.get("paymentStatus");
            this.revisionReason = application.get("revisionReason");

            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            var month = application.createdAt.getMonth();
            var day = application.createdAt.getDate();
            var year = application.createdAt.getFullYear();
            this.dateApplied = months[month] + " " + day + ", " + year;
            for (var i = 0; i < application.get("requirements").length; i++) {
                if (application.get("requirements")[i].status == "Disapproved") {
                    this.disapprovedReqs.push(i);
                    this.disapprovedCount++;
                }

                storedReqs.push({
                    credential: appType.get("applicationReqs")[i].applicationReq,
                    file: application.get("requirements")[i].file.name(),
                    comment: application.get("requirements")[i].comment,
                });
            }
            this.tables = storedReqs;

            //Query Admin ID for Notifications
            const AccessType = Parse.Object.extend("AccessTypes");
            const ATquery = new Parse.Query(AccessType);
            ATquery.equalTo("name", "SUPER ADMIN");

            const admin = await ATquery.first();

            const users = new Parse.Query(Parse.User);
            users.equalTo("access_type", admin.id)
            const userAdmin = await users.first();

            this.adminID = userAdmin.id;
        }
    },
};
</script>

<style></style>
