<template>
  <div class="main-page flex justify-center items-center p-5">
    <div
      class="
        card
        over
        p-4
        w-fit
        bg-white
        rounded-lg
        border border-gray-200
        shadow-md
      "
    >
      <form v-on:submit.prevent="submit" class="card-body">
        <div
          class="flex flex-row space-x-4 text-left justify-start items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"
            />
          </svg>
          <span class="text-2xl font-semibold text-grey-100"
            >UPDATE EMPLOYEE ACCOUNT</span
          >
        </div>
        <div class="line"></div>
        <div class="flex flex-row">
          <div class="form-control w-full pr-4">
            <label class="label">
              <span class="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              :class="{ 'input-error': validationStatus(v$.lastname) }"
              class="input input-bordered w-full"
              v-model="v$.lastname.$model"
            />
            <label class="label">
              <span
                class="label-text-alt"
                :class="{ 'text-error': validationStatus(v$.lastname) }"
                v-if="validationStatus(v$.lastname)"
              >
                Lastname is Required</span
              >
            </label>
          </div>

          <div class="form-control w-full pr-4">
            <label class="label">
              <span class="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              :class="{ 'input-error': validationStatus(v$.firstname) }"
              class="input input-bordered w-full"
              v-model="v$.firstname.$model"
            />
            <label class="label">
              <span
                class="label-text-alt"
                :class="{ 'text-error': validationStatus(v$.firstname) }"
                v-if="validationStatus(v$.firstname)"
              >
                Firstname is Required</span
              >
            </label>
          </div>

          <div class="form-control" style="width: 200px">
            <label class="label">
              <span class="label-text">M.I.</span>
            </label>
            <input
              type="text"
              placeholder="M.I."
              :class="{ 'input-error': validationStatus(v$.midinit) }"
              class="input input-bordered w-full"
              v-model="v$.midinit.$model"
            />
            <label class="label">
              <span
                class="label-text-alt"
                :class="{ 'text-error': validationStatus(v$.midinit) }"
                v-if="validationStatus(v$.midinit)"
              >
                Required</span
              >
            </label>
          </div>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            :class="{ 'input-error': validationStatus(v$.username) }"
            class="input input-bordered w-full"
            v-model="v$.username.$model"
          />
          <label class="label">
            <span
              class="label-text-alt"
              :class="{ 'text-error': validationStatus(v$.username) }"
              v-if="validationStatus(v$.username)"
            >
              Username is Required</span
            >
          </label>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            :class="{ 'input-error': validationStatus(v$.email) }"
            class="input input-bordered w-full"
            v-model="v$.email.$model"
          />
          <label class="label">
            <span
              class="label-text-alt"
              :class="{ 'text-error': validationStatus(v$.email) }"
              v-if="validationStatus(v$.email)"
            >
              Email is Required</span
            >
          </label>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Contact Number</span>
          </label>
          <input
            type="text"
            placeholder="09*********"
            :class="{ 'input-error': validationStatus(v$.contactnum) }"
            class="input input-bordered w-full"
            v-model="v$.contactnum.$model"
          />
          <label class="label">
            <span
              class="label-text-alt"
              :class="{ 'text-error': validationStatus(v$.contactnum) }"
              v-if="validationStatus(v$.contactnum)"
            >
              Contact Number is Required</span
            >
          </label>
        </div>
        <div class="flex flex-row">
          <div class="form-control w-full pr-2">
            <label class="label">
              <span class="label-text">Designation:</span>
            </label>
            <select
              class="select select-bordered w-full"
              v-model="v$.emp_designation.$model"
            >
              <option v-for="designation in designations" :key="designation">
                <div class="designation">{{ designation.title }}</div>
              </option>
            </select>
          </div>

          <div class="form-control w-full pl-2">
            <label class="label">
              <span class="label-text">Access Type:</span>
            </label>

            <select
              class="select select-bordered w-full"
              v-model="v$.access_type.$model"
            >
              <option v-for="accessType in accessTypes" :key="accessType">
                <div class="accessType">{{ accessType.title }}</div>
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-end pt-8 space-x-4">
          <button class="btn btn-m btn-outline" @click="$router.go(-1)">
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
            Update Employee
          </button>
        </div>
      </form>
    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <div
      :class="{ 'modal-open ': validate() }"
      class="modal modal-bottom sm:modal-middle"
    >
      <div class="modal-box">
        <div class="text-brand-darkblue font-bold label-xl">
          Add Employee Account
        </div>
        <p class="text-sm xxs:leading-tight text-grey-200">
          Are you sure you want to add this account?
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
              bg-blue-700
              hover:bg-blue-800
              rounded-md
              border-none
            "
            @click="addEmployee()"
            >Continue</label
          >
        </div>
      </div>
    </div>
  </div>
  <!-- Add Employee Type -->
</template>

<script>
import { useToast, TYPE, POSITION } from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
// import emailjs from 'emailjs-com';

const toast = useToast();

export default {
  name: "AddEmployeeView",
  components: {
    VueInstantLoadingSpinner,
  },
  data() {
    return {
      showModal: false,
      showModal1: false,
      savingSuccessful: false,
      v$: useVuelidate(),
      accessTypes: [],

      designations: [],

      lastname: "",
      firstname: "",
      midinit: "",
      email: "",
      username: "",
      contactnum: "",
      emp_designation: "",
      access_type: "",
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
      email: {
        email,
        required,
      },
      emp_designation: {
        required,
      },
      access_type: {
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
    validate() {
      return this.showModal1;
    },
    async addEmployee() {
      const newEmployee = new Parse.User();

      var employeeName = {
        lastname: this.lastname,
        firstname: this.firstname,
        middleinitial: this.midinit,
      };

      newEmployee.set("name", employeeName);
      newEmployee.set("username", this.username);
      newEmployee.set("password", "password");
      newEmployee.set("email", this.email);
      newEmployee.set("contact_num", this.contactnum);
      newEmployee.set("access_type", this.access_type);
      newEmployee.set("designation", this.emp_designation);
      newEmployee.set("user_type", "employee");
      newEmployee.set("hasTransactions", false);

      try {
        await newEmployee.save().then(() => {
          toast("Employee Account Added!", {
            type: TYPE.SUCCESS,
            timeout: 2000,
            position: POSITION.TOP_RIGHT,
          });
          this.sendEmail().then(() => {
            setTimeout(
              () =>
                this.$router.push({
                  path: "/hei",
                }),
              1000
            );
          });
        });
        this.$refs.Spinner.show();
        setTimeout(
          function () {
            this.$refs.Spinner.hide();
          }.bind(this),
          2000
        );
      } catch (error) {
        toast("Error:" + error.code + " " + error.message, {
          type: TYPE.ERROR,
          timeout: 3000,
          hideProgressBar: true,
          position: POSITION.TOP_RIGHT,
        });
        console.log(error.message);
      }
    },
    modal() {
      var has_error = 0;
      if (
        this.lastname == "" ||
        this.firstname == "" ||
        this.midinit == "" ||
        this.username == "" ||
        this.contactnum == "" ||
        this.email == null
      ) {
        has_error = 1;
      }

      if (has_error < 1) {
        // var password = "";
        // var characters =
        //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // var charactersLength = characters.length;
        // for (var i = 0; i < 8; i++) {
        //     password += characters.charAt(
        //         Math.floor(Math.random() * charactersLength)
        //     );
        //}
        this.showModal1 = !this.showModal1;
      }
    },
    mounted: async function () {
      // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
      const AccessTypes = Parse.Object.extend("AccessTypes");
      const query = new Parse.Query(AccessTypes);
      query.equalTo("name", Parse.User.current().get("access_type"));

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
      }
    },
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
