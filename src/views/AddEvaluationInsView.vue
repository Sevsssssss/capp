<template>
<!--Header-->
<div class="" style="margin: 60px">
    <div class="top-row flex flex-row" style="justify-content: space-between;">

        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">CMO No.*</span>
            </label>
            <input type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" style="height: 48px; width:250px;"/>
        </div>

        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">Series*</span>
            </label>
            <input type="text" placeholder="Enter Series Year" class="input input-bordered w-full max-w-xs" style="height: 48px; width:250px;" />
        </div>

        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">Description*</span>
            </label>
            <input type="text" placeholder="Enter Description" class="input input-bordered w-full max-w-xs" style="height: 48px; width:250px;"/>
        </div>

        <div class="flex flex-row center" style="margin-top: 35px;">
            <button class="btn btn-wide  bg-brand-darkblue hover:bg-brand-blue border-none p-2">
                Add Category
            </button>
        </div>
    </div>

    <!-- Body -->
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="flex justify-end">
            <button type="button" class="rounded-md p-2 inline-flex items-center justify-center text-black-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>

        <div class="mx-5 top-row flex flex-row" style="justify-content: space-between ;">

            <div class="px-4 top-row flex flex-row">
                <div class="form-control w-full mr-3">
                    <label class="label">
                        <span class="label-text">Category*</span>
                    </label>
                    <input type="text" placeholder="Enter Criteria Name" class="input input-bordered w-full max-w-xs" style="height: 48px; width:250px;"/>
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Enter Description" class="input input-bordered w-full max-w-xs" style="height: 48px; width:250px;"/>
                </div>
            </div>

            <div class="flex flex-row center"  style="margin-top: 35px;">
                <button class="btn btn-wide  bg-brand-darkblue hover:bg-brand-blue border-none p-2">
                    Add Sub-Category
                </button>
            </div>
        </div>

        <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 50px">
            <div class="flex justify-end">
                <button type="button" class="rounded-md p-2 inline-flex items-center justify-center text-black-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div class="px-4 top-row flex flex-row ">

                <div class="flex flex-row">
                    <div class="form-control w-full mr-3">
                        <label class="label">
                            <span class="label-text">Category*</span>
                        </label>
                        <input type="text" placeholder="Enter Criteria Name" :class="{'input-error': validationStatus(v$.category)}" class="input input-bordered w-full max-w-xs" v-model="v$.category.$model" />
                        <label class="label">
                            <span v-if="validationStatus(v$.category)" :class="{'text-error': validationStatus(v$.category)}" class="label-text-alt"> Category is Required</span>
                        </label>
                    </div>

                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
                        
                        <textarea class="textarea textarea-bordered" placeholder="Enter requirements" style="height: 150px; width:930px;"></textarea>
                        
                    </div>
                </div>

            </div>

        </div>

    </div>

    <!-- Footer -->
    <div class="table-footer flex flex-row" style="justify-content: center;">
        <div class="flex flex-row pt-5">
            <button class="btn btn-margin  btn-outline" @click="$router.go(-1)">Cancel</button>
            <button class="
              btn btn-margin 
              submit
              bg-brand-darkblue
              hover:bg-brand-blue
            ">
                Create
            </button>
        </div>
    </div>
</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
    required,
    email,
} from "@vuelidate/validators";

export default {
    name: "AddEvalInstView",
    data() {
        return {
            v$: useVuelidate(),
            hei_name: "",
            cmo_no: "",
            series: "",
            description: "",
            category: "",
            catdescription: "",
            subcategory: "",
            item: "",
        };
    },
    validations() {
        return {
            cmo_no: {
                required,
            },
            series: {
                required,
            },
            description: {
                required,
                email,
            },
            category: {
                required,
            },
            catdescription: {
                required,
            },
            subcategory: {
                required,
            },
            item: {
                required,
            },
        };
    },
    methods: {
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
    }

}
</script>

<style>

</style>
