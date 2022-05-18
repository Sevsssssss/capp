<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="ApplicationView" />
</div>
<div v-else class="px-3 py-2">
    <!-- component for showing the cards with the datas for application -->
    <DataCards :datas="datas" />
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
                            <option>For Evaluation</option>
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
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    <tr class="bg-white border-b " v-for="table in searchApplication" :key="table">
                        <td class="px-6 py-4">
                            <div class="">
                                <div class="font-semibold text-grey-300">
                                    {{ table.HeiName }}
                                </div>
                                <div class="font-normal">{{ table.address }}</div>
                            </div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ table.type }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.program }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.dateApplied }}
                        </td>
                        <td class="px-6 py-4 ">
                            <!-- :class="'homeIcon.' + data.color" -->
                            <div v-if="table.status === 'For Approval'" class="btn-sm1 rounded-md p-2 font-normal approval">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Revision'" class="btn-sm1 rounded-md p-2 font-normal revision">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Evaluation'" class="indicator">
                                <span v-if="table.selectedRqat != null && table.selectedRqat != '' " class="indicator-item indicator-top indicator-end  badge badge-accent text-sm">assigned</span>
                                <div class="flex btn-sm1 rounded-md p-2 font-normal evaluation ">

                                    {{ table.status }}

                                </div>
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
                            <div v-else-if="table.status === 'For Payment'" class="btn-sm1 rounded-md p-2 font-normal payment">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'For Verification'" class="btn-sm1 rounded-md p-2 font-normal verification">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'Non Compliant'" class="btn-sm1 rounded-md p-2 font-normal noncompliant">
                                {{ table.status }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <router-link :to="{
                                name: 'StatusApplication',
                                params: {
                                appID: table.appID,
                                status: table.status,
                                },
                            }">
                                <a href="#" v-if="table.status != 'For Compliance' && table.status != 'Completed' && table.status != 'Non Compliant'" class="font-medium text-blue-600 hover:underline">View</a>
                            </router-link>
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
                <div class="flex flex-row pl-4 justify-center items-center">
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
                <div class="p-2 pr-4">
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
    </div>
</div>
</template>

<script>
import DataCards from "@/components//DataCards.vue";
import NoDataAvail from "@/components//NoDataAvail.vue";
import Parse from "parse";
export default {
    name: "ApplicationView",
    components: {
        DataCards,
        NoDataAvail,
    },
    data() {
        return {
            currentpage: 0,
            numPerPage: 10,
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

            datas: [],
            tables: [],
        };
    },
    computed: {
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

            //If Selected For Evaluation
            else if (this.sort_type == "For Evaluation") {
                var storedApplicationsFE = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Evaluation");

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

            } else if (this.sort_type == "For Revision") {
                var storedApplicationsFR = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Revision");

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

            //Get to view applications to specific user (Education Supervisor)
            const Designations = Parse.Object.extend("Designations");
            const queryDes = new Parse.Query(Designations);
            queryDes.equalTo("name", "EDUCATION SUPERVISOR");

            const desigQueryResult = await queryDes.first();

            if (Parse.User.current().get("designation") == desigQueryResult.id) {
                query.equalTo("selectedSupervisor", Parse.User.current().id);
                query.equalTo("applicationStatus", "For Evaluation");
                this.supervisor = true;
            }
            const querResult = await query.find();

            //Get details of the applications
            for (var i = 0; i < querResult.length; i++) {
                var hei_name = "";
                const application = querResult[i];
                const user = new Parse.Query(Parse.User);
                user.equalTo("objectId", application.get("createdBy"));
                // console.log(application.get("createdBy"));
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

                storedApplications.push({
                    id: i + 1,
                    rep: application.get("pointPerson"),
                    email: application.get("email"),
                    phoneNumber: application.get("phoneNumber"),
                    type: appType.get("applicationTypeName"),
                    requirements: application.get("requirements"),
                    dateApplied: months[month] + " " + day + ", " + year,
                    status: application.get("applicationStatus"),
                    program: program.get("programName"),
                    HeiName: hei_name,
                    appID: application.id,
                    selectedRqat: application.get("selectedRQAT")
                });
            }
            this.totalEntries = querResult.length;
            this.tables = storedApplications;

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
            queryFE.equalTo("applicationStatus", "For Evaluation");

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
                    title: "FOR EVALUATION",
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
