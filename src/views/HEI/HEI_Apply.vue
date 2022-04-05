<template>
<section class="min-h-screen">
    <div class="m-3  shadow-lg rounded-lg bg-brand-white">
        <div class="flex flex-row items-center justify-evenly p-6">
            <div class="flex-col">
                <h2 class="font-semibold">HIGHER EDUCATION INSTITUTION</h2>
                <hr>
                <div class="space-y-2">
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="text-sm">Point Person</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Email Address</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Contact Number</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required>
                    </div>
                </div>
            </div>
            <div class="flex-col">
                <h2 class="font-semibold text-left">UPLOAD HEIs CREDENTIALS</h2>
                <hr>
                <div class="space-y-2">
                    <div class="flex flex-row space-x-4">
                        <div>
                            <div class="mb-3 w-64">
                                <label class="label">
                                    <span class="label-text">School Admin</span>
                                </label>
                                <input class="block w-full p-2 text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                            </div>
                            <div class="mb-3 w-64">
                                <label class="label">
                                    <span class="label-text">Non-Teaching</span>
                                </label>
                                <input class="block w-full p-2 text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                            </div>
                            <div class="mb-3 w-64">
                                <label class="label">
                                    <span class="label-text">Application Fee</span>
                                </label>
                                <input class="block w-full p-2 text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                            </div>
                        </div>
                        <div>
                            <div class="mb-3 w-64">
                                <label class="label">
                                    <span class="label-text">Faculty</span>
                                </label>
                                <input class="block w-full p-2 text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                            </div>
                            <div class="mb-3 w-64">
                                <label class="label">
                                    <span class="label-text">Support Faculty</span>
                                </label>
                                <input class="block w-full p-2 text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ApplyChangeEvent/>
    </div>
</section>
</template>

<script>
import ApplyChangeEvent from './ApplyChangeEvent.vue'
export default {
    components: {ApplyChangeEvent}
}
</script>

<style>

</style>
