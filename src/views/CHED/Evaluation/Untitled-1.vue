<template>
<!--Header-->
<div class="" style="margin: 11px">
    <div>
        <div v-for="a in addCat" :key="a">
            <br />
            {{ a.id }}
            <div v-for="b in a.subCat" :key="b">
                <br />
                {{ b }}
                {{ b.id }}
                <div v-for="c in b" :key="c" class="text-left">
                    <!-- Category_Id: {{c.id}} <br> Category Name: {{c.name}} <br> Description: {{c.desc}} -->
                    <div v-for="d in c.subCat" :key="d">
                        <!-- SUB Category_Id: {{d.id}} <br> SUB Category Name: {{d.name}} <br> SUB Description: {{d.desc}} -->
                        <div v-for="e in d.item" :key="e">
                            <!-- Item_Id: {{e.id}} <br> Requirements: {{e.requirement}}  -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overflow-x-auto shadow-lg rounded-lg p-5" style="margin: 11px">
        <div class="flex flex-row" style="justify-content: space-between">
            <div class="form-control mr-3 w-full">
                <label class="label"><span class="label-text">CMO No.*</span></label><input type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" /><label class="label">
                    <!--v-if--></label>
            </div>
            <div class="form-control mr-3 w-full">
                <label class="label"><span class="label-text">Series*</span></label><input type="text" placeholder="Enter Series Year" class="input input-bordered w-full max-w-xs" /><label class="label">
                    <!--v-if--></label>
            </div>
            <div class="form-control mr-3 w-full">
                <label class="label"><span class="label-text">Description*</span></label><input type="text" placeholder="Enter Description" class="input input-bordered w-full max-w-xs" /><label class="label">
                    <!--v-if--></label>
            </div>
            <div class="flex flex-row center" style="margin-top: 20px">
                <button class="btn btn-margin bg-brand-darkblue hover:bg-brand-blue border-none p-2" @click="toggleModal">
                    Add Category
                </button>
            </div>
        </div>
        <!-- Body -->
        <div class="overflow-x-auto rounded-lg" v-for="cat in addCat" :key="cat">
            <div class="mx-5 top-row flex flex-row" style="justify-content: space-between">
                <div class="flex flex-row">
                    <div>
                        {{ cat.id
              }}<!-- delete once ok -->
                    </div>
                    <div class="form-control w-full mr-3">
                        <label class="label"><span class="label-text">Category*</span></label><input type="text" placeholder="Enter Criteria Name" class="input input-bordered w-full max-w-xs" /><label class="label">
                            <!--v-if--></label>
                    </div>
                    <div class="form-control w-full">
                        <label class="label"><span class="label-text">Description</span></label><textarea class="textarea textarea-bordered" placeholder="Enter Description" style="height: 48px; width: 100%"></textarea><label class="label">
                            <!--v-if--></label>
                    </div>
                </div>
                <div class="center" style="margin-top: 35px">
                    <button class="btn btn-margin bg-brand-darkblue hover:bg-brand-blue border-none pr-2" @click="toggleModal1(cat.id)">
                        Add Sub-Category
                    </button>

                    <button class="btn btn-margin bg-brand-darkblue hover:bg-brand-blue border-none">
                        DELETE
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto rounded-lg" v-for="subCat in cat.subCat" :key="subCat">
                <div class="px-8 top-row flex flex-row">
                    <div class="flex flex-row">
                        <div class="form-control w-full mr-3">
                            <label class="label"><span class="label-text">Sub Category</span></label><input type="text" placeholder="Enter Criteria Name" class="input input-bordered w-full max-w-xs" /><label class="label">
                                <!--v-if--></label>
                        </div>
                        <div class="form-control w-full">
                            <label class="label"><span class="label-text">Item</span></label><textarea class="textarea textarea-bordered" placeholder="Enter requirements" style="height: 150px; width: 800px"></textarea><label class="label">
                                <!--v-if--></label>
                        </div>
                        <button type="button" class="rounded-md p-2 inline-flex items-center justify-center text-black-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" style="margin: 35px 0px 15px 10px">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <div class="table-footer flex flex-row" style="justify-content: center">
            <div class="flex flex-row pt-5">
                <button @click="$router.go(-1)" class="btn btn-margin btn-outline">
                    Cancel</button><button class="btn btn-margin submit bg-brand-darkblue hover:bg-brand-blue">
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
    email
} from "@vuelidate/validators";

export default {
    name: "AddEvalInstView",
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
        toggleModal() {
            this.cat1++;
            //var cat = 'cat' + this.cat1;
            this.addCat.push({
                id: this.cat1,
                name: "",
                desc: "",
                subCat: [],
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
