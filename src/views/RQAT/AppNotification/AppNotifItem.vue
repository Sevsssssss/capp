<template>
<div class="flex flex-col justify-start items-start p-5">
    <button @click="$router.go(-1)" class="p-1.5 rounded-md border-none">
        <div class="flex justify-start items-center">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
            </svg>
            <span class="font-body">Back</span>
        </div>
    </button>
    <div class="py-5 px-4">
        <div class="flex flex-col justify-start items-start space-y-4 font-body text-left">
            <div class="text-2xl font-extrabold">
                {{date}}
            </div>
            <div class="text-lg font-body">
                {{item}},
            </div>
        </div>
    </div>
</div>
{{id}}
</template>

<script>
export default {
    props: ['id', 'item', 'date'],
    data() {
        return {

        }
    },
}
</script>

<style>

</style>
