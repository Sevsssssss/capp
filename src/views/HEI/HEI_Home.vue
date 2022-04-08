<template>
<div class="w-full" style="background-color: #F0F3FA; padding:60px">
    <!-- Header -->'
    <div class="flex flex-row text-left">
        <div class="space-x-5 text-justify"></div>
        <!-- <img src="../assets/img/CHED_logo.png" alt="" > -->
        <div :style="image"></div>
        <div class="space-y-2">
            <div class="font-semibold text-2xl xxs:leading-tight"> CHED Program Applications Management System </div>
            <p class="font-medium body-small">
                Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum. Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum
            </p>
        </div>
    </div>
</div>

<div class="mx-10">
    <div class="font-semibold text-2xl xxs:leading-tight mt-10"> HOW TO APPLY? </div>
    <div class=" grid xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        <div class="flex flex-row p-4" v-for="table in tables" :key="table">
            <div class="font-semibold mr-3" style="font-size: 90px; color:#BDCCF0;">
                {{table.step}}
            </div>
            <div class="text-left " style="align-self:center;">
                <div class="font-semibold">
                    {{table.title}}
                </div>
                <div class="text-sm xxs:leading-tight">
                    {{table.desc}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            image: {
                backgroundImage: "url(../assets/img/CHED_logo.png)"
            },
            tables: [{
                    id: 1,
                    step: "01",
                    title: "Select your Application",
                    desc: "There are 4 Applications to choose from.",
                },
                {
                    id: 2,
                    step: "02",
                    title: "Upload Documents",
                    desc: "Make sure that all the documents are correct.",
                },
                {
                    id: 3,
                    step: "03",
                    title: "Submit Application",
                    desc: "Wait for any updates regarding your Application",
                },
                {
                    id: 4,
                    step: "04",
                    title: "Prepare for Evaluation",
                    desc: "Evaluation will be held onsite",
                },
                {
                    id: 6,
                    step: "05",
                    title: "Wait for Certification",
                    desc: "Wait for the Certificate to be sent.",
                },
            ],
        }
    }

}
</script>

<style>

</style>
