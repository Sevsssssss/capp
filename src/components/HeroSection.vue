<template>
<div>
    <section class="h-screen hero bg-cover bg-fixed bg-center text-brand-white">
        <div class="flex flex-row space-x-20 ">
            <!-- Section for Logo and tile -->
            <div class="flex flex-col p-20 space-y-20 ">
                <!-- LOGO -->
                <div class="flex flex-row max-w-md space-x-5 ">
                    <div class="justify-start">
                        <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px">
                    </div>
                    <div class="text-left  ">
                        <div class="text-base font-semibold"> REPUBLIC OF THE PHILIPPINES </div>
                        <hr>
                        <div class="text-base "> COMMISION ON HIGHER EDUCATION </div>
                        <p class="text-xs"> REGION OFFICE V </p>
                    </div>
                </div>
                <!-- TITLE -->
                <div class="flex flex-col text-left  max-w-xl space-y-10 ">
                    <div class="flex flex-col space-y-2">
                        <h1 class="font-bold text-3xl "> CHED APPLICATION MANAGEMENT</h1>
                        <p class="font-normal text-sm break-words "> Lorem asdasda asdasdas asd asd asipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias minus rem omnis aliquid ducimus et neque, dolore itaque cupiditate nostrum pariatur! </p>
                    </div>

                    <div class="justify-start">
                        <button class="font-semibold btn-sm bg-brand-darkblue hover:bg-brand-lightblue" v-if="!showModal" @click="toggleModal">Sign In</button>
                    </div>
                </div>
            </div>
            <!-- Section for Login -->
            <div class="flex flex-col space-y-10 w-full max-w-md mt-5 bg-brand-white text-black-300 rounded-lg " v-if="showModal">
                <div class=" flex justify-end pt-5 pr-5 " @click="showModal = false">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>

                <form class="flex flex-col  space-y-5 text-left p-5 mr-16 ml-16 ">
                    <div class="text-left" >
                        <span class="text-brand-darkblue font-bold label-l">Sign In</span>
                        <p class="text-sm">Provide the HEIs credentials</p>
                    </div>
                    <div class="pb-20">
                        <div class="mb-6">
                            <label for="username" class="block mb-2 label-s font-semibold">Username</label>
                            <input type="text" id="usaname" class="bg-brand-white border border-black-200 text-sm rounded-lg focus:ring-grey-100 focus:border-brand-lightblue block w-full p-2.5 " placeholder="Enter username" required="">
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 label-s font-semibold dark:text-gray-300">Password</label>
                            <input type="password" id="password" class="bg-brand-white border border-black-200 text-sm rounded-lg focus:ring-grey-100  focus:border-brand-lightblue block w-full p-2.5 " required="">
                        </div>

                        <button @click="login" type="submit" class="btn-sm shadow text-brand-white bg-brand-darkblue hover:bg-brand-lightblue font-semibold py-2 px-4 rounded">Submit</button>
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
