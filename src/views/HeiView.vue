<template>
<div class="" style="padding: 10px">
    <div class="grid grid-cols-4">
        <div class="hei-cont space-x-3 bg-brand-white shadow-lg rounded-lg m-3 p-6" v-for="data in datas" :key="data">
            <div class="flex flex-col justify-between text-left">
                <div class="flex flex-row">
                    <div class="pr-2">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                        </svg>
                    </div>
                    <div class="label-text font-semibold">{{ data.title }}</div>
                </div>
                <div class="body-text">{{ data.num }}</div>
            </div>
        </div>
    </div>
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <table class="hei-table table-normal w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th>
                        <div class="form-control">
                            <div class="input-group">
                                <input type="text" placeholder="Search…" class="input input-bordered" />
                                <button class="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </th>
                    <th class="flex">
                        <button @click="addHei()" class="btn" style="width: 100px; height: 10px">
                            <div class="flex flex-row">
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,7L7,12H10V16H14V12H17L12,7Z" />
                                </svg>
                                Add HEI
                            </div>
                        </button>
                    </th>
                </tr>
            </thead>
            <!-- head-body -->
            <thead class="hei-table">
                <tr class="hei-table">
                    <th v-for="header in headers" :key="header">{{header.title}}</th>
                </tr>
            </thead>
            <tbody class="hei-table">
                <!-- row 1 -->
                <tr class="" v-for="table in tables" :key="table">
                    <th>{{ table.InstNo }}</th>
                    <td>
                        <div class="column">
                            <div class="hei-name">{{ table.HeiName }}</div>
                            <div class="hei-address">{{ table.address }}</div>
                        </div>
                    </td>
                    <td>{{ table.type }}</td>
                    <td>{{ table.email }}</td>
                    <td>
                        <div class="flex flex-row">
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
            <tfoot>
                <tr>
                    <th>TOTAL HEI: 40/100</th>
                    <th></th>
                    <th></th>
                    <th>
                        <div class="flex flex-row">
                            <div class="text">Rows per page: 10</div>
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                            </svg>
                        </div>
                    </th>
                    <th>
                        <div class="flex flex-row">
                            1-10 of 276
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
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
    name: "HeiView",
    data() {
        return {
            headers: [{
                    title: "INSTITUTIONAL CODE"
                },
                {
                    title: "HEI NAME"
                },
                {
                    title: "TYPE"
                },
                {
                    title: "EMAIL"
                },
                {
                    title: "ACTION"
                },
            ],
            datas: [{
                    title: "STATE UNIVERSITIES AND COLLEGES",
                    num: 46,
                },
                {
                    title: "LOCAL UNIVERSITIES AND COLLEGES",
                    num: 23,
                },
                {
                    title: "PRIVATE COLLEGES",
                    num: 57,
                },
                {
                    title: "OTHER GOVERNMENT SCHOOLS",
                    num: 23,
                },
            ],
            tables: [{
                    InstNo: "56543",
                    HeiName: "Ateneo De Naga University",
                    address: "Naga City",
                    type: "Private Institution",
                    email: "ateneodenaga@gbox.adnu.edu.ph",
                },
                {
                    InstNo: "20746",
                    HeiName: "Bicol University",
                    address: "Legazpi City",
                    type: "State University",
                    email: "bu@bicol-u.edu.ph",
                },
                {
                    InstNo: "12865",
                    HeiName: "Catanduanes State University",
                    address: "Virac",
                    type: "State University",
                    email: "areneo@gbox.adnu.edu.ph",
                },
                {
                    InstNo: "95848",
                    HeiName: "Aquinas University of Legazpi",
                    address: "Legazpi City",
                    type: "Private",
                    email: "ust@ust-legazpi.edu.ph",
                },
                {
                    InstNo: "56543",
                    HeiName: "Camarines Norte State College",
                    address: "Daet",
                    type: "State College",
                    email: "cnsc@cnsc.edu.ph",
                },
            ],
        };
    },
    components: {},
    methods: {
        addHei() {
            this.$router.push("/hei/add");
        },
    },
};
</script>

<style>


.hei-address {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    letter-spacing: 0.05em;

    color: #919191;
}

.hei-table {
    text-align: left;
}
</style>
