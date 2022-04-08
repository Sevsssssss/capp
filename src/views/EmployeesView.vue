<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="EmployeeView" />
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
                <!-- sort -->
                <div class="dropdown flex flex-row">
                    <select class="select select-ghost select-sm w-full max-w-xs" style="outline: none" id="hei_sort" v-model="sort_type" @change="filterEmployees()">
                        <option disabled selected>Sort by Designation</option>
                        <option>CHED Director</option>
                        <option>Supervisor</option>
                        <option>Employees</option>
                        <option>Others</option>
                    </select>
                </div>
                <button @click="addEmployee()" class="btn btn-primary1 bg-brand-darkblue" style="width: 180px">
                    <div class="flex flex-row add-hei-content">
                        <svg style="fill:white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" /></svg>
                        <div class="btn-text">Add Employee</div>
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
                <tr class="" v-for="table in searchEmployee" :key="table">
                    <th>{{ table.Name }}</th>
                    <td>
                        <div class="column">
                            <div class="hei-name">{{ table.ContactNo }}</div>
                        </div>
                    </td>
                    <td>{{ table.Username}}</td>
                    <td>{{ table.Designation }}</td>
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
    name: "EmployeesView",
    data() {
        return {
            currentpage:0,
            numPerPage:10,
            totalEntries:0,
            headers: [{
                    title: "EMPLOYEE NAME"
                },
                {
                    title: "COTACT NUMBER"
                },
                {
                    title: "USERNAME"
                },
                {
                    title: "DESIGNATION"
                },
                {
                    title: "ACTION"
                },
            ],
            tables: [
                /*{
                                    Name: "Salvatore Brewer",
                                    ContactNo: "09291445216 ",
                                    Username: "birdpager",
                                    Designation: "CHED Supervisor",
                                },
                                {
                                    Name: "Salvatore Brewer",
                                    ContactNo: "09291445216 ",
                                    Username: "birdpager",
                                    Designation: "CHED Supervisor",
                                },
                                {
                                    Name: "Salvatore Brewer",
                                    ContactNo: "09291445216 ",
                                    Username: "birdpager",
                                    Designation: "CHED Supervisor",
                                },
                                {
                                    Name: "Salvatore Brewer",
                                    ContactNo: "09291445216 ",
                                    Username: "birdpager",
                                    Designation: "CHED Supervisor",
                                },
                                {
                                    Name: "Salvatore Brewer",
                                    ContactNo: "09291445216 ",
                                    Username: "birdpager",
                                    Designation: "CHED Supervisor",
                                },*/
            ],
            search: '',
            sort_type: 'Sort by Designation',
        };
    },
    components: {
        NoDataAvail,
    },
    computed: {
        searchEmployee() {
            return this.tables.filter(p => {
                return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).slice((this.numPerPage * this.currentpage),(this.currentpage + 1) * this.numPerPage);
        }
    },
    methods: {
        addEmployee() {
            this.$router.push("/employees/add");
        },
        newEntCount(){
            this.totalEntries = this.tables.filter(p => {
                return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).length;
        },
        prevPage() {
            this.currentpage -= 1;
        },
        nextPage() {
            this.currentpage += 1;
        },
        async filterEmployees() {

            var i = 0;

            if (this.sort_type == "CHED Director") {
                var empDir = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "DIRECTOR");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empDir.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    }, );
                }
                this.tables = empDir;
            }
            if (this.sort_type == "Supervisor") {
                var empSuper = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "EDUCATION SUPERVISOR");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empSuper.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    }, );
                }
                this.tables = empSuper;

            }
            if (this.sort_type == "Employees") {
                var empEmp = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "CHED EMPLOYEE");
                

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empEmp.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    }, );
                }
                this.tables = empEmp;
            }
            if (this.sort_type == "Others") {
                var empOthers = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "DIRECTOR");
            

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empOthers.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    }, );
                }
                this.tables = empOthers;
            }
        }
    },
    mounted: async function () {
        var employees = [];

        const query = new Parse.Query(Parse.User);
        query.equalTo("user_type", "employee");
        

        const querResult = await query.find();
        for (var i = 0; i < querResult.length; i++) {
            const emp = querResult[i];

            employees.push({
                Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                ContactNo: emp.get("contact_num"),
                Username: "test",
                Designation: emp.get("designation"),
            }, );
        }
        this.totalEntries = querResult.length;
        this.tables = employees;
    }
};
</script>

<style>

</style>
