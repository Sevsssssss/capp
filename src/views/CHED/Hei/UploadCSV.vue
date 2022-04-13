<template>
<div class="h-full flex flex-col justify-center items-center bg-white">
    <span class="text-2xl m-5">Upload CSV File</span>
    <DropZoneVue></DropZoneVue>
    <span class="mt-12 font-semibold">{{ dropzoneFile.name }}</span>
</div>
</template>

<script>
import DropZoneVue from "./DropZone.vue";
import {
    ref
} from "vue";

export default {
    name: "uploadCSV",
    components: {
        DropZoneVue
    },
    setup() {
        let dropzoneFile = ref("");
        return {
            dropzoneFile
        };
    },
};
</script>

<style></style>
