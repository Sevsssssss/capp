<template>
<div class="flex px-20 xxs:px-10 md:px-0 sm:px-0 xs:px-0 bg-brand-lightblue/10 ">
    <div class="flex flex-col space-y-3 justify-center items-start text-left xxl:m-12 xl:m-12 md:m-10 sm:m-8 xs:m-8 xxs:m-2">
        <h3 class="font-body body-l md:body-m sm:body-m xs:body-text">{{title}}</h3>
        <p class="text-sm " v-for="detail in details" :key="detail">
            {{detail.text}}
        </p>
        <div class="pt-4">
            <button class="btn btn-sm sm:btn-sm lg:btn-md xxl:btn-md bg-brand-darkblue hover:bg-blue-100 border-none">Learn more</button>
        </div>
    </div>
    <div class="p-10 md:py-20 md:items-center hidden md:block">
        <img src="@/assets/img/CardImg.png" alt="img">
    </div>
</div>
</template>

<script>
export default {    
    name: 'LearnMore',
    data() {
        return {    
            title: 'CHED APPLICATION MANAGEMENT SYSTEM',
            details: [
                {text: 'Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.'},
                {text: 'Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.'}
            ],  
        }
    },
    component: {

    }
}
</script>

<style>

</style>
