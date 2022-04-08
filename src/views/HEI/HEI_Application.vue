<template>
<div class="m-3">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex flex-row">
            <div class="p-4">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
                </div>
            </div>
            <!-- Sort -->
            <div class="dropdown flex flex-row">
                <select class="select select-ghost select-sm w-full max-w-xs border-none" style="outline: none">
                    <option selected>All</option>
                    <option>Approved</option>
                    <option>For Revision</option>
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
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in tables" :key="table" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {{table.dateApplied}}
                    </th>
                    <td class="px-6 py-4">
                        <div class="">
                            <div class="font-semibold text-grey-300">
                                {{ table.rep }}
                            </div>
                            <div class="font-normal">{{ table.address }}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        {{table.type}}
                    </td>
                    <td class="px-6 py-4">
                        <div v-if="table.status === 'FOR APPROVAL'" class="btn-sm1 p-2 font-normal approval">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'FOR REVISION'" class="btn-sm1 p-2 font-normal revision">
                            {{ table.status }}
                        </div>
                        <!-- <div v-else-if="table.status === 'FOR EVALUATION'" class="btn-sm1 p-2 font-normal evaluation">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'FOR ISSUANCE'" class="btn-sm1 p-2 font-normal issuance">
                            {{ table.status }}
                        </div> -->
                        <div v-else-if="table.status === 'COMPLETED'" class="btn-sm1 p-2 font-normal completed">
                            {{ table.status }}
                        </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <a v-if="table.status === 'COMPLETED'"></a>
                        <router-link :to="{ 
                            name: 'EditHEIapplication', 
                            params: { 
                                id: table.id, 
                                HeiName: table.HeiName, 
                                type: table.type, 
                                status: table.status,
                                dateApplied: table.dateApplied
                                }}">
                            <a v-if="statusChecker(table.status)" href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </router-link>

                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Footer -->
        <div class="table-footer flex flex-row" style="justify-content: space-between;">
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
export default {
    name: "ApplicationView",
    data() {
        return {
            headers: [{
                    title: "DATE APPLIED",
                },
                {
                    title: "REPRESENTATIVE",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "STATUS",
                },
            ],
            tables: [{
                    id: 1,
                    HeiName: "Bicol University",
                    address: "Naga City",
                    type: "Initial Offering",
                    rep: "San Goku",
                    email: "aadnu@adnu.edu.ph",
                    program: "BSIT",
                    dateApplied: "June 1, 2015",
                    status: "FOR APPROVAL",
                },
                {
                    id: 2,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 2, 2015",
                    status: "FOR APPROVAL",
                },
                {
                    id: 3,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Universidad de Sta. Isabel",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 3, 2015",
                    status: "FOR APPROVAL",
                },
                {
                    id: 4,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Aquinas University of Legazpi",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 4, 2015",
                    status: "FOR REVISION",
                },
                {
                    id: 5,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "La Consolacion College",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 5, 2015",
                    status: "COMPLETED",
                },
            ],
        };
    },
    methods: {
        statusChecker(status) {
            if (status != "COMPLETED" && status != "FOR EVALUATION" && status != "FOR ISSUANCE") {
                return true;
            }
        }
    }
};
</script>

<style>

</style>
