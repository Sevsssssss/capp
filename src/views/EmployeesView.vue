<template>
<div class="" style="padding: 10px">
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
            <div class="font-normal text-sm text-grey-200">TOTAL APPLICATIONS: 40/100</div>

            <div class="flex flex-row">
                <div class="flex flex-row justify-center items-center pr-5">
                    <div class="font-normal text-sm">Rows per page: 10</div>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                        </svg>
                    </div>
                </div>
                <div class="
                  flex flex-row
                  justify-center
                  items-center
                  font-normal
                ">
                    <p>1-10 of 276</p>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                        </svg>
                    </div>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";

var dataNumber = 10;
var page = 0;

Parse.initialize("capp", "master");
Parse.serverURL = "http://localhost:1337/parse";


export default {
    name: "ApplicationView",
    data() {
        return {
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
            tables: [/*{
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
    },
    computed: {
        searchEmployee(){
            return this.tables.filter(p => {
                return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            });
        }
    },
    methods: {
        addEmployee() {
            this.$router.push("/employees/add");
        },
        async filterEmployees() {

            var i = 0;
            
            if (this.sort_type == "CHED Director") {
                var empDir = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "DIRECTOR");
                query.limit(dataNumber);
                query.skip(page * dataNumber);

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empDir.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    },);
                }
                this.tables = empDir;
            }
            if (this.sort_type == "Supervisor") {
                var empSuper = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "EDUCATION SUPERVISOR");
                query.limit(dataNumber);
                query.skip(page * dataNumber);

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empSuper.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    },);
                }
                this.tables = empSuper;
                
            }
            if (this.sort_type == "Employees") {
                var empEmp = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "CHED EMPLOYEE");
                query.limit(dataNumber);
                query.skip(page * dataNumber);

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empEmp.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    },);
                }
                this.tables = empEmp;
            }
            if (this.sort_type == "Others") {
                var empOthers = [];

                const query = new Parse.Query(Parse.User);
                query.equalTo("user_type", "employee");
                query.equalTo("designation", "DIRECTOR");
                query.limit(dataNumber);
                query.skip(page * dataNumber);

                const querResult = await query.find();
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];

                    empOthers.push({
                        Name: emp.get("name")["lastname"] + ", " + emp.get("name")["firstname"] + " " + emp.get("name")["middleinitial"] + ".",
                        ContactNo: emp.get("contact_num"),
                        Username: "test",
                        Designation: emp.get("designation"),
                    },);
                }
                this.tables = empOthers;
            }
        }
    },
    mounted: async function () {
        var employees = [];

        const query = new Parse.Query(Parse.User);
        query.equalTo("user_type", "employee");
        query.limit(dataNumber);
        query.skip(page * dataNumber);

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
        this.tables = employees;
    }
};
</script>

<style>

</style>
