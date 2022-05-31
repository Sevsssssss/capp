<template>
<!--Header-->
<div class="m-3">
    <form v-on:submit.prevent="submit" class="overflow-x-auto shadow-lg rounded-lg p-8 w-full justify-between">
        <div class="form-control w-full pt-2">
            <label class="label">
                <span class="label-text">Evaluation Form Name*</span>
            </label>
            <textarea type="text" placeholder="Enter Evaluation Form Name" class="textarea textarea-bordered w-full" v-model="v$.evalDesc.$model" />
            </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Program*</span>
        </label>

        <select
          class="
            select
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-md
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
          "
          v-model="programName"
        >
          <option
            v-for="program in programs"
            :key="program"
            :value="program.id"
          >
            {{ program.name }}
          </option>
        </select>
      </div>
      <div class=" pr-5 pt-3 justify-right">
          <button @click="addCMO()" type="button" class="btn-table">
              <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
              </svg>
              <div class="pl-2">Add CMO</div>
          </button>
      </div>
      <div v-for="evalinst in eval" :key="evalinst">
        <div class="flex w-full items-end">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">CMO No.*</span>
          </label>
          <select
            class="
              select
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-md
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
            "
            v-model="evalinst.cmoID"
          >
            <option v-for="cmo in cmos" :key="cmo" :value="cmo.id">
              {{ cmo.CMO_Name }} {{ cmo.CMO_No }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-5 justify-between text-left overflow-x-auto shadow-lg rounded-lg p-8">
        <table class="table eval-table w-full">
          <tbody>
            <div v-for="cmo in cmos" :key="cmo" :value="cmo.id">
              <div v-if="cmo.id === evalinst.cmoID">
                <div
                  v-for="data in cmo.CMO_requirements"
                  :key="data"
                  :value="cmo.id"
                >
                 <div class="flex flex-row">
                <input
                        type="checkbox"
                        class="checkbox mt-4"
                        :value="data.id.toString()"
                        v-model="evalinst.checkedRequirements"
                      />
                      <th>{{ data.id }}</th>
                  <td class="font-bold">{{ data.Category }}</td>
                  </div>
                  <div v-for="subcat in data.subcategory" :key="subcat">
                    <div class="flex flex-row">
                      <input
                        type="checkbox"
                        class="checkbox mt-4"
                        :value="data.id +'.'+subcat.id"
                        v-model="evalinst.checkedRequirements"
                      />
                      <th>{{ data.id }}.{{ subcat.id }}</th>
                      <td class="font-medium">{{ subcat.Subcategory }}</td>

                    </div>
                    <div v-for="item in subcat.items" :key="item">
                        <th></th>
                        <th></th>
                        <th>{{ data.id }}.{{ subcat.id }}.{{ item.id }}</th>
                        <td class="font-thin">{{ item.Item }}</td>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </tbody>
        </table>
      </div>
      </div>
      <!-- Body -->

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
            class="
              border-none
              btn btn-m
              submit
              bg-brand-darkblue
              hover:bg-brand-blue
            "
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
            class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            "
            >Cancel</label
          >
          <label
            for="my-modal-6"
            class="
              btn btn-sm
              bg-brand-darkblue
              hover:bg-blue-800
              rounded-md
              border-none
            "
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

            cmoID: "",
            cmoNo: "",
            seriesYear: "",
            evalDesc: "",
            programs: [],
            cmos: [],
            checkedPrograms: [],
            checkedCategories: [],
            eval: [],
            programName: "",
        };
    },
    validations() {
        return {
            cmoID: {
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

        //For Validation
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        validate() {
            return this.showModal1;
        },

        modal() {
            var has_error = 0;
            var cmo_checker = 0;
            var requirements_checker = 0;
            for (var i = 0; i < this.eval.length; i++) {
                if (this.eval[i].cmoID == "") {
                    cmo_checker++;
                }
            }

            for (var x = 0; x < this.eval.length; x++) {
                if (this.eval[x].checkedRequirements == 0) {
                    requirements_checker++;
                }
            }

            if (

                this.evalDesc == "" || this.programName == "" || cmo_checker > 0 || this.eval.length == 0 || requirements_checker > 0

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
        reset() {
            this.checkedPrograms = [];
        },
        addCMO() {
            this.eval.push({
                cmoID: '',
                checkedRequirements: [],
            })
        },
        removeCMO() {
            this.eval.pop({
                cmoID: '',
                checkedRequirements: [],
            });
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        async saveEvalForm() {
            this.$refs.Spinner.show();
            try {
                //Add new Evaluation Instrument
                const EvaluationForm = Parse.Object.extend("EvaluationInstruments");
                const newEvaluationForm = new EvaluationForm();

                newEvaluationForm.set("evaluationFormProgram", this.programName);
                newEvaluationForm.set("evaluationFormName", this.evalDesc);
                newEvaluationForm.set(
                    "evalInstReqs",
                    this.eval
                );

                await newEvaluationForm.save();
                toast("Evaluation Added", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    setTimeout(() => {
                        this.$router.push("/evaluationins");
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

        //This removes a category
        removeProgram(name) {
            for (var i = 0; i < this.checkedPrograms.length; i++) {
                if (this.checkedPrograms[i] === name) {
                    this.checkedPrograms.splice(i, 1);
                    i--;
                }
            }
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

            //Get Disciplines
            var disciplineTable = [];
            var disciplinesNames = [];
            const disciplines = Parse.Object.extend("Disciplines");
            const query = new Parse.Query(disciplines);
            const querResult = await query.find();
            for (var i = 0; i < querResult.length; i++) {
                const discipline = querResult[i];
                for (var a = 0; a < discipline.get("specificDiscipline").length; a++) {
                    const programs = Parse.Object.extend("Programs");
                    const queryProg = new Parse.Query(programs);

                    const progResult = await queryProg.find();
                    var programsMat = [];
                    for (var j = 0; j < progResult.length; j++) {
                        const prog = progResult[j];
                        programsMat.push({
                            id: prog.id,
                            name: prog.get("programName"),
                        });
                    }

                    disciplineTable.push({
                        id: discipline.id,
                        Name: discipline.get("specificDiscipline")[a].SpecificDiscipline,
                        SpecDiscCode: discipline.get("specificDiscipline")[a].SpecDiscCode,
                        Programs: programsMat,
                    });
                    disciplinesNames.push({
                        id: discipline.get("specificDiscipline")[a].id,
                        SpecDiscCode: discipline.get("specificDiscipline")[a].SpecDiscCode,
                        name: discipline.get("specificDiscipline")[a].SpecificDiscipline,
                    });
                }
                this.programs = programsMat;
            }
            
            //Get CMOs for selection
            var storedCMO = [];
            const CMOs = Parse.Object.extend("CHED_MEMO");
            const cmoQuery = new Parse.Query(CMOs);
            const cmoResult = await cmoQuery.find();

            for (var x = 0; x < cmoResult.length; x++) {
                const cmo = cmoResult[x];

                storedCMO.push({
                    id: cmo.id,
                    CMO_Name: cmo.get("CMOName"),
                    CMO_No: "(CMO No. " +
                        cmo.get("CMO_No") +
                        ", s. " +
                        cmo.get("Series_Year") +
                        ")",
                    CMO_requirements: cmo.get("evaluationFormReqs"),
                });
            }

            this.cmos = storedCMO;
        }
    },
};
</script>

<style></style>
