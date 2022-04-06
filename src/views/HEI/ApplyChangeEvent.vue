<template>
<!-- Parent -->
<div class="px-8">
    <!-- Title -->
    <div class="text-left pl-4">

        <div class="flex flex-row pt-8">
            <div class="font-semibold">APPLY FOR APPLICATION</div>
         <div class="dropdown dropdown-start pl-1">
            <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </label>
            <div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-64">
                <div class="card-body text-left">
                    <h2 class="card-title">You needed more info?</h2>
                    <p>Submit onces you attached all necessarity files!</p>
                </div>
            </div>
        </div>
        </div>
        <hr>
    </div>

    <div class="flex flex-col justify-start items-start p-4">
       
        <select v-on:change="changeItem($event)" class="py-2 px-3 rounded-lg w-64">
            <option class="" v-for="i in items" :key="i.v" :value="i.href">{{i.v}}</option>
        </select>
        <div v-if="selected === 'Initial Permit'">
            <Permit />
        </div>
        <div v-else-if="selected === 'Renewal'">
            <ApplyRenewal />
        </div>
        <div v-else-if="selected === 'Compliance'">
            <ApplyCompliance />
        </div>
        <div v-else-if="selected === 'Government Recognition'">
            <GovernRec />
        </div>
    </div>

    <div class="space-x-6 p-10">
       <button type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
       <button type="submit" class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sumit</button>
    </div>
</div>
</template>

<script>
import Permit from './ApplyFor/InitialPermit.vue'
import ApplyRenewal from './ApplyFor/ApplyRenewal.vue'
import ApplyCompliance from './ApplyFor/ApplyCompliance.vue'
import GovernRec from './ApplyFor/GovernmentRecognition.vue'

export default {
    components: {
        Permit,
        ApplyRenewal,
        ApplyCompliance,
        GovernRec
    },
    data() {
        return {
            selected: 'Initial Permit',
            items: [{
                    v: 'Initial Permit',
                },
                {
                    v: 'Renewal',
                },
                {
                    v: 'Compliance',
                },
                {
                    v: 'Government Recognition',
                },
            ]
        }
    },
    methods: {
        changeItem: function changeItem(event) {
            this.selected = event.target.value;
        },
    },
}
</script>

<style>

</style>
