<template>
<!--Header-->
<div class="m-3">
    <form v-on:submit.prevent="submit" class="overflow-x-auto shadow-lg rounded-lg p-8 w-full">
        <div class="flex w-full items-end justify-between">
            <div class="form-control w-full pr-3">
                <label class="label">
                    <span class="label-text">Program*</span>
                </label>

                <select class="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="programName">
                    <option v-for="program in programs" :key="program" :value="program.id">
                        {{ program.name }}
                    </option>
                </select>
                <!-- <input v-model="programName" type="text" placeholder="Enter Program" class="input input-bordered w-full max-w-xs" required /> -->
                <!-- <input type="text" placeholder="Enter Program" class="input input-bordered w-full max-w-xs" v-model="v$.programName.$model" /> -->
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.programName) }" v-if="validationStatus(v$.programName)">
                        Program is Required</span>
                </label> -->
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">CMO No.*</span>
                </label>
                <!-- <input v-model="cmoNo" type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" required /> -->
                <input type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" v-model="v$.cmoNo.$model" />
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
                <input type="text" placeholder="Enter Series Year" class="input input-bordered w-full max-w-xs" v-model="v$.seriesYear.$model" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.seriesYear) }" v-if="validationStatus(v$.seriesYear)">
                        Series Year is Required</span>
                </label> -->
            </div>
        </div>
        <div class="form-control w-full pt-2">
            <label class="label">
                <span class="label-text">Evaluation Form Name*</span>
            </label>
            <!-- <textarea v-model="evalDesc" type="text" placeholder="Enter Description" class="textarea textarea-bordered w-full" required></textarea> -->
            <textarea type="text" placeholder="Enter Evaluation Form Name" class="textarea textarea-bordered w-full" v-model="v$.evalDesc.$model" />
            <!-- <label class="label">
                <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.evalDesc) }" v-if="validationStatus(v$.evalDesc)">
                    Description is Required</span>
            </label> -->
        </div>
        <!-- Body -->
        <!-- category in categories" :key="category means it accesses the cateogies array which contains every category. -->
        <div class="form-control w-full pt-2">
            <label class="label">
                    <span class="label-text">Evaluation Form File*</span>
                </label>
            <input  ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
        </div>
        <!-- Footer -->
        <div class="table-footer flex flex-row" style="justify-content: center">
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
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
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
                console.log(errCat);
                console.log(this.categories[i].id);
                console.log("SUBCAT:" + this.categories[i].subcategory.length);
                if (this.categories[i].subcategory.length == 0) {
                    console.log("ANO NI?: " + this.categories[i].subcategory.length);
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
                            console.log("EYY");
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
                                        console.log("EYYS");
                                        items = items - 0;
                                    } else {
                                        console.log("EdsYY");
                                        items = items + 1;
                                    }
                                    if (
                                        this.categories[i].subcategory[x].items[y].Item.length == 0
                                    ) {
                                        console.log("EYdasdasY");
                                        items = 1;
                                    }
                                }
                                // items = 1;
                                // console.log("ITEMS 1:" + this.categories[i].subcategory[x].items.length);
                            }
                        } else {
                            subcat = subcat + 1;
                            console.log("HELL");
                        }
                        if (this.categories[i].subcategory[x].Subcategory.length == 0) {
                            subcat = 1;
                            console.log("dEYY");
                        }

                        // if (this.categories[i].subcategory[x].items.length == 0) {
                        //     items = 0;
                        // } else {
                        // for (var y = 0; y < this.categories[i].subcategory[x].items.length; y++) {
                        //     console.log("name1:" + this.categories[i].subcategory[x].items[y].Item);
                        //     if (this.categories[i].subcategory[x].Subcategory != null) {
                        //         items = 0;
                        //     } else {
                        //         items = 1;
                        //     }
                        // }
                        // }
                    }
                }
            }

            if (
                this.programName == "" ||
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
                // var password = "";
                // var characters =
                //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                // var charactersLength = characters.length;
                // for (var i = 0; i < 8; i++) {
                //   password += characters.charAt(
                //     Math.floor(Math.random() * charactersLength)
                //   );
                // }
                this.showModal1 = !this.showModal1;
            }
        },
        async saveEvalForm() {
            this.$refs.Spinner.show();
            try {
                console.log("save");

                const EvaluationForm = Parse.Object.extend("EvaluationForms");
                const newEvaluationForm = new EvaluationForm();

                newEvaluationForm.set("evaluationFormProgram", this.programName);
                newEvaluationForm.set("evaluationFormCMOno", this.cmoNo.toUpperCase());
                newEvaluationForm.set(
                    "evaluationFormSeries",
                    this.seriesYear.toUpperCase()
                );
                newEvaluationForm.set(
                    "evaluationFormName",
                    this.evalDesc.toUpperCase()
                );
                newEvaluationForm.set("evaluationFormReqs", this.categories);

                // await newEvaluationForm.save();
                // console.log(newEvaluationForm.save())

                await newEvaluationForm.save();
                toast("Evaluation Added", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        this.$router.push("/evaluationins");
                    }, 2000);
                // if (confirm("Application Type added. Would you like to add another Evaluation Instrument?")) {
                //     document.location.reload();
                // } else {
                //     this.$router.push("/evaluationins");
                // }
            } catch (error) {
                // "Please fill out the required information"
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
            console.log(this.categories.length);
            for (var i = 0; i < this.categories.length; i++) {
                console.log(i, id);
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
                Subcategory: "",
            });
        },
        //This removes a subcategory inside of a category
        removeSubCategory(id) {
            for (var i = 0; i < this.categories.length; i++) {
                for (
                    var subCat = 0; subCat < this.categories[i].subcategory.length; subCat++
                ) {
                    console.log(this.categories[i].subcategory[subCat].id);
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

                console.log(prog.get("programName"));
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
