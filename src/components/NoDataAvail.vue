<template>
<div class="flex flex-col center h-full p-5">
    <div class="noDataAvail">
        No Data Available
    </div>
    <div v-if="names ==='HeiView'">
        <button @click="addHei()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2 font-semibold">Add HEI</div>
        </button>
    </div>
    <div v-else-if="names ==='RqatView'">
        <button @click="addRQAT()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2 font-semibold">Add RQAT</div>
        </button>
    </div>
    <div v-else-if="names ==='EmployeeView'">
        <button @click="addEmployee()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2 font-semibold">Add Employee</div>
        </button>
    </div>
    <div v-else-if="names ==='EvalInstView'">
        <button @click="addEvalIns()" class="
              btn btn-md
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            ">
            <div class="flex flex-row">
                <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                <div class="btn-text">Add Evalutation Ins.</div>
            </div>
        </button>
    </div>

</div>
</template>

<script>
export default {
    name: "NoDataAvail",
    props: ["names"],
    methods: {
        addHei() {
            this.$router.push("/hei/add");
        },
        addRQAT() {
            this.$router.push("/rqat/add");
        },
        addEmployee() {
            this.$router.push("/employees/add");
        },
        addEvalIns() {
            this.$router.push("/employees/add");
        },
    },
};
</script>

<style>
</style>
