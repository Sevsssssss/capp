<template>
<div class="mx-3">

    <div class="flex justify-between mt-2">
        <div class="flex space-x-4">
            <div class="font-normal text-sm">
                Point Person: <span class="font-semibold">{{ rep }}</span>
            </div>
            <div class="font-normal text-sm">
                Email: <span class="font-semibold">{{ email }}</span>
            </div>
        </div>
        <div>
            <div class="font-normal text-sm">
                Scheduled Evaluation: <span class="font-semibold">{{ dateOfEval }}</span>
            </div>
        </div>
    </div>
    <div class="py-2">
        <div v-if="this.storedRqats != null && this.storedRqats.length > 0" class="flex flex-row">
            <span class="text-sm">Assigned To:</span>
            <div v-for="rqat in storedRqats" :key="rqat" class="flex flex-row">
                <p class="font-semibold uppercase badge badge-accent text-sm rounded-sm mx-2">{{rqat}}</p>
            </div>
        </div>
    </div>
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
                <tr v-for="table in tables" :key="table" class="bg-white border-b">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-wrap break-words">
                       <a :href="table.file" target="_blank" class="text-blue-400"> {{ table.credential }}</a>
                    </th>
                    <!-- <td class="px-6 py-4 text-blue-400">
                        
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex flex-row center py-10">
        <div class="pr-5">
            <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                <div>Dismiss</div>
            </button>
        </div>
        <div v-if="appTypeChecker() && dateOfEval == null" class="pr-5">
            <label for="sched-evaluation" class="btn border text-white bg-blue-700 hover:bg-blue-800">
                Schedule Evaluation Date
            </label>
        </div>
        <div v-if="this.storedRqats != null && this.storedRqats.length > 0 || appTypeChecker() && dateOfEval != null" class="pr-5">
            <router-link :to="{
            name: 'EvaluateView',
                params: {
                    id: appID,
                },
            }">
                <button class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800"> Evaluate </button>
            </router-link>

        </div>
        <div v-if="appTypeChecker() == false && this.storedRqats.length == 0 ">
            <label for="for-evaluation" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                Assign RQAT
            </label>
        </div>

    </div>
    <input type="checkbox" id="for-evaluation" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">SELECT EVALUATION DATE:</div>
            <Datepicker v-model="date" class="my-2"></Datepicker>
            <div class="font-semibold text-md">ASSIGN RQAT MEMBER</div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-2">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search for RQAT name" />
            </div>
            <!-- Filter -->
            <div class="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xxs:grid-cols-1 text-left pt-5">
                <label v-for="rqat in searchRQAT" :key="rqat" :value="rqat.id" class="flex flex-row cursor-pointer p-1" style="align-items: center">
                    <input type="checkbox" class="checkbox mr-1" :value="rqat.id" v-model="selectedRqat" />
                    <div class="label-text viewSubCatbool" style="align-self: center">
                        {{ rqat.name }}
                    </div>
                </label>
            </div>
            <div class="modal-action">
                <label for="for-evaluation" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label @click="this.selectedRqat.length > 0 ? assignRQAT() : showToastRqat()" class="btn btn-sm rounded-md bg-blue-700 hover:bg-blue-800 border-none">Assign</label>
            </div>
        </div>
    </div>

    <input type="checkbox" id="sched-evaluation" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">SELECT EVALUATION DATE:</div>
            <Datepicker v-model="date" class="my-2"></Datepicker>

            <div class="modal-action">
                <label for="sched-evaluation" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label @click="date != null ? schedEval() : showToastSched()" class="btn btn-sm rounded-md bg-blue-700 hover:bg-blue-800 border-none">Schedule</label>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
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
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const toast = useToast();

export default {
    props: ["appID"],
    name: "ForEvaluation",
    components: {
        Datepicker,
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: [],
            comment: [],
            headers: [{
                    title: "CREDENTIALS",
                },
                // {
                //     title: "FILES",
                // },
            ],
            tables: [],
            search: "",
            Rqat: [],
            selectedRqat: [],
            storedRqats: [],
            supervisor: false,
            date: null,
            dateOfEval: null,
            apptypechecker: false,
            apptype: "",
            statusTracker: [],
            hei: "",
        };
    },
    computed: {
        searchRQAT() {
            return this.Rqat.filter((p) => {
                return (
                    p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
            });
        },
    },
    methods: {
        supervisorChecker() {
            return this.supervisor;
        },
        appTypeChecker() {

            return this.apptypechecker

        },
        async assignRQAT() {
            try {
                console.log("Hellos");
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                application.set("selectedRQAT", this.selectedRqat);
                application.set("dateOfEval", this.date);
                this.statusTracker.push({
                    status: "For Evaluation",
                    detail: "Application was assigned to an RQAT",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);

                application.save().then((application) => {
                    const params = {
                        email: application.get("email"),
                        status: "Your Application has been assigned to an RQAT Member",
                        type: "sendStatusUpdate",
                        approved: true,
                    };
                    Parse.Cloud.run("sendStatusUpdate", params);

                    this.$refs.Spinner.show();

                    toast(this.type.toLowerCase() + " has been assigned to RQAT Member", {
                            type: TYPE.INFO,
                            timeout: 2000,
                            position: POSITION.TOP_RIGHT,
                            hideProgressBar: false,
                            closeButton: false,

                        }),
                        console.log("Object Updated: " + application.id);
                });

                const Notifications = Parse.Object.extend("Notifications");
                    const newNotification = new Notifications();

                    newNotification.set("message", "Your Application has been assigned to an RQAT Member");
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
                alert(error.message)
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },
        showToastRqat() {
            toast("Please assign the RQAT for the evaluation ", {
                type: TYPE.ERROR,
                timeout: 3000,
                hideProgressBar: true,
                position: POSITION.TOP_RIGHT,
            });
        },

        async schedEval() {
            try {
                console.log("Hellos");
                const applications1 = Parse.Object.extend("Applications");
                const query1 = new Parse.Query(applications1);
                query1.equalTo("objectId", this.appID);

                const application1 = await query1.first();

                application1.set("dateOfEval", this.date);

                this.statusTracker.push({
                    status: "For Evaluation",
                    detail: "Your Application's Evaluation has been scheduled.",
                    dateTime: new Date(),
                });
                application1.set("statusTracker", this.statusTracker);

                application1.save().then((application1) => {
                    const params = {
                        email: application1.get("email"),
                        status: "Your Application's Evaluation has been scheduled.",
                        type: "sendStatusUpdate",
                        approved: true,
                    };
                    Parse.Cloud.run("sendStatusUpdate", params);

                    this.$refs.Spinner.show();

                    toast(this.type.toLowerCase() + " has been assigned to RQAT Member", {
                            type: TYPE.INFO,
                            timeout: 2000,
                            position: POSITION.TOP_RIGHT,
                            hideProgressBar: false,
                            closeButton: false,

                        }),
                        console.log("Object Updated: " + application1.id);
                });

                const Notifications = Parse.Object.extend("Notifications");
                const newNotification = new Notifications();

                newNotification.set("message", "Your Application's Evaluation has been scheduled on " + this.date + ".");
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
                alert(error.message)
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );

        },
        showToastSched() {
            toast("Please select a scheduled date for the evaluation ", {
                type: TYPE.ERROR,
                timeout: 3000,
                hideProgressBar: true,
                position: POSITION.TOP_RIGHT,
            });
        }
    },

    mounted: async function () {
        var storedApplications = [];
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();
        this.type = application.get("applicationType");
        this.hei = application.get("createdBy");

        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        this.email = application.get("email");
        this.rep = application.get("pointPerson");
        this.statusTracker = application.get("statusTracker");

        //Get to view applications to specific user (Education Supervisor)
        if (Parse.User.current().get("designation") == "EDUCATION SUPERVISOR") {
            query.equalTo("selectedSupervisor", Parse.User.current().id);
            query.equalTo("applicationStatus", "For Inspection");
            this.supervisor = true;
        }

        appTypeQuery.equalTo("objectId", application.get("applicationType"));

        const applicationType = await appTypeQuery.first();
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

        //Query RQAT
        const AccessTypeRQAT = Parse.Object.extend("AccessTypes");
        const queryACCR = new Parse.Query(AccessTypeRQAT);
        queryACCR.equalTo("name", "RQAT");

        const accQuerResultRQAT = await queryACCR.first();

        const user = new Parse.Query(Parse.User);
        user.equalTo("access_type", accQuerResultRQAT.id);
        const rqatResult = await user.find();
        console.log(accQuerResultRQAT.id);
        console.log(rqatResult);

        if (application.get("selectedRQAT").length > 0) {
            const selectRqatQuery = user.containedIn("objectId", application.get("selectedRQAT"))
            const selRQATResult = await selectRqatQuery.find();

            var selRQATS = [];

            for (var k = 0; k < selRQATResult.length; k++) {
                const selrqat = selRQATResult[k];

                selRQATS.push(selrqat.get("name")["lastname"] +
                    ", " +
                    selrqat.get("name")["firstname"] +
                    " " +
                    selrqat.get("name")["middleinitial"] +
                    ".");
            }

            console.log("HELLO!")
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
            var month = application.get("dateOfEval").getMonth();
            var day = application.get("dateOfEval").getDate();
            var year = application.get("dateOfEval").getFullYear();

            this.dateOfEval = months[month] + " " + day + ", " + year;

            this.storedRqats = selRQATS;
        }

        var dbRqat = [];

        dbRqat.push({
            id: Parse.User.current().id,
            name: Parse.User.current().get("name")["lastname"] +
                ", " +
                Parse.User.current().get("name")["firstname"] +
                " " +
                Parse.User.current().get("name")["middleinitial"] +
                ".",
        });

        for (var j = 0; j < rqatResult.length; j++) {
            const rqat = rqatResult[j];
            dbRqat.push({
                id: rqat.id,
                name: rqat.get("name")["lastname"] +
                    ", " +
                    rqat.get("name")["firstname"] +
                    " " +
                    rqat.get("name")["middleinitial"] +
                    ".",
            });
        }
        this.Rqat = dbRqat;

        const AppTypes = Parse.Object.extend("ApplicationTypes");
        const AppTypeQuery = new Parse.Query(AppTypes);
        AppTypeQuery.equalTo("applicationTypeName", "RENEWAL")

        const appTypeQuerResult = await AppTypeQuery.first();

        console.log(appTypeQuerResult.id);
        console.log(this.type);

        if (this.type == appTypeQuerResult.id) {
            this.apptypechecker = true;

        }
        console.log(this.apptypechecker);
        if (this.apptypechecker == true && application.get("dateOfEval") != null) {
            var months1 = [
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
            var month1 = application.get("dateOfEval").getMonth();
            var day1 = application.get("dateOfEval").getDate();
            var year1 = application.get("dateOfEval").getFullYear();

            this.dateOfEval = months1[month1] + " " + day1 + ", " + year1;
        }

    },
};
</script>

<style></style>
