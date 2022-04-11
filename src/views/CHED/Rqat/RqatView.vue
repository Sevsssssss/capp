<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="RqatView" />
</div>
<div v-else class="p-3">
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
            </div>
            <div class="flex flex-row">
                
                <!-- button -->
                <div class="h-fit pt-3 items-center">
                    <button @click="csvRQAT()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                       <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload CSV</div>
                    </button>
                </div>
                <!-- button -->
                <div class="h-fit pr-5 pt-3 items-center">
                    <button @click="addRQAT()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add RQAT</div>
                    </button>
                </div>
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
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="table in searchRqat" :key="table">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {{ table.rqatName }}
                        </th>
                        <td class="px-6 py-4">
                            <div class="text-md font-semibold"> {{ table.hei }}</div>
                        </td>
                        <td class="px-6 py-4">
                            {{ table.contactNum }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.username }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="hover:text-brand-red/60">
                                <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </div>
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
                                <a href="javascript:void(0)" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="nextPage()">Next</a>
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
import Parse from "parse";
// var dataNumber = 10;
// var page = 0;

import NoDataAvail from "@/components//NoDataAvail.vue";

export default {
    name: "RqatView",
    data() {
        return {
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "RQAT MEMBER NAME",
                },
                {
                    title: "HEI",
                },
                {
                    title: "CONTACT NUMBER",
                },
                {
                    title: "USERNAME",
                },
            ],

            datas: [{
                    title: "FOR APPROVAL",
                    num: 300,
                },
                {
                    title: "FOR REVISION",
                    num: 300,
                },
                {
                    title: "FOR ISSUANCE",
                    num: 300,
                },
                {
                    title: "FOR EVALUATION",
                    num: 300,
                },
                {
                    title: "FOR COMPLETION",
                    num: 300,
                },
            ],
            tables: [],
            search: "",
        };
    },
    components: {
        NoDataAvail,
    },
    computed: {
        searchRqat() {
            this.newEntCount();
            return this.tables
                .filter((p) => {
                    return (
                        p.rqatName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                    );
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        addRQAT() {
            this.$router.push("/rqat/add");
        },
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return (
                    p.rqatName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
            }).length;
        },
        prevPage() {
            if (this.currentpage > 0)
                this.currentpage -= 1;
        },
        nextPage() {
            if (((this.currentpage + 1) * this.numPerPage) < this.totalEntries) {
                this.currentpage += 1;
            }
        },
    },
    mounted: async function () {
        var rqats = [];

        const query = new Parse.Query(Parse.User);
        query.equalTo("access_type", "RQAT");
        query.notEqualTo("hei_affil", null);

        const querResult = await query.find();
        for (var i = 0; i < querResult.length; i++) {
            const rqat = querResult[i];
            rqats.push({
                rqatName: rqat.get("name")["lastname"] +
                    ", " +
                    rqat.get("name")["firstname"] +
                    " " +
                    rqat.get("name")["middleinitial"] +
                    ".",
                hei: rqat.get("hei_affil"),
                contactNum: rqat.get("contact_num"),
                username: rqat.get("username"),
            });
        }
        this.totalEntries = querResult.length;
        this.tables = rqats;
    },
};
</script>

<style>
</style>
