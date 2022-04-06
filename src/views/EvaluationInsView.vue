<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="EvalInstView" />
</div>
<div v-else class="" style="padding: 10px">
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="top-row flex flex-row" style="justify-content: space-between;">
            <TableTopLeft />
            <div class="flex flex-row">
                <button @click="addEvalIns()" class="
              btn btn-md
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            ">
                    <div class="flex flex-row">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="btn-text">Add Evalutation Ins.</div>
                    </div>
                </button>
            </div>
        </div>

        <!-- table -->
        <table class="hei-table table-normal w-full">
            <!-- head-body -->
            <tbody class="hei-table">
                <tr class="hei-table bg-grey-500">
                    <th class="font-semibold text-grey-200" v-for="header in headers" :key="header">{{ header.title }}</th>
                </tr>
                <!-- row 1 -->
                <tr class="" v-for="table in tables" :key="table">
                    <th>{{ table.cmoNo }}</th>
                    <td>
                        <div class="column">
                            <div class="hei-name">{{ table.description }}</div>
                        </div>
                    </td>
                    <td>
                        <div class="flex flex-row center">
                            <a class="
                            link link-primary
                            hover:text-brand-darkblue
                            text-brand-blue
                            pr-2" @click="viewEvalIns()">
                                view
                            </a>
                            <div>
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                </svg>
                            </div>
                            <div>
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </div>
                        </div>
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
                {
                    title: "ACTION"
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
