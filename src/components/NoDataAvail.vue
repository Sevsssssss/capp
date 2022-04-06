<template>
<div class="flex flex-col center" style="padding: 10px; height:100%">
    <div class="noDataAvail">
        No Data Available
    </div>
    <div v-if="names ==='HeiView'">
        <button @click="addHei()" class="
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
                <div class="btn-text">Add HEI</div>
            </div>
        </button>
    </div>
    <div v-else-if="names ==='RqatView'">
        <div class="flex flex-row">
            <button @click="addRQAT()" class="
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
                    <div class="btn-text">Add RQAT</div>
                </div>
            </button>
        </div>
    </div>
    <div v-else-if="names ==='EmployeeView'">
        <button @click="addEmployee()" class="btn btn-primary1 bg-brand-darkblue" style="width: 180px">
            <div class="flex flex-row add-hei-content">
                <svg style="fill:white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" /></svg>
                <div class="btn-text">Add Employee</div>
            </div>
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
