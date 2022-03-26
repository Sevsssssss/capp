<template>
<div class="m-3">
    <table class="m-3 table-normal w-full bg-brand-white shadow-lg rounded-lg text-left">
        <!-- head -->
        <thead>
            <tr>
                <th>
                    <div class="form-control">
                        <div class="input-group">
                            <input type="text" placeholder="Search…" class="input input-bordered" />
                            <button class="btn btn-square bg-brand-darkblue hover:bg-blue-100 border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </th>
                <th></th>
                 <th></th>
                <div class="flex flex-row pt-2 ">
                <th class="absolute" style="right: 20rem">
                    <button class="btn btn-sm bg-brand-darkblue hover:bg-brand-blue border-none p-2">All</button>
                </th>
                <th class="absolute" style="right: 13.6rem">
                    <button class="btn btn-sm bg-brand-darkblue hover:bg-brand-blue border-none p-2">Approval</button>
                </th>
                 <th class="absolute" style="right: 7rem">
                    <button class="btn btn-sm bg-brand-darkblue hover:bg-brand-blue border-none p-2">Approved</button>
                </th>
                 <th class="absolute" style="right: 1rem">
                    <button class="btn btn-sm text-grey-200 bg-grey-500 hover:text-state-100 hover:bg-grey-500 border-none p-2">Revision</button>
                </th>
                </div>
            </tr>
        </thead>
        <!-- head-body -->
        <thead class="bg-grey-500">
            <tr class="">
                <th class="font-semibold text-grey-200" v-for="header in headers" :key="header">
                    {{header.title}}
                </th>
            </tr>
        </thead>

        <tbody class="">
            <!-- row 1 -->
            <tr class="" v-for="table in tables" :key="table">
                <th class="">{{ table.rep }}</th>
                <td class="font-normal ">{{ table.email }}</td>
                <td>
                    <div class="">
                        <div class="font-semibold text-grey-300">{{ table.HeiName }}</div>
                        <div class="font-normal">{{ table.address }}</div>
                    </div>
                </td>
                <td class="font-normal ">{{ table.type }}</td>
                <td class="font-normal ">{{ table.program }}</td>
                <td class="font-normal ">
                 
                    <button class="btn btn-sm p-2 font-normal"> {{ table.status }}</button>
                  </td>
                <td>
                    <div class="flex flex-row ">
                        <a class="link link-primary hover:text-brand-darkblue text-brand-blue pr-2">view</a>
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
                    <div class="flex flex-row justify-center items-center font-normal text-sm">
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
</template>

<script>
export default {
    name: "ApplicationView",
    data() {
        return {
            headers: [{
                    title: "REPRESENTATIVE"
                },
                {
                    title: "EMAIL"
                },
                {
                    title: "HEI"
                },
                {
                    title: "TYPE"
                },
                {
                    title: "PROGRAM"
                },
                {
                    title: "STATUS"
                },
                {
                    title: "ACTION"
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
</style>
