<template>
<div class="m-3">
    <div class="flex flex-row justify-between">
        <div class="flex flex-col p-4 text-left space-y-3">
            <span class="text-2xl font-semibold">{{HeiName}}</span>
            <div>Application for: <span class="font-semibold text-sm">{{type}}</span></div>
        </div>
        <div class="flex flex-col">
            <div class="text-left p-4 pr-6 space-y-3">
                <div>Status: <span class="font-semibold text-sm"> {{status}}</span></div>
                <div>Date Applied: <span class="font-semibold text-sm"> {{dateApplied}} </span></div>
            </div>
            <!-- <p>ID Number: {{id}}</p> -->
        </div>
    </div>
</div>
<div v-if="status === 'FOR APPROVAL'">
  <ForApproval></ForApproval>
</div>
<div v-else-if="status === 'FOR REVISION'">
    for REVISION
</div>
<div v-else-if="status === 'FOR EVALUATION'">
   <ForEvaluation></ForEvaluation>
</div>
<div v-else-if="status === 'FOR ISSUANCE'">
    for ISSUANCE
</div>

<div class="space-x-6 py-8 px-3 flex ">
    <button type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
    <div v-if="status === 'FOR APPROVAL'">
        <button type="submit" class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sumit</button>
    </div>
    <div v-else-if="status === 'FOR EVALUATION'">
        <button type="submit" class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Re-Assign</button>
    </div>
</div>
</template>

<script>
import ForApproval from '../Application/ForApproval.vue'
import ForEvaluation from '../Application/ForEvaluation.vue'
export default {
    props: ['id', 'HeiName', 'type', 'status', 'dateApplied'],
    name: 'StatusApplication',
    components: {ForApproval, ForEvaluation},
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
