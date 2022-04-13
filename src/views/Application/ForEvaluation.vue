<template>
<div class="m-3">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in searchHEI" :key="table" class="bg-white border-b ">
                    <th scope="row" class=" px-6 py-4  font-medium text-gray-900 text-wrap break-words">
                        {{table.credential}}
                    </th>
                    <td class="px-6 py-4 text-blue-400">
                        {{table.file}}
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