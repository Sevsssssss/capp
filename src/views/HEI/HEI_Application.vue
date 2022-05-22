<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="ApplicationView" />
</div>
<div v-else class="m-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex flex-row space-x-4 pl-5 py-4">
            <div class="">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder="Search for items" />
                </div>
            </div>
            <div class="dropdown flex">
                <select class="select select-ghost select-sm w-full max-w-xs border-none" style="outline: none" v-model="sort_type" @change="filterApplications()">
                    <option selected>ALL</option>
                    <option>FOR APPROVAL</option>
                    <option>FOR REVISION</option>
                    <option>FOR EVALUATION</option>
                    <option>FOR ISSUANCE</option>
                    <option>COMPLETED</option>
                </select>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                        {{ header.title }}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody v-if="sort_type_var == false">
                <tr v-for="(table, index) in searchApplication" :key="(table, index)" class="bg-white border-b hover:bg-gray-50">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ table.dateApplied }}
                    </th>
                    <td class="px-6 py-4">
                        <div class="">
                            <div class="font-semibold text-grey-300">
                                {{ table.rep }}
                            </div>
                            <div class="font-normal">{{ table.address }}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        {{ table.type }}
                    </td>
                    <td class="px-6 py-4">
                        <div v-if="table.status === 'For Approval'" class="btn-sm1 p-2 font-normal approval rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'For Revision'" class="btn-sm1 p-2 font-normal revision rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'For Inspection'" class="btn-sm1 p-2 font-normal evaluation rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'For Compliance'" class="btn-sm1 rounded-md p-2 font-normal forcompliance">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'For Issuance'" class="btn-sm1 rounded-md p-2 font-normal issuance">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'Completed'" class="btn-sm1 rounded-md p-2 font-normal completed">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'For Payment'" class="indicator w-fit">
                            <span v-if="table.paymentStatus != ''" class="indicator-item indicator-top indicator-end right-10 badge badge-accent text-sm text-brand-white">{{table.paymentStatus}}</span>
                            <div class="flex btn-sm1 rounded-md p-2 font-normal payment uppercase">
                                {{ table.status}}
                            </div>
                        </div>
                        <div v-else-if="table.status === 'For Verification'" class="btn-sm1 rounded-md p-2 font-normal verification">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'Non Compliant'" class="btn-sm1 rounded-md p-2 font-normal noncompliant">
                            {{ table.status }}
                        </div>
                    </td>
                    <td class="px-6 py-4 text-end">
                        <router-link :to="{
                         name: 'EditHEIapplication',
                         params: {
                         id: table.appID,
                         statusA: table.status
                        },
                        }">
                            <a v-if="statusChecker(table.status) &&table.status === 'For Revision'" href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                        </router-link>
                        <router-link :to="{
                         name: 'PaymentApplication',
                         params: {
                         id: table.appID,
                         statusA: table.status
                        },
                        }">
                            <a v-if="statusChecker(table.status) &&table.status === 'For Payment' && (table.paymentStatus != 'For Verification')" href="#" class="font-medium text-blue-600 hover:underline">View</a>
                        </router-link>
                        <router-link :to="{
                         name: 'ComplyApplication',
                         params: {
                         id: table.appID,
                         statusA: table.status
                        },
                        }">
                            <a v-if="statusChecker(table.status) &&table.status === 'For Compliance'" href="#" class="font-medium text-blue-600 hover:underline">View</a>
                        </router-link>
                        <a v-if="statusChecker(table.status) &&table.status === 'Completed'" @click="download()" href="#" class="text-blue-400 hover:text-blue-700">
                            <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19.92,12.08L12,20L4.08,12.08L5.5,10.67L11,16.17V2H13V16.17L18.5,10.66L19.92,12.08M12,20H2V22H22V20H12Z" />
                            </svg>
                        </a>
                        <label for="tracking" @click="id(table.appID, index)" class="pl-2 font-medium text-blue-600 hover:underline">Track</label>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="searchApplication.length == 0" class="p-5 font-medium">
            <!-- NO DATA FOUND {{search}} -->
            Sorry, the keyword "{{ search }}" cannot be found in the database.
        </div>
        <div v-if="sort_type_var == true" class="p-5 font-medium">
            <!-- NO DATA FOUND {{search}} -->
            Sorry, there is no data with the type of "{{ sort_type }}" in the
            database.
        </div>
        <!-- Table Footer -->
        <div class="table-footer flex flex-row justify-between">
            <div class="flex flex-row pl-3 justify-center items-center">
                <span class="text-sm text-gray-700">
                    Showing
                    <span class="font-semibold text-gray-900">{{
              totalEntries > 0 ? 1 + numPerPage * currentpage : 0
            }}</span>
                    to
                    <span class="font-semibold text-gray-900">{{
              (currentpage + 1) * numPerPage > totalEntries
                ? totalEntries
                : (currentpage + 1) * numPerPage
            }}</span>
                    of
                    <span class="font-semibold text-gray-900">{{ totalEntries }}</span>
                    Entries
                </span>
            </div>
            <div class="p-3 pr-3">
                <div class="btn-group">
                    <ul class="inline-flex -space-x-px">
                        <li>
                            <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <br />
    <input type="checkbox" id="tracking" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-bold text-lg mb-2">TRACK APPLICATION</div>
            <div class="space-y-1 mb-4">
                <div class="flex flex-row space-x-1 justify-between">
                    <div class="flex flex-row space-x-2">
                        <span class="font-semibold">ID:</span>
                        <span class="">{{appID}}</span>
                    </div>

                </div>
                <div class="space-y-1">
                    <div class="flex flex-row space-x-1">
                        <div class="font-semibold">Application Type: </div>
                        <span class=""> {{stAppType}} </span>
                    </div>
                    <div class="flex flex-row space-x-1">
                        <div class="font-semibold">HEI: </div>
                        <span class="">{{stHEI}}</span>
                    </div>
                    <div class="flex flex-row space-x-1">
                        <div class="font-semibold">Program: </div>
                        <span class="">{{stProgram}}</span>
                    </div>
                </div>
            </div>
            <div>
                <div v-for="(track, index) in statusTracker[appIndex]" :key="(track, index)" class="flex flex-col">
                    <div v-if="index+1 <= statusTracker.length && track.status != 'Completed'" class="flex">
                        <div class="flex flex-col items-center mr-4">
                            <div>
                                <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-brand-darkblue outline-brand-darkblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                    </svg>
                                </div>
                            </div>
                            <div v-if="index+1 < statusTracker.length" class="w-1 h-full bg-brand-darkblue"></div>
                        </div>
                        <div class="pb-4 flex flex-col">
                            <span class="text-md font-semibold">{{track.detail}}</span>
                            <span class="text-grey-300">{{track.dateTime}}</span>
                        </div>
                    </div>
                    <div v-if="index+1 == statusTracker.length && track.status == 'Completed'" class="flex">
                        <div class="flex flex-col items-center mr-4">
                            <div>
                                <div class="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500 outline-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="pb-4 flex flex-col">
                            <span class="text-md font-semibold">{{track.detail}}</span>
                            <span class="text-grey-300">{{track.dateTime}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <label for="tracking" id="tracking" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label :for="this.selectedSupervisor != 'Select A Supervisor' ? 'tracking' : '' " class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="this.selectedSupervisor != 'Select A Supervisor' ? submitChanges() : showToastSupervisor()">Continue</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NoDataAvail from "@/components//NoDataAvail.vue";
// import TableTopLeft from "@/components//TableTopLeft.vue";
import Parse from "parse";
export default {
    name: "ApplicationView",
    components: {
        NoDataAvail,
    },
    data() {
        return {
            currentpage: 0,
            numPerPage: 10,
            sort_type: "All",
            search: "",
            sort_type_var: false,
            headers: [{
                    title: "DATE APPLIED",
                },
                {
                    title: "REPRESENTATIVE",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "STATUS",
                },
            ],
            tables: [],
            appID: "",
            appIndex: null,
            statusTracker: [],
            stAppType: "",
            stHEI: "",
            stProgram: "",
        };
    },
    computed: {
        searchApplication() {
            this.newEntCount();
            return this.tables
                .filter((p) => {
                    return p.rep.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },

    methods: {
        async id(appid, index) {
            this.appID = appid;
            this.appIndex = index;

            //For Tracking

            //Query Application
            const Applications = Parse.Object.extend("Applications");
            const queryApp = new Parse.Query(Applications);
            queryApp.equalTo("objectId", this.appID);
            const querResultApp = await queryApp.first();

            //Query Application Type
            const AppTypes = Parse.Object.extend("ApplicationTypes");
            const queryAppTypes = new Parse.Query(AppTypes);
            queryAppTypes.equalTo("objectId", querResultApp.get("applicationType"));
            const querResultAppType = await queryAppTypes.first();

            //Query HEI
            const heis = new Parse.Query(Parse.User);
            heis.equalTo("objectId", querResultApp.get("createdBy"));
            const querResultHEI = await heis.first({
                useMasterKey: true,
            });

            //Query Program
            const Programs = Parse.Object.extend("Programs");
            const queryProgs = new Parse.Query(Programs);
            queryProgs.equalTo("objectId", querResultApp.get("program"));
            const querResultProgs = await queryProgs.first();

            this.stAppType = querResultAppType.get("applicationTypeName");
            this.stHEI = querResultHEI.get("hei_name");
            this.stProgram = querResultProgs.get("programName");
        },
        statusChecker(status) {
            if (
                status != "COMPLETED" &&
                status != "FOR EVALUATION" &&
                status != "FOR ISSUANCE"
            ) {
                return true;
            }
        },
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return p.rep.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).length;
        },
        prevPage() {
            if (this.currentpage > 0) this.currentpage -= 1;
        },
        nextPage() {
            if ((this.currentpage + 1) * this.numPerPage < this.totalEntries) {
                this.currentpage += 1;
            }
        },
        download() {
            alert('Certificate Download');
        },
        async filterApplications() {
            var i = 0;
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
            var days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Satursday",
                "Sunday",
            ];
            var month;
            var day;
            var year;
            var statTrack = [];
            var statDate;
            var statMonth;
            var statNumDate;
            var statYear;
            var statHour;
            var statMinutes;
            var statSeconds;
            var statDay;
            var period;
            var statMinText;
            var statSecText;
            var statDateText;
            var s;

            if (this.sort_type == "All") {
                var storedApplicationsAll = [];
                this.statusTracker = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    statTrack = [];
                    for (s = 0; s < application.get("statusTracker").length; s++) {
                        statDate = new Date(application.get("statusTracker")[s].dateTime)
                        statMonth = statDate.getMonth();
                        statNumDate = statDate.getDate();
                        statYear = statDate.getFullYear();
                        statHour = statDate.getHours();
                        statMinutes = statDate.getMinutes();
                        statSeconds = statDate.getSeconds();
                        statDay = statDate.getDay();
                        period = "AM";

                        statMinText = "";
                        statSecText = "";

                        if (statHour >= 12) {
                            statHour -= 12;
                            period = "PM";
                        }

                        if (statHour == 0) {
                            statHour = 12;
                        }
                        if (statMinutes < 10) {
                            statMinText = "0" + statMinutes;
                        } else {
                            statMinText = statMinutes.toString();
                        }
                        if (statSeconds < 10) {
                            statSecText = "0" + statSeconds;
                        } else {
                            statSecText = statSeconds.toString();
                        }

                        statDateText = days[statDay] + ", " + months[statMonth] + " " + statNumDate + ", " + statYear + " - " +
                            statHour + ":" + statMinText + ":" + statSecText + " " + period;

                        statTrack.push({
                            status: application.get("statusTracker")[s].status,
                            detail: application.get("statusTracker")[s].detail,
                            dateTime: statDateText,
                        })
                    }

                    this.statusTracker.push(statTrack);

                    month = application.createdAt.getMonth();
                    day = application.createdAt.getDate();
                    year = application.createdAt.getFullYear();
                    storedApplicationsAll.push({
                        id: i + 1,
                        rep: application.get("pointPerson"),
                        email: application.get("email"),
                        phoneNumber: application.get("phoneNumber"),
                        type: application.get("applicationType"),
                        requirements: application.get("requirements"),
                        dateApplied: months[month] + " " + day + ", " + year,
                        status: application.get("applicationStatus"),
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsAll.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsAll;
                } else {
                    this.sort_type_var = true;
                }

            } else if (this.sort_type == "For Approval") {
                var storedApplicationsFA = [];
                this.statusTracker = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Approval");
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    statTrack = [];

                    for (s = 0; s < application.get("statusTracker").length; s++) {
                        statDate = new Date(application.get("statusTracker")[s].dateTime)
                        statMonth = statDate.getMonth();
                        statNumDate = statDate.getDate();
                        statYear = statDate.getFullYear();
                        statHour = statDate.getHours();
                        statMinutes = statDate.getMinutes();
                        statSeconds = statDate.getSeconds();
                        statDay = statDate.getDay();
                        period = "AM";

                        statMinText = "";
                        statSecText = "";

                        if (statHour >= 12) {
                            statHour -= 12;
                            period = "PM";
                        }

                        if (statHour == 0) {
                            statHour = 12;
                        }
                        if (statMinutes < 10) {
                            statMinText = "0" + statMinutes;
                        } else {
                            statMinText = statMinutes.toString();
                        }
                        if (statSeconds < 10) {
                            statSecText = "0" + statSeconds;
                        } else {
                            statSecText = statSeconds.toString();
                        }

                        statDateText = days[statDay] + ", " + months[statMonth] + " " + statNumDate + ", " + statYear + " - " +
                            statHour + ":" + statMinText + ":" + statSecText + " " + period;

                        statTrack.push({
                            status: application.get("statusTracker")[s].status,
                            detail: application.get("statusTracker")[s].detail,
                            dateTime: statDateText,
                        })
                    }

                    this.statusTracker.push(statTrack);

                    month = application.createdAt.getMonth();
                    day = application.createdAt.getDate();
                    year = application.createdAt.getFullYear();
                    storedApplicationsFA.push({
                        id: i + 1,
                        rep: application.get("pointPerson"),
                        email: application.get("email"),
                        phoneNumber: application.get("phoneNumber"),
                        type: application.get("applicationType"),
                        requirements: application.get("requirements"),
                        dateApplied: months[month] + " " + day + ", " + year,
                        status: application.get("applicationStatus"),
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsFA.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsFA;
                } else {
                    this.sort_type_var = true;
                }
            } else if (this.sort_type == "For Revision") {
                var storedApplicationsFR = [];
                this.statusTracker = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Revision");
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    statTrack = [];

                    for (s = 0; s < application.get("statusTracker").length; s++) {
                        statDate = new Date(application.get("statusTracker")[s].dateTime)
                        statMonth = statDate.getMonth();
                        statNumDate = statDate.getDate();
                        statYear = statDate.getFullYear();
                        statHour = statDate.getHours();
                        statMinutes = statDate.getMinutes();
                        statSeconds = statDate.getSeconds();
                        statDay = statDate.getDay();
                        period = "AM";

                        statMinText = "";
                        statSecText = "";

                        if (statHour >= 12) {
                            statHour -= 12;
                            period = "PM";
                        }

                        if (statHour == 0) {
                            statHour = 12;
                        }
                        if (statMinutes < 10) {
                            statMinText = "0" + statMinutes;
                        } else {
                            statMinText = statMinutes.toString();
                        }
                        if (statSeconds < 10) {
                            statSecText = "0" + statSeconds;
                        } else {
                            statSecText = statSeconds.toString();
                        }

                        statDateText = days[statDay] + ", " + months[statMonth] + " " + statNumDate + ", " + statYear + " - " +
                            statHour + ":" + statMinText + ":" + statSecText + " " + period;

                        statTrack.push({
                            status: application.get("statusTracker")[s].status,
                            detail: application.get("statusTracker")[s].detail,
                            dateTime: statDateText,
                        })
                    }

                    this.statusTracker.push(statTrack);

                    month = application.createdAt.getMonth();
                    day = application.createdAt.getDate();
                    year = application.createdAt.getFullYear();
                    storedApplicationsFR.push({
                        id: i + 1,
                        rep: application.get("pointPerson"),
                        email: application.get("email"),
                        phoneNumber: application.get("phoneNumber"),
                        type: application.get("applicationType"),
                        requirements: application.get("requirements"),
                        dateApplied: months[month] + " " + day + ", " + year,
                        status: application.get("applicationStatus"),
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsFR.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsFR;
                } else {
                    this.sort_type_var = true;
                }
            } else if (this.sort_type == "Completed") {
                var storedApplicationsC = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "Completed");
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();
                this.statusTracker = [];

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    statTrack = [];

                    for (s = 0; s < application.get("statusTracker").length; s++) {
                        statDate = new Date(application.get("statusTracker")[s].dateTime)
                        statMonth = statDate.getMonth();
                        statNumDate = statDate.getDate();
                        statYear = statDate.getFullYear();
                        statHour = statDate.getHours();
                        statMinutes = statDate.getMinutes();
                        statSeconds = statDate.getSeconds();
                        statDay = statDate.getDay();
                        period = "AM";

                        statMinText = "";
                        statSecText = "";

                        if (statHour >= 12) {
                            statHour -= 12;
                            period = "PM";
                        }

                        if (statHour == 0) {
                            statHour = 12;
                        }
                        if (statMinutes < 10) {
                            statMinText = "0" + statMinutes;
                        } else {
                            statMinText = statMinutes.toString();
                        }
                        if (statSeconds < 10) {
                            statSecText = "0" + statSeconds;
                        } else {
                            statSecText = statSeconds.toString();
                        }

                        statDateText = days[statDay] + ", " + months[statMonth] + " " + statNumDate + ", " + statYear + " - " +
                            statHour + ":" + statMinText + ":" + statSecText + " " + period;

                        statTrack.push({
                            status: application.get("statusTracker")[s].status,
                            detail: application.get("statusTracker")[s].detail,
                            dateTime: statDateText,
                        })
                    }

                    this.statusTracker.push(statTrack);

                    month = application.createdAt.getMonth();
                    day = application.createdAt.getDate();
                    year = application.createdAt.getFullYear();
                    storedApplicationsC.push({
                        id: i + 1,
                        rep: application.get("pointPerson"),
                        email: application.get("email"),
                        phoneNumber: application.get("phoneNumber"),
                        type: application.get("applicationType"),
                        requirements: application.get("requirements"),
                        dateApplied: months[month] + " " + day + ", " + year,
                        status: application.get("applicationStatus"),
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsC.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsC;
                } else {
                    this.sort_type_var = true;
                }
            }
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            if (accType[y] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            var storedApplications = [];
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);
            query.equalTo("createdBy", Parse.User.current().id);
            const querResult = await query.find();

            for (var i = 0; i < querResult.length; i++) {
                const application = querResult[i];

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
                var days = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Satursday",
                    "Sunday",
                ];
                var month = application.createdAt.getMonth();
                var day = application.createdAt.getDate();
                var year = application.createdAt.getFullYear();

                const applicationTypes = Parse.Object.extend("ApplicationTypes");
                const appTypeQuery = new Parse.Query(applicationTypes);
                appTypeQuery.equalTo("objectId", application.get("applicationType"));

                const applicationType = await appTypeQuery.first();

                var statTrack = [];

                for (var s = 0; s < application.get("statusTracker").length; s++) {
                    var statDate = new Date(application.get("statusTracker")[s].dateTime)
                    var statMonth = statDate.getMonth();
                    var statNumDate = statDate.getDate();
                    var statYear = statDate.getFullYear();
                    var statHour = statDate.getHours();
                    var statMinutes = statDate.getMinutes();
                    var statSeconds = statDate.getSeconds();
                    var statDay = statDate.getDay();
                    var period = "AM";

                    var statMinText = "";
                    var statSecText = "";

                    if (statHour >= 12) {
                        statHour -= 12;
                        period = "PM";
                    }

                    if (statHour == 0) {
                        statHour = 12;
                    }
                    if (statMinutes < 10) {
                        statMinText = "0" + statMinutes;
                    } else {
                        statMinText = statMinutes.toString();
                    }
                    if (statSeconds < 10) {
                        statSecText = "0" + statSeconds;
                    } else {
                        statSecText = statSeconds.toString();
                    }

                    var statDateText = days[statDay] + ", " + months[statMonth] + " " + statNumDate + ", " + statYear + " - " +
                        statHour + ":" + statMinText + ":" + statSecText + " " + period;

                    statTrack.push({
                        status: application.get("statusTracker")[s].status,
                        detail: application.get("statusTracker")[s].detail,
                        dateTime: statDateText,
                    })
                }

                this.statusTracker.push(statTrack);

                storedApplications.push({
                    appID: application.id,
                    id: i + 1,
                    rep: application.get("pointPerson"),
                    email: application.get("email"),
                    phoneNumber: application.get("phoneNumber"),
                    type: applicationType.get("applicationTypeName"),
                    requirements: application.get("requirements"),
                    dateApplied: months[month] + " " + day + ", " + year,
                    status: application.get("applicationStatus"),
                    paymentStatus: application.get("paymentStatus"),
                });
            }
            this.totalEntries = querResult.length;
            this.tables = storedApplications;
        }
    },
};
</script>

<style></style>
