<template>
<div class="min-h-screen bg-blue-50">
    <div class="p-5 ">
        <div class="overflow-x-auto space-y-2">
          <TableTopLeft />
            <div class="form-control p-2">
                <div class="input-group">
                    <input type="text" placeholder="Search by email" class="input input-bordered" v-model="search" />
                    <button class="btn btn-square bg-brand-darkblue hover:bg-blue-100 border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>CMO</th>
                        <th>email</th>
                        <!-- <th>Action</th> -->
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="d in filteredPosts" :key="d.id">
                        <th>{{d.id}}</th>
                        <td>{{d.email}}</td>
                        <td>
                            <div class="flex flex-row">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <VueTailwindPagination :current="current" :total="total" :per-page="perPage" @page-changed="pageChange($event)" />
        </div>

    </div>
</div>
</template>

<script>
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination';
import TableTopLeft from "@/components//TableTopLeft.vue";
import axios from 'axios';

export default {
    name: 'EvaluationInsView',
    components: {
        VueTailwindPagination,
        TableTopLeft,
    },
    data() {
        return {
            search: "",
            current: 0,
            perPage: 0,
            total: 0,
            data: [],
        }
    },
    methods: {
        // getData(){
        //     fetch(`http://localhost:3000/data?`)
        //     .then(res => res.json())
        //     .then(d => this.data = d)
        //     .catch(err => console.log(err.message))
        // },
        async getData() {
            var response = await axios(`https://reqres.in/api/users?page=${this.current}`);
            var responseData = response.data;
            this.data = responseData.data;
            this.perPage = responseData.per_page;
            this.total = responseData.total;
        },
        pageChange(event) {
            this.current = event;
            this.getData();
        },
    },
    mounted() {
        this.current = 1;
        this.getData();
    },
    computed: {
        filteredPosts() {
            return this.data.filter(d =>
                d.email.toLowerCase().includes(this.search.toLowerCase()),
            );
        }
    }

}
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
