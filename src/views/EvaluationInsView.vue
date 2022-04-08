<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="EvalInstView" />
</div>
<div v-else class="p-4">
    <div class="flex justify-end">
        <button  @click="addEvalIns()" type="button" class="text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Evaluation Ins.</button>
    </div>
    <div class="overflow-x-auto shadow-lg rounded-lg m-3">
        <div class="flex flex-row justify-between">
            <!-- Table -->
            <div class="pl-5">
                <TableTopLeft></TableTopLeft>
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="table in tables" :key="table">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {{ table.cmoNo }}
                        </th>
                        <td class="px-6 py-4">
                            {{ table.description }}
                        </td>
                        <td class="px-6 py-4 text-right flex space-x-2">
                            <div @click="viewEvalIns" class="hover:text-blue-500">
                                <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                </svg>
                            </div>
                            <div class="hover:text-brand-red/60">
                                <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Footer -->
    <div class="table-footer flex flex-row space-y-4" style="justify-content: space-between;">
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
</template>

<script>
import TableTopLeft from "@/components//TableTopLeft.vue";
import NoDataAvail from "@/components//NoDataAvail.vue";

export default {
    name: "EvalInstView",
    data() {
        return {
            headers: [{
                    title: "CMO"
                },
                {
                    title: "DESCRIPTION"
                },
            ],
            tables: [{
                    cmoNo: "1",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",

                },
                {
                    cmoNo: "2",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    cmoNo: "3",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    cmoNo: "4",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    cmoNo: "5",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
            ],
        };
    },
    components: {
        TableTopLeft,
        NoDataAvail,
    },
    methods: {
        addEvalIns() {
            this.$router.push("/evaluationins/add");
        },
        viewEvalIns() {
            this.$router.push("/evaluationins/view");
        }
    },
};
</script>

<style>
</style>
