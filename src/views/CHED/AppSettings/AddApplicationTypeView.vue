<template>
<!--Header-->
<div class="m-5">
    <form v-on:submit.prevent="submit">
        <div class="overflow-x-auto shadow-lg rounded-lg px-8 py-5">
            <div class="flex flex-row" style="justify-content: space-between">
                <div class="form-control mr-3 w-full">
                    <label class="label">
                        <span class="label-text">Application Type Name:</span>
                    </label>
                    <input type="text" placeholder="Enter Application Type Name" :class="{ 'input-error': validationStatus(v$.applicationTypeName) }" class="input input-bordered w-full max-w-xs" v-model="v$.applicationTypeName.$model" />
                    <!-- <label class="label"></label> -->
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.applicationTypeName) }" v-if="validationStatus(v$.applicationTypeName)">
                            Name is Required</span>
                    </label>
                </div>
                <div :class="{'hide' : !isZero() }"  class="flex flex-row justify-center items-center space-x-4">
                    <button data-tip="Add Requirement" @click="addRequirement" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                    </button>
                    <button data-tip="Remove Requirement" @click="pop" class="btn tooltip tooltip-left btn-outline  hover:bg-brand-red/60">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- Body -->
            <div class="overflow-x-auto rounded-lg" v-for="req in appReqs" v-bind:key="req" :id="req.id">
                <div class="ml-5" style="justify-content: space-between">
                    <div class="flex flex-row justify-center items-center">
                        <div class="form-control w-full mr-3">
                            <label class="label">
                                <span class="label-text">Requirement {{ req.id }}</span>
                            </label>
                            <input type="text" placeholder="Enter Criteria Name" :class="{ 'input-error': validationStatus(v$.applicationReq) }" class="input input-bordered" v-model="req.applicationReq" />
                            <label class="label">
                                <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.applicationReq) }" v-if="validationStatus(v$.applicationReq)">
                                    Criteria name is Required</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{'hide' : isZero() }" class="space-x-4" style="text-align-last: right;">
                <!-- <button class="btn btn-md bg-brand-darkblue hover:bg-blue-800 border-none" @click="toggleModal">
                        Add Category
                    </button> -->
                <button data-tip="Add Requirement" @click="addRequirement" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                </button>
                <button data-tip="Remove Requirement" @click="pop" class="btn tooltip tooltip-left btn-outline  hover:bg-brand-red/60">
                    <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                    </svg>
                </button>
            </div>
            <!-- Footer -->
            <div class="table-footer flex flex-row" style="justify-content: center">
                <div class="flex flex-row pt-5">
                    <button class="btn btn-margin btn-outline" @click="$router.go(-1)">
                        Cancel
                    </button>
                    <button class="btn btn-md submit bg-brand-darkblue hover:bg-blue-700 border-none" @click="saveAppType()" type="submit">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
    required
} from "@vuelidate/validators";
import Parse from 'parse';
export default {
    name: "AddEvalInstView",
    data() {
        return {
            counter: 0,
            appReqs: [],
            v$: useVuelidate(),
            applicationTypeName: "",
            applicationReq: "",
            checker: true,
            reqNum: 0,
        };
    },
    validations() {
        return {
            applicationTypeName: {
                required,
            },
            applicationReq: {
                required,
            },
        };
    },
    methods: {
        async saveAppType() {

            const ApplicationType = Parse.Object.extend("ApplicationTypes");
            const newApplicationType = new ApplicationType();

            newApplicationType.set("applicationTypeName", this.applicationTypeName.toUpperCase());
            newApplicationType.set("applicationReqs", this.appReqs);

            try {
                await newApplicationType.save();
                if (confirm("Application Type added. Would you like to add another Application Type?")) {
                    document.location.reload();
                } else {
                    this.$router.push("/app-settings");
                }
            } catch (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        addRequirement() {
            this.counter++;
            this.appReqs.push({
                id: this.counter,
                applicationReq: "",
            });
        },
        pop() {
            if(this.counter > 0){
                this.counter--;
            }
            //var cat = 'cat' + this.cat1;
            this.appReqs.pop({
                id: this.cat1,
                name: "",
            });
        },
        isZero(){
            if(this.counter != 0){
                this.checker = false;
                return this.checker;
            }
            else {
                this.checker = true;
                return this.checker;
            }
        }
    },
};
</script>

<style>
.hide {
    visibility: hidden !important;
}
</style>
