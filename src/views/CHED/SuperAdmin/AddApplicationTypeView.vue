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
                    <input type="text" placeholder="Enter Application Type Name" :class="{ 'input-error': validationStatus(v$.appName) }" class="input input-bordered w-full max-w-xs" v-model="v$.appName.$model" />
                    <!-- <label class="label"></label> -->
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.appName) }" v-if="validationStatus(v$.appName)">
                            Name is Required</span>
                    </label>
                </div>
                <div class="flex flex-row justify-center items-center space-x-4">
                    <!-- <button class="btn btn-md bg-brand-darkblue hover:bg-blue-800 border-none" @click="toggleModal">
                        Add Category
                    </button> -->
                    <button data-tip="Add Requirement" @click="toggleModal" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                    </button>
                    <button data-tip="Remove Requirement" @click="pop" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- Body -->
            <div class="overflow-x-auto rounded-lg" v-for="cat in addCat" v-bind:key="cat" :id="cat.id">
                <div class="ml-5" style="justify-content: space-between">
                    <div class="flex flex-row justify-center items-center">
                        <div class="form-control w-full mr-3">
                            <label class="label">
                                <span class="label-text">Requirement {{ cat.id }}</span>
                            </label>
                            <input type="text" placeholder="Enter Criteria Name" :class="{ 'input-error': validationStatus(v$.criteriaName) }" class="input input-bordered" v-model="v$.criteriaName.$model" />
                            <label class="label">
                                <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.criteriaName) }" v-if="validationStatus(v$.criteriaName)">
                                    Criteria name is Required</span>
                            </label>
                        </div>
                        <!-- <div class="flex">
                <div class="hover:text-brand-red/60" @click="popByIndex(index)">
                  <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    />
                  </svg>
                </div>
                <div class="hover:text-brand-blue/60" @click="popByObject(cat)">
                  <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    />
                  </svg>
                </div>
              </div> -->
                    </div>
                </div>
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
export default {
    name: "AddApplicationView",
    data() {
        return {
            counter: 0,
            cat1: 0,
            subCat1: 0,
            addCat: [
                //{
                // cat1: [{
                //     id: 1,
                //     name: 'Category 1',
                //     desc: 'This is Category 1',
                //     subCat: [{
                //         id: 1,
                //         name: "This is sub category 1 of category 1",
                //         desc: "This is the desc of sub cat 1 of cat 1",
                //         item: [{
                //             id: 1,
                //             requirement: "This is a requirement of subcat1 of cat1"
                //         }],
                //     }]
                // }],
                // cat2: [{
                //     id: 2,
                //     name: 'Category 2',
                //     desc: 'This is Category 2',
                //     subCat: [{
                //         id: 1,
                //         name: "This is sub category 1 of category 2",
                //         desc: "This is the desc of sub cat 1 of cat 2",
                //         item: [{
                //             id: 1,
                //             requirement: "This is a requirement of subcat1 of cat2"
                //         }],
                //     }]
                // }],
                //},
            ],
            addSubCat: [],
            nextAddCatId: "",
            nextaddSubCatId: "",
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
            appName: {
                required,
            },
            criteriaName: {
                required,
            },
        };
    },
    methods: {
        async saveAppType() {
            var has_error = 0;

            if (
                this.lastname == "" ||
                this.firstname == "" ||
                this.midinit == "" ||
                this.username == "" ||
                this.contactnum == ""
            ) {
                has_error = 1;
            }

            for (var i = 0; i < this.cat1; i++) {
                console.log(this.addCat);
                console.log(this.addCat[i].name);
            }

            return {
                has_error,
            };
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        toggleModal() {
            this.cat1++;
            //var cat = 'cat' + this.cat1;
            this.addCat.push({
                id: this.cat1,
                name: "",
            });
        },
        // popByObject: function(emp) {
        //     const filtersList = this.addCat.filter(element => element !== emp)
        //   this.addCat=filtersList
        //    // this.addCat.splice(id, 1);
        // },
        // popByIndex: function(index) {
        //     this.addCat.splice(index, 1);
        // },
        pop() {
            this.cat1--;
            //var cat = 'cat' + this.cat1;
            this.addCat.pop({
                id: this.cat1,
                name: "",
            });
        },
        toggleModal1(id) {
            this.subCat1++;

            console.log("COunter: " + this.counter);
            // console.log(this.addCat[0].subcat)
            if (this.addCat[this.counter].id == id) {
                this.addCat.push({
                    subCat: [{
                        id: this.subCat1,
                        name: "",
                        desc: "",
                        item: [{
                            id: "",
                            requirement: "",
                        }, ],
                    }, ],
                });
                // console.log(this.addCat[3].subCat)
            }
            this.counter++;
            console.log("Counter: " + this.counter);
            //this.addCat[this.cat1].push('Item' + this.subCat1)
            // var cat = "subCat"
            // this.addCat.subCat.push(
            //     {
            //             id: "",
            //             name: "",
            //             desc: "",
            //             item: [{
            //                 id: "",
            //                 requirement: ""
            //             }],
            //         }
            // )
        },
    },
};
</script>

<style></style>
