<template>
<div class="main-page flex justify-center items-center p-5 mx-3">
    <div class="space-y-2">
        <div class="p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <form v-on:submit.prevent="submit" class="card-body">
            <div class="flex flex-row space-x-4 text-left justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
                </svg>
                <span class="text-2xl font-semibold text-grey-100">EDIT RQAT ACCOUNT</span>
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
                    <span class="label-text">Email</span>
                </label>
                <input type="email" placeholder="Enter Email" :class="{ 'input-error': validationStatus(v$.email) }" class="input input-bordered w-full" v-model="v$.email.$model" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.email) }" v-if="validationStatus(v$.email)">
                        Email is Required</span>
                </label> -->
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
                        
                    </label>
                    <select class="select select-bordered w-full font-normal" v-model="hei_affil">
                        <option v-for="hei in heis" :key="hei" :value="hei.id">
                            <div class="hei-name">{{ hei.title }}</div>
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex justify-end pt-8 space-x-4">
                <button class="btn btn-m btn-outline" @click="$router.go(-1)">
                    Cancel
                </button>

                <button for="my-modal-6" id="my-modal-6" type="submit" class="border-none btn btn-m submit bg-brand-darkblue hover:bg-brand-blue" @click="modal()">
                    Update Account
                </button>
            </div>
        </form>
    </div>
    <div class="p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <form v-on:submit.prevent="submit" class="card-body">
            <div class="flex flex-row space-x-4 text-left justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
                </svg>
                <span class="text-2xl font-semibold text-grey-100">UPDATE PASSWORD</span>
            </div>
            <div class="">
                <label for="password" class="label label-text">Current Password</label>
                <input type="password" id="password" class="input input-bordered w-full" placeholder="•••••••••" v-model="currPass" required>
            </div>
            <hr> 
            <div class="">
                <label for="password" class="label label-text">Password</label>
                <input type="password" id="password" class="input input-bordered w-full" placeholder="•••••••••" v-model="newPass" required>
            </div>
            <div class="">
                <label for="confirm_password" class="label label-text">Confirm password</label>
                <input type="password" id="confirm_password" class="input input-bordered w-full" placeholder="•••••••••" v-model="newPassConf" required>
            </div>
            <div class="flex justify-end pt-8 space-x-4">
                <button class="btn btn-m btn-outline" @click="$router.go(-1)">
                    Cancel
                </button>

                <button for="my-modal-6" id="my-modal-6" type="submit" class="border-none btn btn-m submit bg-brand-darkblue hover:bg-brand-blue" @click="changePassword()">
                    Update Password
                </button>
            </div>
        </form>
    </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box text-left">
            <div class="font-semibold">ADD RQAT ACCOUNT</div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to update this account?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <button for="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="updateRQAT(), scrollToTop()">
                    Continue
                </button>
            </div>
        </div>
    </div>
</div>
<!-- Add AFFILIATION -->
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";
import useVuelidate from "@vuelidate/core";
import {
    required,
    email
} from "@vuelidate/validators";
const toast = useToast();
export default {
    props: ["rqatID"],
    name: "EditRQATView",
    components: {
        VueInstantLoadingSpinner,
    },

    data() {
        return {
            showModal: false,
            showModal1: false,
            savingSuccessful: false,
            v$: useVuelidate(),
            heis: [{
                title: "None",
            }, ],
            lastname: "",
            firstname: "",
            midinit: "",
            email: "",
            username: "",
            contactnum: "",
            hei_affil: "None",
            current_affil: {
                hei: "",
                affilrecordDate: "",
                affilendDate: "",
            },
            past_affil: [],
            currPass: "",
            newPass: "",
            newPassConf: "",
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
            email: {
                required,
                email,
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
        scrollToTop() {
            window.scrollTo(0, 0);
        },
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

        async updateRQAT() {
            this.$refs.Spinner.show();
            try {
                //Query User's Account
                const rqat = new Parse.Query(Parse.User);
                rqat.equalTo("objectId", this.rqatID);
                const selectedRQAT = await rqat.first({
                    useMasterKey: true,
                });

                var rqatName = {
                    lastname: this.lastname,
                    firstname: this.firstname,
                    middleinitial: this.midinit,
                };

                var months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];
                var today = new Date();
                var month = today.getMonth();
                var day = today.getDate();
                var year = today.getFullYear();
                var currentDay = months[month] + " " + day + ", " + year;

                var heiAffil = {
                    hei: this.hei_affil,
                    affilrecordDate: currentDay,
                    affilendDate: "current",
                };
                this.past_affil.push({
                    hei: this.current_affil.hei,
                    affilrecordDate: this.current_affil.affilrecordDate,
                    affilendDate: currentDay,
                });

                //Set User's updated data
                selectedRQAT.set("name", rqatName);
                selectedRQAT.set("username", this.username);
                selectedRQAT.set("password", "password");
                selectedRQAT.set("contact_num", this.contactnum);
                selectedRQAT.set("hei_affil", heiAffil);
                selectedRQAT.set("past_affil", this.past_affil);

                //Save Users
                await selectedRQAT
                    .save(null, {
                        useMasterKey: true,
                    })
                    .then(() => {
                        toast("RQAT Account Added!", {
                                type: TYPE.SUCCESS,
                                timeout: 3000,
                                position: POSITION.TOP_RIGHT,
                            }),
                            // this.sendEmail()
                            setTimeout(
                                () =>
                                this.$router.push({
                                    path: "/rqat",
                                }),
                                2000
                            );
                    });
            } catch (error) {
                toast("Error:" + error.code + " " + error.message, {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },
        modal() {
            var has_error = 0;
            if (
                this.lastname == "" ||
                this.firstname == "" ||
                this.midinit == "" ||
                this.email == "" ||
                this.username == "" ||
                this.contactnum == ""
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
        async changePassword() {
            const currentUser = Parse.User.current();
            try{
                console.log("Current Password is Correct");
                if(this.newPass == this.newPassConf){
                    currentUser.setPassword(this.newPass)
                    console.log("Password Updated")
                    currentUser.save();
                }
                else {
                    console.log("New Password and Confirm New Password doesn't match")
                }
            } catch(error) {
                console.log("Current Password is wrong");
            }
           
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
            if (accType[y] === "/rqat/assignments") {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

            //Get HEI Access Type
            const AccessType = Parse.Object.extend("AccessTypes");
            const queryACC = new Parse.Query(AccessType);
            queryACC.equalTo("name", "HEI");

            const accQuerResult = await queryACC.first();

            var heis = [];
            
            //Get all users with HEI Access Type
            const query = new Parse.Query(Parse.User);
            query.equalTo("access_type", accQuerResult.id);

            const querResult = await query.find();

            //Save HEIs
            heis.push({
                id: "None",
                title: "None",
            });
            for (var i = 0; i < querResult.length; i++) {
                const hei = querResult[i];
                heis.push({
                    id: hei.id,
                    title: hei.get("hei_name"),
                });
            }
            this.heis = heis;

            //Query and Get RQAT's Object
            const queryRQAT = new Parse.Query(Parse.User);
            queryRQAT.equalTo("objectId", Parse.User.current().id);
            const rqat = await queryRQAT.first({
                useMasterKey: true,
            });

            //Store RQAT's data
            this.lastname = rqat.get("name").lastname;
            this.firstname = rqat.get("name").firstname;
            this.midinit = rqat.get("name").middleinitial;
            this.username = rqat.get("username");
            this.contactnum = rqat.get("contact_num");
            this.email = rqat.get("email");
            this.hei_affil = rqat.get("hei_affil").hei;
            this.current_affil = {
                hei: rqat.get("hei_affil").hei,
                affilrecordDate: rqat.get("hei_affil").affilrecordDate,
            };
            this.past_affil = rqat.get("past_affil");
        }
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
