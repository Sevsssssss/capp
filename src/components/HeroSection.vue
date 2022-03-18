<template>
<div class="text-brand-white">
    <section class="h-screen hero bg-cover bg-fixed bg-center ">
        <div class="flex space-x-10 pl-10 ">
            <!-- Section for Logo and tile -->
            <div class="flex-col p-20 space-y-32 ">
                <!-- LOGO -->
                <div class="flex max-w-md space-x-5 text-left">
                    <div class="">
                        <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px">
                    </div>
                    <div class="">
                        <div class="font-semibold"> REPUBLIC OF THE PHILIPPINES </div>
                        <hr>
                        <div class="label-text"> COMMISION ON HIGHER EDUCATION </div>
                        <p class="text-xs"> REGION OFFICE V </p>
                    </div>
                </div>
                <!-- TITLE -->
                <div class="flex flex-col max-w-xl space-y-10 text-left">
                    <div class="space-y-2">
                        <h1 class="font-body text-2xl"> {{ title }}</h1>
                        <p class="text-sm break-words"> {{ Info }} </p>
                    </div>
                    <div class="">
                        <button class="font-semibold btn-sm bg-brand-darkblue hover:bg-blue-100" v-if="!showModal" @click="toggleModal">Sign In</button>
                    </div>
                </div>
            </div>
            <!-- Section for Login -->
            <div class="flex-col space-y-10 w-full max-w-md mt-10 bg-brand-white hover:shadow-grey-200 text-black-300 rounded-lg " v-if="showModal">
                <div class="flex justify-end pt-5 pr-5 " @click="showModal = false">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- Text -->
                <form class="flex-col space-y-5 text-left p-5 mx-16">
                    <div class="">
                        <span class="text-brand-darkblue font-bold label-xl">Sign In</span>
                        <p class="text-sm">Provide the HEIs credentials</p>
                    </div>
                    <div class="pb-20">
                        <div class="mb-6">
                            <label for="username" class="block mb-2 label-s font-semibold">Username</label>
                            <input type="text" id="usaname" class="bg-brand-white border border-black-200 text-sm rounded-lg focus:ring-grey-100 focus:border-brand-lightblue block w-full p-2.5 " placeholder="Enter username" required="">
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 label-s font-semibold">Password</label>
                            <input type="password" id="password" class="bg-brand-white border border-black-200 text-sm rounded-lg focus:ring-grey-100  focus:border-brand-lightblue block w-full p-2.5 " placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" required="">
                        </div>
                        <button @click="login" type="submit" class="btn-sm font-semibold shadow text-brand-white bg-brand-darkblue hover:bg-blue-100 ">Submit</button>
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
            title: 'CHED APPLICATION MANAGEMENTE SYSTEM',
            Info: 'Lorem asdasda asdasdas asd asd asipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias minus rem omnis aliquid ducimus et neque, dolore itaque cupiditate nostrum pariatur!',
            
        }
    },
    methods: {
        login() {
          this.$router.push("/home");
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
