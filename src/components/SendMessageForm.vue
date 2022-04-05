<template>
<div class="flex bg-brand-lightblue/10 xxl:p-10 xl:p-10 sm:p-10 xs:p-12 xxs:p-12  justify-center items-center">
    <div class=" flex-col xxl:space-y-1 xl:space-y-1 xxs:space-y-0">
        <!-- Send message title -->
        <div class="text-left pb-4">
            <span class=" xxl:text-2xl xl:text-2xl xxs:label-l font-bold ">Send a Message</span>
            <img class="h-1 xxl:w-14 xl:w-14 sm:w-10 xs:w-8 xxs:w-8 rounded-lg " src="../assets/img/line.png" alt="line">
        </div>
        <!-- Input / label -->
        <div class="flex flex-row xxl:space-x-10 md:space-x-8 xxs:space-x-4">
            <div class="flex flex-col">
                <div class="xxl:mb-6 md:mb-6 xxs:mb-2  text-left ">
                    <label for="username" class="tracking-wider block mb-2 label-s font-semibold">HEI Name</label>
                    <input type="text" id="username" class="input input-bordered w-full max-w-xs xxl:input-md md:input-md xxs:input-sm" placeholder="Enter HEI name" required="">
                </div>
                <div class="xxl:mb-6 md:mb-6 xxs:mb-2 text-left">
                    <label for="username" class="tracking-wider block mb-2 label-s font-semibold">You name</label>
                    <input type="text" id="username" class=" input input-bordered w-full max-w-xs xxl:input-md md:input-md xxs:input-sm" placeholder="Enter your name" required="">
                </div>
                <div class="xxl:mb-6 md:mb-6 xxs:mb-2 text-left">
                    <label for="username" class="tracking-wider block mb-2 label-s font-semibold">Email Address</label>
                    <input type="email" id="username" class="input input-bordered w-full max-w-xs xxl:input-md md:input-md xxs:input-sm" placeholder="Enter email address" required="">
                </div>
            </div>
            <div class="flex flex-col w-64 text-left ">
                <label for="username" class="tracking-wider block mb-2 label-s font-semibold">Message</label>
                <textarea v-model="message" placeholder="Message Something" class="input input-bordered w-full max-w-xs p-2 xxl:input-md md:input-md xxs:input-sm"></textarea>
            </div>
        </div>
        <!-- button -->
        <div class="pt-1 text-left">
        <button class="btn btn-primary  bg-brand-darkblue hover:bg-blue-100 border-none">Submit</button>
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
