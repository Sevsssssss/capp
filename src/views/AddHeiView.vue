<template>
<div class="main-page flex justify-center items-center p-10">
    <div class="
        card
        justify-center
        items-center
        space-x-3
        bg-brand-white
        shadow-lg
        rounded-lg
        m-3
        p-6
      ">
        <form v-on:submit.prevent="submit" class="card-body">
            <div class="flex flex-row">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
                    </svg>
                </div>
                <h2 class="card-title pl-3">ADD HEI ACCOUNT</h2>
            </div>
            <div class="line"></div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">HEI Name</span>
                </label>
                <input type="text" placeholder="Enter HEI’s name" :class="{'input-error': validationStatus(v$.hei_name)}" class="input  input-bordered w-full" v-model="v$.hei_name.$model" />
                <label class="label">
                    <span v-if="validationStatus(v$.hei_name)" :class="{'text-error': validationStatus(v$.hei_name)}" class="label-text-alt"> HEI Name is Required</span>
                </label>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" :class="{'input-error': validationStatus(v$.username)}" class="input input-bordered w-full" v-model="v$.username.$model" />
                <label class="label">
                    <span class="label-text-alt" :class="{'text-error': validationStatus(v$.username)}" v-if="validationStatus(v$.username)">
                        Username is Required</span>
                </label>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="text" placeholder="Enter Email" :class="{'input-error': validationStatus(v$.email)}"  class="input input-bordered w-full" v-model="v$.email.$model" />
                <label class="label">
                    <span class="label-text-alt" :class="{'text-error': validationStatus(v$.email)}" v-if="validationStatus(v$.email)">
                        Email is Required</span>
                </label>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Address</span>
                </label>
                <input type="text" placeholder="Enter address" :class="{'input-error': validationStatus(v$.address)}"  class="input input-bordered w-full" v-model="v$.address.$model" />
                <label class="label">
                    <span class="label-text-alt" :class="{'text-error': validationStatus(v$.address)}" v-if="validationStatus(v$.address)">
                        Address is Required</span>
                </label>
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder="09*********" :class="{'input-error': validationStatus(v$.number)}"  class="input input-bordered w-full" v-model="v$.number.$model" />
                <label class="label">
                    <span class="label-text-alt" :class="{'text-error': validationStatus(v$.number)}" v-if="validationStatus(v$.number)">
                        Contact Number is Required</span>
                </label>
            </div>
            <div class="flex flex-row">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Institutional Code</span>
                    </label>
                    <input type="text" placeholder="Enter Code" :class="{'input-error': validationStatus(v$.inst_code)}" class="input input-bordered" style="width: 170px" v-model="v$.inst_code.$model" />
                    <label class="label">
                        <span class="label-text-alt" :class="{'text-error': validationStatus(v$.inst_code)}" v-if="validationStatus(v$.inst_code)">
                            Institutional Code is Required</span>
                    </label>
                </div>

                <div class="form-control w-full pl-4">
                    <label class="label">
                        <span class="label-text">HEI Type:</span>
                        <span class="label-text"><a>+ Add Designation</a></span>
                    </label>
                    <select class="select select-bordered w-full" v-model="hei_type">
                        <option v-for="hei in heis" :key="hei">
                            <div class="hei-name">{{ hei.title }}</div>
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex flex-row pt-5">
                <button class="btn btn-margin btn-wide btn-outline">Cancel</button>
                <button class="
              btn btn-margin btn-wide
              submit
              bg-brand-darkblue
              hover:bg-brand-blue
            " @click="addHEI()">
                    Add HEI
                </button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import Parse from "parse";
import useVuelidate from "@vuelidate/core";
import {
    required,
    email,
} from "@vuelidate/validators";

Parse.initialize("capp", "master");
Parse.serverURL = "http://localhost:1337/parse";

export default {
    name: "AddHeiView",

    data() {
        return {
            v$: useVuelidate(),
            heis: [{
                    title: "STATE UNIVERSITIES AND COLLEGES",
                },
                {
                    title: "LOCAL UNIVERSITIES AND COLLEGES",
                },
                {
                    title: "PRIVATE COLLEGES",
                },
                {
                    title: "OTHER GOVERNMENT SCHOOLS",
                },
            ],
            hei_name: "",
            username: "",
            email: "",
            address: "",
            number: "",
            inst_code: "",
            hei_type: "STATE UNIVERSITIES AND COLLEGES",

            hei_nameError: "",
            usernameError: "",
            emailError: "",
            addressError: "",
            numberError: "",
            inst_codeError: "",
            hei_typeError: "",
        };
    },
    validations() {
        return {
            hei_name: {
                required,
            },
            username: {
                required,
            },
            email: {
                required,
                email,
            },
            address: {
                required,
            },
            number: {
                required,
            },
            inst_code: {
                required,
            },
            hei_type: {
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

        addHEI() {
            console.log("Hello")
            // this.v$.$validate();
            // if(!this.v$.$error){
            //     alert('Yey')
            // }else{
            //     alert('nay')
            // }

            const HEIAccount = Parse.Object.extend("HEIAccount");
            const newAccount = new HEIAccount();
            console.log("Hello2")
            var has_error = 0;
            //var error_text = "Account not created due to the following reasons:\n";

            if (this.hei_name == "") {
                has_error = 1;
                //error_text += "HEI Name is empty\n"
                this.hei_nameError = "HEI Name is Required";
            }
            if (this.username == "") {
                has_error = 1;
                //error_text += "Username is empty\n"
                this.usernameError = "Username is Required";
            }
            if (this.address == "") {
                has_error = 1;
                //error_text += "Address is empty\n"
                this.addressError = "Address is Required";
            }
            if (this.number == "") {
                has_error = 1;
                //error_text += "Contact Number is empty\n"
                this.numberError = "Contact Number is Required";
            }
            if (this.inst_code == "") {
                has_error = 1;
                //error_text += "Institution Code is empty\n"
                this.inst_codeError = "Institution Code is Required";
            }

            if (has_error < 1) {
                var password = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < 8; i++ ) {
                    password += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                console.log(password);
                newAccount
                    .save({
                        hei_name: this.hei_name,
                        username: this.username,
                        email: this.email,
                        password: password,
                        address: this.address,
                        number: this.number,
                        inst_code: this.inst_code,
                        hei_type: this.hei_type,
                        
                    })
                    .then(
                        (newAccount) => {
                            alert("Account Added Successfully " + newAccount.id);
                        },
                        (error) => {
                            alert("Account Adding Failed" + error);
                        }
                    );
            }
        },

    },

    components: {},
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
.text-error{
    color: red;
}
</style>
