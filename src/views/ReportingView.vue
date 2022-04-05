<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="ReportingView" />
</div>
<div v-else class="" style="padding: 10px">
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
        <!-- Table -->
        <table class="
          table-normal
          w-full
          bg-brand-white
          
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
                <!-- rows -->
                <tr class="" v-for="table in tables" :key="table">
                    <th class="">
                        <div class="">
                            <div class="font-semibold text-grey-300">
                                {{ table.HeiName }}
                            </div>
                            <div class="font-normal">{{ table.address }}</div>
                        </div>
                    </th>
                    <td class="font-normal">{{ table.type }}</td>
                    <td class="font-normal">{{ table.program }}</td>
                    <td class="font-normal">{{ table.dateApplied }}</td>
                    <td class="font-normal">
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
                    <td>
                        <div class="flex flex-row center">
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
            

        </table>
        <!-- Footer -->
        <div class="table-footer flex flex-row" style="justify-content: space-between;">
            <div class="flex flex-row center">
                    <div>Showing 11 to 20 of 58 entries</div>
                </div>
                <div class="flex flex-row">
                    <div class="btn-group">
                        <button class="btn btn-outline btn-sm-cstm hover:bg-brand-blue">«</button>
                        <button class="btn btn-outline btn-sm-cstm hover:bg-brand-blue">1</button>
                        <button class="btn btn-outline btn-sm-cstm btn-active hover:bg-brand-blue">2</button>
                        <button class="btn btn-outline btn-sm-cstm hover:bg-brand-blue">3</button>
                        <button class="btn btn-outline btn-sm-cstm hover:bg-brand-blue">4</button>
                        <button class="btn btn-outline btn-sm-cstm hover:bg-brand-blue">»</button>
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
            headers: [
                
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
                    title: "DATE APPLIED"
                },
                {
                    title: "STATUS"
                },
                {
                    title: "ACTION"
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
