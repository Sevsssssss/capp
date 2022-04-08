<template>
<div>
    <div class="center" style="width:100%; background-color: #F0F3FA; padding:60px">
        <!-- Header -->
        <div class="space-x-5 text-justify center">
            <div class="">

            </div>
            <div class="">
                <div class="font-semibold body-small xxs:leading-tight mb-3"> CHED Porgram Applications Management System </div>
                <p class="font-medium body-small">
                    Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum. Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum
                </p>
            </div>
        </div>
    </div>

    <div class="center mx-10">
        <div class="font-semibold body-small xxs:leading-tight mt-10"> HOW TO APPLY? </div>
        <div class=" grid xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            <div class="flex flex-row p-4" v-for="table in tables" :key="table">
                <div class="font-semibold mr-3" style="font-size: 96px; color:#BDCCF0;">
                    {{table.step}}
                </div>
                <div class="text-left" style="align-self:center;">
                    <div class="font-semibold mb-2">
                         {{table.title}}
                    </div>
                    <div class="body-small xxs:leading-tight text-justify" style="width: 200px">
                         {{table.desc}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
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
