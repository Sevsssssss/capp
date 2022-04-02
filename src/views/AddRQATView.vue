<template>
<div class="main-page flex justify-center items-center p-10">
    <div class=" card justify-center items-center space-x-3 bg-brand-white shadow-lg rounded-lg m-3 p-6">
        <form v-on:submit.prevent="submit" class="card-body">
            <div class="flex flex-row">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" /></svg>
                </div>
                <h2 class="card-title pl-3">ADD RQAT ACCOUNT</h2>
            </div>
            <div class="line"></div>

            <div class="flex flex-row">
                <div class="form-control w-full pr-4">
                    <label class="label">
                        <span class="label-text">Last Name</span>
                    </label>
                    <input type="text" placeholder="Last Name" :class="{'input-error': validationStatus(v$.lastname)}" class="input input-bordered w-full" v-model="v$.lastname.$model"/>
                    <label class="label">
                        <span class="label-text-alt" :class="{'text-error': validationStatus(v$.lastname)}" v-if="validationStatus(v$.lastname)"> Lastname is Required</span>
                    </label>
                </div>

                <div class="form-control w-full pr-4">
                    <label class="label">
                        <span class="label-text">First Name</span>
                    </label>
                    <input type="text" placeholder="First Name" :class="{'input-error': validationStatus(v$.firstname)}" class="input input-bordered w-full" v-model="v$.firstname.$model"/>
                    <label class="label">
                        <span class="label-text-alt" :class="{'text-error': validationStatus(v$.firstname)}" v-if="validationStatus(v$.firstname)">
                        Firstname is Required</span>
                    </label>
                </div>

                <div class="form-control" style="width: 200px;">
                    <label class="label">
                        <span class="label-text">M.I.</span>
                    </label>
                    <input type="text" placeholder="M.I." :class="{'input-error': validationStatus(v$.midinit)}" class="input input-bordered w-full" v-model="v$.midinit.$model"/>
                    <label class="label">
                        <span class="label-text-alt" :class="{'text-error': validationStatus(v$.midinit)}" v-if="validationStatus(v$.midinit)">
                        Middle Initial is Required</span>
                    </label>
                </div>

            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" :class="{'input-error': validationStatus(v$.username)}" class="input input-bordered w-full" v-model="v$.username.$model"/>
                <label class="label">
                        <span class="label-text-alt" :class="{'text-error': validationStatus(v$.username)}" v-if="validationStatus(v$.username)">
                        Username is Required</span>
                </label>
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder="09*********" :class="{'input-error': validationStatus(v$.contactnum)}" class="input input-bordered w-full" v-model="v$.contactnum.$model"/>
                <label class="label">
                        <span class="label-text-alt" :class="{'text-error': validationStatus(v$.contactnum)}" v-if="validationStatus(v$.contactnum)">
                        Contact Number is Required</span>
                </label>
            </div>
            <div class="flex flex-row">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">HEI Affiliation:</span>
                        <span class="label-text"><a>+ Add Designation</a></span>
                    </label>
                    <select class="select select-bordered w-full" v-model="v$.hei_affil.$model">
                        <option v-for="hei in heis" :key="hei">
                            <div class="hei-name">{{ hei.title }}</div>
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex flex-row pt-5" style="align-self: center;">
                <button class="btn btn-margin btn-wide btn-outline">Cancel</button>
                <button class="btn btn-margin btn-wide  bg-brand-darkblue hover:bg-brand-blue" @click="addRQAT()">Add RQAT</button>
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
    
} from "@vuelidate/validators";

Parse.initialize("capp", "master");
Parse.serverURL = "http://localhost:1337/parse";

export default {
    name: "AddRQATView",

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
            lastname: "",
            firstname: "",
            midinit: "",
            username: "",
            contactnum: "",
            hei_affil: "STATE UNIVERSITIES AND COLLEGES",

            lastnameError: "",
            firstnameError: "",
            midinitError: "",
            usernameError: "",
            contactnumError: "",
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

        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },

        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },

        async addRQAT() {
            const newRQAT = new Parse.User();
            var has_error = 0;

            if (this.lastname == "") {
                has_error = 1;
                //error_text += "HEI Name is empty\n"
                this.lastnameError = "Lastname is Required";
            }
            if (this.firstname == "") {
                has_error = 1;
                //error_text += "Username is empty\n"
                this.firstnameError = "Firstname is Required";
            }
            if (this.midinit == "") {
                has_error = 1;
                //error_text += "Username is empty\n"
                this.midinitError = "Middle Initial is Required";
            }
            if (this.username == "") {
                has_error = 1;
                //error_text += "Address is empty\n"
                this.usernameError = "Username is Required";
            }
            if (this.contactnum == "") {
                has_error = 1;
                //error_text += "Contact Number is empty\n"
                this.contactnumError = "Contact Number is Required";
            }
            
         
            if (has_error < 1) {
                var password = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < 8; i++ ) {
                    password += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                var rqatName ={
                    "lastname": this.lastname,
                    "firstname": this.firstname,
                    "middleinitial": this.midinit,
                }

                newRQAT.set("name", rqatName);
                newRQAT.set("username", this.username);
                newRQAT.set("password", password);
                newRQAT.set("contact_num", this.contactnum);
                newRQAT.set("hei_affil", this.hei_affil);
                newRQAT.set("user_type", "rqat");
                
                try{
                    await newRQAT.signUp();
                }
                catch(error){
                    alert("Error: " + error.code + " " + error.message);
                }

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
