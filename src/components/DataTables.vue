<template>
<table class="hei-table table-normal w-full">
    <!-- head-body -->
    <tbody class="hei-table">
        <tr class="hei-table bg-grey-500">
            <th class="hei-table-head" v-for="header in headers" :key="header">{{ header.title }}</th>
        </tr>
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
</template>

<script>
export default {
    name: "DataTables",
    props: ['headers', 'tables'],

};
</script>
