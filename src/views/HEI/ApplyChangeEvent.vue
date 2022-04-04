<template >
<!-- Parent -->
<div class="px-8">
    <!-- Title -->
<div class="text-left pl-4">
    
    <h2 class="font-semibold">APPLY FOR APPLICATION</h2>
    <hr>
</div>

<div class="w-fit">
    <div class="p-1 px-2 bg-brand-blue/50 m-4 rounded-lg">
        <div class="flex flex-row space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6 ">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="">Submit onces you attached all necessarity files.</p>
        </div>
    </div>
</div>
<div class="flex flex-col justify-start items-start p-4">
    <select v-on:change="changeItem($event)">
        <option v-for="i in items" :key="i.v" :value="i.href">{{i.v}}</option>
    </select>
    <div v-if="selected === 'Initial Permit'"><Permit/></div>
    <div v-else-if="selected === 'Renewal'"><ApplyRenewal/></div>
    <div v-else-if="selected === 'Compliance'"><ApplyCompliance/></div>
    <div v-else-if="selected === 'Government Recognition'"><GovernRec/></div>
</div>
<div class="space-x-6 pb-10">
    <button class="btn w-28">Cancel</button>
<button class="btn w-28">Submit</button>
</div>
</div>
</template>

<script>
import Permit from './ApplyFor/InitialPermit.vue'
import ApplyRenewal from './ApplyFor/ApplyRenewal.vue'
import ApplyCompliance from './ApplyFor/ApplyCompliance.vue'
import GovernRec from './ApplyFor/GovernmentRecognition.vue'

export default {
    components: { Permit, ApplyRenewal, ApplyCompliance, GovernRec },
    data() {
        return {
            selected: 'Initial Permit',
            items: [
                {v: 'Initial Permit',},
                {v: 'Renewal',},
                {v: 'Compliance',},
                {v: 'Government Recognition',},
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
