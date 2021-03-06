<template>
<div>
    <div class="mx-3">
        <div class="flex justify-between items-start text-sm">
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal ">
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
    </div>
    <div class="m-3">
        <form @submit.prevent="submitApplication">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
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
                            <!-- <td class="px-6 py-4">
                                
                            </td> -->
                            <td class="px-6 py-4">
                                {{ table.comment }}
                            </td>
                            <td class="flex items-end px-6 py-4">
                                <a v-if="table.comment === ''"></a>
                                <input v-if="table.comment != ''" accept=".pdf,.doc" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- BUTTONS -->
            <div class="space-x-6 p-10">
                <a @click="$router.go(-1)" class="btn w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                    Cancel
                </a>
                <button type="submit" class="btn submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    Submit
                </button>
            </div>
        </form>
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
    props: ["id"],
    name: "EditHEIapplication",
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
            reqs: [],
            headers: [{
                    title: "CREDENTIALS",
                },
                // {
                //     title: "FILES",
                // },
                {
                    title: "COMMENTS",
                },
            ],
            tables: [{
                    credential: "Articles of Incorporation and By-Laws..",
                    file: "ArticlesofInc.pdf",
                    comment: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit.",
                },
                {
                    credential: "Copy(ies) of Transfer of Certificate(s) Title (TCT)",
                    file: "Copy(ies)ofTransferof.pdf",
                    comment: "",
                },
                {
                    credential: "Ownership of School Building",
                    file: "OwnershipofSchoolBuilding.pdf",
                    comment: "",
                },
                {
                    credential: "Campus Development and Landscaping Plan",
                    file: "CampusDevelopme.pdf",
                    comment: "",
                },
            ],
            search: "",
            statusTracker: [],
            adminID: "",
        };
    },
    methods: {
        async submitApplication(values) {
            //count how many rows have uploader
            try {
                let requirement = null;

                //Query Application
                const applications = Parse.Object.extend("Applications");
                const appQuery = new Parse.Query(applications);
                appQuery.equalTo("objectId", this.id);
                const application = await appQuery.first({
                    useMasterKey: true,
                });

                //Get Disapproved requirements
                for (var i = 0; i < this.disapprovedCount; i++) {
                    const file = values.target[i].files[0];
                    requirement = new Parse.File(
                        file.name.replace(/[^a-zA-Z]/g, ""),
                        file,
                        file.type
                    );
                    this.reqs[this.disapprovedReqs[i]].file = requirement;
                    this.reqs[this.disapprovedReqs[i]].status = "";
                    this.reqs[this.disapprovedReqs[i]].comment = "";
                }
                for (var j = 0; j < this.reqs.length; j++) {
                    this.reqs[j].status = "";
                    this.reqs[j].comment = "";
                }

                this.statusTracker.push({
                    status: "For Approval",
                    detail: "The Application has been Revised and ready For Approval.",
                    dateTime: new Date(),
                });

                //Save Application updates
                application
                    .save({
                        requirements: this.reqs,
                        applicationStatus: "For Approval",
                        statusTracker: this.statusTracker,
                    })
                    .then(
                        (application) => {

                            const Notifications = Parse.Object.extend("Notifications");
                            const newNotification = new Notifications();

                            newNotification.set("message", "An Application has been Revised and ready For Approval.");
                            newNotification.set("date_and_time", new Date());
                            newNotification.set("user", this.adminID);
                            newNotification.set("isRead", false);

                            newNotification.save().then((notif) => {
                                console.log("Notification Saved: " + notif.id);
                            }, (error) => {
                                console.log("Error: " + error.message);
                            });
                            
                            this.$refs.Spinner.show();

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
                2000
            );
        },
    },

    computed: {
        //For Search Functionality
        searchHEI() {
            return this.tables.filter((p) => {
                return (
                    p.credential.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
            });
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
                    file: application.get("requirements")[i].file.url(),
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
