<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="HeiView" />
</div>
<div v-else class="" style="padding: 10px">
    <!-- ADD v-if="" here -->

    <div >
        <DataCards :datas="datas" />

        <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px" onload="getHEI()">
            <div class="top-row flex flex-row" style="justify-content: space-between">
                <div class="left-side flex flex-row">
                    <!-- search -->
                    <div class="search-container">
                        <input type="text" id="search" placeholder="Search" class="search-input input rounded-lg text-sm focus:outline-none" v-model="search" />
                        <a href="#" class="search-btn">
                            <div class="search_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="flex flex-row">
                    <!-- sort -->
                    <div class="month-sort flex flex-row">
                        <select class="select select-ghost select-sm w-full max-w-xs" style="outline: none" id="hei_sort" v-model="sort_type" @change="filterHEI()">
                            <option disabled selected>Sort by type</option>
                            <option>Private</option>
                            <option>State Univeristies</option>
                            <option>Local Universities</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <!-- add -->
                    <button @click="addHei()" class="
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
                            <div class="btn-text">Add HEI</div>
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
                    <tr class="" v-for="table in searchHEI" :key="table">
                        <th>{{ table.InstNo }}</th>
                        <td>
                            <div class="column">
                                <div class="hei-name">{{ table.HeiName }}</div>
                                <div class="hei-address">{{ table.address }}</div>
                            </div>
                        </td>
                        <td>{{ table.type }}</td>
                        <td>{{ table.email }}</td>
                        <td>
                            <div class="flex flex-row">
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
                        Showing <span class="font-semibold text-gray-900 dark:text-white">{{1 + (numPerPage * currentpage)}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{(currentpage + 1) * numPerPage}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{totalEntries}}</span> Entries
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

</div>
</template>

<script>
import NoDataAvail from "@/components//NoDataAvail.vue";

import Parse from "parse";


Parse.initialize("capp", "master");
Parse.serverURL = "http://localhost:1337/parse";

export default {
    name: "HeiView",
    data() {
        return {
            currentpage:0,
            numPerPage:10,
            totalEntries:0,
            columns: [{
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Age',
                    field: 'age',
                    type: 'number',
                },
                {
                    label: 'Created On',
                    field: 'createdAt',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'MMM do yy',
                },
                {
                    label: 'Percent',
                    field: 'score',
                    type: 'percentage',
                },
            ],
            rows: [{
                    id: 1,
                    name: "John",
                    age: 20,
                    createdAt: '',
                    score: 0.03343
                },
                {
                    id: 2,
                    name: "Jane",
                    age: 24,
                    createdAt: '2011-10-31',
                    score: 0.03343
                },
                {
                    id: 3,
                    name: "Susan",
                    age: 16,
                    createdAt: '2011-10-30',
                    score: 0.03343
                },
                {
                    id: 4,
                    name: "Chris",
                    age: 55,
                    createdAt: '2011-10-11',
                    score: 0.03343
                },
                {
                    id: 5,
                    name: "Dan",
                    age: 40,
                    createdAt: '2011-10-21',
                    score: 0.03343
                },
                {
                    id: 6,
                    name: "John",
                    age: 20,
                    createdAt: '2011-10-31',
                    score: 0.03343
                },
            ],

            headers: [{
                    title: "INSTITUTIONAL CODE",
                },
                {
                    title: "HEI NAME",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "ACTION",
                },
            ],
            datas: [{
                    title: "STATE UNIVERSITIES AND COLLEGES",
                    num: 46,
                    color: "orange",
                },
                {
                    title: "LOCAL UNIVERSITIES AND COLLEGES",
                    num: 23,
                    color: "blue",
                },
                {
                    title: "PRIVATE COLLEGES",
                    num: 57,
                    color: "violet",
                },
                {
                    title: "OTHER GOVERNMENT SCHOOLS",
                    num: 23,
                    color: "green",
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
            sort_type: "Sort by type",
        };
    },
    components: {
        NoDataAvail,
    },
    computed: {
        searchHEI() {
            this.newEntCount();
            return this.tables.filter(p => {
                return p.HeiName.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).slice((this.numPerPage * this.currentpage),(this.currentpage + 1) * this.numPerPage);
            
        }
    },
    methods: {
        addHei() {
            this.$router.push("/hei/add");
        },
        newEntCount(){
            this.totalEntries = this.tables.filter(p => {
                return p.HeiName.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).length;
        },
        prevPage() {
            this.currentpage -= 1;
        },
        nextPage() {
            this.currentpage += 1;
        },
        async filterHEI() {

            var i = 0;
            if (this.sort_type == "Private") {
                var heisPriv = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "hei");
                query.equalTo("hei_type", "PRIVATE COLLEGES");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const hei = querResult[i];

                    heisPriv.push({
                        InstNo: hei.get("inst_code"),
                        HeiName: hei.get("hei_name"),
                        address: hei.get("address"),
                        type: hei.get("hei_type"),
                        email: "test",
                    }, );
                }
                this.tables = heisPriv;
            }
            if (this.sort_type == "State Univeristies") {
                var heisState = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "hei");
                query.equalTo("hei_type", "STATE UNIVERSITIES AND COLLEGES");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const hei = querResult[i];

                    heisState.push({
                        InstNo: hei.get("inst_code"),
                        HeiName: hei.get("hei_name"),
                        address: hei.get("address"),
                        type: hei.get("hei_type"),
                        email: "test",
                    }, );
                }
                this.tables = heisState;

            }
            if (this.sort_type == "Local Universities") {
                var heisLocal = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "hei");
                query.equalTo("hei_type", "LOCAL UNIVERSITIES AND COLLEGES");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const hei = querResult[i];

                    heisLocal.push({
                        InstNo: hei.get("inst_code"),
                        HeiName: hei.get("hei_name"),
                        address: hei.get("address"),
                        type: hei.get("hei_type"),
                        email: "test",
                    }, );
                }
                this.tables = heisLocal;
            }
            if (this.sort_type == "Others") {
                var heisOthers = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "hei");
                query.equalTo("hei_type", "OTHER GOVERNMENT SCHOOLS");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const hei = querResult[i];

                    heisOthers.push({
                        InstNo: hei.get("inst_code"),
                        HeiName: hei.get("hei_name"),
                        address: hei.get("address"),
                        type: hei.get("hei_type"),
                        email: "test",
                    }, );
                }
                this.tables = heisOthers;
            }
        }
    },
    mounted: async function () {
        var heis = [];

        const query = new Parse.Query(Parse.User);
        query.equalTo("user_type", "hei");
        

        const querResult = await query.find();
        for (var i = 0; i < querResult.length; i++) {
            const hei = querResult[i];

            heis.push({
                InstNo: hei.get("inst_code"),
                HeiName: hei.get("hei_name"),
                address: hei.get("address"),
                type: hei.get("hei_type"),
                email: "test",
            }, );
        }
        this.totalEntries = querResult.length;
        this.tables = heis;

        const queryPrivate = new Parse.Query(Parse.User);
        queryPrivate.equalTo("user_type", "hei");
        queryPrivate.equalTo("hei_type", "PRIVATE COLLEGES");

        const queryState = new Parse.Query(Parse.User);
        queryState.equalTo("user_type", "hei");
        queryState.equalTo("hei_type", "STATE UNIVERSITIES AND COLLEGES");

        const queryLocal = new Parse.Query(Parse.User);
        queryLocal.equalTo("user_type", "hei");
        queryLocal.equalTo("hei_type", "LOCAL UNIVERSITIES AND COLLEGES");

        const queryOthers = new Parse.Query(Parse.User);
        queryOthers.equalTo("user_type", "hei");
        queryOthers.equalTo("hei_type", "OTHER GOVERNMENT SCHOOLS");

        this.datas = [{
                title: "STATE UNIVERSITIES AND COLLEGES",
                num: await queryState.count(),
                color: "orange",
            },
            {
                title: "LOCAL UNIVERSITIES AND COLLEGES",
                num: await queryLocal.count(),
                color: "blue",
            },
            {
                title: "PRIVATE COLLEGES",
                num: await queryPrivate.count(),
                color: "violet",
            },
            {
                title: "OTHER GOVERNMENT SCHOOLS",
                num: await queryOthers.count(),
                color: "green",
            },

        ]
    }
};
</script>

<style>

</style>
