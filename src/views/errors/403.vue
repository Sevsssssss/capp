<template>
<section class="h-screen flex items-center justify-center">
    <div class="flex flex-row space-x-4 divide-x-4">
        <span class="text-6xl font-bold">403</span>
        <div class="flex-col space-y-8">
            <div class="text-left pl-4">
                <span class="text-4xl font-bold">Access Denied/Forbidden</span>
                <p class="font-normal">The page you were trying to reach is absolutely forbidden for some reason.</p>
            </div>
            <div class="flex-row text-left pl-4">
                <button @click="push" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go back</button>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: '403View',
    methods: {
        push() {
            this.$router.go(-1);
        }
    }
}
</script>
