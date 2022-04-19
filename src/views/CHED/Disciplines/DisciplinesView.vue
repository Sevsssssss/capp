<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="DisciplinesView" />
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
                <!-- button -->
                <div class="h-fit pr-2 pt-3 items-center">
                    <label type="button" for="createDisciplines" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add Discipline</div>
                    </label>
                </div>
                <div v-if="disciplines.length > 0" class="h-fit pr-5 pt-3 items-center">
                    <label type="button" for="createPrograms" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
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
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD A DISCIPLINE</div>
            <p class="py-2 text-sm">Input the entire name of the dicipline.</p>
            <form>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                    <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="disciplineName" />
                </div>
            </form>
            <div class="modal-action">
                <label for="createDisciplines" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal()">Submit</label>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left" >
            <div class="text-brand-darkblue font-bold label-xl">
                Add Discipline
            </div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this discipline?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal()">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="addDiscipline()">Continue</label>
            </div>
        </div>
    </div>
    <input type="checkbox" id="createPrograms" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD A PROGRAM</div>
            <p class="py-2 text-sm">Input the Program Name and the Designated Discipline.</p>
            <form>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Program Name:</label>
                    <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="atname" />
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                    <select class="select  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="selectedDiscipline">
                        <option  v-for="discipline in disciplines" :key="discipline" :value="discipline.id" >{{discipline.name}}</option>
                    </select>
                </div>
            </form>
            <div class="modal-action">
                <label for="createPrograms" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="addProgram()">Submit</label>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left" >
            <div class="text-brand-darkblue font-bold label-xl">
                Add Program
            </div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this program?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal()">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="addProgram()">Continue</label>
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
    name: "DisciplinesView",
    data() {
        return {
            showModal1: false,
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "DISCIPLINES",
                },
                {
                    title: "PROGRAMS",
                },
            ],
            tables: [],
            search: "",
            disciplineName: "",
            programs: [],
            disciplines: [],
            atname: "",
            selectedDiscipline: "",
        };
    },
    components: {NoDataAvail},
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
        validate() {
            return this.showModal1;
        },
        modal(){
            this.showModal1 = !this.showModal1;
        },
        addDiscipline() {
            const disciplines = Parse.Object.extend("Disciplines");
            const newDiscipline = new disciplines;

            try {
                newDiscipline.save({
                    disciplineName: this.disciplineName,
                });
                alert("New Discipline Added: " + newDiscipline.id)
            } catch (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        },
        addProgram(){
            const programs = Parse.Object.extend("Programs");
            const newProgram = new programs;

            try {
                newProgram.save({
                    programName: this.atname,
                    programDiscipline: this.selectedDiscipline,
                });
                alert("New Discipline Added: " + this.atname)
            } catch (error) {
                alert("Error: " + error.code + " " + error.message);
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
    },
    mounted: async function () {

        var disciplineTable = [];
        var disciplinesNames = [];

        const disciplines = Parse.Object.extend("Disciplines");
        const query = new Parse.Query(disciplines);

        const querResult = await query.find();
        for (var i = 0; i < querResult.length; i++) {
            const discipline = querResult[i];
            
            disciplineTable.push({
                Name: discipline.get("disciplineName"),
                Programs: [
                    "BS IT",
                    "BS CS"
                ],
            });
            disciplinesNames.push({
                id: discipline.id,
                name: discipline.get("disciplineName"),
            });
        }
        this.disciplines = disciplinesNames;
        this.tables = disciplineTable;
        // console.log(this.tables);
    },
};
</script>

<style></style>
