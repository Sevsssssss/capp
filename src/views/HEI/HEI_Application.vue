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
                <tr v-for="table in searchApplication" :key="table" class="bg-white border-b hover:bg-gray-50">
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
                        <div v-else-if="table.status === 'For Evaluation'" class="btn-sm1 p-2 font-normal evaluation rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'For Issuance'" class="btn-sm1 p-2 font-normal issuance rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'Completed'" class="btn-sm1 p-2 font-normal completed rounded-md">
                            {{ table.status }}
                        </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <router-link :to="{
                         name: 'EditHEIapplication',
                         params: {
                         id: table.appID,
                         statusA: table.status
                        },
                        }">
                            <a v-if="statusChecker(table.status) &&table.status === 'For Revision'" href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                        </router-link>
                        <a v-if="statusChecker(table.status) &&table.status === 'Completed'" @click="download()" href="#" class="text-blue-400 hover:text-blue-700">
                            <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19.92,12.08L12,20L4.08,12.08L5.5,10.67L11,16.17V2H13V16.17L18.5,10.66L19.92,12.08M12,20H2V22H22V20H12Z" />
                            </svg>
                        </a>
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
                    <span class="font-semibold text-gray-900">{{ totalEntries }}</span>
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
    <br />
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
            var month;
            var day;
            var year;

            if (this.sort_type == "All") {
                var storedApplicationsAll = [];
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

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
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Approval");
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

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
                const applications = Parse.Object.extend("Applications");

                const query = new Parse.Query(applications);
                query.equalTo("applicationStatus", "For Revision");
                query.equalTo("createdBy", Parse.User.current().id);

                const querResult = await query.find();

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

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

                for (i = 0; i < querResult.length; i++) {
                    const application = querResult[i];

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
                var month = application.createdAt.getMonth();
                var day = application.createdAt.getDate();
                var year = application.createdAt.getFullYear();

                const applicationTypes = Parse.Object.extend("ApplicationTypes");
                const appTypeQuery = new Parse.Query(applicationTypes);
                appTypeQuery.equalTo("objectId", application.get("applicationType"));

                const applicationType = await appTypeQuery.first();

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
                });
            }
            this.totalEntries = querResult.length;
            this.tables = storedApplications;
        }
    },
};
</script>

<style></style>
