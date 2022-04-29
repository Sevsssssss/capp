<template>
<div class=" grid xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3">
    <div class="bg-brand-white shadow-md rounded-md m-2 p-4" v-for="data in datas" :key="data">
        <div class="flex flex-col justify-between text-left">
            <div class="flex flex-row">
                <div :class="'homeIcon ' + data.type" class="mr-3">
                    <svg class="icon" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
                    </svg>
                </div>
                <div class="text-sm font-semibold" style="color: #8fa0b9">
                    {{ data.title }}
                </div>
            </div>
            <div class="text-2xl text-right font-semibold text-grey-300">{{ data.num }}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "DataCards",
    props: ["datas"],
    data() {
        return {
            colors: [
                {color: "orange",},
                {color: "blue",},
                {color: "violet",},
                {color: "green",},
                {color: "red",},
                {color: "pink",},
            ],
        };
    },
    components: {},
    methods: {},
};
</script>

<style>
</style>
