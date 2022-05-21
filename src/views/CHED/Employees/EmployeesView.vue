<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="EmployeeView" />
</div>
<div v-else class="p-3">
    <div class="grid xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3">
        <div class="bg-brand-white shadow-md rounded-md m-3 p-4" v-for="data in datas" :key="data">
            <div class="flex flex-col justify-between text-left">
                <div class="flex flex-row">
                    <div :class="'homeIcon ' + data.color" class="mr-3">
                        <svg class="icon" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
                        </svg>
                    </div>
                    <div class="text-sm font-semibold" style="color: #8fa0b9">
                        {{ data.title }}
                    </div>
                </div>
                <div class="text-2xl text-right font-semibold text-grey-300">
                    {{ data.num }}
                </div>
            </div>
        </div>
    </div>
    <!-- Can't Read -->
    <!-- <DataCards :datas="datas" /> -->
    <!-- Table -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table header -->
        <div class="flex flex-row justify-between items-center">
            <!-- Search -->
            <div class="flex space-x-4 pl-5 py-4">
                <div class="">
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pl-3
                  pointer-events-none
                ">
                            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input v-model="search" type="text" id="search" class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-80
                  pl-10
                  p-2.5
                " placeholder="Search for items" />
                    </div>
                </div>
                <!-- Filter -->
                <div class="flex flex-row">
                    <!-- sort -->
                    <div class="month-sort flex flex-row">
                        <select class="font-normal rounded-md
                          select select-ghost select-sm
                          w-full
                          max-w-xs
                          " style="outline: none" id="Employee" v-model="sort_type" @change="filterEmployees()">
                            <option v-for="designation in designations" :key="designation">{{designation.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-row">
                <!-- button -->
                <div class="h-fit pt-3 items-center">
                    <button @click="excelEmployees()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload Excel</div>
                    </button>
                </div>
                <!-- button -->
                <div class="h-fit pr-5 pt-3 items-center">
                    <button @click="addEmployee()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add Employee</div>
                    </button>
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
                    </tr>
                </thead>
                <tbody v-if="sort_type_var == false">
                    <tr class="bg-white border-b" v-for="table in searchEmployee" :key="table">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            {{ table.Name }}
                        </th>
                        <td class="px-6 py-4">
                            <div>{{ table.ContactNo }}</div>
                        </td>
                        <td class="px-6 py-4">
                            {{ table.Username }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.Email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.Designation }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.AccessType }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex space-x-2 items-end justify-end">
                                <router-link :to="{
                                name: 'EditEmployeeView',
                                params: {
                                empID: table.id,
                                },
                            }">
                                    <a href="#" v-if="table.status != 'For Compliance'" class="font-medium text-blue-600 hover:underline">Edit</a>
                                </router-link>
                                <div>
                                    <label for="deleteFunc" class="hover:text-brand-red/60">
                                        <svg style="width: 20px; height: 20px" viewBox="0 0 24 24" @click="selectAcc(table.id)">
                                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="searchEmployee.length == 0" class="p-5 font-medium">
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
                1 + numPerPage * currentpage
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
                                <a href="javascript:void(0)" class="
                      py-2
                      px-3
                      ml-0
                      leading-tight
                      text-gray-500
                      bg-white
                      rounded-l-lg
                      border border-gray-300
                      hover:bg-gray-100 hover:text-gray-700
                    " @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="
                      py-2
                      px-3
                      leading-tight
                      text-gray-500
                      bg-white
                      rounded-r-lg
                      border border-gray-300
                      hover:bg-gray-100 hover:text-gray-700
                    " @click="nextPage()">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Account</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to delete this
                account?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            ">Cancel</label>
                <label @click="deleteEmployee" class="
              btn btn-sm
              bg-red-500
              hover:bg-red-600
              rounded-md
              border-none
            ">Delete</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";
// var dataNumber = 10;
// var page = 0;
import NoDataAvail from "@/components//NoDataAvail.vue";
const toast = useToast();
export default {
    name: "EmployeesView",
    data() {
        return {
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "EMPLOYEE NAME",
                },
                {
                    title: "CONTACT NUMBER",
                },
                {
                    title: "USERNAME",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "DESIGNATION",
                },
                {
                    title: "ACCESS TYPE",
                },
            ],
            tables: [],
            designations: [],
            search: "",
            sort_type: "All",
            sort_type_var: false,
        };
    },
    components: {
        NoDataAvail,
        VueInstantLoadingSpinner,
    },
    computed: {
        searchEmployee() {
            return this.tables
                .filter((p) => {
                    return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        addEmployee() {
            this.$router.push("/employees/add");
        },
        selectAcc(id) {
            this.currentDelAcc = id;
        },
        async deleteEmployee() {
            this.$refs.Spinner.show();

            const acc = new Parse.Query(Parse.User);
            acc.equalTo("objectId", this.currentDelAcc);
            const querResult = await acc.first({
                useMasterKey: true,
            });

            const AccessType = Parse.Object.extend("AccessTypes");
            const queryACC = new Parse.Query(AccessType);
            queryACC.equalTo("objectId", querResult.get("access_type"));
            const educSup = queryACC.first();

            const applications = Parse.Object.extend("Applications");
            const queryApp = new Parse.Query(applications);
            if (educSup != undefined) {
                queryApp.equalTo("selectedSupervisor", querResult.id)
                const application = await queryApp.find();
                if (application.length > 0) {
                    if (confirm("This account would be archived instead of deleted due to having past transactions. Would you like to continue?")) {
                        querResult.set("isArchived", true);
                        querResult.save({
                            useMasterKey: true,
                        });
                    }
                } else {

                    //if(confirm("Are you sure you would like to delete this account?")){
                    querResult.destroy({
                        useMasterKey: true,
                    });
                    //}
                    toast("Deleting...", {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: false,
                        position: POSITION.TOP_RIGHT,
                    });
                    setTimeout(() => {
                        document.location.reload()
                    }, 3000);

                }
            } else {

                //if (confirm("Are you sure you would like to delete this account?")) {
                querResult.destroy({
                    useMasterKey: true,
                });
                //}
                toast("Deleting...", {
                    type: TYPE.WARNING,
                    timeout: 3000,
                    hideProgressBar: false,
                    position: POSITION.TOP_RIGHT,
                });
                setTimeout(() => {
                    document.location.reload()
                }, 3000);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );

        },
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
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
        async filterEmployees() {

            var i = 0;
            if (this.sort_type == "All") {
                var employees = [];
                const queryEmp = new Parse.Query(Parse.User);
                queryEmp.notContainedIn("access_type", ["HEI", "RQAT"]);
                const querEmpResult = await queryEmp.find({
                    useMasterKey: true,
                });
                console.log(querEmpResult.length);
                for (i = 0; i < querEmpResult.length; i++) {
                    const emp = querEmpResult[i];
                    console.log(emp);
                    employees.push({
                        id: emp.id,
                        Name: emp.get("name")["lastname"] +
                            ", " +
                            emp.get("name")["firstname"] +
                            " " +
                            emp.get("name")["middleinitial"] +
                            ".",
                        Email: emp.get("email"),
                        ContactNo: emp.get("contact_num"),
                        Username: emp.get("username"),
                        Designation: emp.get("designation"),
                        AccessType: emp.get("access_type"),
                    });
                }
                if (employees.length > 0) {
                    this.sort_type_var = false;
                    this.tables = employees;
                } else {
                    this.sort_type_var = true;
                }

            } else {
                var employeesFiltered = [];
                const query = new Parse.Query(Parse.User);
                query.notEqualTo("access_type", "HEI");
                query.notEqualTo("access_type", "RQAT");
                query.equalTo("designation", this.sort_type)

                const querResult = await query.find({
                    useMasterKey: true,
                });
                for (i = 0; i < querResult.length; i++) {
                    const emp = querResult[i];
                    employeesFiltered.push({
                        id: emp.id,
                        Name: emp.get("name")["lastname"] +
                            ", " +
                            emp.get("name")["firstname"] +
                            " " +
                            emp.get("name")["middleinitial"] +
                            ".",
                        Email: emp.get("email"),
                        ContactNo: emp.get("contact_num"),
                        Username: emp.get("username"),
                        Designation: emp.get("designation"),
                        AccessType: emp.get("access_type"),
                    });
                }
                if (employeesFiltered.length > 0) {
                    this.sort_type_var = false;
                    this.tables = employeesFiltered;
                } else {
                    this.sort_type_var = true;
                }

            }

        },
        excelEmployees() {
            this.$router.push("/employees/upload");
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

            const AccessType = Parse.Object.extend("AccessTypes");
            const queryACC = new Parse.Query(AccessType);
            queryACC.equalTo("name", "HEI");

            const accQuerResult = await queryACC.first();

            var employees = [];
            const query = new Parse.Query(Parse.User);
            query.notEqualTo("access_type", accQuerResult.id);
            query.notEqualTo("designation", null);
            const querResult = await query.find({
                useMasterKey: true,
            });
            for (var i = 0; i < querResult.length; i++) {
                const emp = querResult[i];

                const AccessType = Parse.Object.extend("AccessTypes");
                const queryACC = new Parse.Query(AccessType);
                queryACC.equalTo("objectId", emp.get("access_type"));

                const accQuerResult = await queryACC.first();
                console.log(accQuerResult)

                const Designation = Parse.Object.extend("Designations");
                const queryDes = new Parse.Query(Designation);
                queryDes.equalTo("objectId", emp.get("designation"));
                console.log(emp)
                const desigResult = await queryDes.first();
                console.log(desigResult)
                employees.push({
                    id: emp.id,
                    Name: emp.get("name")["lastname"] +
                        ", " +
                        emp.get("name")["firstname"] +
                        " " +
                        emp.get("name")["middleinitial"] +
                        ".",
                    Email: emp.get("email"),
                    ContactNo: emp.get("contact_num"),
                    Username: emp.get("username"),
                    Designation: desigResult.get("name"),
                    AccessType: accQuerResult.get("name"),
                });
            }
            this.totalEntries = querResult.length;
            this.tables = employees;

            //Get Designations
            var storedDesignations = [];

            const designations = Parse.Object.extend("Designations");
            const designationQuery = new Parse.Query(designations);
            const designationResult = await designationQuery.find();
            storedDesignations.push({
                id: 0,
                name: "All",
            });
            for (var j = 0; j < designationResult.length; j++) {
                const designation = designationResult[j];
                storedDesignations.push({
                    id: j + 1,
                    name: designation.get("name"),
                });
            }

            this.designations = storedDesignations;
        }
    },
};
</script>

<style></style>
