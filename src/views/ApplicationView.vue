<template>
<div class="bg-brand-white p-5 shadow-lg ">
    <div class="grid grid-cols-3">
        <div class="flex flex-row space-x-3 bg-brand-white shadow-lg rounded-lg m-2 p-4" v-for="data in datas" :key="data">
            <div class="">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                </svg>
            </div>
            <div class="label-text font-semibold">{{data.title}}</div>
            <div>{{data.num}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ApplicationView',
    data() {
        return {
            datas: [{
                    title: 'For Approval',
                    num: 300,
                },
                {
                    title: 'For Revision',
                    num: 300
                },
                {
                    title: 'For Issuance',
                    num: 300
                },
                {
                    title: 'For Evaluation',
                    num: 300
                },
                {
                    title: 'For Completed',
                    num: 300
                }
            ],
        }
    },
    components: {
    },
}
</script>

<style>
</style>
