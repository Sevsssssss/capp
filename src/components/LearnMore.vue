<template>
<div class="flex px-20 xxs:px-10 md:px-0 sm:px-0 xs:px-0 bg-brand-lightblue/10 xxs:py-10 md:py-0 xl:py-0 xxl:py-0">
    <div class="flex justify-between">
        <div class="flex flex-col xxl:space-y-3 xl:space-y-4 md:space-y-2 sm-space-y-1 xxs:space-y-3 justify-center items-start text-left xxl:m-12 xl:m-12 md:m-10 sm:m-8 xs:m-8 xxs:m-2">
        <h3 class="font-body xxs:body-text md:body-m sm:body-m xs:body-text xl:text-xl xxs:leading-tight ">{{title}}</h3>
        <p class="text-sm w-3/4" v-for="detail in details" :key="detail">
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum. Et has minim elitr
            intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit
            quaerendum. At nam minimum ponderum. Est audiam animal molestiae te.
            Ex duo eripuit mentitum </p>
        <div class="pt-4">
            <button class="btn btn-primary  bg-brand-darkblue hover:bg-blue-500 border-none">Learn more</button>
        </div>
    </div>
    <div class="px-10 py-5 md:py-10 hidden lg:block w-full">
        <img src="@/assets/img/CardImg.png" alt="img">
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'LearnMore',
    data() {
        return {
            title: 'CHED PROGRAMS APPLICATION MANAGEMENT SYSTEM',
            details: [{
                text: ''
            }],
        }
    },
    component: {

    }
}
</script>

<style>

</style>
