<template>
<div v-if="!applicationType" style="height: 100%">
    <NoDataAvail names="HEIapply" />
</div>
<section v-else class="min-h-screen">
    <div class="m-5 shadow-lg rounded-lg bg-brand-white">
        <form @submit.prevent="submitApplication">
            <div class="p-5">
                <div class="">
                    <div class="flex-col py-5 ">
                        <div class="flex justify-between items-center bg-brand-lightblue/5 w-full px-5 py-2 rounded-md">
                            <div class="flex">
                                <div class="font-semibold text-lg">
                                    APPLY FOR APPLICATION
                                </div>
                                <div class="dropdown dropdown-start pl-1 pr-16">
                                    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </label>
                                    <div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-80">
                                        <div class="card-body flex justify-center m-4">
                                            <h2 class="font-semibold text-sm">
                                                CREDENTIALS FOR {{ selected }}
                                            </h2>
                                            <ul class="list-disc text-left">
                                                <li v-for="i in reqs" :key="i">
                                                    {{ i.req.applicationReq }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex" style="">
                                <select v-on:change="changeItem($event)" class="py-2 px-3 rounded-md w-64 uppercase text-sm font-semibold">
                                    <option class="" v-for="i in applicationTypes" :key="i" :value="i.href">
                                        {{ i.appType.get("applicationTypeName") }}
                                    </option> 
                                </select>
                            </div>
                        </div>
                        <!-- <hr /> -->

                        <div class="flex flex-row items-start justify-evenly px-2 py-4 ">
                            <div class="form-control w-full max-w-xs mx-4">
                                <label class="label">
                                    <span class="text-sm">Point Person</span>
                                </label>
                                <input :class="{ 'input-error': validationStatus(v$.pointPerson) }" v-model="v$.pointPerson.$model" type="text" placeholder="Enter point person" class="input input-bordered w-full max-w-xs" />
                                <label class="label">
                                    <span v-if="validationStatus(v$.pointPerson)" :class="{
                      'text-error': validationStatus(v$.pointPerson),
                    }" class="label-text-alt">
                                        Point Person is Required</span>
                                </label>
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Email Address</span>
                                </label>
                                <input :class="{ 'input-error': validationStatus(v$.email) }" v-model="v$.email.$model" type="email" placeholder="Enter email address" class="input input-bordered w-full max-w-xs" />
                                <label class="label">
                                    <span v-if="validationStatus(v$.email)" :class="{ 'text-error': validationStatus(v$.email) }" class="label-text-alt">
                                        Email is Required</span>
                                </label>
                            </div>
                            <div class="form-control w-full max-w-xs mx-4">
                                <label class="label">
                                    <span class="label-text">Contact Number</span>
                                </label>
                                <input :class="{ 'input-error': validationStatus(v$.phoneNumber) }" v-model="v$.phoneNumber.$model" maxlength="11" type="number" @input="handleUserInput" placeholder="09*********" class="input input-bordered w-full max-w-xs" />
                                <label class="label">
                                    <span v-if="validationStatus(v$.phoneNumber)" :class="{
                      'text-error': validationStatus(v$.phoneNumber),
                    }" class="label-text-alt">
                                        Phone Number is Required</span>
                                </label>
                            </div>
                        </div>

                    </div>
                    <!-- Title -->

                    <div class="">
                        <div>
                            <!-- <div class="font-semibold text-lg text-center">REQUIREMENTS</div> -->

                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="font-semibold text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th class="aoe text-center">Requirements</th>
                                        <th class="text-center">File Upload</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="i in reqs" :key="i" class="bg-white border-b hover:bg-gray-50">
                                        <td class="px-6 py-4">
                                        <th>{{ i.req.applicationReq }}</th>
                                        </td>
                                        <td class="px-6 py-4">
                                            <input :id="i.id" ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- <div class="grid grid-cols-3 place-items-center gap-4 py-5">
                <div v-for="i in reqs" :key="i" class="w-80 form-control">
                  <label class="label text-left">
                    <span
                      class="text-sm text-ellipsis overflow-hidden"
                      style="white-space: nowrap"
                      >{{ i.req.applicationReq }}</span
                    >
                  </label>
                  <input
                    :id="i.id"
                    class="
                      block
                      w-full
                      text-sm text-grey-200
                      bg-brand-white
                      rounded-lg
                      border border-grey-500
                      cursor-pointer
                      focus:outline-none focus:border-transparent
                    "
                    type="file"
                    accept=".pdf,.doc"
                  />
                </div>
              </div> -->
                        </div>
                    </div>

                    <!-- BUTTONS -->
                    <div class="space-x-6 p-10">
                        <button type="button" class="
                w-40
                py-2.5
                px-5
                mr-2
                mb-2
                text-sm
                font-medium
                text-gray-900
                focus:outline-none
                bg-white
                rounded-lg
                border border-gray-200
                hover:bg-gray-100 hover:text-blue-700
              ">
                            Cancel
                        </button>
                        <button type="submit" class="
                submit
                w-40
                text-white
                bg-blue-700
                hover:bg-blue-800
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                mr-2
                mb-2
              ">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import NoDataAvail from "@/components//NoDataAvail.vue";
import {
    required,
    email
} from "@vuelidate/validators";
import Parse from "parse";

const toast = useToast();

export default {
    name: 'HEIapply',
    components: { NoDataAvail,},
    data() {
        return {
            v$: useVuelidate(),
            pointPerson: "",
            email: "",
            phoneNumber: "",
            selected: "",
            applicationTypes: [],
            reqs: [],
        };
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
        submitApplication(values) {
            try {
                var reqFiles = [];
            let requirement = null;
            for(var i = 0; i < this.reqs.length; i++){
                const file = values.target[4 + i].files[0];

                console.log(file);
                console.log(file.name);
                console.log(file.type);

                requirement = new Parse.File(file.name.replace(/[^a-zA-Z]/g, ""), file, file.type);

                reqFiles.push({
                    id: i + 1,
                    file: requirement,
                    status: "",
                    comment: "",
                });
            }
            // const file = values.target[4].files[0];
            // console.log(file);
            // console.log(file.name);
            // console.log(file.type);

            const application = Parse.Object.extend("Applications");
            const newApplication = new application();

            //requirement = new Parse.File(file.name, file, file.type);

            newApplication.save({
                pointPerson: this.pointPerson,
                email: this.email,
                phoneNumber: this.phoneNumber,
                requirements: reqFiles,
                applicationType: this.selected,
                applicationStatus: 'For Approval',
                createdBy: Parse.User.current().id,
            })
            .then(
                (newApplication) => {
                    toast("Application Added: " + newApplication.id, {
                            type: TYPE.SUCCESS,
                            timeout: 3000,
                            position: POSITION.TOP_RIGHT,
                        }),
                    window.location.reload()
                    // console.log("New Access Type Added:" + newApplication.id)
                },
                (e) => {
                    toast("Application Adding Failed: " + e.message, {
                        type: TYPE.ERROR,
                        timeout: 5000,  
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    // alert("Access Type Adding Failed: " + error)
                })
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error)
            }
        },
        changeItem: function changeItem(event) {
            for (var i = 0; i < this.applicationTypes.length; i++) {
                if (
                    this.applicationTypes[i].appType.get("applicationTypeName") ===
                    event.target.value
                ) {
                    this.showApplicationType(this.applicationTypes[i].appType);
                }
            }
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        handleUserInput(input) {
            var replacedInput = input.target.value
                .replace(/\D/g, "")
                .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !replacedInput[2] ?
                replacedInput[1] :
                "(" +
                replacedInput[1] +
                ") " +
                replacedInput[2] +
                (replacedInput[3] ? "-" + replacedInput[3] : "");
        },
        showApplicationType(appTypeObj) {
            this.selected = appTypeObj.get("applicationTypeName");
            var appTypeReqs = [];
            for (var i = 0; i < appTypeObj.get("applicationReqs").length; i++) {
                var req = appTypeObj.get("applicationReqs")[i];
                appTypeReqs.push({
                    req,
                });
            }
            // console.log(appTypeReqs);
            this.reqs = appTypeReqs;
        },
    },
    mounted: async function () {
        var applicationTypesMenu = [];
        // var applicationTypeReqs = [];
        const ApplicationTypes = Parse.Object.extend("ApplicationTypes");
        const query = new Parse.Query(ApplicationTypes);
        const queryResult = await query.find();
        if (queryResult !== null) {
            //this.selected = queryResult[0];
            this.showApplicationType(queryResult[0]);
        }
        // this.applicationTypes[0].appType.get('applicationTypeName')
        for (var i = 0; i < queryResult.length; i++) {
            const appType = queryResult[i];
            applicationTypesMenu.push({
                appType,
            });
        }
        this.totalEntries = queryResult.length;
        this.applicationTypes = applicationTypesMenu;
        // const app = this.applicationTypes[0];
        //  console.log( queryResult[0]);
        //  console.log( this.selected.get('applicationTypeName'));
    },
};
</script>

<style>
</style>
