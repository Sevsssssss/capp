<template>
<!--Header-->
<div class="" style="margin: 11px">

    {{categories}}
    <br>
    <div v-for="category in categories" :key="category">
        {{category.id}}
        {{category.subcategory.length}}
    </div>
    <div class="overflow-x-auto shadow-lg rounded-lg p-5" style="margin: 11px">
        <div class="flex flex-row" style="justify-content: space-between">
            <div class="form-control mr-3 w-full">
                <label class="label">
                    <span class="label-text">Program*</span>
                </label>
                <input v-model="programName" type="text" placeholder="Enter Program" class="input input-bordered w-full max-w-xs" required />
            </div>
            <div class="form-control mr-3 w-full">
                <label class="label">
                    <span class="label-text">CMO No.*</span>
                </label>
                <input v-model="cmoNo" type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" required />
            </div>
            <div class="form-control mr-3 w-full">
                <label class="label">
                    <span class="label-text">Series*</span>
                </label>
                <input v-model="seriesYear" type="text" placeholder="Enter Series Year" class="input input-bordered w-full max-w-xs" required />
            </div>
            <div class="flex flex-row center" style="margin-top: 20px">
                <button class="
              btn btn-margin
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            " @click="addCategory()">
                    Add Category
                </button>
            </div>
        </div>
        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">Description*</span>
            </label>
            <textarea v-model="evalDesc" type="text" placeholder="Enter Description" class="textarea textarea-bordered w-full" required></textarea>
        </div>
        <!-- Body -->
        <!-- category in categories" :key="category means it accesses the cateogies array which contains every category. -->
        <div v-for="category in categories" :key="category" class="overflow-x-auto rounded-lg" id="add-cat">
            <div class="flex flex-row px-2" style="justify-content: space-between">
                <!-- <button v-if="category.subcategory.length == 0 || viewSubCat() == false" style="align-self: flex-end; margin-bottom: 10px;" @click="showSubCat()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" /></svg>
                </button>
                <button v-else-if="viewSubCat() == true" style="align-self: flex-end; margin-bottom: 10px;" @click="hideSubCat()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" /></svg>
                </button> -->
                <div class="flex flex-row" style="justify-content: space-between; flex: 1 1 auto;">
                    <div class="flex flex-row" style="flex: 1 1 auto;">
                        <div class="form-control w-full mr-3">
                            <label class="label">
                                <span class="label-text">Category*</span>
                            </label>
                            <input v-model="category.Category" type="text" placeholder="Enter Criteria Name" class="input input-bordered w-full " />
                        </div>
                        <div class="form-control w-full mr-5">
                            <label class="label">
                                <span class="label-text">Description</span>
                            </label>
                            <textarea v-model="category.Desc" class="textarea textarea-bordered" placeholder="Enter Description" style="height: 48px; width: 100%"></textarea>
                        </div>
                    </div>
                </div>
                <div style="align-self:center; margin-top: 35px">
                    <button data-tip="Remove Category" class="btn btn-outline tooltip tooltip-left hover:bg-brand-red/60" @click="removeCategory(category.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" /></svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-row pt-2 center" style="justify-content: space-between">
                <div class="px-7">
                    SUB-CATEGORY
                </div>
                <div class="mt-5" style="text-align: right;">
                    <button class="btn mx-2 bg-brand-darkblue hover:bg-brand-blue border-none " @click="addSubCategory(category.subcategory)">
                        Add Sub-Category
                    </button>
                </div>
            </div>
            <!-- v-for="subcategory in category.subcategory" :key="subcategory" means it accesses each subcategory in the subcategory array inside each category in the categories array -->
            <div v-for="subcategory in category.subcategory" :key="subcategory" class="overflow-x-auto rounded-lg" id="add-subcat">
                <div v-if="viewSubCat()">
                    <div class="px-8">
                        <label class="label"><span class="label-text">Sub Category</span></label>
                        <div class="form-control w-full mr-3 flex flex-row" style="justify-content: space-between;">

                            <input v-model="subcategory.Subcategory" type="text" placeholder="Enter Sub Category Name" class="input input-bordered w-full mr-5 " style="flex: 1 1 auto;" />
                            <div class="flex flex-row justify-center items-center space-x-4">

                                <button data-tip="Remove Sub-Category" class="btn btn-outline tooltip tooltip-left hover:bg-brand-red/60" @click="removeSubCategory(subcategory.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" /></svg>
                                    <!-- Delete Sub-Category -->
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row pt-5 px-10 center" style="justify-content: space-between">
                        <div class="">
                            ITEMS:
                        </div>
                        <div>
                            <button data-tip="Add Item" @click="addItem(subcategory.items)" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-blue-800 border-none mr-2">
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                </svg>
                            </button>
                            <button data-tip="Remove Item" @click="pop(subcategory.items)" class="btn tooltip tooltip-left btn-outline  hover:bg-brand-red/60">
                                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- v-for="item in subcategory.items" :key="item" means it accesses the items in the items array inside the subcategory array which is inside the categories array. -->
                    <div v-for="item in subcategory.items" :key="item" class="my-3">
                        <div class="flex flex-row px-10">
                            <label class="label"><span class="label-text">Item {{item.id}}</span></label>
                            <input v-model="item.Item" type="text" placeholder="Enter Item Name" class="input input-bordered w-full " style="flex: 1 1 auto;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <div class="table-footer flex flex-row" style="justify-content: center">
            <div class="flex flex-row pt-5">
                <button class="btn btn-margin btn-outline" @click="submit">Cancel</button><button class="btn btn-margin submit bg-brand-darkblue hover:bg-brand-blue">
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
    required
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
            categories: [],
            subCategories: [],
            items: [],
            categoryId: 0,
            subcategoryId: 0,
            viewSubCatbool: true,

            programName: "",
            cmoNo: "",
            seriesYear: "",
            evalDesc: "",

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
        //This add a category
        addCategory() {
            if (this.categories.length === 0) {
                this.categoryId = 0; // Should we overide id if all items in array is deleted?
                //Also should we adjust ids of items in array if some items are deleted?
            }
            this.categoryId = this.categoryId + 1;
            this.categories.push({
                id: this.categoryId,
                subcategory: [],
            });
        },
        //This removes a category
        removeCategory(id) {
            console.log(this.categories.length);
            for (var i = 0; i < this.categories.length; i++) {
                console.log(i, id, );
                console.log(this.categories[i]);
                if (this.categories[i].id === id) {
                    console.log("true");
                    console.log(id, this.categories[i].id);
                    this.categories.splice(i, 1);
                    i--;
                }
            }
        },
        //This adds a subcategory inside of a category
        addSubCategory(thisCategory) {
            console.log(thisCategory);
            if (thisCategory.length === 0) {
                console.log(true);
                this.subcategoryId = 0;
            }
            this.subcategoryId = this.subcategoryId + 1;
            thisCategory.push({
                id: this.subcategoryId,
                items: [],
            })
        },
        //This removes a subcategory inside of a category
        removeSubCategory(id) {
            for (var i = 0; i < this.categories.length; i++) {
                for (var subCat = 0; subCat < this.categories[i].subcategory.length; subCat++) {
                    console.log(this.categories[i].subcategory[subCat].id)
                    if (this.categories[i].subcategory[subCat].id === id) {
                        this.categories[i].subcategory.splice(subCat, 1);
                        subCat--;
                    }
                }
            }
        },
        //This adds an Item from the Items Array of a Subcategory
        addItem(thisCategory) {
            console.log(thisCategory);
            var itemId = thisCategory.length + 1;
            thisCategory.push({
                id: itemId,
                //Add Item Here
            })
        },
        //This removes an Item from the Items Array of a Subcategory
        pop(thisCategory) {
            var itemId = thisCategory.length + 1;
            if (itemId > 0) {
                itemId--;
            }
            //var cat = 'cat' + this.cat1;
            thisCategory.pop({
                id: itemId,
                name: "",
            });
        },
        showSubCat() {
            this.viewSubCatbool = true;
        },
        hideSubCat() {
            this.viewSubCatbool = false;
        },
        viewSubCat() {
            return this.viewSubCatbool;
        },
    },
};
</script>

<style></style>
