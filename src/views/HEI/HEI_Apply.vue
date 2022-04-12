<template>
<section class="min-h-screen">
    <div class="m-5 shadow-lg rounded-lg bg-brand-white">
        <div class="p-12">

            <div class="">
                <div class="flex flex-row items-start justify-evenly pt-12">
                    <div class="flex-col">
                        <div class="font-semibold text-lg">HIGHER EDUCATION INSTITUTION</div>
                        <hr>
                        <div class="space-y-1 pt-3">
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
                    <!-- UPLOAD CREDENTIALS -->
                    <div class="flex-col">
                        <div class="font-semibold text-lg text-left">UPLOAD HEIs CREDENTIALS</div>
                        <hr>
                        <div class="space-y-3 pt-3">
                            <div class="flex flex-row justify-between space-x-4">
                                <div class="grid grid-cols-2  place-items-center gap-4 py-5">
                                    <div v-for="i in heiReq" :key="i" class="w-80 form-control">    
                                        <label class="label text-left">
                                            <span class="text-sm text-ellipsis overflow-hidden" style="white-space: nowrap;">{{i.name}}</span>
                                        </label>
                                        <input :id="i.id" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Title -->
                <div class="">
                    <div class="flex justify-evenly items-center">
                        <div class="flex">
                            <div class="font-semibold text-lg text-left">APPLY FOR APPLICATION</div>
                            <div class="dropdown dropdown-start pl-1 pr-16">
                                <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </label>
                                <div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-80">
                                    <div v-if="selected === 'Initial Permit'" class="card-body flex justify-center m-4">
                                        <h2 class="font-semibold text-sm">CREDENTIALS FOR INITIAL PERMIT</h2>
                                        <ul class="list-disc text-left">
                                            <li v-for="i in descol1" :key="i.item">
                                                {{i.item}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="selected === 'Compliance'" class="card-body flex justify-center m-4">
                                        <h2 class="font-semibold text-sm">CREDENTIALS FOR COMPLIANCE</h2>
                                        <ul class="list-disc text-left">
                                            <li v-for="i in descol1" :key="i.item">
                                                {{i.item}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="selected === 'Renewal'" class="card-body flex justify-center m-4">
                                        <h2 class="font-semibold text-sm">CREDENTIALS FOR RENEWAL</h2>
                                        <ul class="list-disc text-left">
                                            <li v-for="i in descol1" :key="i.item">
                                                {{i.item}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="selected === 'Government Recognition'" class="card-body flex justify-center m-4">
                                        <h2 class="font-semibold text-sm">CREDENTIALS FOR GOVERNMENT RECOGNITION</h2>
                                        <ul class="list-disc text-left">
                                            <li v-for="i in descol1" :key="i.item">
                                                {{i.item}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex pb-2">
                            <select v-on:change="changeItem($event)" class="py-2 px-3 rounded-md w-64">
                                <option class="" v-for="i in items" :key="i.v" :value="i.href">{{i.v}}</option>
                            </select>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="">
                    <!-- INITIAL PERMIT -->
                    <div v-if="selected === 'Initial Permit'">
                        <div class="grid grid-cols-2  place-items-center gap-4 py-5">
                            <div v-for="i in descol1" :key="i" class="w-80 form-control">
                                <label class="label text-left">
                                    <span class="text-sm text-ellipsis overflow-hidden" style="white-space: nowrap;">{{i.item}}</span>
                                </label>
                                <input :id="i.id" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                            </div>
                        </div>
                    </div>
                    <!-- RENEWAL -->
                    <div v-else-if="selected === 'Renewal'">
                        <div class="grid grid-cols-2  place-items-center gap-4 py-5">
                            <div v-for="i in descol1" :key="i" class="w-80 form-control">
                                <label class="label text-left">
                                    <span class="text-sm text-ellipsis overflow-hidden" style="white-space: nowrap;">{{i.item}}</span>
                                </label>
                                <input :id="i.id" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                            </div>
                        </div>
                    </div>
                    <!-- COMPLIANCE -->
                    <div v-else-if="selected === 'Compliance'">
                        <div class="grid grid-cols-2  place-items-center gap-4 py-5">
                            <div v-for="i in descol1" :key="i" class="w-80 form-control">
                                <label class="label text-left">
                                    <span class="text-sm text-ellipsis overflow-hidden" style="white-space: nowrap;">{{i.id}}. {{i.item}} </span>
                                </label>
                                <input :id="i.id" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                            </div>
                        </div>
                    </div>
                    <!-- GOVERNMENT RECOGNITION -->
                    <div v-else-if="selected === 'Government Recognition'">
                        <div class="grid grid-cols-2  place-items-center gap-4 py-5">
                            <div v-for="i in descol1" :key="i" class="w-80 form-control">
                                <label class="label text-left">
                                    <span class="text-sm text-ellipsis overflow-hidden" style="white-space: nowrap;">{{i.item}}</span>
                                </label>
                                <input :id="i.id" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- BUTTONS -->
                <div class="space-x-6 p-10">
                    <button type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                    <button type="submit" class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sumit</button>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
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
            selected: 'Initial Permit',
            items: [{
                    v: 'Initial Permit',
                },
                {
                    v: 'Renewal',
                },
                {
                    v: 'Compliance',
                },
                {
                    v: 'Government Recognition',
                },
            ],
            descol1: [{
                    id: 1,
                    item: 'Articles of Incorporation and By-Laws, Copy of original Ordinance approving establishment, Copy of the Charter',
                },
                {
                    id: 2,
                    item: 'Ownership of School Building',
                },
                {
                    id: 3,
                    item: 'Pictures of School Buildings, offices and other facilities',
                },
                {
                    id: 4,
                    item: 'Copy(ies) of Transfer of Certificate(s) Title (TCT)',
                },
                {
                    id: 5,
                    item: 'Campus Development and Landscaping Plan',
                },
            ],
            heiReq: [{
                    id: 1,
                    name: 'School Admin',
                },
                {
                    id: 1,
                    name: 'Non-Teaching',
                },
                {
                    id: 1,
                    name: 'Faculty',
                },
                {
                    id: 1,
                    name: 'Support Faculty',
                },
                {
                    id: 1,
                    name: 'Application Fee',
                },
            ]
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
    methods: {
        changeItem: function changeItem(event) {
            this.selected = event.target.value;
        },
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
