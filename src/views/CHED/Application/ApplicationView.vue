<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="ApplicationView"/>
</div>
<div v-else class="" style="padding: 10px">
    <DataCards :datas="datas" /> <!-- component for showing the cards with the datas for application -->
    <div class="m-3">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="flex flex-row justify-between">
                <!-- Table -->
                <TableTopLeft></TableTopLeft>
                <!-- Sort -->
                <div class="dropdown flex flex-row">
                    <select class="select select-ghost select-sm w-full max-w-xs border-none" style="outline: none">
                        <option selected>All</option>
                        <option>For Approval</option>
                        <option>For Revision</option>
                        <option>For Evaluation</option>
                        <option>For Issuance</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                            {{header.title}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="table in tables" :key="table" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4">
                            <div class="">
                                <div class="font-semibold text-grey-300">
                                    {{ table.HeiName }}
                                </div>
                                <div class="font-normal">{{ table.address }}</div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            {{table.type}}
                        </td>
                        <td class="px-6 py-4">
                            {{table.program}}
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {{table.dateApplied}}
                        </th>
                        <td class="px-6 py-4">
                            <!-- :class="'homeIcon.' + data.color" -->
                            <div v-if="table.status === 'FOR APPROVAL'" class="btn-sm1 p-2 font-normal approval">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR REVISION'" class="btn-sm1 p-2 font-normal revision">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR EVALUATION'" class="btn-sm1 p-2 font-normal evaluation">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR ISSUANCE'" class="btn-sm1 p-2 font-normal issuance">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'COMPLETED'" class="btn-sm1 p-2 font-normal completed">
                                {{ table.status }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a v-if="table.status === 'COMPLETED'" @click="!!goedit()"></a>
                            <router-link :to="{ 
                            name: 'StatusApplication', 
                            params: { 
                                id: table.id, 
                                HeiName: table.HeiName, 
                                type: table.type, 
                                status: table.status,
                                dateApplied: table.dateApplied
                                }}">
                                <a v-if="statusChecker(table.status)" href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                            </router-link>

                        </td>
                    </tr>
                </tbody>
            </table>
           
        </div>
         <!-- Footer -->
            <div class="table-footer flex flex-row space-y-4 justify-between">
                <div class="flex flex-row center">
                    <span class="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">5</span> of <span class="font-semibold text-gray-900 dark:text-white">100</span> Entries
                    </span>
                </div>
                <div class="p-2">
                    <div class="btn-group">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
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
                                <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
</div>
</template>
<script>
import TableTopLeft from "@/components//TableTopLeft.vue";
import DataCards from "@/components//DataCards.vue";
import NoDataAvail from "@/components//NoDataAvail.vue";
export default {
    name: "ApplicationView",
    components: {
        DataCards,
        NoDataAvail,
        TableTopLeft,
    },
    data() {
        return {
            headers: [
                {title: "HEI",},
                {title: "TYPE",},
                {title: "PROGRAM",},
                {title: "DATE APPLIED",},
                {title: "STATUS",},
                {title: "ACTION",},
            ],

            datas: [
                {
                    title: "FOR APPROVAL",
                    num: 300,
                    color: "orange",
                },
                {
                    title: "FOR REVISION",
                    num: 200,
                    color: "blue",
                },
                {
                    title: "FOR ISSUANCE",
                    num: 120,
                    color: "violet",
                },
                {
                    title: "FOR EVALUATION",
                    num: 123,
                    color: "green",
                },
                {
                    title: "COMPLETED",
                    num: 12,
                    color: "pink",
                },
            ],
            tables: [{
                    id: 1,
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR APPROVAL",
                },
                {
                    id: 2,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Bicol University",
                    address: "Legazpi City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR REVISION",
                },
                {
                    id: 3,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Catanduanes State University",
                    address: "Virac",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR EVALUATION",
                },
                {
                    id: 3,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Aquinas University of Legazpi",
                    address: "Legazpi City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR ISSUANCE",
                },
                {
                    id: 4,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Universidad de Sta. Isabel",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "COMPLETED",
                },
            ],
        };
    },
    methods: {
        statusChecker(status) {
            if (status != "COMPLETED") {
                return true;
            }
        }
    },
    
};
</script>

<style>

</style>
