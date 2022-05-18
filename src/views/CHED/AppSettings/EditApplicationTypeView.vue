<template>
<!--Header-->
<div class="m-5">
    <form v-on:submit.prevent="submit">
        {{appReqs}}
        <div class="overflow-x-auto shadow-lg rounded-lg px-8 py-5">
            <div class="" style="justify-content: space-between">
                <div class="form-control mr-3 w-full">
                    <label class="label">
                        <span class="label-text">Application Type Name:</span>
                    </label>
                </div>
                <div class="flex flex-row form-control mr-3 w-full justify-between">
                    <input type="text" placeholder="Enter Application Type Name" class="input input-bordered w-full max-w-xs" v-model="v$.applicationTypeName.$model" />
                    <div class="flex flex-row justify-center items-center space-x-4">
                        <button data-tip="Add Requirement" @click="addRequirement" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </button>
                    </div>
                    <!-- <label class="label"></label> -->
                    <!--<label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.applicationTypeName) }" v-if="validationStatus(v$.applicationTypeName)">
                            Application Type Name is Required</span>
                    </label>-->
                </div>
            </div>
            <!-- Body -->
            <div class="overflow-x-auto rounded-lg" v-for="req in appReqs" v-bind:key="req" :id="req.id">
                <div class="mt-2" style="justify-content: space-between">
                    <div class="flex flex-row justify-center items-center">
                        <div class="form-control w-full mr-3">
                            <label class="label">
                                <span class="label-text">Requirement {{ req.id }}</span>
                            </label>
                            <div class="flex flex-row">
                                <input type="text" placeholder="Enter Requirement Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="req.applicationReq" />
                                <div class="pl-4">
                                    <button data-tip="Remove Requirement" class="btn btn-outline tooltip tooltip-left hover:bg-brand-red/60" @click="removeRequirement(req.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="table-footer flex flex-row" style="justify-content: center">
                <div class="flex flex-row pt-5">
                    <button class="btn btn-margin btn-outline" @click="$router.go(-1)">
                        Cancel
                    </button>
                    <button for="my-modal-6" id="my-modal-6" type="submit" class="border-none btn btn-m submit bg-brand-darkblue hover:bg-brand-blue" @click="modal()">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </form>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">
                Add Application Type
            </div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this application type?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="editAppType()" type="submit">Continue</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import useVuelidate from "@vuelidate/core";
import {
    required
} from "@vuelidate/validators";
import Parse from "parse";
const toast = useToast();
export default {
    name: "EditAppTypeView",
    components: {
        VueInstantLoadingSpinner,
    },
    props: ["appID"],
    data() {
        return {
            showModal1: false,
            counter: 0,
            appReqs: [],
            v$: useVuelidate(),
            applicationTypeName: "",
            applicationReq: "",
            checker: true,
            reqNum: 0,
            error: 0,
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
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },
        modal() {
            var errChecker = 0;
            for (var i = 0; i < this.appReqs.length; i++) {
                console.log(this.appReqs.length);
                if (this.appReqs[i].applicationReq == "") {
                    errChecker = errChecker + 1;
                } else {
                    errChecker = errChecker - 0;
                }
            }

            var has_error = 0;
            if (this.applicationTypeName == "" || errChecker >= 1) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;
            }
        },
        async editAppType() {
            this.$refs.Spinner.show();
            const ApplicationTypes = Parse.Object.extend("ApplicationTypes");
            const atQuery = new Parse.Query(ApplicationTypes);
            atQuery.equalTo("objectId", this.appID);
            const applicationType = await atQuery.first();
            applicationType.set(
                "applicationTypeName",
                this.applicationTypeName.toUpperCase()
            );
            applicationType.set("applicationReqs", this.appReqs);
            try {
                await applicationType.save();
                toast("Application Type Edited", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        this.$router.push("/app-settings")
                    }, 2000);
                //if (
                //    confirm(
                //        "Application Type added. Would you like to add another Application Type?"
                //    )
                //) {
                //    document.location.reload();
                //} else {
                //    this.$router.push("/app-settings");
                //}
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message)
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },
        addRequirement() {
            this.counter++;
            console.log(this.counter)
            this.appReqs.push({
                id: this.counter,
                applicationReq: "",
            });
        },
        removeRequirement(id) {
            if(id < this.counter){
                var tick = id;
                console.log(tick + " " + (this.counter - 1))
                while(tick <= this.counter - 1){
                    console.log(this.appReqs[tick].id)
                    console.log(this.appReqs[tick].id - 1)
                    this.appReqs[tick].id = this.appReqs[tick].id - 1;
                    tick++;
                }
            }
            this.appReqs.splice(id - 1, 1)
            this.counter = this.counter - 1;
        },
        
        isZero() {
            if (this.counter != 0) {
                this.checker = false;
                return this.checker;
            } else {
                this.checker = true;
                return this.checker;
            }
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            if (accType[y] === "/app-settings") {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            const ApplicationTypes = Parse.Object.extend("ApplicationTypes");
            const query = new Parse.Query(ApplicationTypes);
            query.equalTo("objectId", this.appID);

            const querResult = await query.first();

            this.applicationTypeName = querResult.get("applicationTypeName");
            this.appReqs = querResult.get("applicationReqs");
            this.counter = querResult.get("applicationReqs").length;
        }
    },
};
</script>

<style>
.hide {
    visibility: hidden !important;
}
</style>
