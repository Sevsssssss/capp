<template>
<main class="min-h-screen bg-blue-50">
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"/>
  </div>
    <div class="p-5">
        <div class="overflow-x-auto">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="d in data" :key="d.id">
                        <th>{{d.id}}</th>
                        <td>{{d.email}}</td>
                        <td>{{d.first_name}}</td>
                        <td>{{d.last_name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <VueTailwindPagination :current="current" :total="total" :per-page="perPage" @page-changed="current = $event" />

    </div>
</main>
</template>

<script>
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination';
import axios from 'axios';

export default {
    name: 'EvaluationInsView',
    components: {
        VueTailwindPagination,
    },
    data() {
        return {
            current: 1,
            perPage: 2,
            total: 20,
            data: [],
        }
    },
    methods: {
        async getData() {
            var response = await axios(`https://reqres.in/api/users?page=${this.current}`);
            var responseData = response.data;
            this.data = responseData.data;
            this.perPage = responseData.per_page;
            this.total = responseData.total;
        }
    },
    mounted() {
        this.current = 1;
        this.getData();
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
