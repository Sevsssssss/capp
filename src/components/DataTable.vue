<template>
<div class="" style="padding: 10px">
    <div class="overflow-x-auto shadow-lg rounded-lg bg-brand-white" style="margin: 11px">
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
                    <th>{{ d.id }}</th>
                    <td>{{ d.email }}</td>
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
</template>

<script>
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import TableTopLeft from "@/components//TableTopLeft.vue";
import axios from "axios";

export default {
    name: "EvaluationInsView",
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
        };
    },
    methods: {
        async getData() {
            var response = await axios(
                `https://reqres.in/api/users?page=${this.current}`
            );
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
            return this.data.filter((d) =>
                d.email.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
};
</script>

<style>
</style>
