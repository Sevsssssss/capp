<template>
<div v-if="!tables.length" style="height: 100%">
    <div class="flex flex-col justify-center items-center h-full">
        <div class="noDataAvail">No Data Available </div>
        <div class="noDataAvail text-lg pb-4">(Upload Discipline First)</div>
        <div v-if="disciplines.length > 0" class="flex justify-center items-center">
            <div class="h-fit items-center">
                <button @click="excelDisciplines()" type="button" class="btn-table">
                    <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                    </svg>
                    <div class="pl-2">Upload Excel</div>
                </button>
            </div>
            <div v-if="disciplines.length > 0" class="items-center">
                <label @click="addProgramName()" type="button" for="createPrograms" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                    <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                    </svg>
                    <div class="pl-2">Add Program</div>
                </label>
            </div>
        </div>
        <input type="checkbox" id="createPrograms" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative rounded-md text-left">
                <div class="flex flex-row justify-between">
                    <div>
                        <div class="font-semibold text-md">ADD A PROGRAM</div>
                        <p class="py-2 text-sm">
                            Input the Program Name and the Designated Discipline.
                        </p>
                    </div>
                    <div class="space-x-4" style="text-align-last: right">
                        <button data-tip="Add Program" @click="addProgramName()" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form v-on:submit.prevent="submit">
                    <div class="mb-6" v-for="program in programs" :key="program">
                        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Program Name:</label>
                        <div class="flex flex-row">
                            <input type="text" id="base-input" :class="{ 'input-error': validationStatus(v$.programs) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="program.programName" />
                            <div class="pl-4">
                                <button data-tip="Remove Program" class="btn btn-outline center tooltip tooltip-left hover:bg-brand-red/60" for="dele" @click="removeProgram(program.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                        <select class="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="selectedDiscipline">
                            <option v-for="discipline in disciplines" :key="discipline" :value="{specDisc: discipline.SpecDiscCode, majorDisc: discipline.MajorDisc}">
                                {{ discipline.name }}
                            </option>
                        </select>
                    </div>
                </form>
                <div class="modal-action">
                    <label @click="reset()" for="createPrograms" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                    <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal2()">Submit</label>
                </div>
            </div>
        </div>

        <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box relative rounded-md text-left">
                <div class="font-semibold text-md">Add Program</div>
                <p class="text-sm xxs:leading-tight text-grey-200">
                    Are you sure you want to add this program?
                </p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal2()">Cancel</label>
                    <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="addProgram()">Continue</label>
                </div>
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
                        <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder="Search for Programs" />
                    </div>
                </div>
            </div>

            <div class="flex flex-row">
                <div v-if="disciplines.length > 0" class="h-fit pt-3 items-center">
                    <button @click="excelDisciplines()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload Excel</div>
                    </button>
                </div>
                <div v-if="disciplines.length > 0" class="h-fit pr-2 pt-3 items-center">
                    <label @click="addProgramName()" type="button" for="createPrograms" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add Program</div>
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
                <tr v-for="i in searchProgram" :key="i" class="bg-white border-b">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ i.programName }}
                    </td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{i.specificDisciplineName}}
                    </td>

                    <td class="px-6 py-4 flex flex-row space-x-4 justify-end">
                        <label for="editPrograms" @click="editProgramSelect(i.id)" class="font-medium text-blue-600 hover:underline">Edit Programs</label>
                        <label for="deleteFunc" @click="selectedProgramDelete(i.id)" class="hover:text-brand-red/60">
                            <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="searchProgram.length == 0" class="p-5 font-medium">
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

    <input type="checkbox" id="createPrograms" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="flex flex-row justify-between">
                <div>
                    <div class="font-semibold text-md">ADD A PROGRAM</div>
                    <p class="py-2 text-sm">
                        Input the Program Name and the Designated Discipline.
                    </p>
                </div>
                <div class="space-x-4" style="text-align-last: right">
                    <button data-tip="Add Program" @click="addProgramName()" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <form v-on:submit.prevent="submit">
                <div class="mb-6" v-for="program in programs" :key="program">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Program Name:</label>
                    <div class="flex flex-row">
                        <input type="text" id="base-input" :class="{ 'input-error': validationStatus(v$.programs) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="program.programName" />
                        <div class="pl-4">
                            <button data-tip="Remove Program" class="btn btn-outline center tooltip tooltip-left hover:bg-brand-red/60" for="dele" @click="removeProgram(program.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                    <select class="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="selectedDiscipline">
                        <option v-for="discipline in disciplines" :key="discipline" :value="{specDisc: discipline.SpecDiscCode, majorDisc: discipline.MajorDisc}">
                            {{ discipline.name }}
                        </option>
                    </select>
                </div>
            </form>
            <div class="modal-action">
                <label @click="reset()" for="createPrograms" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal2()">Submit</label>
            </div>
        </div>
    </div>

    <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Add Program</div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this program?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal2()">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="addProgram()">Continue</label>
            </div>
        </div>
    </div>
    <input type="checkbox" id="editPrograms" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="flex flex-row justify-between">
                <div>
                    <div class="font-semibold text-md">EDIT PROGRAMS</div>
                    <p class="py-2 text-sm">
                        Input the Program Name and the Designated Discipline.
                    </p>
                </div>
            </div>
            <form v-on:submit.prevent="submit">
                <div>
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Program Name:</label>
                    <div class="flex flex-row">
                        <input type="text" id="base-input" :class="{ 'input-error': validationStatus(v$.editProgramName) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="editProgramName" />
                    </div>
                </div>
                <div>
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                    <select class="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="selectedDiscipline">
                        <option v-for="discipline in disciplines" :key="discipline" :value="{specDisc: discipline.SpecDiscCode, majorDisc: discipline.MajorDisc}">
                            {{ discipline.name }}
                        </option>
                    </select>
                </div>
            </form>
            <div class="modal-action">
                <label for="editPrograms" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="editProgram()">Submit</label>
            </div>
        </div>
    </div>
    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Program</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to delete this
                program?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteProgram()">Delete</label>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
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
// var dataNumber = 10;
// var page = 0;
// import NoDataAvail from "@/components//NoDataAvail.vue";
export default {
    name: "DisciplinesView",
    components: {
        // NoDataAvail,
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            deleteProg: '',
            showModal1: false,
            showModal2: false,
            showModal3: false,
            v$: useVuelidate(),
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "PROGRAMS",
                },
                {
                    title: "DISCIPLINES",
                },
            ],
            tables: [],
            search: "",
            disciplineName: "",
            editID: "",

            disciplines: [],
            editProgramName: "",
            selectedDiscipline: "",
            programs: [],
            editPrograms: [],
            progCounter: 0,
        };
    },
    validations() {
        return {
            disciplineName: {
                required,
            },
            editProgramName: {
                required,
            },
            programs: {
                required,
            },
        };
    },
    computed: {
        searchProgram() {
            return this.tables
                .filter((p) => {
                    return p.programName.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        addProgramName() {
            this.progCounter++;
            this.programs.push({
                id: this.progCounter,
                programName: "",
            });
        },
        reset() {
            this.programs = [];
        },
        selectedProgramDelete(id) {
            this.deleteProg = id;
        },
        removeProgram(id) {
            console.log(this.programs.length);
            for (var i = 0; i < this.programs.length; i++) {
                console.log(i, id);
                console.log(this.programs[i]);
                if (this.programs[i].id === id) {
                    console.log("true");
                    console.log(id, this.programs[i].id);
                    this.programs.splice(i, 1);
                    i--;
                }
            }
        },
        removeProgramEdit(id) {
            for (var i = 0; i < this.editPrograms.length; i++) {
                if (this.editPrograms[i].id === id) {
                    this.editPrograms.splice(i, 1);
                    i--;
                }
            }
        },

        async deleteProgram() {
            this.$refs.Spinner.show();
            const programsDel = Parse.Object.extend("Programs");
            const progDelQuery = new Parse.Query(programsDel);
            progDelQuery.equalTo("objectId", this.deleteProg);

            const programs = await progDelQuery.first();

            programs.destroy().then(
                (disc) => {
                    toast("Deleting...", {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: false,
                        position: POSITION.TOP_RIGHT,
                    });
                    setTimeout(() => {
                        document.location.reload();
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
            if (this.editProgramName == "") {
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

        async editProgramSelect(id) {
            this.editID = id;

            const programs = Parse.Object.extend("Programs");
            const queryProg = new Parse.Query(programs);
            queryProg.equalTo("objectId", this.editID);
            const progResult = await queryProg.first();

            this.editProgramName = progResult.get("programName")
            this.selectedDiscipline = progResult.get("programDiscipline")
        },
        addProgram() {
            try {
                for (var i = 0; i < this.programs.length; i++) {
                    const programs = Parse.Object.extend("Programs");
                    const newProgram = new programs();
                    newProgram.save({
                        programName: this.programs[i].programName.toUpperCase(),
                        programDiscipline: this.selectedDiscipline,
                    });
                    toast("New Program Added: " + this.programs[i].programName, {
                            type: TYPE.SUCCESS,
                            timeout: 2000,
                            position: POSITION.TOP_RIGHT,
                        }),
                        //this.$refs.Spinner.show();
                        // window.location.reload()
                        setTimeout(() => {
                            document.location.reload();
                            //this.$refs.Spinner.hide();
                        }, 2000);
                }
                //alert("New Discipline Added: " + this.atname);

            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message);
            }
            // setTimeout(
            //     function () {
            //         this.$refs.Spinner.hide();
            //     }.bind(this),
            //     2000
            // );
        },
        async editProgram() {
            try {
                const programsUpdate = Parse.Object.extend("Programs");
                const queryProgUpdate = new Parse.Query(programsUpdate);
                queryProgUpdate.equalTo("objectId", this.editID)
                const programToEdit = await queryProgUpdate.first();
                programToEdit.save({
                    programName: this.editProgramName,
                    programDiscipline: this.selectedDiscipline.specDisc,
                    programMajorDisc: this.selectedDiscipline.majorDisc
                });
                toast("Programs Updated: " + this.editID, {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
                //alert("New Discipline Added: " + this.atname);

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
        addAccessType() {
            const accessType = Parse.Object.extend("AccessTypes");
            const newAccessType = new accessType();
            try {
                newAccessType.save({
                    name: this.atname.toUpperCase(),
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
        excelDisciplines() {
            this.$router.push("/programs/upload");
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
            console.log("Hi!, You have permission to access this Page1");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            var programsData = [];
            var disciplinesNames = [];
            const disciplines = Parse.Object.extend("Disciplines");
            const query = new Parse.Query(disciplines);
            const querResult = await query.find();
            for (var i = 0; i < querResult.length; i++) {
                const discipline = querResult[i];
                for (var a = 0; a < discipline.get("specificDiscipline").length; a++) {
                    const programs = Parse.Object.extend("Programs");
                    const queryProg = new Parse.Query(programs);
                    queryProg.equalTo("programDiscipline", discipline.get("specificDiscipline")[a].SpecDiscCode);
                    const progResult = await queryProg.find();
                    for (var j = 0; j < progResult.length; j++) {
                        const prog = progResult[j];

                        programsData.push({
                            id: prog.id,
                            programName: prog.get("programName"),
                            specificDiscipline: prog.get("programDiscipline"),
                            specificDisciplineName: discipline.get("specificDiscipline")[a].SpecificDiscipline,
                        });
                    }
                    disciplinesNames.push({
                        MajorDisc: discipline.id,
                        id: discipline.get("specificDiscipline")[a].id,
                        SpecDiscCode: discipline.get("specificDiscipline")[a].SpecDiscCode,
                        name: discipline.get("specificDiscipline")[a].SpecificDiscipline,
                    })
                }

            }
            this.tables = programsData;
            this.disciplines = disciplinesNames;
            this.selectedDiscipline = {specDisc: disciplinesNames[0].SpecDiscCode, majorDisc: disciplinesNames[0].MajorDisc};
            // console.log(this.tables);
        }
    },
};
</script>

<style></style>
