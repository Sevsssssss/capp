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
                <h2 class="card-title pl-3">ADD EMPLOYEE ACCOUNT</h2>
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
                <div class="form-control w-full pr-2">
                    <label class="label">
                        <span class="label-text">Designation:</span>
                        <span class="label-text"><a>+ Add Designation</a></span>
                    </label>
                    <select class="select select-bordered w-full" v-model="v$.emp_designation.$model">
                        <option v-for="designation in designations" :key="designation">
                            <div class="designation">{{ designation.title }}</div>
                        </option>
                    </select>
                </div>

                <div class="form-control w-full pl-2">
                    <label class="label">
                        <span class="label-text">Access Type:</span>
                    </label>
                    <select class="select select-bordered w-full" v-model="v$.access_type.$model">
                        <option v-for="accessType in accessTypes" :key="accessType">
                            <div class="accessType">{{ accessType.title }}</div>
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex flex-row pt-5" style="align-self: center;">
                <button class="btn btn-margin btn-wide btn-outline" @click="$router.go(-1)">Cancel</button>
                <button class="btn btn-margin btn-wide  bg-brand-darkblue hover:bg-brand-blue" @click="addEmployee()">Add Employee</button>
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


export default {
    name: "AddEmployeeView",
    data() {
        return {
            v$: useVuelidate(),
            accessTypes: [{
                    title: "ADMIN",
                },
                {
                    title: "EDUCATION SUPERVISOR",
                },
                {
                    title: "RQAT",
                },
                {
                    title: "REPORTS",
                },
            ],

            designations: [{
                    title: "DIRECTOR",
                },
                {
                    title: "EDUCATION SUPERVISOR",
                },
                {
                    title: "SECRETARY",
                },
                {
                    title: "CHED EMPLOYEE",
                },
            ],

            lastname: "",
            firstname: "",
            midinit: "",
            username: "",
            contactnum: "",
            emp_designation: "DIRECTOR",
            access_type: "ADMIN",
            

         
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
            emp_designation: {
                required,
            },
            access_type: {
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

        async addEmployee() {
            const newEmployee = new Parse.User();
            var has_error = 0;

            if (this.lastname == "" || this.firstname == "" || this.midinit == "" || this.username == "" || this.contactnum == "") {
                has_error = 1;
            }
            
            
         
            if (has_error < 1) {
                var password = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < 8; i++ ) {
                    password += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                var employeeName ={
                    "lastname": this.lastname,
                    "firstname": this.firstname,
                    "middleinitial": this.midinit,
                }

                newEmployee.set("name", employeeName);
                newEmployee.set("username", this.username);
                newEmployee.set("password", password);
                newEmployee.set("contact_num", this.contactnum);
                newEmployee.set("access_type", this.access_type);
                newEmployee.set("designation", this.emp_designation);
                newEmployee.set("user_type", "employee");
                
                try{
                    await newEmployee.save();
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


