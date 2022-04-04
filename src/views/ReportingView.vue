<template>
<div class="m-3">
    <div class="flex flex-row justify-between px-2">
        <div class="dropdown">
            <label tabindex="0" class="btn m-1 text-grey-200 bg-transparent hover:bg-transparent hover:text-blue-100 hover:border-blue-100">Application</label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>HEI ACCOUNT</a></li>
                <li><a>RQAT ACCOUNT</a></li>
                <li><a>EMPLOYEES</a></li>
            </ul>
        </div>
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn m-1  border-none bg-brand-darkblue hover:bg-blue-100">Export</label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>PDF</a></li>
                <li><a>EXEL</a></li>
            </ul>
        </div>
    </div>
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px" onload="getHEI()">
        <div class="top-row flex flex-row" style="justify-content: space-between">
            <div class="left-side flex flex-row">
                <div class="search-container">
                    <input type="search" name="search" placeholder="Search" class="search-input input rounded-lg text-sm focus:outline-none" v-model="search" />
                    <a href="#" class="search-btn">
                        <div class="search_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
            <div class="dropdown flex flex-row">
                <select class="select select-ghost select-sm w-full max-w-xs" style="outline: none" >
                    <option selected>All</option>
                    <option>Approved</option>
                    <option>For Revision</option>
                    <option>For Evaluation</option>
                    <option>Completed</option>
                </select>
            </div>
        </div>
        <table class="table-normal w-full bg-brand-white shadow-lg rounded-lg text-left">
            <!-- head -->
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
    components: {},
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
