<template>
<div class="text-brand-white">
    <section class="h-screen hero bg-cover bg-fixed bg-center ">
        <div class="flex xxl:flex-row xl:flex-row xs:flex-col space-x-10 sm:space-x-2 xs:space-x-0 xxs:space-x-0 pl-10 sm:pl-10 xs:pl-0 xxs:pl-5 md:pl-4 xxs:items-center xs:items-center md:items-center">
            <!-- Section for Logo and tile -->
            <div class="flex-col  space-y-32 md:space-y-20 sm:space-y-14 xs:space-y-14 xxs:space-y-12  xl:p-20 md:p-20 sm:p-10 xs:p-10 xxs:p-10">
                <!-- LOGO -->
                <div class="flex max-w-md space-x-5 text-left">
                    <div class="">
                        <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px">
                    </div>
                    <div class="">
                        <div class="font-semibold body-small xxs:leading-tight"> REPUBLIC OF THE PHILIPPINES </div>
                        <hr>
                        <div class="label-text text-brand-white  xxs:leading-tight"> COMMISION ON HIGHER EDUCATION </div>
                        <p class="text-xs"> REGION OFFICE V </p>
                    </div>
                </div>
                <!-- TITLE -->
                <div class="flex flex-col max-w-xl space-y-10 text-left">
                    <div class="space-y-2">
                        <h1 class="font-body xxl:text-2xl xl:text-2xl md:text-2xl sm:text-xl xs:text-xl xxs:text-base"> {{ title }}</h1>
                        <p class="text-sm break-words"> {{ Info }} </p>
                    </div>
                    <div class="">
                        <button class="font-semibold btn btn-primary border-none bg-brand-darkblue hover:bg-blue-100" v-if="!showModal" @click="toggleModal">Sign In</button>
                    </div>
                </div>
            </div>
            <!-- Section for Login -->
            <div class="flex-col xxl:relative xl:relative md:absolute xs:absolute xxs:absolute  xxl:space-y-10 xl:space-y-10 md:space-y-8 sm:space-y-8 xs:space-y-6 xxs:space-y-4  w-full max-w-md mt-10 bg-brand-white hover:shadow-grey-200 text-black-300 rounded-lg " v-if="showModal">
                <div class="flex justify-end pt-5 pr-5" @click="showModal = false">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- Text -->
                <form class="flex-col xxl:space-y-5 xl:space-y-5 sm:space-y-2 xxs:space-y-2 text-left xxl:p-5 xl:p-5 sm:p-2 xxsp-2 xxl:mx-16 xl:mx-16 sm:mx-10 xxs:mx-10">
                    <div class="">
                        <span class="text-brand-darkblue font-bold label-xl">Sign In</span>
                        <p class="text-sm xxs:leading-tight">Provide the HEIs credentials</p>
                    </div>
                    <div class="xxl:pb-20 xl:pb-20 sm:pb-10 xxs:pb-10">
                        <div class="mb-6">
                            <label for="username" class="block mb-2 label-s font-semibold">Username</label>
                            <input type="text" id="usaname" class="xxl:input-md md:input-md xxs:input-sm bg-brand-white border  border-black-200 text-sm rounded-lg focus:ring-grey-100 focus:border-brand-lightblue block w-full p-2.5 " placeholder="Enter username" required="">
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 label-s font-semibold">Password</label>
                            <input type="password" id="password" class="xxl:input-md md:input-md xxs:input-sm bg-brand-white border border-black-200 text-sm rounded-lg focus:ring-grey-100  focus:border-brand-lightblue block w-full p-2.5 " placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" required="">
                        </div>
                        <div class="flex-row space-x-2 space-y-2">
                            <button @click="SuperAdmin" type="submit" class="btn btn-primary border-none font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">Super Admin</button>
                            <!-- <button @click="Admin" type="submit" class="btn-sm font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">Admin</button>
                            <button @click="ChedSupervisor" type="submit" class="btn-sm font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">Education Supervisor</button>
                            <button @click="RQAT" type="submit" class="btn-sm font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">RQAT</button>
                            <button @click="Reporting" type="submit" class="btn-sm font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">Reporting</button>
                            <button @click="HEI" type="submit" class="btn-sm font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">HEI</button> -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: "HeroSection",
    components: {},
    data() {
        return {
            showModal: false,
            title: 'CHED APPLICATION MANAGEMENT SYSTEM',
            Info: 'Lorem asdasda asdasdas asd asd asipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias minus rem omnis aliquid ducimus et neque, dolore itaque cupiditate nostrum pariatur!',
        }
    },
    methods: {
        SuperAdmin() {
            this.$router.push("/home");
        },
        Admin() {
            this.$router.push("/");
        },
         ChedSupervisor() {
            this.$router.push("/");
        },
        RQAT() {
            this.$router.push("/");
        },
        Reporting() {
            this.$router.push("/");
        },
        HEI() {
            this.$router.push("/");
        },
        toggleModal() {
            this.showModal = !this.showModal
        },
        // closeModal() {
        //     this.$emit('close')
        // }
    },

};
</script>

<style>
</style>
