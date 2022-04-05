<template>
<div class="" style="padding: 10px">
    <div class="top-row flex flex-row" style="justify-content: space-between;">
        <TableTopLeft />
        <div class="right-side flex flex-row">
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
    <DataTables :headers="headers" :tables="tables" />
</div>
</template>

<script>
import DataTables from "@/components//Description.vue";
import TableTopLeft from "@/components//TableTopLeft.vue";

export default {
    name: "ApplicationView",
    data() {
        return {
            headers: [{
                    title: "CMO"
                },
                {
                    title: "DESCRIPTION"
                },
                {
                    title: "ACTION"
                },
            ],
            tables: [{
                    cmoNo: "1",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                    
                },
                {
                    cmoNo: "2",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    cmoNo: "3",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    cmoNo: "4",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    cmoNo: "5",
                    description: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
            ],
        };
    },
    components: {
        DataTables,
        TableTopLeft,
    },
    methods: {
        addEvalIns() {
           this.$router.push("/evaluationins/add");
        }, 
    },
};
</script>

<style>
.app-data {
    text-align: left;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    align-items: center;
}

.app-label {
    padding-left: 10px;
    font-size: 14px;
    line-height: 14px;
    text-align: start;
    vertical-align: middle;
    color: #8fa0b9;
    display: block;
}
</style>
