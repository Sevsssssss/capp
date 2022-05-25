<template>
<div v-if="!tables.length" style="height: 100%">
    <div class="flex flex-col center h-full p-5">
        <div class="noDataAvail">No Data Available</div>
        <div class="h-fit pt-3 items-center">
            <button @click="excelDesignation()" type="button" class="btn-table">
                <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                </svg>
                <div class="pl-2">Upload Excel</div>
            </button>
        </div>
        <!-- button -->
        <div class="items-center">
            <label @clieck="reset()" type="button" for="createDesignation" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                <div class="pl-2">Add Designation</div>
            </label>
        </div>
    </div>
</div>
<div v-else class="p-3">
    <!-- Table -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table header -->
        <div class="flex flex-row justify-between items-center">
            <!-- Search -->
            <div class="flex space-x-4 pl-5 py-4">
                <div class="mr-5">
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
            </div>
            <div class="flex flex-row">
                <div class="h-fit pt-3 items-center">
                    <button @click="excelDesignation()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload Excel</div>
                    </button>
                </div>
                <!-- button -->
                <div class="h-fit pr-5 pt-3 items-center">
                    <label type="button" for="createDesignation" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add Designation</div>
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
                <tr v-for="i in searchDesignation" :key="i" class="bg-white border-b">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ i.Name }}
                    </td>
                    <!-- <td class="px-6 py-4 text-right">
              <a
                @click="viewEvalIns"
                href="#"
                class="font-medium text-blue-600 hover:underline"
                >Edit</a
              >
            </td> -->
                    <td class="px-6 py-4 flex flex-row justify-end">
                        <label for="editDesignation" href="#" class="font-medium text-blue-600 hover:underline pr-3" @click="selectDesignation(i.id)">Edit</label>
                        <label for="deleteFunc" class="hover:text-brand-red/60 self-center">
                            <svg style="width: 20px; height: 20px" viewBox="0 0 24 24" @click="selectedDesignationDelete(i.id)">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
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
                            <a href="javascript:void(0)" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <input type="checkbox" id="createDesignation" class="modal-toggle" />
    <label for="createDesignation" class="modal cursor-pointer">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD DESIGNATION</div>
            <p class="py-2 text-sm">Input the name of the Designation.</p>
            <form v-on:submit.prevent="submit">
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Designation:
                    </label>
                    <input type="text" id="base-input" :class="{ 'input-error': validationStatus(v$.designationName) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="v$.designationName.$model" />
                </div>
            </form>
            <div class="modal-action">
                <label for="createDesignation" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal()">Submit</label>
            </div>
        </div>
    </label>

    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold">
                Add Designation
            </div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this designation?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal()">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="addDesignation()">Continue</label>
            </div>
        </div>
    </div>

    <input type="checkbox" id="editDesignation" class="modal-toggle" />
    <label for="editDesignation" class="modal cursor-pointer">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">UPDATE DESIGNATION</div>
            <p class="py-2 text-sm">Update the name of the Designation.</p>
            <form v-on:submit.prevent="submit">
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Designation:
                    </label>
                    <input type="text" id="base-input" :class="{ 'input-error': validationStatus(v$.designationName) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="v$.designationName.$model" />
                </div>
            </form>
            <div class="modal-action">
                <label for="editDesignation" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="reset()">
                    Cancel
                </label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal()">
                    Update
                </label>
            </div>
        </div>
    </label>
    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Designation</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to delete this
                designation?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteDesignation()">Delete</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
// var dataNumber = 10;
// var page = 0;
const toast = useToast();
export default {
    name: "DesignationsView",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            deleteDis: '',
            showModal1: false,
            v$: useVuelidate(),
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                title: "Designation",
            }, ],
            tables: [],
            search: "",
            sort_type: "Sort by Designation",
            designationName: "",
            checkedAccessTypes: [],
            designationSelected: "",
        };
    },
    validations() {
        return {
            designationName: {
                required,
            },
        };
    },
    computed: {
        //For Search Function
        searchDesignation() {
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
        reset(){
            this.designationName = "";
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },
        async selectDesignation(id) {
            this.designationSelected = id;

            const designations = Parse.Object.extend("Designations");
            const desigQuery = new Parse.Query(designations);
            desigQuery.equalTo("objectId", this.designationSelected);

            const designation = await desigQuery.first();

            this.designationName = designation.get("name")
        },
        async modal() {
            //For Error Checking
            var has_error = 0;
            if (this.designationName == "") {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;

                //Query Designation
                const designations = Parse.Object.extend("Designations");
                const desigQuery = new Parse.Query(designations);
                desigQuery.equalTo("objectId", this.designationSelected);

                const designation = await desigQuery.first();

                designation.set("name", this.designationName)

                //Save Designation Updates
                designation.save({
                        name: this.designationName.toUpperCase(),
                    }).then(() =>
                        toast("Designation Updated", {
                            type: TYPE.SUCCESS,
                            timeout: 3000,
                            position: POSITION.TOP_RIGHT,
                        }),
                    ),

                    // window.location.reload()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
            }
        },
        selectedDesignationDelete(id) {
            this.deleteDis = id;
        },
        async deleteDesignation() {
            this.$refs.Spinner.show();
            //Query Designation
            const designations = Parse.Object.extend("Designations");
            const desigQuery = new Parse.Query(designations);
            desigQuery.equalTo("objectId", this.deleteDis);

            const designation = await desigQuery.first();

            //Delete Designation
            designation.destroy().then((disc) => {
                console.log("Deleted object: " + disc.id);
                toast("Deleting...", {
                    type: TYPE.WARNING,
                    timeout: 3000,
                    hideProgressBar: false,
                    position: POSITION.TOP_RIGHT,
                });
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }, (error) => {
                toast("Error:" + error.message, {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log("Error: " + error)
            })
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
        addDesignation() {
            this.$refs.Spinner.show();

            //Get Designation Class
            const designation = Parse.Object.extend("Designations");
            const newDesignation = new designation();
            try {
                //Save new Designation
                newDesignation.save({
                        name: this.designationName.toUpperCase(),
                    }).then(() =>
                        toast("Designation Added", {
                            type: TYPE.SUCCESS,
                            timeout: 3000,
                            position: POSITION.TOP_RIGHT,
                        }),
                    ),

                    // window.location.reload()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
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
        excelDesignation() {
            this.$router.push("/designations/upload");
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
            var designationsTable = [];
            //Query Designations
            const Designations = Parse.Object.extend("Designations");
            const query = new Parse.Query(Designations);

            const querResult = await query.find();

            //Store Designations
            for (var i = 0; i < querResult.length; i++) {
                const desig = querResult[i];

                designationsTable.push({
                    id: desig.id,
                    Name: desig.get("name"),
                });
            }
            this.totalEntries = querResult.length;
            this.tables = designationsTable;
        }
    },
};
</script>

<style></style>
