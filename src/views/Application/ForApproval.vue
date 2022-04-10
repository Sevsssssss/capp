<template>
<div class="m-3">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in searchHEI" :key="table" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class=" px-6 py-4  font-medium text-gray-900 dark:text-white text-wrap break-words">
                        {{table.credential}}
                    </th>
                    <td class="px-6 py-4 text-blue-400">
                        {{table.file}}
                    </td>
                    <td class="px-6 py-4">
                        <input type="radio"  :id="'approved ' + table.id" :value="'approved ' + table.id" class="radio" v-model="statusShow">
                    </td>
                    <td class="px-6 py-4">
                        <input type="radio" :id="'disapproved ' + table.id" :value="'disapproved ' + table.id" class="radio" v-model="statusShow">
                    </td>
                    <td class="px-6 py-4">
                        <textarea id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
 data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: '',
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "FILES",
                },
                {
                    title: "APPROVED",
                },
                {
                    title: "DISAPPROVED",
                },
                {
                    title: "COMMENTS",
                },
            ],
            tables: [{
                    id: 1,
                    credential: 'Articles of Incorporation and By-Laws..',
                    file: 'ArticlesofInc.pdf',
                },
                {
                    id: 2,
                    credential: 'Copy(ies) of Transfer of Certificate(s) Title (TCT)',
                    file: 'Copy(ies)ofTransferof.pdf',
                },
                {
                    id: 3,
                    credential: 'Ownership of School Building',
                    file: 'OwnershipofSchoolBuilding.pdf',
                },
                {
                    id: 4,
                    credential: 'Campus Development and Landscaping Plan',
                    file: 'CampusDevelopme.pdf',
                },
                {
                    id: 5,
                    credential: 'Pictures of School Buildings, offices and other facilities',
                    file: 'PicturesofSchool.pdf',
                },
                {
                    id: 6,
                    credential: 'Certificate of Occupancy for the building(s)',
                    file: 'CertificateofOccupancy.pdf',
                },
                {
                    id: 7,
                    credential: 'Feasibility study',
                    file: 'Feasibilitystudy.pdf',
                },
            ],
            search: '',
        }
    },
     computed: {
        searchHEI() {
            return this.tables.filter(p => {
                return p.credential.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            });
        }
    },

}
</script>

<style>

</style>