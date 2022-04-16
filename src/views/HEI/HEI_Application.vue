<template>
<div class="m-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex flex-row space-x-4 pl-5 py-4">
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
            <div class="dropdown flex">
                <select class="select select-ghost select-sm w-full max-w-xs border-none" style="outline: none">
                    <option selected>All</option>
                    <option>For Approval</option>
                    <option>For Revision</option>
                    <option>Completed</option>
                </select>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                        {{ header.title }}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in tables" :key="table" class="bg-white border-b hover:bg-gray-50">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ table.dateApplied }}
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
                        {{ table.type }}
                    </td>
                    <td class="px-6 py-4">
                        <div v-if="table.status === 'FOR APPROVAL'" class="btn-sm1 p-2 font-normal approval rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'FOR REVISION'" class="btn-sm1 p-2 font-normal revision rounded-md">
                            {{ table.status }}
                        </div>
                        <!-- <div v-else-if="table.status === 'FOR EVALUATION'" class="btn-sm1 p-2 font-normal evaluation rounded-md">
                            {{ table.status }}
                        </div>
                        <div v-else-if="table.status === 'FOR ISSUANCE'" class="btn-sm1 p-2 font-normal issuance rounded-md">
                            {{ table.status }}
                        </div> -->
                        <div v-else-if="table.status === 'COMPLETED'" class="btn-sm1 p-2 font-normal completed rounded-md">
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
                    dateApplied: table.dateApplied,
                  },
                }">
                            <a v-if="statusChecker(table.status)" href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                        </router-link>
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
    </div>
    <br>
</div>
</template>

<script>
// import TableTopLeft from "@/components//TableTopLeft.vue";
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
            if (
                status != "COMPLETED" &&
                status != "FOR EVALUATION" &&
                status != "FOR ISSUANCE"
            ) {
                return true;
            }
        },
    },
};
</script>

<style></style>
