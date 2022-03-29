<template>
<div class="" style="padding: 10px">
    <DataCards :datas="datas" />
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="top-row flex flex-row" style="justify-content: space-between">
            <TableTopLeft />

            <div class="app-right-side flex flex-row">
                <button class="
                btn btn-sm
                bg-brand-darkblue
                hover:bg-brand-blue
                border-none
                p-2
              ">
                    All
                </button>
                <button class="
                btn btn-sm
                bg-brand-darkblue
                hover:bg-brand-blue
                border-none
                p-2
              ">
                    Approval
                </button>
                <button class="
                btn btn-sm
                bg-brand-darkblue
                hover:bg-brand-blue
                border-none
                p-2
              ">
                    Approved
                </button>
                <button class="
                btn btn-sm
                text-grey-200
                bg-grey-500
                hover:text-state-100 hover:bg-grey-500
                border-none
                p-2
              ">
                    Revision
                </button>
            </div>
        </div>
        <table class="
          table-normal
          w-full
          bg-brand-white
          shadow-lg
          rounded-lg
          text-left
        ">
            <!-- head-body -->
            <thead class="bg-grey-500">
                <tr class="">
                    <th class="font-semibold text-grey-200" v-for="header in headers" :key="header">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>

            <tbody class="">
                <!-- row 1 -->
                <tr class="" v-for="table in tables" :key="table">
                    <th class="">{{ table.rep }}</th>
                    <td class="font-normal">{{ table.email }}</td>
                    <td>
                        <div class="">
                            <div class="font-semibold text-grey-300">
                                {{ table.HeiName }}
                            </div>
                            <div class="font-normal">{{ table.address }}</div>
                        </div>
                    </td>
                    <td class="font-normal">{{ table.type }}</td>
                    <td class="font-normal">{{ table.program }}</td>
                    <td class="font-normal">
                        <button class="btn btn-sm p-2 font-normal">
                            {{ table.status }}
                        </button>
                    </td>
                    <td>
                        <div class="flex flex-row">
                            <a class="
                    link link-primary
                    hover:text-brand-darkblue
                    text-brand-blue
                    pr-2
                  ">view</a>
                        </div>
                    </td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <th class="font-normal text-sm">TOTAL HEI: 40/100</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                        <div class="flex flex-row justify-center items-center">
                            <div class="font-normal text-sm">Rows per page: 10</div>
                            <div class="text-grey-200 hover:text-brand-blue">
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                                </svg>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="
                  flex flex-row
                  justify-center
                  items-center
                  font-normal
                  text-sm
                ">
                            <p>1-10 of 276</p>
                            <div class="text-grey-200 hover:text-brand-blue">
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                </svg>
                            </div>
                            <div class="text-grey-200 hover:text-brand-blue">
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
</template>

<script>
import DataCards from "@/components//DataCards.vue";
import TableTopLeft from "@/components//TableTopLeft.vue";

export default {
    name: "ApplicationView",
    data() {
        return {
            headers: [{
                    title: "REPRESENTATIVE",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "HEI",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "PROGRAM",
                },
                {
                    title: "STATUS",
                },
                {
                    title: "ACTION",
                },
            ],

            datas: [{
                    title: "FOR APPROVAL",
                    num: 300,
                    color: "orange",
                },
                {
                    title: "FOR REVISION",
                    num: 300,
                    color: "blue",
                },
                {
                    title: "FOR ISSUANCE",
                    num: 300,
                    color: "violet",
                },
                {
                    title: "FOR EVALUATION",
                    num: 300,
                    color: "green",
                },
                {
                    title: "FOR COMPLETION",
                    num: 300,
                    color: "pink",
                },
            ],
            tables: [{
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    status: "APPROVAL",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    status: "APPROVAL",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    status: "APPROVAL",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    status: "APPROVAL",
                },
                {
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    status: "APPROVAL",
                },
            ],
        };
    },
    components: {
        DataCards,
        TableTopLeft,
    },
};
</script>

<style>
.app-data {
    text-align: left;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    align-items: center;
}

.app-label {
    padding-left: 10px;
    font-size: 14px;
    line-height: 14px;
    text-align: start;
    vertical-align: middle;
    color: #8fa0b9;
    display: block;
}

.app-right-side {
    width: 350px;
    align-self: center;
    justify-content: space-evenly;
    padding: 10px;
}
</style>
