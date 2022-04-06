<template>
<!--Header-->
<div class="" style="margin: 11px">
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="top-row flex flex-row" style="justify-content: space-between;">

            <div class="form-control mr-3 w-full">
                <label class="label">
                    <span class="label-text">CMO No.*</span>
                </label>
                <input type="text" placeholder="Enter CMO No." :class="{'input-error': validationStatus(v$.cmo_no)}" class="input input-bordered w-full max-w-xs" v-model="v$.cmo_no.$model" />
                <label class="label">
                    <span v-if="validationStatus(v$.cmo_no)" :class="{'text-error': validationStatus(v$.cmo_no)}" class="label-text-alt"> CMO No. is Required</span>
                </label>
            </div>

            <div class="form-control mr-3 w-full">
                <label class="label">
                    <span class="label-text">Series*</span>
                </label>
                <input type="text" placeholder="Enter Series Year" :class="{'input-error': validationStatus(v$.series)}" class="input input-bordered w-full max-w-xs" v-model="v$.series.$model" />
                <label class="label">
                    <span v-if="validationStatus(v$.series)" :class="{'text-error': validationStatus(v$.series)}" class="label-text-alt"> Series is Required</span>
                </label>
            </div>

            <div class="form-control mr-3 w-full">
                <label class="label">
                    <span class="label-text">Description*</span>
                </label>
                <input type="text" placeholder="Enter Description" :class="{'input-error': validationStatus(v$.description)}" class="input input-bordered w-full max-w-xs" v-model="v$.description.$model" />
                <label class="label">
                    <span v-if="validationStatus(v$.description)" :class="{'text-error': validationStatus(v$.description)}" class="label-text-alt"> Description is Required</span>
                </label>
            </div>

            <div class="flex flex-row center" style="margin-top: 20px;">
                <button @click="addEvalIns()" class="btn btn-margin  bg-brand-darkblue hover:bg-brand-blue border-none p-2">
                    Add Category
                </button>
            </div>
        </div>

        <!-- Body -->
        <div class="overflow-x-auto rounded-lg" style="margin: 11px">
            <div class="mx-5 top-row flex flex-row" style="justify-content: space-between;">

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
                        <textarea class="textarea textarea-bordered" :class="{'textarea-error': validationStatus(v$.catdescription)}" placeholder="Enter Description" style="height: 48px; width:190px;" v-model="v$.catdescription.$model"></textarea>
                        <label class="label">
                            <span v-if="validationStatus(v$.catdescription)" :class="{'text-error': validationStatus(v$.catdescription)}" class="label-text-alt"> Description is Required</span>
                        </label>
                    </div>
                </div>

                <div class="flex flex-row center" style="margin-top: 20px;">
                    <button @click="addEvalIns()" class="btn btn-margin  bg-brand-darkblue hover:bg-brand-blue border-none p-2">
                        Add Sub-Category
                    </button>
                </div>

            </div>

            <div class="overflow-x-auto  rounded-lg" style="margin: 10px">
                <div class="px-4 top-row flex flex-row ">

                    <div class="flex flex-row">
                        <div class="form-control w-full mr-3">
                            <label class="label">
                                <span class="label-text">Sub Category</span>
                            </label>
                            <input type="text" placeholder="Enter Criteria Name" :class="{'input-error': validationStatus(v$.subcategory)}" class="input input-bordered w-full max-w-xs" v-model="v$.subcategory.$model" />
                            <label class="label">
                                <span v-if="validationStatus(v$.subcategory)" :class="{'text-error': validationStatus(v$.subcategory)}" class="label-text-alt"> Sub Category is Required</span>
                            </label>
                        </div>

                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Item</span>
                            </label>
                            <textarea class="textarea textarea-bordered" :class="{'textarea-error': validationStatus(v$.item)}" placeholder="Enter requirements" style="height: 48px; width:190px;" v-model="v$.item.$model" />
                            <label class="label">
                            <span v-if="validationStatus(v$.item)" :class="{'text-error': validationStatus(v$.item)}" class="label-text-alt"> Item is Required</span>
                        </label>

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
            " @click="addHEI()">
                Create
            </button>
        </div>
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
