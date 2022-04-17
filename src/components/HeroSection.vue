<template>
<div class="text-brand-white">
    <section class="h-screen herobg bg-cover bg-fixed bg-center">
        <div class="flex xxxl:flex-row xxl:flex-row xl:flex-row xs:flex-col space-x-10 sm:space-x-2 xs:space-x-0 xxs:space-x-0 pl-10 sm:pl-10 xs:pl-0 xxs:pl-5 md:pl-4 xxs:items-center xs:items-center md:items-center">
            <!-- Section for Logo and tile -->
            <div class="flex-col space-y-32 md:space-y-20 sm:space-y-14 xs:space-y-14 xxs:space-y-12 xl:p-20 xxxl:p-60 md:p-20 sm:p-10 xs:p-10 xxs:p-10">
                <!-- LOGO -->
                <div class="flex max-w-md space-x-5 text-left">
                    <div class="">
                        <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px" />
                    </div>
                    <div class="" style="align-self: center">
                        <div class="font-semibold body-small xxs:leading-tight">
                            REPUBLIC OF THE PHILIPPINES
                        </div>
                        <hr />
                        <div class="label-text text-brand-white xxs:leading-tight">
                            COMMISION ON HIGHER EDUCATION
                        </div>
                        <p class="text-xs">REGION OFFICE V</p>
                    </div>
                </div>
                <!-- TITLE -->
                <div class="flex flex-col max-w-xl space-y-10 text-left">
                    <div class="space-y-2">
                        <h1 class="font-body xxl:text-2xl xl:text-2xl md:text-2xl sm:text-xl xs:text-xl xxs:text-base">
                            {{ title }}
                        </h1>
                        <p class="text-sm break-words">{{ Info }}</p>
                    </div>
                    <div class="">
                        <button class="font-semibold btn btn-primary border-none bg-brand-darkblue hover:bg-blue-500" v-if="!showModal" @click="toggleModal(), scrollToTop()">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>

            <!-- Section for Login -->
            <div :class="{ 'animate__animated animate__slideInRight': validate2() }" class="flex-col xxl:relative xl:relative md:absolute xs:absolute xxs:absolute xxl:space-y-10 xl:space-y-10 md:space-y-8 sm:space-y-8 xs:space-y-6 xxs:space-y-4 w-full max-w-md mt-10 bg-brand-white hover:shadow-grey-200 text-black-300 rounded-lg" v-if="showModal">
                <div class="flex justify-end pt-5 pr-5" @click="showModal = false">
                    <button type="button">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#828282" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </div>
                <!-- Text -->
                <form v-on:submit.prevent="Login" class="flex-col xxl:space-y-5 xl:space-y-5 sm:space-y-2 xxs:space-y-2 text-left xxl:p-5 xl:p-5 sm:p-2 xxsp-2 xxl:mx-16 xl:mx-16 sm:mx-10 xxs:mx-10">
                    <div class="">
                        <span class="text-brand-darkblue font-bold label-xl">Sign In</span>
                        <p class="text-sm xxs:leading-tight text-grey-200">
                            Provide your credentials
                        </p>
                    </div>
                    <div class="xxl:pb-20 xl:pb-20 sm:pb-10 xxs:pb-10">
                        <div class="mb-6">
                            <label for="username" class="block mb-2 label-s font-semibold text-grey-200">Username</label>
                            <input v-model="v$.username.$model" :class="{
                    'input-error animate__animated animate__headShake':
                      validationStatus(v$.username),
                  }" type="text" id="username" class="xxl:input-md md:input-md xxs:input-sm bg-brand-white border text-grey-200 border-black-200 text-sm rounded-lg focus:ring-grey-100 focus:border-brand-lightblue block w-full p-2.5" placeholder="Enter username" />
                            <label class="label">
                                <span class="label-text-alt" :class="{
                      'text-error animate__animated animate__headShake':
                        validationStatus(v$.username),
                    }" v-if="validationStatus(v$.username)">
                                    {{ usernameErr }}</span>
                            </label>
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 label-s font-semibold text-grey-200">Password</label>
                            <input v-model="v$.password.$model" :class="{
                    'input-error animate__animated animate__headShake':
                      validationStatus(v$.password),
                  }" type="password" id="password" class="xxl:input-md md:input-md xxs:input-sm bg-brand-white text-grey-200 border border-black-200 text-sm rounded-lg focus:ring-grey-100 focus:border-brand-lightblue block w-full p-2.5" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" />
                            <label class="label">
                                <span class="label-text-alt" :class="{
                      'text-error animate__animated animate__headShake':
                        validationStatus(v$.password),
                    }" v-if="validationStatus(v$.password)">
                                    {{ passwordErr }}</span>
                            </label>
                        </div>
                        <div class="flex-row space-x-2 space-y-2">
                            <button for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-primary border-none font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-500">
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box text-left">
                <div class="font-semibold text-grey-100">
                    INVALID CREDENTIALS
                </div>
                <p class="text-sm xxs:leading-tight text-grey-200">
                    Please ensure to provide the correct account credentials. Should you
                    need assistance. Please contact CHED at <span class="text-blue-500">chedrov@chedrov.gov.ph</span>
                </p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800">Ok</label>
                </div>
            </div>
        </div>
    </section>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
</div>
</template>

<script>
import Parse from "parse";
import useVuelidate from "@vuelidate/core";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    required
} from "@vuelidate/validators";

export default {
    name: "HeroSection",
    components: {
        VueInstantLoadingSpinner
    },
    data() {
        return {
            v$: useVuelidate(),
            showModal: false,
            showErr: false,
            title: "CHED APPLICATION MANAGEMENT SYSTEM",
            Info: "Lorem asdasda asdasdas asd asd asipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias minus rem omnis aliquid ducimus et neque, dolore itaque cupiditate nostrum pariatur!",
            username: "",
            password: "",
            usernameErr: "Please Enter your Email",
            passwordErr: "Please Enter your Password",
        };
    },
    validations() {
        return {
            username: {
                required,
            },
            password: {
                required,
            },
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        async Login() {
            Parse.User.logIn(this.username, this.password)
                .then((user) => {
                    if (
                        user.get("access_type") === "SUPER ADMIN" ||
                        user.get("access_type") === "ADMIN" ||
                        user.get("access_type") === "EDUCATION SUPERVISOR" ||
                        user.get("access_type") === "RQAT" ||
                        user.get("access_type") === "REPORTS"
                    ) {
                        this.$router

                            .push({
                                path: "/home",
                            })
                            .catch((err) => {
                                throw new Error(`Problem handling something: ${err}.`);
                            });
                    } else if (user.get("access_type") === "HEI") {
                        this.$router
                            .push({
                                path: "/HEIhome",
                            })
                            .catch((err) => {
                                throw new Error(`Problem handling something: ${err}.`);
                            });
                    }
                })
                .catch((err) => {
                    //alert(err.code);
                    //200 username/email is required.
                    //101 Invalid username/password.
                    if (err.code == "101") {
                        //alert("Invalid Account");
                        this.showErr = !this.showErr;
                    }
                    this.v$.$touch();

                    if (!this.v$.$pending || !this.v$.$error) {
                        return;
                    }
                });
            
        },
        toggleModal() {
            if (Parse.User.current() !== null) {
                const user = Parse.User.current();
                if (
                    user.get("access_type") === "SUPER ADMIN" ||
                    user.get("access_type") === "ADMIN" ||
                    user.get("access_type") === "EDUCATION SUPERVISOR" ||
                    user.get("access_type") === "RQAT" ||
                    user.get("access_type") === "REPORTS"
                ) {
                    this.$router
                        .push({
                            path: "/home",
                        })
                        .catch((err) => {
                            throw new Error(`Problem handling something: ${err}.`);
                        });
                } else if (user.get("access_type") === "HEI") {
                    this.$router
                        .push({
                            path: "/HEIhome",
                        })
                        .catch((err) => {
                            throw new Error(`Problem handling something: ${err}.`);
                        });
                }
            } else {
                this.showModal = !this.showModal;
            }
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },

        validate() {
            return this.showErr;
        },

        validate2() {
            return this.showModal;
        },
        // closeModal() {
        //     this.$emit('close')
        // }
    },
};
</script>

<style></style>
