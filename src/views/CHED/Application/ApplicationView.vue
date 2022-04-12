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
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
                    </div>
                </div>
                <!-- Filter -->
                <div class="flex flex-row ">
                    <!-- sort -->
                    <div class="month-sort flex flex-row">
                        <select class="font-normal rounded-md select select-ghost select-sm w-full max-w-xs" style="outline: none" id="application_sort">
                            <option disabled selected>Sort by type</option>
                            <option>For All</option>
                            <option>For Approval</option>
                            <option>For Revision</option>
                            <option>For Issuance</option>
                            <option>For Evaluation</option>
                            <option>Completed</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- button -->
            <div class="h-fit pr-5 pt-3 items-center">
                <button type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                    </svg>
                    <div class="pl-2">Add Application Type</div>
                </button>
            </div>
        </div>
        <!-- Table body -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                            {{ header.title }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">View</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="table in searchApplication" :key="table">
                        <td class="px-6 py-4">
                            <div class="">
                                <div class="font-semibold text-grey-300">
                                    {{ table.HeiName }}
                                </div>
                                <div class="font-normal">{{ table.address }}</div>
                            </div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {{ table.type }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.program }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.dateApplied }}
                        </td>
                        <td class="px-6 py-4">
                            <!-- :class="'homeIcon.' + data.color" -->
                            <div v-if="table.status === 'FOR APPROVAL'" class="btn-sm1 rounded-md p-2 font-normal approval">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR REVISION'" class="btn-sm1 rounded-md p-2 font-normal revision">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR EVALUATION'" class="btn-sm1 rounded-md p-2 font-normal evaluation">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR ISSUANCE'" class="btn-sm1 rounded-md  p-2 font-normal issuance">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'COMPLETED'" class="btn-sm1 rounded-md p-2 font-normal completed">
                                {{ table.status }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a v-if="table.status === 'COMPLETED'" @click="!!goedit()"></a>
                            <router-link :to="{ 
                            name: 'StatusApplication', 
                            params: { 
                                id: table.id, 
                                HeiName: table.HeiName, 
                                type: table.type, 
                                status: table.status,
                                dateApplied: table.dateApplied,
                                rep: table.rep,
                                email: table.email,
                                }}">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Table Footer -->
            <div class="table-footer flex flex-row justify-between">
                <div class="flex flex-row pl-4 justify-center items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span class="font-semibold text-gray-900 dark:text-white">{{1 + (numPerPage * currentpage)}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{((currentpage + 1) * numPerPage) > totalEntries ? totalEntries : (currentpage + 1) * numPerPage}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{totalEntries}}</span> Entries
                    </span>
                </div>
                <div class="p-2 pr-4">
                    <div class="btn-group">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="nextPage()">Next</a>
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
export default {
    name: "ApplicationView",
    components: {
        DataCards,
        NoDataAvail,
    },
    data() {
        return {
            search: '',
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

            datas: [{
                    title: "FOR APPROVAL",
                    num: 300,
                    color: "orange",
                },
                {
                    title: "FOR REVISION",
                    num: 200,
                    color: "blue",
                },
                {
                    title: "FOR ISSUANCE",
                    num: 120,
                    color: "violet",
                },
                {
                    title: "FOR EVALUATION",
                    num: 123,
                    color: "green",
                },
                {
                    title: "COMPLETED",
                    num: 12,
                    color: "pink",
                },
            ],
            tables: [{
                    id: 1,
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "FOR APPROVAL",
                },
                {
                    id: 2,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Bicol University",
                    address: "Legazpi City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "FOR REVISION",
                },
                {
                    id: 3,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Catanduanes State University",
                    address: "Virac",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "FOR EVALUATION",
                },
                {
                    id: 3,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Aquinas University of Legazpi",
                    address: "Legazpi City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "FOR ISSUANCE",
                },
                {
                    id: 4,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Universidad de Sta. Isabel",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "COMPLETED",
                },
            ],
        };
    },
    computed: {
        searchApplication() {
            if (this.search) {
                return this.tables.filter((item) => {
                    return this.search.toLowerCase().split(' ').every(v => item.HeiName.toLowerCase().includes(v))
                })
            } else {
                return this.tables;
            }
        },

    },
    methods: {
        // statusChecker(status) {
        //     if (status != "COMPLETED") {
        //         return true;
        //     }
        // },
    },
};
</script>

<style>

</style>
