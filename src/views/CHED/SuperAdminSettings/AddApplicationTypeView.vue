<template>
  <!--Header-->
  <div class="" style="margin: 11px">
    <div class="overflow-x-auto shadow-lg rounded-lg p-5" style="margin: 11px">
      <div class="flex flex-row" style="justify-content: space-between">
        <div class="form-control mr-3 w-full">
          <label class="label"
            ><span class="label-text">Application Type Name:</span></label
          ><input
            type="text"
            placeholder="Enter Application Type Name"
            class="input input-bordered w-full max-w-xs"
            v-model="applicationTypeName"
          /><label class="label"> <!--v-if--></label>
        </div>
        <div class="flex flex-row center" style="margin-top: 20px">
          <button
            class="
              btn btn-margin
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            "
            @click="addRequirement"
          >
            Add Requirement
          </button>
        </div>
      </div>
      <!-- Body -->
      <div
        class="overflow-x-auto rounded-lg"
        v-for="req in appReqs"
        v-bind:key="req"
        :id="req.id"
      >
        <div class="ml-5" style="justify-content: space-between">
          <div class="flex flex-row">
            <div class="form-control w-full mr-3">
              <label class="label"
                ><span class="label-text">Requirement {{ req.id }}</span></label
              ><input
                type="text"
                placeholder="Enter Requirement Name"
                class="input input-bordered"
                v-model="req.applicationReq"
              /><label class="label"> <!--v-if--></label>
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
          <button
            class="btn btn-margin submit bg-brand-darkblue hover:bg-brand-blue"
            @click="saveAppType"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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
          this.$router.push("/settings");
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
  },
};
</script>

<style>
</style>