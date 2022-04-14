<template>
<div class="main-page flex justify-center items-center p-5">
    <div class="card over p-4 w-fit bg-white rounded-lg border border-gray-200 shadow-md">
        <form v-on:submit.prevent="submit" class="card-body">
            <div class="flex flex-row space-x-4 text-left justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
                </svg>
                <span class="text-2xl font-semibold text-grey-100">ADD RQAT ACCOUNT</span>
            </div>
            <div class="line"></div>

            <div class="flex flex-row">
                <div class="form-control w-full pr-4">
                    <label class="label">
                        <span class="label-text">Last Name</span>
                    </label>
                    <input type="text" placeholder="Last Name" :class="{ 'input-error': validationStatus(v$.lastname) }" class="input input-bordered w-full" v-model="v$.lastname.$model" />
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.lastname) }" v-if="validationStatus(v$.lastname)">
                            Lastname is Required</span>
                    </label>
                </div>

                <div class="form-control w-full pr-4">
                    <label class="label">
                        <span class="label-text">First Name</span>
                    </label>
                    <input type="text" placeholder="First Name" :class="{ 'input-error': validationStatus(v$.firstname) }" class="input input-bordered w-full" v-model="v$.firstname.$model" />
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.firstname) }" v-if="validationStatus(v$.firstname)">
                            Firstname is Required</span>
                    </label>
                </div>
                <div class="form-control" style="width: 200px">
                    <label class="label">
                        <span class="label-text">M.I.</span>
                    </label>
                    <input type="text" placeholder="M.I." :class="{ 'input-error': validationStatus(v$.midinit) }" class="input input-bordered w-full" v-model="v$.midinit.$model" />
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.midinit) }" v-if="validationStatus(v$.midinit)">
                            Middle Initial is Required</span>
                    </label>
                </div>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" :class="{ 'input-error': validationStatus(v$.username) }" class="input input-bordered w-full" v-model="v$.username.$model" />
                <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.username) }" v-if="validationStatus(v$.username)">
                        Username is Required</span>
                </label>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder="09*********" :class="{ 'input-error': validationStatus(v$.contactnum) }" class="input input-bordered w-full" v-model="v$.contactnum.$model" />
                <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.contactnum) }" v-if="validationStatus(v$.contactnum)">
                        Contact Number is Required</span>
                </label>
            </div>

            <div class="flex justify-end">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Select Affiliation:</span>
                        <div class="text-sm font-medium text-gray-500">
                            Add HEI Affiliation?
                            <label for="createAffilication" href="#" class="text-blue-700 hover:underline">Create</label>
                        </div>
                    </label>
                    <select class="select select-bordered w-full font-normal" v-model="hei_affil">
                        <option v-for="hei in heis" :key="hei">
                            <div class="hei-name">{{ hei.title }}</div>
                        </option>
                    </select>
                </div>
            </div>

        <div class="flex justify-end pt-8 space-x-4">
          <button class="btn btn-m btn-outline" @click="$router.go(-1)">
            Cancel
          </button>

          <button for="my-modal-6" id="my-modal-6" type="submit" class="
              border-none
              btn btn-m
              submit
              bg-brand-darkblue
              hover:bg-brand-blue
            "
            @click="modal()"
          >
            Add RQAT
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="savingSuccessful"
      class="
        absolute
        top-24
        right-5
        alert alert-success
        shadow-lg
        rounded-md
        w-auto
        success
      "
      style="position: fixed"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="font-semibold">{{ this.text }}</span>
      </div>
    </div>
    <input type="checkbox" id="createAffilication" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD HEI AFFILIATION</div>
            <p class="py-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit lore
            </p>
            <form>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">HEI AFFILIATION</label>
                    <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter affliation" />
                </div>
            </form>
            <div class="modal-action">
                <label for="createAffilication" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none">Submit</label>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle ">
            <div class="modal-box">
                <div class="text-brand-darkblue font-bold label-xl">Add RQAT Account</div>
                <p class="text-sm xxs:leading-tight text-grey-200">

                    Are you sure you want to add this account?
                    </p>
                <div class="modal-action">
                    <label for="my-modal-6"  class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            " >Cancel</label>
                <label for="my-modal-6" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="addRQAT()">Continue</label>
                </div>
            </div>
    </div>
  </div>
  <!-- Add AFFILIATION -->
</template>

<script>
import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'
import Parse from "parse";
import useVuelidate from "@vuelidate/core";
import {
    required
} from "@vuelidate/validators";

export default {
    name: "AddRQATView",
    components: {
      VueInstantLoadingSpinner
    },

  data() {
    return {
      showModal: false,
      showModal1: false,
      savingSuccessful: false,
      v$: useVuelidate(),
      heis: [
        {
          title: "None",
        }
      ],
      lastname: "",
      firstname: "",
      midinit: "",
      username: "",
      contactnum: "",
      hei_affil: "None",
    };
  },
  validations() {
    return {
      lastname: {
        required,
      },
      firstname: {
        required,
      },
      midinit: {
        required,
      },
      username: {
        required,
      },
      contactnum: {
        required,
      },
      hei_affil: {
        required,
      },
    };
  },
  methods: {
    ToggleshowModal() {
      this.showModal = !this.showModal;
    },
    validationStatus: function (validation) {
      return typeof validation !== "undefined" ? validation.$error : false;
    },

    submit: function () {
      this.v$.$touch();
      if (!this.v$.$pending || !this.v$.$error) return;
    },

    validate(){
      
      return this.showModal1;
            
    },

    
  async addRQAT() {
        const newRQAT = new Parse.User();

        var rqatName = {
          lastname: this.lastname,
          firstname: this.firstname,
          middleinitial: this.midinit,
        };

        newRQAT.set("name", rqatName);
        newRQAT.set("username", this.username);
        newRQAT.set("password", "password");
        newRQAT.set("contact_num", this.contactnum);
        newRQAT.set("hei_affil", this.hei_affil);
        newRQAT.set("access_type", "RQAT");

        

        try {
          this.$refs.Spinner.show();
          setTimeout(function () {
              this.$refs.Spinner.hide();
          }.bind(this), 5000);
          await newRQAT.save().then(() =>{
               setTimeout(() => (this.savingSuccessful = true), 2000);
        });
          setTimeout( () => this.$router.push({ path: "/rqat"}), 3000);
          // if (
          //   confirm("Account added. Would you like to add another account?")
          // ) {
          //   document.location.reload();
          // } else {
          //   this.$router.push("/rqat");
          // }

        } catch (error) {
          alert("Error: " + error.code + " " + error.message);
          document.location.reload();
        }
      
    },
    modal() {
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
  },
  
  mounted: async function () {
        var heis = [];

        const query = new Parse.Query(Parse.User);
        query.equalTo("access_type", "HEI");

        const querResult = await query.find();
        heis.push({
            title: "None",
        });
        for (var i = 0; i < querResult.length; i++) {
            const hei = querResult[i];
            heis.push({
                title: hei.get("hei_name"),
            });
        }
        this.heis = heis;
    },
    
};
</script>

<style>
.main-page {
    align-items: center;
}

.add-hei {
    width: 783px;
}

.line {
    border-width: 1px;
}

.btn-margin {
    margin-left: 10px;
    margin-right: 10px;
}

.text-error {
    color: red;
}
</style>
