<template>
<section class="h-screen flex items-center justify-center">
    <div class="flex flex-row space-x-4 divide-x-4">
        <span class="text-6xl font-bold">404</span>
        <div class="flex-col space-y-8">
            <div class="text-left pl-4">
                <span class="text-4xl font-bold">Page not found</span>
                <p class="font-normal">Please Check the URL in the address bar and try again.</p>
            </div>
            <div class="flex-row text-left pl-4">
                <button @click="home" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go back home</button>
                <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Contact Support</button>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: '404View',
    methods: {
        home(){
            this.$router.push("/");
        }
    }
}
</script>

<style>

</style>
