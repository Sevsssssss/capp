<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="ApplicationView" />
</div>
<div v-else class="px-3 py-4">
    <!-- component for showing the cards with the datas for application -->
    <!-- Filter -->
    <div class="flex flex-row justify-between">
        <!-- sort -->
        <div class="month-sort flex flex-row pl-2">
            <select class="border-grey-400 border-2 font-normal rounded-md select select-ghost select-md w-full max-w-xs" style="outline: none" id="application_sort">
                <option disabled selected>Sort by type</option>
                <option>For Approval</option>
                <option>For Revision</option>
                <option>For Issuance</option>
                <option>For Evaluation</option>
                <option>Completed</option>
            </select>
        </div>
        <div class="month-sort flex flex-row pr-2">
            <select class="border-grey-400 border-2 font-normal rounded-md select select-ghost select-md w-full max-w-xs" style="outline: none" id="application_sort">
                <option disabled selected>Export</option>
                <option>PDF</option>
                <option>EXEL</option>
                <option>DOC</option>
            </select>
        </div>
    </div>
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table body -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                            {{ header.title }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">View</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="table in tables" :key="table">
                        <td class="px-6 py-4">
                            <div class="">
                                <div class="font-semibold text-grey-300">
                                    {{ table.HeiName }}
                                </div>
                                <div class="font-normal">{{ table.address }}</div>
                            </div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {{ table.type }}
                        </td>

                        <td class="px-6 py-4">
                            {{ table.program }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.dateApplied }}
                        </td>
                        <td class="px-6 py-4">
                            <!-- :class="'homeIcon.' + data.color" -->
                            <div v-if="table.status === 'FOR APPROVAL'" class="btn-sm1 rounded-md p-2 font-normal approval">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR REVISION'" class="btn-sm1 rounded-md p-2 font-normal revision">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR EVALUATION'" class="btn-sm1 rounded-md p-2 font-normal evaluation">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'FOR ISSUANCE'" class="btn-sm1 rounded-md  p-2 font-normal issuance">
                                {{ table.status }}
                            </div>
                            <div v-else-if="table.status === 'COMPLETED'" class="btn-sm1 rounded-md p-2 font-normal completed">
                                {{ table.status }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Table Footer -->
            <div class="table-footer flex flex-row justify-between">
                <div class="flex flex-row pl-4 justify-center items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span class="font-semibold text-gray-900 dark:text-white">{{1 + (numPerPage * currentpage)}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{((currentpage + 1) * numPerPage) > totalEntries ? totalEntries : (currentpage + 1) * numPerPage}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{totalEntries}}</span> Entries
                    </span>
                </div>
                <div class="p-2 pr-4">
                    <div class="btn-group">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="nextPage()">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import NoDataAvail from "@/components//NoDataAvail.vue";
export default {
    name: "ReportingView",
    data() {
        return {
            headers: [{
                    title: "HEI"
                },
                {
                    title: "TYPE"
                },
                {
                    title: "PROGRAM"
                },
                {
                    title: "DATE APPLIED"
                },
                {
                    title: "STATUS"
                },
            ],
            tables: [{
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
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR REVISION",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR EVALUATION",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "FOR ISSUANCE",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "June 8, 2015",
                    status: "COMPLETED",
                },
            ],
        };
    },
    components: {
        NoDataAvail,
    },
};
</script>

<style>

</style>
