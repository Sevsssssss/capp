<template>
<div class="main-page flex justify-center items-center p-5 mx-5">
    <div class="space-y-2">
        <div class="card over p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <form v-on:submit.prevent="submit" class="card-body">
                <div class="flex flex-row space-x-4 text-left justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
                    </svg>
                    <span class="text-2xl font-semibold text-grey-100">UPDATE HEI ACCOUNT</span>
                </div>
                <div class="line"></div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">HEI Name</span>
                    </label>
                    <input type="text" placeholder="Enter HEI’s name" :class="{ 'input-error': validationStatus(v$.hei_name) }" class="input input-bordered w-full" v-model="v$.hei_name.$model" />
                    <label class="label">
                        <span v-if="validationStatus(v$.hei_name)" :class="{ 'text-error': validationStatus(v$.hei_name) }" class="label-text-alt">
                            HEI Name is Required</span>
                    </label>
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
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.email) }" v-if="validationStatus(v$.email)">
                            Email is Required</span>
                    </label>
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Address</span>
                    </label>
                    <input type="text" placeholder="Enter address" :class="{ 'input-error': validationStatus(v$.address) }" class="input input-bordered w-full" v-model="v$.address.$model" />
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.address) }" v-if="validationStatus(v$.address)">
                            Address is Required</span>
                    </label>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Contact Number</span>
                    </label>
                    <input type="text" placeholder="09*********" :class="{ 'input-error': validationStatus(v$.number) }" class="input input-bordered w-full" v-model="v$.number.$model" />
                    <label class="label">
                        <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.number) }" v-if="validationStatus(v$.number)">
                            Contact Number is Required</span>
                    </label>
                </div>
                
                <div class="flex justify-end pt-4 space-x-4">
                    <button class="btn btn-md btn-outline" @click="$router.go(-1)">
                        Cancel
                    </button>

                    <button for="my-modal-6" id="my-modal-6" type="submit" class="border-none btn btn-md submit bg-brand-darkblue hover:bg-blue-800" @click="modal(), scrollToTop()">
                        Update HEI
                    </button>
                </div>

            </form>
        </div>
        <div class="card over p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md">
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
                    <label for="password" class="label label-text">New Password</label>
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
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box text-left">
            <div class="font-semibold">UPDATE HEI ACCOUNT</div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to update this account?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <button for="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="addHEI(), scrollToTop()">
                    Continue
                </button>
            </div>
        </div>
    </div>
    <!-- <div  :class="{ 'modal-open': showaddAgain() }" class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD ANOTHER ACCOUNT</div>
            <p class="py-2 text-sm">
                Would you like to add another account?
            </p>
            <div class="modal-action">
                <label for="addAgain" @click="this.$router.push('/hei')" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">CANCEL</label>
                <label @click="document.location.reload()" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none">ADD</label>
            </div>
        </div>
    </div> -->
</div>

<!-- Add HEI Type -->
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
import emailjs from "emailjs-com";

const toast = useToast();

export default {
    name: "AccountDetails",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            showModal: false,
            showModal1: false,
            savingSuccessful: false,
            addAgain: false,
            text: "Account added!",
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
            password: "",
            currPass: "",
            newPass: "",
            newPassConf: "",
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
        };
    },
    methods: {
        sendEmail() {
            var emailParams = {
                message: "Your account has been created. \n Your account username is " +
                    this.username +
                    "\n Your temporary password is " +
                    this.password,
                email: this.email,
            };
            try {
                //alert(this.email)
                emailjs
                    .send(
                        "service_rax86wc",
                        "template_nyqa4k6",
                        emailParams,
                        "wXbhKrnQCwo8bc25m"
                    )
                    .then(() => {
                        toast("Email sent!", {
                            type: TYPE.INFO,
                            timeout: 2000,
                            position: POSITION.TOP_RIGHT,
                        });
                    });
            } catch (error) {
                toast("Error:" + error.code + "" + error.message, {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message);
            }
        },
        async changePassword() {
            const currentUser = Parse.User.current();
            console.log(currentUser.get("username"));
            try{
                var testLogin = await Parse.User.logIn(currentUser.get("username"), this.currPass);
                console.log(testLogin)
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
        showaddAgain() {
            return this.addAgain;
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        async addHEI() {
            this.$refs.Spinner.show();
            try {
                this.password = "password";
                const newHEI = new Parse.User();
                newHEI.set("hei_name", this.hei_name);
                newHEI.set("username", this.username);
                newHEI.set("password", "password");
                newHEI.set("email", this.email);
                newHEI.set("address", this.address);
                newHEI.set("number", this.number);
                newHEI.set("inst_code", this.inst_code);
                newHEI.set("hei_type", this.hei_type);
                newHEI.set("access_type", "HEI");
                newHEI.set("hasTransactions", false);
                // Show the spinner first
                // this.$refs.Spinner.show();
                // setTimeout(
                //     function () {
                //         this.$refs.Spinner.hide();
                //     }.bind(this),
                //     5000
                // );
                // await newHEI.save().then(() => {
                //     setTimeout(() => (this.savingSuccessful = true), 2000);
                // });
                // this.sendEmail();
                // setTimeout(() => this.$router.push({
                //     path: "/hei"
                // }), 3000);
                await newHEI.save().then(() => {
                    toast("HEI Account Added!", {
                            type: TYPE.SUCCESS,
                            timeout: 3000,
                            position: POSITION.TOP_RIGHT,
                        }),
                        // this.sendEmail()
                        setTimeout(
                            () =>
                            this.$router.push({
                                path: "/hei/account",
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
                console.log(error.message);
                // alert("Error: " + error.code + " " + error.message);
                //document.location.reload();
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },
        modal() {
            // this.v$.$validate();
            // if(!this.v$.$error){
            //     alert('Yey')
            // }else{
            //     alert('nay')
            // }
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

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
</style>
