<template>
<!-- <div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="AccessTypesView" />
</div> -->

<div  class="p-3">
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
    <!-- Table -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table header -->
        <div class="flex flex-row justify-between items-center">
            <!-- Search -->
            <div class="flex space-x-4 pl-5 py-4">
                <div class="mr-5">
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
            </div>
            <div class="flex flex-row">
                <!-- button -->
                <div class="h-fit pr-5 pt-3 items-center">
                    <label type="button" for="createAccessType" class="
                flex
                items-center
                text-white
                bg-brand-darkblue
                hover:bg-blue-800
                focus:ring-4 focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-3
                py-2.5
                mr-2
                mb-2
                focus:outline-none
              ">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add Access Type</div>
                    </label>
                </div>
            </div>
        </div>
        <!-- Table body -->
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in searchAccessType" :key="i" class="bg-white border-b">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ i.Name }}
                    </td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ i.Privileges }}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a @click="viewEvalIns" href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                    </td>
                    <td class="px-6 py-4 flex flex-row">
                        <div class="hover:text-brand-red/60">
                            <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="searchAccessType.length == 0" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, the keyword "{{search}}" cannot be found in the database.
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
                    <span class="font-semibold text-gray-900">{{ totalEntries }}</span>
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

    <input type="checkbox" id="createAccessType" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD ACCESS TYPES</div>
            <p class="py-2 text-sm">Input the name and choose its priviliges.</p>
            <form>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Access Type:</label>
                    <input type="text" id="base-input" class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-md
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
              " placeholder="Enter Name" v-model="atname" />
                    <div class="font-medium text-sm mt-2">
                        Choose Home Type:
                        <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                            <div class="label-text viewSubCatbool pr-3" style="align-self: center">
                                <input type="radio" id="homeType" value="/home" class="radio mr-1" v-model="homeType" />
                                CHED Home
                            </div>
                            <div class="label-text viewSubCatbool" style="align-self: center">
                                <input type="radio" id="homeType" value="/HEIhome" class="radio mr-1" v-model="homeType" />
                                HEI Home
                            </div>
                        </label>
                    </div>
                    <div v-if="homeType == '/home'" class="font-medium text-sm mt-2">
                        Privileges:
                        <div class=" grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 text-left">
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/application" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Application
                                </div>
                            </label>
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/application:id" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Application Status
                                </div>
                            </label>

                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/hei" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEIs Account
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/hei/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add HEI
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/hei/upload" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Upload HEI Accounts
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/rqat" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    RQAT Account
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/rqat/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add RQAT
                                </div>
                            </label>
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/employees" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Employees
                                </div>
                            </label>
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/employees/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add Employees
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/evaluationins" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Evaluation Ins.
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/evaluationins/view" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Evaluation Ins. View
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/evaluationins/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Evaluation Ins. Add
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/reporting" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Reporting
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/app-settings" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Application Types
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/app-settings/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add Application Type
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/app-settings/appTypeView" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    View Application Type
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/access-settings" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Access Types
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/designations" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Designations
                                </div>
                            </label>
                        </div>
                    </div>

                    <div v-if="homeType == '/HEIhome'" class="font-medium text-sm mt-2">
                        HEI Privileges:
                        <div class="form-control flex mt-1 flex-row">
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/HEIapply" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEI Apply
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/HEIapplication" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEI Application
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/HEIapplication/:id" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEI Edit Application
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            <div class="modal-action">
                <label for="createAccessType" class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            ">Cancel</label>
                <label class="
              btn btn-sm
              bg-blue-700
              rounded-md
              hover:bg-blue-800
              border-none
            " @click="addAccessType()">Submit</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
// import NoDataAvail from "@/components//NoDataAvail.vue";
// var dataNumber = 10;
// var page = 0;
export default {
    name: "AccessTypesView",
    data() {
        return {
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "ACCESS TYPE",
                },
                {
                    title: "Privileges",
                },
            ],
            tables: [],
            search: "",
            sort_type: "Sort by Designation",
            atname: "",
            checkedAccessTypes: [],
            homeType: "",
        };
    },
    // components: {NoDataAvail},
    computed: {
        searchAccessType() {
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
        addAccessType() {
            const accessType = Parse.Object.extend("AccessTypes");
            const newAccessType = new accessType();
            try {
                newAccessType.save({
                    name: this.atname.toUpperCase(),
                    hometype: this.homeType,
                    privileges: this.checkedAccessTypes,
                });
                if (
                    confirm(
                        "Application Type added. Would you like to add another Application Type?"
                    )
                ) {
                    document.location.reload();
                } else {
                    document.location.reload();
                }
            } catch (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        },
        addAppType() {
            this.$router.push("/settings/add");
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
    },
    mounted: async function () {
        var accessTypesTable = [];
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        const querResult = await query.find();
        for (var i = 0; i < querResult.length; i++) {
            const accessType = querResult[i];
            var accessPriv = "";
            for (var x = 0; x < accessType.get("privileges").length; x++) {
                var accessPrivIndex = accessType.get("privileges")[x];
                if (accessPriv === "") {
                    accessPriv = accessPriv + accessPrivIndex;
                } else {
                    accessPriv = accessPriv + ", " + accessPrivIndex;
                }
            }
            accessTypesTable.push({
                Name: accessType.get("name"),
                Privileges: accessPriv,
            });
        }
        this.totalEntries = querResult.length;
        this.tables = accessTypesTable;
        // console.log(this.tables);
    },
};
</script>

<style></style>
