<template>
<div class="bg-brand-lightblue/10 p-10 flex justify-center items-center">
    <div class=" flex flex-col space-y-1">
        <div class="text-left pb-4">
            <span class=" text-2xl font-bold ">Send a Message</span>
            <img class="h-1 w-14 rounded-lg " src="../assets/img/line.png" alt="line">
        </div>
        <div class="flex flex-row space-x-10">
            <div class="flex flex-col">
                <div class="mb-6 text-left ">
                    <label for="username" class="tracking-wider block mb-2 label-s font-semibold">HEI Name</label>
                    <input type="text" id="usaname" class="bg-brand-white border border-grey-400 text-sm rounded-md focus:ring-grey-300  block w-full p-2.5 dark:bg-grey-700 dark:border-gray-600 dark:placeholder-grey-200 dark:text-black-200 dark:focus:ring-brand-blue dark:focus:border-brand-blue" placeholder="Enter HEI name" required="">
                </div>
                <div class="mb-6 text-left">
                    <label for="username" class="tracking-wider block mb-2 label-s font-semibold">You name</label>
                    <input type="text" id="usaname" class=" bg-brand-white border border-grey-400 text-sm rounded-md focus:ring-grey-300  block w-full p-2.5 dark:bg-grey-700 dark:border-gray-600 dark:placeholder-grey-200 dark:text-black-200 dark:focus:ring-brand-blue dark:focus:border-brand-blue" placeholder="Enter your name" required="">
                </div>
                <div class="mb-6 text-left">
                    <label for="username" class="tracking-wider block mb-2 label-s font-semibold">Email Address</label>
                    <input type="email" id="usaname" class=" bg-brand-white border border-grey-400 text-sm rounded-md focus:ring-grey-300  block w-full p-2.5 dark:bg-grey-700 dark:border-gray-600 dark:placeholder-grey-200 dark:text-black-200 dark:focus:ring-brand-blue dark:focus:border-brand-blue" placeholder="Enter email address" required="">
                </div>
            </div>
            <div class="flex flex-col w-64 text-left ">
                <label for="username" class="tracking-wider block mb-2 label-s font-semibold">Message</label>
                <textarea v-model="message" placeholder="Message Something" class="h-56 w-full bg-brand-white border border-grey-400 text-sm rounded-md focus:ring-grey-300  p-2.5 dark:bg-grey-700 dark:border-gray-600 dark:placeholder-grey-200 dark:text-black-200 dark:focus:ring-brand-blue dark:focus:border-brand-blue"></textarea>
            </div>
        </div>
        <div class="pt-1 text-left">
        <button class="font-semibold btn btn-primary bg-brand-darkblue hover:bg-blue-100">Submit</button>
    </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
