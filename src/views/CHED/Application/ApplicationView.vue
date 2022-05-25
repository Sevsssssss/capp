<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="ApplicationView" />
</div>
<div v-else class="px-3 py-2">
    <!-- component for showing the cards with the datas for application -->
    <DataCards v-if="!supervisorChecker()" :datas="datas" />
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table header -->
        <div class="flex flex-row justify-between items-center">
            <!-- Search -->
            <div class="flex space-x-4 pl-5 py-4">
                <div class="">
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder="Search for HEI name" />
                    </div>
                </div>
                <!-- Filter -->
                <div v-if="!supervisorChecker()" class="flex flex-row">
                    <!-- sort -->
                    <div class="month-sort flex flex-row">
                        <select class="font-normal rounded-md select select-ghost select-sm w-full max-w-xs" style="outline: none" id="application_sort" v-model="sort_type" @change="filterApplications()">
                            <option disabled selected>Sort by type</option>
                            <option>All</option>
                            <option>For Approval</option>
                            <option>For Revision</option>
                            <option>For Payment</option>
                            <option>For Inspection</option>
                            <option>For Compliance</option>
                            <option>For Verification</option>
                            <option>For Issuance</option>
                            <option>Completed</option>
                            <option>Non Compliant</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- Table body -->
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                            {{ header.title }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">View</span>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="sort_type_var == false">
                    <tr class="bg-white border-b " v-for="(table, index) in searchApplication" :key="(table, index)">
                        <td class="px-6 py-4">
                            <div class="">
                                <div class="font-bold">
                                    {{ table.HeiName }}
                                </div>
                                <div class="font-normal">{{ table.address }}</div>
                            </div>
                        </td>
                        <td scope="row" class="px-6 py-4">
                            {{ table.type }}
                        </td>
                        <td class="px-6 py-4 ">
                            {{ table.program }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.dateApplied }}
                        </td>
                        <td class="px-6 py-4 ">
                            <div v-if="table.status === 'For Approval'" class="indicator w-fit">
                                <div class="">
                                    <span v-if="table.selectedSupervisor != null && table.selectedSupervisor != '' " class="indicator-item indicator-top indicator-end right-7 badge badge-accent text-sm text-brand-white">assigned</span>
                                </div>
                                <div class="btn-sm1 rounded-md p-2 font-normal approval uppercase">
                                    {{ table.status }}
                                </div>
                            </div>
                            <div v-else-if="table.status === 'For Revision'" class="btn-sm1 rounded-md p-2 font-normal revision uppercase">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Inspection'" class="indicator w-fit">
                                <div class="">
                                    <span v-if="table.selectedRqat != null && table.selectedRqat != '' " class="indicator-item indicator-top indicator-end right-7 badge badge-accent text-sm text-brand-white">assigned</span>
                                </div>
                                <div class="flex btn-sm1 rounded-md p-2 font-normal evaluation uppercase">

                                    {{ table.status }}

                                </div>
                            </div>
                            <div v-else-if="table.status === 'For Compliance'" class="btn-sm1 rounded-md p-2 font-normal forcompliance uppercase">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Issuance'" class="btn-sm1 rounded-md p-2 font-normal issuance uppercase">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'Completed'" class="btn-sm1 rounded-md p-2 font-normal completed uppercase">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Payment'" class="btn-sm1 rounded-md p-2 font-normal payment uppercase">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Verification'" class="btn-sm1 rounded-md p-2 font-normal verification uppercase">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'Non Compliant'" class="btn-sm1 rounded-md p-2 font-normal noncompliant uppercase">
                                {{ table.status }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center space-x-3">
                            <router-link :to="{
                                name: 'StatusApplication',
                                params: {
                                appID: table.appID,
                                status: table.status,
                                },
                            }">
                                <a href="#" v-if="supervisor && table.status != 'For Compliance' && table.status != 'Completed' && table.status != 'Non Compliant'" class="font-medium text-blue-400 hover:text-blue-700">View</a>
                            </router-link>
                            <label href="" v-if="table.status == 'For Approval' && (table.selectedSupervisor == null || table.selectedSupervisor == '') " @click="id(table.appID, index)" for="for-approval" class="font-medium text-blue-400 hover:text-blue-700">Assign</label>
                            <label for="tracking" @click="id(table.appID, index)" class="font-medium text-blue-400 hover:text-blue-700 ">Track</label>
                        </td>
                    </tr>
                </tbody>
                <!-- <tbody v-else>
                    <tr class="bg-white border-b">
                        <td class="px-6 py-4 text-center">
                            <div class="">
                                <div class="font-semibold text-grey-300">
                                    No Data Found
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody> -->
            </table>
            <!-- Table Footer -->
            <div v-if="searchApplication.length == 0" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, the keyword "{{ search }}" cannot be found in the database.
            </div>
            <div v-if="sort_type_var == true" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, there is no data with the type of "{{ sort_type }}" in the
                database.
            </div>
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
                        <span class="font-semibold text-gray-900">{{
                totalEntries
              }}</span>
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
        <input type="checkbox" id="for-approval" class="modal-toggle" />
        <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box relative rounded-md text-left">
                <div class="font-semibold text-md">ASSIGN SUPERVISOR</div>

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
                    <label for="for-approval" id="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                    <label :for="this.selectedSupervisor != 'Select A Supervisor' ? 'for-approval' : '' " class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="this.selectedSupervisor != 'Select A Supervisor' ? submitChanges() : showToastSupervisor()">Continue</label>
                </div>
            </div>
        </div>

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
                            <div class="font-semibold">Program:  </div>
                            <span class="">{{stProgram}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="(track, index) in statusTracker" :key="(track, index)" class="flex flex-col">
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
                    <label for="tracking" id="tracking" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Back</label>
                </div>
            </div>
        </div>
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
import DataCards from "@/components//DataCards.vue";
import NoDataAvail from "@/components//NoDataAvail.vue";
import Parse from "parse";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";

const toast = useToast();

export default {
    name: "ApplicationView",
    components: {
        DataCards,
        NoDataAvail,
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            currentpage: 0,
            numPerPage: 5,
            sort_type: "All",
            search: "",
            headers: [{
                    title: "HEI",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "PROGRAM",
                },
                {
                    title: "DATE APPLIED",
                },
                {
                    title: "STATUS",
                },
            ],
            supervisor: false,
            sort_type_var: false,
            showModal1: false,
            supervisors: [],
            selectedSupervisor: "Select A Supervisor",
            datas: [],
            tables: [],
            statusTracker: [],
            statusTrackerDB: [],
            appID: "",
            appIndex: null,
            stAppType: "",
            stHEI: "",
            stProgram: "",
        };
    },
    computed: {
        //For Search Function
        searchApplication() {
            this.newEntCount();
            return this.tables
                .filter((p) => {
                    return p.HeiName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
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
            var progSpecID = querResultProgs.get("programDiscipline");


            var statTrack = [];
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

            //Store Status Details
            for (var s = 0; s < querResultApp.get("statusTracker").length; s++) {
                var statDate = new Date(querResultApp.get("statusTracker")[s].dateTime)
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
                    status: querResultApp.get("statusTracker")[s].status,
                    detail: querResultApp.get("statusTracker")[s].detail,
                    dateTime: statDateText,
                })
            }

            this.statusTracker = statTrack;

            //QUERY MAJOR DISCIPLINE CODE WHERE THE SPECIFIC DISCIPLINE BELONGS WHERE THE PROGRAM BELONGS
            const disciplines = Parse.Object.extend("Disciplines");
            const queryDisc = new Parse.Query(disciplines);
            const querDiscResult = await queryDisc.find();
            
            for (var x = 0; x < querDiscResult.length; x++) {
                const discipline = querDiscResult[x];
                const sDiscipline = discipline.get("specificDiscipline");
               
                 
                for (var z = 0; z < sDiscipline.length; z++){
                        
                    if (progSpecID == sDiscipline[z].SpecDiscCode){
                        var MajDiscID = discipline.id;
                    }
                }

            }
            
            //Query Supervisors
            const Designations1 = Parse.Object.extend("Designations");
            const queryDesig = new Parse.Query(Designations1);
            queryDesig.equalTo("name", "EDUCATION SUPERVISOR");

            const designationQueryResult = await queryDesig.first();

            const user = new Parse.Query(Parse.User);
            user.equalTo("designation", designationQueryResult.id);
            user.equalTo("disciplines", MajDiscID)

            
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
            
        },
        modal() {
            var has_error = 0;
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;
            }
        },
        validate() {
            return this.showModal1;
        },
        supervisorChecker() {
            return this.supervisor;
        },
        statusChecker(status) {
            if (status != "COMPLETED") {
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
        async filterApplications() {
            //For Application Status Filter
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
            
            var month;
            var day;
            var year;
            var hei_name = "";
            
            //If All is Selected
            if (this.sort_type == "All") {
                var storedApplicationsAll = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.descending("createdAt")

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    const user = new Parse.Query(Parse.User);
                    user.equalTo("objectId", application.get("createdBy"));

                    const hei = await user.first();

                    hei_name = hei.get("hei_name");

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
                        program: "BSIT",
                        HeiName: hei_name,
                        appID: application.id,
                        selectedRqat: application.get("selectedRQAT")
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsAll.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsAll;
                } else {
                    this.sort_type_var = true;
                }

            }

            //If Selected For Approval
            else if (this.sort_type == "For Approval") {
                var storedApplicationsFA = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Approval");
                query.descending("createdAt")

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    const user = new Parse.Query(Parse.User);
                    user.equalTo("objectId", application.get("createdBy"));

                    const hei = await user.first();

                    hei_name = hei.get("hei_name");

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
                        program: "BSIT",
                        HeiName: hei_name,
                        appID: application.id,
                        selectedRqat: application.get("selectedRQAT")
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsFA.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsFA;
                } else {
                    this.sort_type_var = true;
                }

            }

            //If selected For Issuance
            else if (this.sort_type == "For Issuance") {
                var storedApplicationsFI = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Issuance");
                query.descending("createdAt")

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    const user = new Parse.Query(Parse.User);
                    user.equalTo("objectId", application.get("createdBy"));

                    const hei = await user.first();

                    hei_name = hei.get("hei_name");

                    month = application.createdAt.getMonth();
                    day = application.createdAt.getDate();
                    year = application.createdAt.getFullYear();
                    storedApplicationsFI.push({
                        id: i + 1,
                        rep: application.get("pointPerson"),
                        email: application.get("email"),
                        phoneNumber: application.get("phoneNumber"),
                        type: application.get("applicationType"),
                        requirements: application.get("requirements"),
                        dateApplied: months[month] + " " + day + ", " + year,
                        status: application.get("applicationStatus"),
                        program: "BSIT",
                        HeiName: hei_name,
                        appID: application.id,
                        selectedRqat: application.get("selectedRQAT")
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsFI.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsFI;
                } else {
                    this.sort_type_var = true;
                }

            }

            //If Selected For Inspection
            else if (this.sort_type == "For Inspection") {
                var storedApplicationsFE = [];

                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Inspection");
                query.descending("createdAt")

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    const user = new Parse.Query(Parse.User);
                    user.equalTo("objectId", application.get("createdBy"));

                    const hei = await user.first();

                    hei_name = hei.get("hei_name");

                    month = application.createdAt.getMonth();
                    day = application.createdAt.getDate();
                    year = application.createdAt.getFullYear();
                    storedApplicationsFE.push({
                        id: i + 1,
                        rep: application.get("pointPerson"),
                        email: application.get("email"),
                        phoneNumber: application.get("phoneNumber"),
                        type: application.get("applicationType"),
                        requirements: application.get("requirements"),
                        dateApplied: months[month] + " " + day + ", " + year,
                        status: application.get("applicationStatus"),
                        program: "BSIT",
                        HeiName: hei_name,
                        appID: application.id,
                        selectedRqat: application.get("selectedRQAT")
                    });
                }
                this.totalEntries = querResult.length;
                if (storedApplicationsFE.length > 0) {
                    this.sort_type_var = false;
                    this.tables = storedApplicationsFE;
                } else {
                    this.sort_type_var = true;
                }
            //If For Revision
            } else if (this.sort_type == "For Revision") {
                var storedApplicationsFR = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Revision");
                query.descending("createdAt")

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    const user = new Parse.Query(Parse.User);
                    user.equalTo("objectId", application.get("createdBy"));

                    const hei = await user.first();

                    hei_name = hei.get("hei_name");

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
                        program: "BSIT",
                        HeiName: hei_name,
                        appID: application.id,
                        selectedRqat: application.get("selectedRQAT")
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
                query.descending("createdAt")

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

                    const user = new Parse.Query(Parse.User);
                    user.equalTo("objectId", application.get("createdBy"));

                    const hei = await user.first();

                    hei_name = hei.get("hei_name");

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
                        program: "BSIT",
                        HeiName: hei_name,
                        appID: application.id,
                        selectedRqat: application.get("selectedRQAT")
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
        async submitChanges() {
            try {
                //Query Application
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                //Set assigned Supervisor
                application.set("selectedSupervisor", this.selectedSupervisor);

                //Add new Status in Tracker
                this.statusTrackerDB = application.get("statusTracker");

                this.statusTrackerDB.push({
                    status: "For Approval",
                    detail: "Your Application has been assigned to an Education Supervisor",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTrackerDB);

                //Save Application Changes
                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been sent to the Designated Education Supervisor",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);

                        this.$refs.Spinner.show();

                        toast(this.type.toLowerCase() + " has been assigned to an Education Supervisor", {
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

                newNotification.set("message", "An Application has been assigned to you.");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.selectedSupervisor);
                newNotification.set("isRead", false);
                
                //Save new Notification
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });

                setTimeout(() => {
                    this.$router.push({
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
                3000
            );
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

            //Query the applications
            var storedApplications = [];
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);
            query.descending("createdAt")

            //Get to view applications to specific user (Education Supervisor)
            const Designations = Parse.Object.extend("Designations");
            const queryDes = new Parse.Query(Designations);
            queryDes.equalTo("name", "EDUCATION SUPERVISOR");

            const desigQueryResult = await queryDes.first();

            if (Parse.User.current().get("designation") == desigQueryResult.id) {
                query.equalTo("selectedSupervisor", Parse.User.current().id);
                this.supervisor = true;
            }

            const querResult = await query.find();

            //Get details of the applications
            for (var i = 0; i < querResult.length; i++) {
                var hei_name = "";
                const application = querResult[i];
                const user = new Parse.Query(Parse.User);
                user.equalTo("objectId", application.get("createdBy"));
                const hei = await user.first();
                hei_name = hei.get("hei_name");
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
                var hour = application.createdAt.getHours();
                var minutes = application.createdAt.getMinutes();
                var seconds = application.createdAt.getSeconds();

                //Query the applicationType of the application
                const appTypes = Parse.Object.extend("ApplicationTypes");
                const appTypeQuery = new Parse.Query(appTypes);
                appTypeQuery.equalTo("objectId", application.get("applicationType"));

                const appType = await appTypeQuery.first();

                //Query the program of the application
                const programs = Parse.Object.extend("Programs");
                const programQuery = new Parse.Query(programs);
                programQuery.equalTo("objectId", application.get("program"));

                const program = await programQuery.first();

                var MinText = "";
                var SecText = "";

                if (hour >= 12) {
                    hour -= 12;
                }

                if(hour == 0) {
                    hour = 12;
                }
                if(minutes < 10){
                    MinText = "0" + minutes;
                }
                else{
                    MinText = minutes.toString();
                }
                if(seconds < 10){
                    SecText = "0" + seconds;
                }
                else{
                    SecText = seconds.toString();
                }



                storedApplications.push({
                    id: i + 1,
                    rep: application.get("pointPerson"),
                    email: application.get("email"),
                    phoneNumber: application.get("phoneNumber"),
                    type: appType.get("applicationTypeName"),
                    requirements: application.get("requirements"),
                    dateApplied: months[month] + " " + day + ", " + year + " " + hour + ":" + MinText + ":" + SecText,
                    status: application.get("applicationStatus"),
                    program: program.get("programName"),
                    HeiName: hei_name,
                    appID: application.id,
                    selectedRqat: application.get("selectedRQAT"),
                    selectedSupervisor: application.get("selectedSupervisor")
                });
            }
            this.totalEntries = querResult.length;
            this.tables = storedApplications;

            //Query and Store Count of Applications per Application Status
            const applicationsFA = Parse.Object.extend("Applications");
            const queryFA = new Parse.Query(applicationsFA);
            queryFA.equalTo("applicationStatus", "For Approval");

            const applicationsFR = Parse.Object.extend("Applications");
            const queryFR = new Parse.Query(applicationsFR);
            queryFR.equalTo("applicationStatus", "For Revision");

            const applicationsFP = Parse.Object.extend("Applications");
            const queryFP = new Parse.Query(applicationsFP);
            queryFP.equalTo("applicationStatus", "For Payment");

            const applicationsFE = Parse.Object.extend("Applications");
            const queryFE = new Parse.Query(applicationsFE);
            queryFE.equalTo("applicationStatus", "For Inspection");

            const applicationsFC = Parse.Object.extend("Applications");
            const queryFC = new Parse.Query(applicationsFC);
            queryFC.equalTo("applicationStatus", "For Compliance");

            const applicationsFV = Parse.Object.extend("Applications");
            const queryFV = new Parse.Query(applicationsFV);
            queryFV.equalTo("applicationStatus", "For Verification");

            const applicationsFI = Parse.Object.extend("Applications");
            const queryFI = new Parse.Query(applicationsFI);
            queryFI.equalTo("applicationStatus", "For Issuance");

            const applicationsC = Parse.Object.extend("Applications");
            const queryC = new Parse.Query(applicationsC);
            queryC.equalTo("applicationStatus", "Completed");

            const applicationsNC = Parse.Object.extend("Applications");
            const queryNC = new Parse.Query(applicationsNC);
            queryNC.equalTo("applicationStatus", "Non Compliant");

            this.datas = [{
                    title: "FOR APPROVAL",
                    num: await queryFA.count(),
                    type: "approval",
                },
                {
                    title: "FOR REVISION",
                    num: await queryFR.count(),
                    type: "revision",
                },
                {
                    title: "FOR PAYMENT",
                    num: await queryFP.count(),
                    type: "payment",
                },
                {
                    title: "FOR INSPECTION",
                    num: await queryFE.count(),
                    type: "evaluation",
                },
                {
                    title: "FOR COMPLIANCE",
                    num: await queryFC.count(),
                    type: "forcompliance",
                },
                {
                    title: "FOR VERIFICATION",
                    num: await queryFV.count(),
                    type: "verification",
                },
                {
                    title: "FOR ISSUANCE",
                    num: await queryFI.count(),
                    type: "issuance",
                },
                {
                    title: "COMPLETED",
                    num: await queryC.count(),
                    type: "completed",
                },
                {
                    title: "NON COMPLIANT",
                    num: await queryNC.count(),
                    type: "noncompliant",
                },
            ];

        }

    },
};
</script>

<style></style>
