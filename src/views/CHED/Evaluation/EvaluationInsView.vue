<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="EvalInstView" />
</div>
<div v-else class="p-3">
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table header -->
        <div class="flex flex-row justify-between items-center">
            <!-- Search -->
            <div class="flex space-x-4 pl-5 py-4">
                <div class="">
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
            <!-- button -->
            <div class="h-fit pr-5 pt-3 items-center">
                <button @click="addEvalIns()" type="button" class="btn-table">
                    <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                    </svg>
                    <div class="pl-2">Add Evaluation</div>
                </button>
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
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b" v-for="table in searchEval" :key="table">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            {{ table.programName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ table.description }}
                        </td>
                        <td class="px-6 py-4 text-right ">
                           <div class="flex space-x-4 items-end justify-end">
                            <router-link v-if="table && table.id" :to="{
                                name: 'EvalFileView',
                                params: {
                                id: table.id,
                                },
                            }">
                                <a href="#" class="font-medium text-blue-600 hover:underline">View</a>
                            </router-link>

                            <router-link v-if="table && table.id" :to="{
                                name: 'EditEvalInstView',
                                params: {
                                id: table.id,
                                },
                            }">
                                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                            </router-link>
                             <div>
                                    <label for="deleteFunc" class="hover:text-brand-red/60" @click="selectedEvalInst(table.id)">
                                        <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                        </svg>
                                    </label>
                                </div>
                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="searchEval.length == 0" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, the keyword "{{search}}" cannot be found in the database.
            </div>
            <!-- Table Footer -->
            <div class="table-footer flex flex-row justify-between">
                <div class="flex flex-row pl-4 justify-center items-center">
                    <span class="text-sm text-gray-700">
                        Showing
                        <span class="font-semibold text-gray-900">{{totalEntries > 0 ?
                1 + numPerPage * currentpage: 0
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
                                <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
            <input type="checkbox" id="deleteFunc" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative rounded-md text-left">
                    <div class="font-semibold text-md">Delete Evaluation Instrument</div>
                    <p class="py-2 text-sm">
                        This action cannot be undone. Are you sure you want to delete this evaluation instrument?
                    </p>
                    <div class="modal-action">
                        <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                        <label for="deleteFunc" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteEval()">Delete</label>
                    </div>
                </div>
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
const toast = useToast();
import NoDataAvail from "@/components//NoDataAvail.vue";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";

export default {
    name: "EvaluationInsView",
    data() {
        return {
            currentpage: 0,
            numPerPage: 10,
            search: "",
            headers: [{
                    title: "PROGRAM NAME",
                },
                {
                    title: "EVALUATION FORM NAME",
                },
            ],

            tables: [],
            evalInsID: "",
        };
    },
    components: {
        NoDataAvail,
        VueInstantLoadingSpinner,
    },
    computed: {
        //For Search Functionality
        searchEval() {
            if (this.search) {
                return this.tables.filter((item) => {
                    return this.search
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.description.toLowerCase().includes(v));
                });
            } else {
                return this.tables;
            }
        },

    },
    methods: {
        addEvalIns() {
            this.$router.push("/evaluationins/add");
        },

        //Select Evaluation Instrument to delete
        selectedEvalInst(id) {
            this.evalInsID = id;
        },

        //For Deletion of Evaluation Instrument
        async deleteEval() {
            this.$refs.Spinner.show();

            //Query Evaluation Instrument
            const EvalInstruments = Parse.Object.extend("EvaluationInstruments");
            const evalQueryDel = new Parse.Query(EvalInstruments);
            evalQueryDel.equalTo("objectId", this.evalInsID);
            const evalDel = await evalQueryDel.first();

            //Delete Evaluation Instrument
            evalDel.destroy().then((eval_inst) => {
                    toast("Deleting Evaluation Instrument: " + eval_inst.id, {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: false,
                        position: POSITION.TOP_RIGHT,
                    });
                    setTimeout(() => {
                        document.location.reload()
                    }, 3000);
                }, (error) => {
                toast("Error:" + error.message, {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log("Error: " + error)
                },
                setTimeout(
                    function () {
                        this.$refs.Spinner.hide();
                    }.bind(this),
                    3000
                ),
                
            );

        },

        //For Traversal of pages in table
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

            //Query all Evaluation Instruments
            var storedEvalInstruments = [];
            const instruments = Parse.Object.extend("EvaluationInstruments");
            const evalInsQuery = new Parse.Query(instruments);
            const evalInsResult = await evalInsQuery.find();

            for (var i = 0; i < evalInsResult.length; i++) {
                const evalInst = evalInsResult[i];

                //Query the program of the application
                const programs = Parse.Object.extend("Programs");
                const programQuery = new Parse.Query(programs);
                programQuery.equalTo("objectId", evalInst.get("evaluationFormProgram"));

                const program = await programQuery.first();

                storedEvalInstruments.push({
                    id: evalInst.id,
                    programName: program.get("programName"),
                    description: evalInst.get("evaluationFormName"),
                });
            }
            this.totalEntries = evalInsResult.length;
            this.tables = storedEvalInstruments;
        }
    },
};
</script>

<style></style>
