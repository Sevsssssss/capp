<template>
<div class="" style="padding: 10px">

    <DataCards :datas="datas" />

    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="top-row flex flex-row" style="justify-content: space-between">
            <div class="left-side flex flex-row">
                <TableTopLeft />
            </div>
            <div class="flex flex-row">
                <div class="month-sort flex flex-row">
                    <select class="select select-ghost select-sm w-full max-w-xs" style="outline: none">
                        <option disabled selected>Sort by type</option>
                        <option>Private</option>
                        <option>State Univeristies</option>
                        <option>Local Universities</option>
                        <option>Others</option>
                    </select>
                </div>
                <button @click="addHei()" class="
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
                        <div class="btn-text">Add HEI</div>
                    </div>
                </button>
            </div>
        </div>
        <DataTables :headers="headers" :tables="tables" />
    </div>
</div>
</template>

<script>
import DataCards from "@/components//DataCards.vue";
import TableTopLeft from "@/components//TableTopLeft.vue";
import DataTables from "@/components//DataTables.vue";

export default {
    name: "HeiView",
    data() {
        return {
            columns: [{
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Age',
                    field: 'age',
                    type: 'number',
                },
                {
                    label: 'Created On',
                    field: 'createdAt',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'MMM do yy',
                },
                {
                    label: 'Percent',
                    field: 'score',
                    type: 'percentage',
                },
            ],
            rows: [{
                    id: 1,
                    name: "John",
                    age: 20,
                    createdAt: '',
                    score: 0.03343
                },
                {
                    id: 2,
                    name: "Jane",
                    age: 24,
                    createdAt: '2011-10-31',
                    score: 0.03343
                },
                {
                    id: 3,
                    name: "Susan",
                    age: 16,
                    createdAt: '2011-10-30',
                    score: 0.03343
                },
                {
                    id: 4,
                    name: "Chris",
                    age: 55,
                    createdAt: '2011-10-11',
                    score: 0.03343
                },
                {
                    id: 5,
                    name: "Dan",
                    age: 40,
                    createdAt: '2011-10-21',
                    score: 0.03343
                },
                {
                    id: 6,
                    name: "John",
                    age: 20,
                    createdAt: '2011-10-31',
                    score: 0.03343
                },
            ],

            headers: [{
                    title: "INSTITUTIONAL CODE",
                },
                {
                    title: "HEI NAME",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "ACTION",
                },
            ],
            datas: [{
                    title: "STATE UNIVERSITIES AND COLLEGES",
                    num: 46,
                    color: "orange",
                },
                {
                    title: "LOCAL UNIVERSITIES AND COLLEGES",
                    num: 23,
                    color: "blue",
                },
                {
                    title: "PRIVATE COLLEGES",
                    num: 57,
                    color: "violet",
                },
                {
                    title: "OTHER GOVERNMENT SCHOOLS",
                    num: 23,
                    color: "green",
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
    components: {
        DataCards,
        TableTopLeft,
        DataTables,
    },
    methods: {
        addHei() {
            this.$router.push("/hei/add");
        },
    },
};
</script>

<style>


.search-container {
    height: 45px;
    width: fit-content;
    border-radius: 5px;
    padding: 10px 10px;
    display: flex;
    background: rgba(55, 63, 65, 0.051);
    align-self: center;
}

.search-container .search-input {
    background: transparent;
    outline: none;
    height: 25px;
    width: 300px;
    font-weight: 500;
    font-size: 16px;
    align-self: center;
    padding: 0;
}

.search-btn {
    fill: #373f41;
    align-self: center;
}


.date-sort {
    width: 170px;
    align-self: center;
    justify-content: space-evenly;
}

.month-sort {
    width: 130px;
    align-self: center;
    justify-content: center;
}

.btn-text {
    align-self: center;
}

.add-hei {
    padding: 5px;
}

.add-hei-content {
    width: 170px;
    justify-content: space-evenly;
}



.sort-btn {
    align-items: center;
}

.hei-table-head {
    font-size: 12px;
}
</style>
