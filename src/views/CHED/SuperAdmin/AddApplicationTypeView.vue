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
            @click="toggleModal"
          >
            Add Requirement
          </button>
        </div>
      </div>
      <!-- Body -->
      <div
        class="overflow-x-auto rounded-lg"
        v-for="cat in addCat"
        v-bind:key="cat"
        :id="cat.id"
      >
        <div class="ml-5" style="justify-content: space-between">
          <div class="flex flex-row">
            <div class="form-control w-full mr-3">
              <label class="label"
                ><span class="label-text">Requirement {{ cat.id }}</span></label
              ><input
                type="text"
                placeholder="Enter Criteria Name"
                class="input input-bordered"
                v-model="cat.applicationReq"
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

      const ApplicationType = Parse.Object.extend("ApplicationType");
      const newApplicationType = new ApplicationType();

      newApplicationType.set("applicationTypeName", this.applicationTypeName);
      newApplicationType.set("applicationReqs", this.addCat);

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
    toggleModal() {
      this.cat1++;
      //var cat = 'cat' + this.cat1;
      this.addCat.push({
        id: this.cat1,
        applicationReq: "",
      });
    },
    toggleModal1(id) {
      this.subCat1++;

      console.log("COunter: " + this.counter);
      // console.log(this.addCat[0].subcat)
      if (this.addCat[this.counter].id == id) {
        this.addCat.push({
          subCat: [
            {
              id: this.subCat1,
              name: "",
              desc: "",
              item: [
                {
                  id: "",
                  requirement: "",
                },
              ],
            },
          ],
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

<style>
</style>