<template>
<section class="min-h-screen">
    <div class="m-3 shadow-lg rounded-lg bg-brand-white">
        <div class="p-12">
            <div class="flex flex-row items-start space-x-10">
                <div class="flex-col">
                    <div class="font-semibold text-md">HIGHER EDUCATION INSTITUTION</div>
                    <hr>
                    <div class="space-y-2 pt-3">
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="text-sm">Point Person</span>
                            </label>
                            <input :class="{'input-error': validationStatus(v$.pointPerson)}" v-model="v$.pointPerson.$model" type="text" placeholder="Enter point person" class="input input-bordered w-full max-w-xs">
                            <label class="label">
                                <span v-if="validationStatus(v$.pointPerson)" :class="{'text-error': validationStatus(v$.pointPerson)}" class="label-text-alt"> Point Person is Required</span>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email Address</span>
                            </label>
                            <input :class="{'input-error': validationStatus(v$.email)}" v-model="v$.email.$model" type="email" placeholder="Enter email address" class="input input-bordered w-full max-w-xs">
                            <label class="label">
                                <span v-if="validationStatus(v$.email)" :class="{'text-error': validationStatus(v$.email)}" class="label-text-alt"> Email is Required</span>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Contact Number</span>
                            </label>
                            <input :class="{'input-error': validationStatus(v$.phoneNumber)}" v-model="v$.phoneNumber.$model" maxlength="11" type="number" @input="handleUserInput" placeholder="09*********" class="input input-bordered w-full max-w-xs">
                            <label class="label">
                                <span v-if="validationStatus(v$.phoneNumber)" :class="{'text-error': validationStatus(v$.phoneNumber)}" class="label-text-alt"> Phone Number is Required</span>
                            </label>
                        </div>
                    </div>

                </div>
                <div class="flex-col">
                    <div class="font-semibold text-md text-left">UPLOAD HEIs CREDENTIALS</div>
                    <hr>
                    <div class="space-y-2 pt-3">
                        <div class="flex flex-row space-x-6">
                            <div>
                                <div class="mb-3 w-64">
                                    <label class="label">
                                        <span class="text-sm">School Admin</span>
                                    </label>
                                    <input required class="block w-full  text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer  dark:text-grey-300 focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                                </div>
                                <div class="mb-3 w-64">
                                    <label class="label">
                                        <span class="text-sm">Non-Teaching</span>
                                    </label>
                                    <input required class="block w-full  text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                                </div>
                                <div class="mb-3 w-64">
                                    <label class="label">
                                        <span class="text-sm">Application Fee</span>
                                    </label>
                                    <input required class="block w-full  text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                                </div>
                            </div>
                            <div>
                                <div class="mb-3 w-64">
                                    <label class="label">
                                        <span class="label-text">Faculty</span>
                                    </label>
                                    <input class="block w-full  text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
                                </div>
                                <div class="mb-3 w-64">
                                    <label class="label">
                                        <span class="label-text">Support Faculty</span>
                                    </label>
                                    <input class="block w-full  text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ApplyChangeEvent />
        </div>
    </div>

</section>
</template>

<script>
import ApplyChangeEvent from './ApplyChangeEvent.vue'
import useVuelidate from "@vuelidate/core";
import {
    required,
    email,
} from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useVuelidate(),
            pointPerson: "",
            email: "",
            phoneNumber: '',
        }
    },
    validations() {
        return {
            pointPerson: {
                required,
            },
            email: {
                required,
                email,
            },
            phoneNumber: {
                required,
            },
        };
    },
    components: {
        ApplyChangeEvent
    },
    methods: {
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        handleUserInput(input) {
            var replacedInput = input.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !replacedInput[2] ? replacedInput[1] : '(' + replacedInput[1] + ') ' + replacedInput[2] + (replacedInput[3] ? '-' + replacedInput[3] : '');
        }
    }

}
</script>

<style>

</style>
