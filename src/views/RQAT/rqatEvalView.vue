<template>
<div v-if="!table.length" style="height: 100%">
    <NoDataAvail names="ApplicationView" />
</div>
<div v-else class="px-3 py-2">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="header in head" :key="header">
                        {{header.title}}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tables in table" :key="tables" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {{tables.program}}
                    </th>
                    <td class="px-6 py-4">
                         {{tables.HeiName}}
                    </td>
                    <td class="px-6 py-4">
                         {{tables.address}}
                    </td>
                    <td class="px-6 py-4">
                         {{tables.rep}}
                    </td>
                     <td class="px-6 py-4">
                         {{tables.email}}
                    </td>
                    <td class="px-6 py-4 text-right flex justify-end">
                        <button class="btn-table rounded-md" @click="evaluate()"> Evaluate </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- <table class="table rqat-table w-full">
        <tbody>
            <tr>
                <th>Program:</th>
                <td>{{ table.program }}</td>
            </tr>

            <tr>
                <th>HEI Name</th>
                <td>{{ table.HeiName }}</td>
            </tr>

            <tr>
                <th>Address</th>
                <td>{{ table.address }}</td>
            </tr>
            <tr>
                <th>Representative</th>
                <td>{{ table.rep }}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{{ table. email }}</td>
            </tr>
        </tbody>
    </table>

    <button @click="evaluate()" type="button" class="btn-table center">
        <svg style="fill:white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm-.497 11l5.656-5.657-1.414-1.414-4.242 4.243L6.38 13.05l-1.414 1.414L8.503 18z" /></svg>
        <div class="pl-2">EVALUATE</div>
    </button> -->

</div>
</template>

<script>
import NoDataAvail from "@/components//NoDataAvail.vue";
import Parse from 'parse'
export default {
    name: "rqatEvalView",
    components: {
        NoDataAvail,
    },
    data() {
        return {
            search: "",
            head: [{
                    title: "PROGRAM",
                },
                {
                    title: "HEI NAME",
                },
                {
                    title: "ADDRESS",
                },
                {
                    title: "REPRESENTATIVE",
                },
                {
                    title: "EMAIL",
                },
            ],
            table: [{
                    id: 1,
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Initial Offering",
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
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
                    dateApplied: "2022-06-10",
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
                    dateApplied: "2022-06-10",
                    status: "FOR EVALUATION",
                },
                {
                    id: 4,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Aquinas University of Legazpi",
                    address: "Legazpi City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "FOR ISSUANCE",
                },
                {
                    id: 5,
                    rep: "Aiden Gibbs",
                    email: "aadnu@adnu.edu.ph",
                    HeiName: "Universidad de Sta. Isabel",
                    address: "Naga City",
                    type: "Initial Offering",
                    program: "BSIT",
                    dateApplied: "2022-06-10",
                    status: "COMPLETED",
                },
            ],
        };
    },
    computed: {
        // searchApplication() {
        //     if (this.search) {
        //         return this.tables.filter((item) => {
        //             return this.search
        //                 .toLowerCase()
        //                 .split(" ")
        //                 .every((v) => item.HeiName.toLowerCase().includes(v));
        //         });
        //     } else {
        //         return this.tables;
        //     }
        // },
    },
    methods: {
        evaluate() {
            this.$router.push("/assignments/");
        }
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("name", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === '/assignments') {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
            console.log("Hello");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        }
    },
};
</script>

<style></style>
