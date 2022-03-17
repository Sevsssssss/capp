<template>
<div>

</div>
<section class="flex flex-col ml-20">
    <!-- Hero -->
    <div class="flex flex-row p-5">
        <div class="w-1/2 pt-10">
            <!-- Section Logo -->
            <div class="flex flex-row justify-start pr-10">
                <div>
                    <img src="../assets/CHED-Logo.png" alt="ChedLogo" width="90px" height="90px">
                </div>
                <div class="pl-10 leading-normal text-left">
                    <div class="font-semibold text-base"> REPUBLIC OF THE PHILIPPINES </div>
                    <hr>
                    <div class="font-medium text-sm"> COMMISION ON HIGHER EDUCATION </div>
                    <p class="font-normal text-xs"> REGION OFFICE V </p>

                </div>

            </div>
            <!-- Sectin Title -->
            <div class="pt-20 pb-1 text-justify ">
                <h1 class="font-bold text-3xl pt-2"> CHED APPLICATION MANAGEMENT</h1>
                <p class="font-normal text-base pt-2 pb-5 pr-10 w-30"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias minus rem omnis aliquid ducimus et neque, dolore itaque cupiditate nostrum pariatur! </p>

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="!showModal" @click="toggleModal">Sign In</button>
            </div>
        </div>
        <!-- Form -->
        <div class="p-6" v-if="showModal">

            <div class="md:w-auto border rounded-lg ">
                <div class="flex justify-end" @click="showModal = false">
                    <div></div>
                    <div class="p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <form class="overflow-auto pr-32 pl-32 pb-10 m-10 pt-0 text-left w-100 justify-center " @submit.prevent="handleSubmit">
                    <div>
                        <div class="font-bold">
                            {{title}}
                        </div>
                        <p class="label"> {{text}} </p>
                    </div>
                    <label>Username: </label>
                    <input type="username" required v-model="email">
                    <label>Password: </label>
                    <input type="password" required v-model="password">
                    <div v-if="passwordError" class="error">{{passwordError}}</div>

                    <div v-for="skill in skills" :key="skill" class="pill">
                        <span @click="deleteSkill(skill)">{{skill}}</span>
                    </div>

                    <!-- <div class="terms">
                        <input type="checkbox" v-model="terms" required>
                        <label>Accept terms and Conditions</label>
                    </div> -->

                    <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded text-center">
                        <button> Sign In </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
</section>
<br>
<br>
<section class="SectionTwo">
    <h2>How to Apply</h2>
    <p>Use these cards when you want to display content with an image, such as a blog post or product. They’re built with CSS grid to enable the 3-column layout. When you select the “Cards Grid Container,” you’ll see a red icon on the top </p>

    <div class="row">
        <div class="column" style="background-color:#aaa;">
            <h2>Column 1</h2>
            <p>Some text..</p>
        </div>
        <div class="column" style="background-color:#bbb;">
            <h2>Column 2</h2>
            <p>Some text..</p>
        </div>
        <div class="column" style="background-color:#ccc;">
            <h2>Column 3</h2>
            <p>Some text..</p>
        </div>
    </div>

</section>
</template>

<script>
export default {
    name: 'HomeView',
    components: {},
    data() {
        return {
            title: 'Sign In',
            text: 'Provide the HEIs Credentials',
            showModal: false,
            usarname: 'username',
            password: '',
            passwordError: ''
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
        },
        closeModal() {
            this.$emit('close')
        },
        handleSubmit() {
            // validate Submit
            this.passwordError = this.password.length > 5 ?
                '' : 'Passsword must be at least 6 chars long'

            if (!this.passwordError) {
                console.log('username:', this.email)
                console.log('password:', this.password)
            }
        }
    }
}
</script>

<style>
.label {
    color: #aaa;
    display: inline-block;
    margin: 5px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,
select {
    display: block;
    padding: 10px 10px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

.pill {
    display: inline-block;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}

.submit {
    text-align: center;
}

.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.7em;
    font-weight: bold;
}
</style>
