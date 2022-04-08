<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="RqatView" />
</div>
<div v-else class="" style="padding: 10px">
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="top-row flex flex-row" style="justify-content: space-between;">
            <div class="search-container">
                <input type="search" name="search" placeholder="Search" class="search-input input rounded-lg text-sm focus:outline-none" v-model="search" />
                <a href="#" class="search-btn">
                    <div class="search_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                        </svg>
                    </div>
                </a>
            </div>

            <div class="flex flex-row">
                <button @click="addRQAT()" class="
              btn btn-md
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            ">
                    <div class="flex flex-row">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="btn-text">Add RQAT</div>
                    </div>
                </button>
            </div>
        </div>

        <!-- table -->
        <table class="hei-table table-normal w-full">
            <!-- head-body -->
            <tbody class="hei-table">
                <tr class="hei-table bg-grey-500">
                    <th class="font-semibold text-grey-200" v-for="header in headers" :key="header">{{ header.title }}</th>
                </tr>
                <!-- row 1 -->
                <tr class="" v-for="table in searchRqat" :key="table">
                    <th>{{ table.rqatName }}</th>
                    <td>
                        <div class="column">
                            <div class="hei-name">{{ table.hei }}</div>
                        </div>
                    </td>
                    <td>{{ table.contactNum }}</td>
                    <td>{{ table.username }}</td>
                    <td>
                        <div class="flex flex-row center">
                            <div>
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Footer -->
        <div class="table-footer flex flex-row" style="justify-content: space-between;">
            <div class="flex flex-row center">
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">{{1 + (numPerPage * currentpage)}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{((currentpage + 1) * numPerPage) > totalEntries ? totalEntries : (currentpage + 1) * numPerPage}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{totalEntries}}</span> Entries
                </span>
            </div>
            <div class="p-2">
                <div class="btn-group">
                    <ul class="inline-flex -space-x-px">
                        <li>
                            <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="prevPage()">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" class="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
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
</template>

<script>
import Parse from "parse";

import NoDataAvail from "@/components//NoDataAvail.vue";

export default {
    name: "RqatView",
    data() {
        return {
            currentpage:0,
            numPerPage:10,
            totalEntries:0,
            headers: [{
                    title: "RQAT MEMBER NAME"
                },
                {
                    title: "HEI"
                },
                {
                    title: "COTACT NUMBER"
                },
                {
                    title: "USERNAME"
                },
                {
                    title: "ACTION"
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
            tables: [
                /*{
                                    InstNo: "56543",
                                    HeiName: "Ateneo De Naga University",
                                    address: "Naga City",
                                    type: "Private Institution",
                                    email: "ateneodenaga@gbox.adnu.edu.ph",
                                },
                                {
                                    InstNo: "20746",
                                    HeiName: "Bicol University",
                                    address: "Legazpi City",
                                    type: "State University",
                                    email: "bu@bicol-u.edu.ph",
                                },
                                {
                                    InstNo: "12865",
                                    HeiName: "Catanduanes State University",
                                    address: "Virac",
                                    type: "State University",
                                    email: "areneo@gbox.adnu.edu.ph",
                                },
                                {
                                    InstNo: "95848",
                                    HeiName: "Aquinas University of Legazpi",
                                    address: "Legazpi City",
                                    type: "Private",
                                    email: "ust@ust-legazpi.edu.ph",
                                },
                                {
                                    InstNo: "56543",
                                    HeiName: "Camarines Norte State College",
                                    address: "Daet",
                                    type: "State College",
                                    email: "cnsc@cnsc.edu.ph",
                                },*/
            ],
            search: '',
        };
    },
    components: {
        NoDataAvail,
    },
    computed: {
        searchRqat() {
            this.newEntCount();
            return this.tables.filter(p => {
                return p.rqatName.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).slice((this.numPerPage * this.currentpage),(this.currentpage + 1) * this.numPerPage);
        }
    },
    methods: {
        addRQAT() {
            this.$router.push("/rqat/add");
        },
        newEntCount(){
            this.totalEntries = this.tables.filter(p => {
                return p.rqatName.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).length;
        },
        prevPage() {
            this.currentpage -= 1;
        },
        nextPage() {
            this.currentpage += 1;
        },
    },
    mounted: async function () {
        var rqats = [];

        const query = new Parse.Query(Parse.User);
        query.equalTo("user_type", "rqat");
        

        const querResult = await query.find();
        for (var i = 0; i < querResult.length; i++) {
            const rqat = querResult[i];
            rqats.push({
                rqatName: rqat.get("name")["lastname"] + ", " + rqat.get("name")["firstname"] + " " + rqat.get("name")["middleinitial"] + ".",
                hei: rqat.get("hei_affil"),
                contactNum: rqat.get("contact_num"),
                username: "test",
            }, );
        }
        this.totalEntries = querResult.length;
        this.tables = rqats;
    }
};
</script>

<style>

</style>
