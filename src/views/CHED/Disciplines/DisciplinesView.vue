<template>
<div v-if="!tables.length" style="height: 100%">
    <div class="flex flex-col items-center justify-center h-full p-5">
        <div class="noDataAvail">No Data Available</div>
        <div class="flex ">
            <div class="h-fit items-center">
                <button @click="excelDisciplines()" type="button" class="btn-table">
                    <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                    </svg>
                    <div class="pl-2">Upload Excel</div>
                </button>
            </div>
            <!-- button -->
            <div class="items-center">
                <button @click="addDisciplines()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                    <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                    </svg>
                    <div class="pl-2">Add Discipline</div>
                </button>
            </div>
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
                    <button @click="excelDisciplines()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload Excel</div>
                    </button>
                </div>
                <!-- button -->
                <div class="h-fit pr-2 pt-3 items-center">
                    <button @click="addDisciplines()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add Discipline</div>
                    </button>
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
                <tr v-for="i in searchDiscipline" :key="i" class="bg-white border-b">
                    <td scope="row" class="px-6 py-4 font-medium flex justify-start items-start text-gray-900 whitespace-nowrap">
                        {{ i.MajorDiscipline }}
                    </td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div v-for="x in i.specificDiscipline" :key="x" class="flex flwx-row justify-between">
                            <ul class="list-disc">
                                <li>{{x.SpecificDiscipline}}</li>
                            </ul>
                        </div>
                    </td>
                    <td class="px-6 py-4  flex flex-row justify-end space-x-3">
                        <router-link :to="{
                                name: 'EditDisciplinesView',
                                params: {
                                id: i.id,
                                },
                            }">
                            <a class="font-medium text-blue-600 hover:underline">Edit Disciplines</a>
                        </router-link>

                        <label for="deleteFunc" @click="selectedDisciplineDelete(i.id)" class="hover:text-brand-red/60">
                            <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="searchDiscipline.length == 0" class="p-5 font-medium">
            <!-- NO DATA FOUND {{search}} -->
            Sorry, the keyword "{{ search }}" cannot be found in the database.
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

    <input type="checkbox" id="createDisciplines" class="modal-toggle" />
    <label for="createDisciplines" class="modal cursor-pointer">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD A DISCIPLINE</div>
            <p class="py-2 text-sm">Input the entire name of the dicipline.</p>
            <form v-on:submit.prevent="submit">
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                    <input type="text" id="base-input" :class="{ 'input-error': validationStatus(v$.disciplineName) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="v$.disciplineName.$model" />
                </div>
            </form>
            <div class="modal-action">
                <label for="createDisciplines" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal()">Submit</label>
            </div>
        </div>
    </label>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Add Discipline</div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this discipline?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal()">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="addDiscipline()">Continue</label>
            </div>
        </div>
    </div>

    <div :class="{ 'modal-open ': validate1() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">
                Edit Discipline
            </div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to edit this discipline?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal1()">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="newDiscName()">Continue</label>
            </div>
        </div>
    </div>

    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Major Discipline</div>
            <p class="py-2 text-sm">
                WARNING! Deleting a Major Discipline will also delete all the Specific Disciplines conected to it.
                This action cannot be undone. Are you sure you want to delete this Major Discipline?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteDiscipline()">Delete</label>
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
const toast = useToast();
export default {
    name: "DisciplinesView",
    components: {
        // NoDataAvail,
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            deleteDis: '',
            showModal1: false,
            showModal2: false,
            showModal3: false,
            v$: useVuelidate(),
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "MAJOR DISCIPLINES",
                },
                {
                    title: "SPECIFIC DISCIPLINES",
                },
            ],
            tables: [],
            search: "",
            disciplineName: "",
            editDisciplineName: "",
            editID: "",

            disciplines: [],
            editProgramName: "",
            selectedDiscipline: "",
            programs: [],
            progCounter: 0,
            selectedMajDiscipline: "",
        };
    },
    validations() {
        return {
            disciplineName: {
                required,
            },
            editDisciplineName: {
                required,
            },
            programs: {
                required,
            },
            editProgramName: {
                required,
            },
        };
    },
    computed: {
        searchDiscipline() {
            return this.tables
                .filter((p) => {
                    return p.MajorDiscipline.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        addDisciplines() {
            this.$router.push("/disciplines/add");
        },

        //Select discipline to be deleted
        selectedDisciplineDelete(id) {
            this.deleteDis = id;
        },

        //For Deletion
        async deleteDiscipline() {
            this.$refs.Spinner.show();

            //Query Discipline selected
            const disciplines = Parse.Object.extend("Disciplines");
            const discQuery = new Parse.Query(disciplines);
            discQuery.equalTo("objectId", this.deleteDis);

            const discipline = await discQuery.first();
            

            //Delete Discipline
            discipline.destroy().then(
                (disc) => {
                    toast("Deleting...", {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: false,
                        position: POSITION.TOP_RIGHT,
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    console.log("Deleted object: " + disc.id);
                },
                (error) => {
                    toast("Error:" + error.message, {
                        type: TYPE.ERROR,
                        timeout: 3000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    console.log(error.message);
                }
            )
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },

        //For Validation
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

        validate1() {
            return this.showModal2;
        },
        validate2() {
            return this.showModal3;
        },

        modal() {
            var has_error = 0;
            if (this.disciplineName == "") {
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
            }
        },

        modal1() {
            var has_error = 0;
            if (this.editDisciplineName == "") {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal2 = !this.showModal2;
            }
        },

        modal2() {
            var has_error = 0;
            if (this.programs == "") {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal3 = !this.showModal3;
            }
        },

        //For editing of Discipline
        editDiscipline(name, id) {
            this.editDisciplineName = name;
            this.editID = id;
        },
        async newDiscName() {
            this.$refs.Spinner.show();

            //Query Discipline
            const Disciplines = Parse.Object.extend("Disciplines");
            const discipline = new Parse.Query(Disciplines);
            discipline.equalTo("objectId", this.editID);
            const disc = await discipline.first();
            
            //Set updated name
            disc.set("disciplineName", this.editDisciplineName);

            //Save Dicipline updates
            disc.save();
            try {
                toast("Edited Dicsipline Name Successfully", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        document.location.reload();
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

        },
        addDiscipline() {
            this.$refs.Spinner.show();
            //Add Discipline to database
            const disciplines = Parse.Object.extend("Disciplines");
            const newDiscipline = new disciplines();
            try {
                newDiscipline.save({
                    disciplineName: this.disciplineName,
                });
                toast("New Discipline Added: " + this.disciplineName, {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        document.location.reload();
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
        },
        //For Table Page Traversal
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
        //Routing to Upload Disciplines
        excelDisciplines() {
            this.$router.push("/disciplines/upload");
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

            //Get Disciplines Stored in database
            var disciplineTable = [];
            var disciplinesNames = [];
            const disciplines = Parse.Object.extend("Disciplines");
            const query = new Parse.Query(disciplines);
            const querResult = await query.find();
            for (var i = 0; i < querResult.length; i++) {
                const discipline = querResult[i];
                const sDiscipline = discipline.get("specificDiscipline");

                disciplineTable.push({
                    id: discipline.id,
                    MajorDiscipline: discipline.get("MajorDiscipline"),
                    specificDiscipline: sDiscipline,

                });
                disciplinesNames.push({
                    id: discipline.id,
                    name: discipline.get("MajorDiscipline"),
                });
            }
            this.totalEntries = querResult.length;
            this.disciplines = disciplinesNames;
            this.tables = disciplineTable;
        }
    },
};
</script>

<style></style>
