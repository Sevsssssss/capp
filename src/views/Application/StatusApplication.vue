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
    <label type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</label>
    <div v-if="status === 'FOR APPROVAL'">
        <label for="my-modal-6" type="button" class="modal-button w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sumit</label>
    </div>
    <div v-else-if="status === 'FOR EVALUATION'">
        <label type="submit" class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Re-Assign</label>
    </div>
</div>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-6" class="modal-toggle">
<div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box text-left">
        <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <div class="flex-col space-y-2">
                <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                    Select Supervisor
                </h3>
                A normal text and a helper dropdown
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </label>
                    <div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-64">
                        <div class="card-body">
                            <h2 class="card-title">You needed more info?</h2>
                            <p>Here is a description!</p>
                        </div>
                    </div>
                </div>
            </div>
            <label type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" for="my-modal-6">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </label>
        </div>
        <!-- Modal body -->
        <div class="py-6 px-4 flex justify-center items-center">

            <div class="dropdown">
                <label tabindex="0" class="btn m-1 bg-transparent text-grey-200 hover:bg-transparent">Select Supervisor</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Rene Bright</a></li>
                    <li><a>Jazlynn kidd</a></li>
                </ul>
            </div>

        </div>
        <!-- Modal footer -->
        <div class="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">

            <label type="button" class="text-gray-500 w-48 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" for="my-modal-6">Cancel</label>
            <label type="button" class="text-white w-48 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</label>
        </div>
    </div>
</div>
</template>

<script>
import ForApproval from '../Application/ForApproval.vue'
import ForEvaluation from '../Application/ForEvaluation.vue'
export default {
    props: ['id', 'HeiName', 'type', 'status', 'dateApplied'],
    name: 'StatusApplication',
    components: {
        ForApproval,
        ForEvaluation
    },
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
