<template>
<!--Header-->
<div class="m-3">
    <form v-on:submit.prevent="submit" class="overflow-x-auto shadow-lg rounded-lg p-8 w-full justify-between">
        <div class="flex w-full items-end">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">CMO No.*</span>
                </label>
                <!-- <input v-model="cmoNo" type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" required /> -->
                <input type="text" placeholder="Enter CMO No." class="input input-bordered w-full" v-model="v$.cmoNo.$model" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.cmoNo) }" v-if="validationStatus(v$.cmoNo)">
                        CMO No. is Required</span>
                </label> -->
            </div>
            <div class="form-control ml-3 w-full">
                <label class="label">
                    <span class="label-text">Series*</span>
                </label>
                <!-- <input v-model="seriesYear" type="text" placeholder="Enter Series Year" class="input input-bordered w-full max-w-xs" required /> -->
                <input type="text" placeholder="Enter Series Year" class="input input-bordered w-full" v-model="v$.seriesYear.$model" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.seriesYear) }" v-if="validationStatus(v$.seriesYear)">
                        Series Year is Required</span>
                </label> -->
            </div>
        </div>
        <div class="form-control w-full pt-2">
            <label class="label">
                <span class="label-text">CMO Description*</span>
            </label>
            <!-- <textarea v-model="evalDesc" type="text" placeholder="Enter Description" class="textarea textarea-bordered w-full" required></textarea> -->
            <textarea type="text" placeholder="Enter Description" class="textarea textarea-bordered w-full" v-model="v$.evalDesc.$model" />
            <!-- <label class="label">
                <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.evalDesc) }" v-if="validationStatus(v$.evalDesc)">
                    Description is Required</span>
            </label> -->
      </div>
      <div class="flex flex-row mt-5 justify-between items-center">
        <div class="font-bold">CATEGORY</div>
        <div :class="{ hide: categories.length > 0 }" class="">
          <button
            class="btn bg-brand-darkblue hover:bg-brand-blue border-none"
            @click="addCategory()"
          >
            Add Category
          </button>
        </div>
      </div>
      <!-- Body -->
      <div
        v-for="category in categories"
        :key="category"
        class="overflow-x-auto rounded-lg"
        id="add-cat"
      >
        <div
          class="overflow-x-auto shadow-lg rounded-lg mt-4 p-4 w-full border-2"
        >
          <div class="flex flex-row justify-between items-end">
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
            <div class="flex flex-row w-full">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Category*</span>
                </label>
                <input
                  v-model="category.Category"
                  type="text"
                  placeholder="Enter Criteria Name"
                  class="input input-bordered w-full"
                />
              </div>
              <div class="form-control w-full pl-4">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea
                  v-model="category.Desc"
                  class="textarea textarea-bordered"
                  placeholder="Enter Description"
                  style="height: 48px; width: 100%"
                ></textarea>
        </div>
</div>
<div class="pl-4">
    <button data-tip="Remove Category" class="btn btn-outline tooltip tooltip-left hover:bg-brand-red/60" @click="removeCategory(category.id)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
        </svg>
    </button>
</div>
</div>

<div class="flex flex-row mt-5 justify-between items-center">
    <div class="font-semibold">SUB-CATEGORY</div>
    <div class="">
        <button class="btn bg-brand-darkblue hover:bg-brand-blue border-none" @click="addSubCategory(category.subcategory)">
            Add Sub-Category
        </button>
    </div>
</div>

<!-- v-for="subcategory in category.subcategory" :key="subcategory" means it accesses each subcategory in the subcategory array inside each category in the categories array -->
<div v-for="subcategory in category.subcategory" :key="subcategory" class="overflow-x-auto rounded-lg" id="add-subcat">
    <div class="overflow-x-auto shadow-lg mt-5 rounded-lg p-4 w-full border-2">
        <div v-if="viewSubCat()">
            <div class="">
                <label class="label"><span class="label-text">Sub Category</span></label>
                <div class="form-control w-full flex flex-row" style="justify-content: space-between">
                    <textarea  v-model="subcategory.Subcategory" type="text" placeholder="Enter Sub Category Name" class="textarea textarea-bordered w-full mr-4 flex"></textarea>
                    <div class="flex flex-row justify-center items-center">
                        <!-- Delete Sub-Category -->
                        <button data-tip="Remove Sub-Category" class="btn btn-outline tooltip tooltip-left hover:bg-brand-red/60" @click="removeSubCategory(subcategory.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto shadow-lg rounded-lg mt-4 p-4 w-full border-2">
                <div class="flex flex-row justify-between">
                    <div class="label">ITEMS:</div>
                    <div>
                        <button data-tip="Add Item" @click="addItem(subcategory.items)" class="btn tooltip tooltip-left bg-brand-darkblue hover:bg-brand-blue border-none mr-2">
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </button>
                        <button data-tip="Remove Item" @click="pop(subcategory.items)" class="btn tooltip tooltip-left btn-outline hover:bg-brand-red/60">
                            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- v-for="item in subcategory.items" :key="item" means it accesses the items in the items array inside the subcategory array which is inside the categories array. -->
                <div v-for="item in subcategory.items" :key="item" class="my-4">
                    <div class="flex flex-row items-start">
                        <label class="label flex space-x-1 text-sm font-semibold pr-2">
                            <span>Item:</span>
                            <span>{{ item.id }}</span>
                        </label>
                        <textarea v-model="item.Item" type="text" placeholder="Enter Item Name" class="textarea textarea-bordered w-full flex" />
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="{ hide: categories.length == 0 }"
        class="mt-5 flex flex-row justify-end"
      >
        <button
          class="btn bg-brand-darkblue hover:bg-brand-blue border-none"
          @click="addCategory()"
        >
          Add Category
        </button>
      </div>
      <!-- Footer -->
      <div class="table-footer flex flex-row justify-center">
        <div class="flex flex-row pt-5">
          <button class="btn btn-margin btn-outline" @click="$router.go(-1)">
            Cancel
          </button>
          <button
            for="my-modal-6"
            id="my-modal-6"
            type="submit"
            class="border-none btn btn-m submit bg-brand-darkblue hover:bg-brand-blue"
            @click="modal()"
          >
            Create
          </button>
        </div>
      </div>
    </form>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
    <div
      :class="{ 'modal-open ': validate() }"
      class="modal modal-bottom sm:modal-middle"
    >
      <div class="modal-box relative rounded-md text-left">
        <div class="text-brand-darkblue font-bold label-xl">
          Add Evaluation Instrument
        </div>
        <p class="text-sm xxs:leading-tight text-grey-200">
          Are you sure you want to add this Evaluation Instrument?
        </p>
        <div class="modal-action">
          <label
            for="my-modal-6"
            class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white"
            >Cancel</label
          >
          <label
            for="my-modal-6"
            class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none"
            @click="saveEvalForm()"
            >Continue</label
          >
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
    name: "AddEvalInstView",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            showModal1: false,
            v$: useVuelidate(),
            categories: [],
            categoryId: 0,
            subcategoryId: 0,
            viewSubCatbool: true,

            programName: "",
            cmoNo: "",
            seriesYear: "",
            evalDesc: "",
            programs: [],
        };
    },
    validations() {
        return {
            programName: {
                required,
            },
            cmoNo: {
                required,
            },
            seriesYear: {
                required,
            },
            evalDesc: {
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
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },

        modal() {
            //For Error Checking
            var has_error = 0;
            var errCat = 0;
            var subcat = 0;
            var items = 0;

            for (var i = 0; i < this.categories.length; i++) {
                console.log(this.categories[i].Category);
                if (this.categories[i].Category != "") {
                    errCat = errCat - 0;
                } else {
                    errCat = errCat + 1;
                }
                if (this.categories[i].subcategory.length == 0) {
                    subcat = 0;
                } else {
                    for (var x = 0; x < this.categories[i].subcategory.length; x++) {
                        console.log(
                            "ITEMS:" + this.categories[i].subcategory[x].items.length
                        );
                        console.log(
                            "name:" + this.categories[i].subcategory[x].Subcategory
                        );
                        if (this.categories[i].subcategory[x].Subcategory != null) {
                            subcat = subcat - 0;
                            console.log(this.categories[i].subcategory[x].Subcategory.length);
                            if (this.categories[i].subcategory[x].items.length == 0) {
                                items = 0;
                            } else {
                                for (
                                    var y = 0; y < this.categories[i].subcategory[x].items.length; y++
                                ) {
                                    console.log(
                                        "name1:" + this.categories[i].subcategory[x].items[y].Item
                                    );
                                    if (this.categories[i].subcategory[x].items[y].Item != null) {
                                        items = items - 0;
                                    } else {
                                        items = items + 1;
                                    }
                                    if (
                                        this.categories[i].subcategory[x].items[y].Item.length == 0
                                    ) {
                                        items = 1;
                                    }
                                }
                                // items = 1;
                                // console.log("ITEMS 1:" + this.categories[i].subcategory[x].items.length);
                            }
                        } else {
                            subcat = subcat + 1;
                        }
                        if (this.categories[i].subcategory[x].Subcategory.length == 0) {
                            subcat = 1;
                        }
                    }
                }
            }
            if (
                this.cmoNo == "" ||
                this.seriesYear == "" ||
                this.evalDesc == "" ||
                subcat == 1 ||
                items == 1 ||
                errCat >= 1
            ) {
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
        async saveEvalForm() {
            this.$refs.Spinner.show();
            try {
                //Get CMO Class
                const CMOs = Parse.Object.extend("CHED_MEMO");
                const newCMO = new CMOs();

                //Set CMO Data
                newCMO.set("CMO_No", this.cmoNo.toUpperCase());
                newCMO.set("Series_Year", this.seriesYear.toUpperCase());
                newCMO.set("CMOName", this.evalDesc.toUpperCase());
                newCMO.set("evaluationFormReqs", this.categories);

                //Save CMO
                await newCMO.save();
                toast("Evaluation Added", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        this.$router.push("/cmo");
                    }, 2000);
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
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
                Category: "",
                Desc: "",
            });
        },
        //This removes a category
        removeCategory(id) {
            for (var i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === id) {
                    this.categories.splice(i, 1);
                    i--;
                }
            }
        },
        //This adds a subcategory inside of a category
        addSubCategory(thisCategory) {
            if (thisCategory.length === 0) {
                this.subcategoryId = 0;
            }
            this.subcategoryId = this.subcategoryId + 1;
            thisCategory.push({
                id: this.subcategoryId,
                items: [],
                Subcategory: "",
            });
        },
        //This removes a subcategory inside of a category
        removeSubCategory(id) {
            for (var i = 0; i < this.categories.length; i++) {
                for (
                    var subCat = 0; subCat < this.categories[i].subcategory.length; subCat++
                ) {
                    if (this.categories[i].subcategory[subCat].id === id) {
                        this.categories[i].subcategory.splice(subCat, 1);
                        subCat--;
                    }
                }
            }
        },
        //This adds an Item from the Items Array of a Subcategory
        addItem(thisCategory) {
            var itemId = thisCategory.length + 1;
            thisCategory.push({
                id: itemId,
                Item: "",
                //Add Item Here
            });
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
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            if (accType[y] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

            //Get Programs
            var programsMat = [];
            const Programs = Parse.Object.extend("Programs");
            const programsQuery = new Parse.Query(Programs);
            const progQueResult = await programsQuery.find();

            for (var j = 0; j < progQueResult.length; j++) {
                const prog = progQueResult[j];

                programsMat.push({
                    id: prog.id,
                    name: prog.get("programName"),
                });
            }
            this.programs = programsMat;
        }
    },
};
</script>

<style></style>
