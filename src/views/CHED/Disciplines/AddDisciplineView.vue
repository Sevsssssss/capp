<template>
<!--Header-->
<div class="m-3">
    <form v-on:submit.prevent="submit" class="overflow-x-auto shadow-lg rounded-lg p-8 w-full justify-between">
        {{majorDisciplines}}
        <div class="flex flex-row mt-5 justify-between items-center">
            <div class="font-semibold">MAJOR DISCIPLINES</div>
            <div :class="{ hide: majorDisciplines.length > 0 }" class="">
                <button class="btn bg-brand-darkblue hover:bg-brand-blue border-none" @click="addMajorDiscipline()">
                    Add Major Discipline
                </button>
            </div>
        </div>
        <!-- Body -->
        <div v-for="majDiscipline in majorDisciplines" :key="majDiscipline" class="overflow-x-auto rounded-lg" id="add-cat">
            <div class="overflow-x-auto shadow-lg rounded-lg mt-4 p-4 w-full border-2">
                <div class="flex flex-row justify-between items-end">
                    <div class="flex flex-row w-full space-x-4">
                        <div class="form-control w-50">
                            <label class="label">
                                <span class="label-text">Major Discipline ID*</span>
                            </label>
                            <input v-model="majDiscipline.MajDiscCode" type="text" placeholder="Enter Major Discipline Name" class="input input-bordered w-full" />
                        </div>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Major Discipline*</span>
                            </label>
                            <input v-model="majDiscipline.MajorDiscipline" type="text" placeholder="Enter Major Discipline Name" class="input input-bordered w-full" />
                        </div>
                    </div>
                    <div class="pl-4">
                        <button data-tip="Remove Major Discipline" class="
                  btn btn-outline
                  tooltip tooltip-left
                  hover:bg-brand-red/60
                " @click="removeMajorDiscipline(majDiscipline.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="flex flex-row mt-5 justify-between items-center">
                    <div class="font-semibold">SPECIFIC DISCIPLINES</div>
                    <div class="">
                        <button class="btn bg-brand-darkblue hover:bg-brand-blue border-none" @click="addSpecificDiscipline(majDiscipline.specificDiscipline)">
                            Add Specific Discipline
                        </button>
                    </div>
                </div>

                <!-- v-for="specificDiscipline in majDiscipline.specificDiscipline" :key="specificDiscipline" means it accesses each specificDiscipline in the specificDiscipline array inside each majDiscipline in the majorDisciplines array -->
                <div v-if="majDiscipline.specificDiscipline.length > 0" class="overflow-x-auto shadow-lg rounded-lg mt-4 p-4 w-full border-2">
                    <div v-for="specificDiscipline in majDiscipline.specificDiscipline" :key="specificDiscipline" class="overflow-x-auto rounded-lg" id="add-subcat">
                        <div>
                            <div v-if="viewSpecDisc()">
                                <div class="">
                                    
                                    <div class="form-control w-full flex flex-row space-x-4" style="justify-content: space-between">
                                        <div class="form-control w-50">
                                          <label class="label"><span class="label-text">Specific Discipline ID</span></label>
                                        <input v-model="specificDiscipline.SpecDiscCode" type="text" placeholder="Enter Specific Discipline Name" class="input input-bordered w-full mr-4 flex" />
                                        </div>
                                        <div class="form-control w-full">
                                          <label class="label"><span class="label-text">Specific Discipline</span></label>
                                        <input v-model="specificDiscipline.SpecificDiscipline" type="text" placeholder="Enter Specific Discipline Name" class="input input-bordered w-full mr-4 flex" />
                                        </div>
                                        <div class="flex flex-row justify-center items-center">
                                            <!-- Delete Sub-MajorDiscipline -->
                                            <button data-tip="Remove Specific Discipline" class="
                                                btn btn-outline
                                                tooltip tooltip-left
                                                hover:bg-brand-red/60
                                              " @click="removeSpecificDiscipline(specificDiscipline.id)">
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
                </div>
            </div>
        </div>
        <div :class="{ hide: majorDisciplines.length == 0 }" class="mt-5 flex flex-row justify-end">
            <button class="btn bg-brand-darkblue hover:bg-brand-blue border-none" @click="addMajorDiscipline()">
                Add Major Discipline
            </button>
        </div>
        <!-- Footer -->
        <div class="table-footer flex flex-row justify-center">
            <div class="flex flex-row pt-5">
                <button class="btn btn-margin btn-outline" @click="$router.go(-1)">
                    Cancel
                </button>
                <button for="my-modal-6" id="my-modal-6" type="submit" class="
              border-none
              btn btn-m
              submit
              bg-brand-darkblue
              hover:bg-brand-blue
            " @click="modal()">
                    Create
                </button>
            </div>
        </div>
    </form>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="text-brand-darkblue font-bold label-xl">
                Add Discipline
            </div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add these Disciplines?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            ">Cancel</label>
                <label for="my-modal-6" class="
              btn btn-sm
              bg-brand-darkblue
              hover:bg-blue-800
              rounded-md
              border-none
            " @click="saveDiscipline()">Continue</label>
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
            majorDisciplines: [],
            MajorDisciplineId: 0,
            SpecificDisciplineId: 0,
            viewSpecDiscbool: true,

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
            majDiscipline: {
                required,
            },
            catdescription: {
                required,
            },
            specificDiscipline: {
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
            var errMD = 0;
            var errSD = 0;

            for (var i = 0; i < this.majorDisciplines.length; i++) {
                if (this.majorDisciplines[i].MajorDiscipline != "" && this.majorDisciplines[i].MajDiscCode != "") {
                    errMD = errMD - 0;
                } else {
                    errMD = errMD + 1;
                }
                if (this.majorDisciplines[i].specificDiscipline.length == 0) {
                    errSD = 0;
                } else {
                    for (var x = 0; x < this.majorDisciplines[i].specificDiscipline.length; x++) {
                        if (this.majorDisciplines[i].specificDiscipline[x].SpecificDiscipline != null &&  this.majorDisciplines[i].specificDiscipline[x].SpecDiscCode != "") {
                            errSD = errSD - 0;
                        } else {
                            errSD = errSD + 1;
                        }
                        if (this.majorDisciplines[i].specificDiscipline[x].SpecificDiscipline.length == 0) {
                            errSD = 1;
                        }
                    }
                }
            }
            if (
                errMD == 1 ||
                errSD >= 1
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

        saveDiscipline(){
            const Disciplines = Parse.Object.extend("Disciplines");
            for(var m = 0; m < this.majorDisciplines.length; m++){
                const newDiscipline = new Disciplines();
                newDiscipline.set("MajDiscCode", this.majorDisciplines[m].MajDiscCode);
                newDiscipline.set("MajorDiscipline", this.majorDisciplines[m].MajorDiscipline);
                newDiscipline.set("specificDiscipline", this.majorDisciplines[m].specificDiscipline);

                newDiscipline.save().then((discipline) => {
                    console.log("Discipline Saved: " + discipline.id);
                }, (error) => {
                    console.log("Discipline Saved: " + error.message);
                });

            }
        },

        //This add a majDiscipline
        addMajorDiscipline() {
            if (this.majorDisciplines.length === 0) {
                this.MajorDisciplineId = 0; // Should we overide id if all items in array is deleted?
                //Also should we adjust ids of items in array if some items are deleted?
            }
            this.MajorDisciplineId = this.MajorDisciplineId + 1;
            this.majorDisciplines.push({
                id: this.MajorDisciplineId,
                MajDiscCode: "",
                MajorDiscipline: "",
                specificDiscipline: [],
            });
        },
        //This removes a majDiscipline
        removeMajorDiscipline(id) {
            console.log(this.majorDisciplines.length);
            for (var i = 0; i < this.majorDisciplines.length; i++) {
                console.log(i, id);
                console.log(this.majorDisciplines[i]);
                if (this.majorDisciplines[i].id === id) {
                    console.log("true");
                    console.log(id, this.majorDisciplines[i].id);
                    this.majorDisciplines.splice(i, 1);
                    i--;
                }
            }
        },
        //This adds a specificDiscipline inside of a majDiscipline
        addSpecificDiscipline(MajorDiscipline) {
            console.log(MajorDiscipline);
            if (MajorDiscipline.length === 0) {
                console.log(true);
                this.SpecificDisciplineId = 0;
            }
            this.SpecificDisciplineId = this.SpecificDisciplineId + 1;
            MajorDiscipline.push({
                id: this.SpecificDisciplineId,
                SpecDiscCode: "",
                SpecificDiscipline: "",
            });
        },
        //This removes a specificDiscipline inside of a majDiscipline
        removeSpecificDiscipline(id) {
            for (var i = 0; i < this.majorDisciplines.length; i++) {
                for (
                    var specDisc = 0; specDisc < this.majorDisciplines[i].specificDiscipline.length; specDisc++
                ) {
                    console.log(this.majorDisciplines[i].specificDiscipline[specDisc].id);
                    if (this.majorDisciplines[i].specificDiscipline[specDisc].id === id) {
                        this.majorDisciplines[i].specificDiscipline.splice(specDisc, 1);
                        specDisc--;
                    }
                }
            }
        },

        showSpecDisc() {
            this.viewSpecDiscbool = true;
        },
        hideSpecDisc() {
            this.viewSpecDiscbool = false;
        },
        viewSpecDisc() {
            return this.viewSpecDiscbool;
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
            if (accType[y] === "/disciplines") {
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
