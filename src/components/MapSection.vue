<template>
<div class="flex xxl:flex-row xl:flex-row md:flex-col sm:flex-col xs:flex-col  justify-start items-start space-y-5 xxl:p-10 xl:p-5 md:p-5 sm:p-5 xss-5 mx-2  ">
    <!-- Map -->
    <div class="mt-6 xxl:mt-2 xl:mt-2 md:mt-3 sm:mt-2 xs:mt-1 sm:pt-0 hidden md:block">
        <img src="../assets/img/Map.png" alt="Map">
    </div>
    <!-- Links -->
    <div class="rounded-lg overflow-hidden shadow-2xl p-16 text-left space-y-5">
        <!-- title -->
        <div class="">
            <span class="xxl:text-2xl xl:text-2xl md:text-xl xxs:label-l font-semibold uppercase">Reach us</span>
            <img class="xxl:ml-12 xl:ml-12 md:ml-10 sm:ml-8 xxs:ml-8 h-1 xxl:w-14 xl:w-14 sm:w-10 xs:w-8 xxs:w-8 rounded-lg" src="../assets/img/line.png" alt="line">
        </div>
        <!-- Content -->
        <div class="flex flex-col space-y-4">
            <!-- address -->
            <div class="flex flex-row xxl:space-x-4 xl:space-x-4 md:space-x-4 xs:space-x-2 xxs:space-x-0  justify-start">
                <svg style="width:34px; height:34px;" viewBox="0 0 24 24" class="hidden xs:block xss:block">
                    <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
                <div class="flex flex-col space-y-1">
                    <div class="text-sm font-semibold text-grey-300">ADDRESS</div>
                    <p class="text-sm tracking-wide"> Brgy. 2 EMs Barrio South, Legazpi City, Albay, 4500 </p>
                </div>
            </div>
            <!-- contact number -->
            <div class="flex flex-row xxl:space-x-4 xl:space-x-4 md:space-x-4 xs:space-x-2 xxs:space-x-0 justify-start">
                <svg style="width:24px; height:24px;" viewBox="0 0 24 24" class="hidden xs:block xss:block">
                    <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                </svg>
                <div class="flex flex-col space-y-1">
                    <div class="text-sm font-semibold text-grey-300">CONTACT NUMBER</div>
                    <p class="text-sm tracking-wide"> (052) 481 5096 </p>
                </div>
            </div>
            <!-- email address -->
            <div class="flex flex-row xxl:space-x-4 xl:space-x-4 md:space-x-4 xs:space-x-2 xxs:space-x-0 justify-start">
                <svg style="width:24px; height:24px;" viewBox="0 0 24 24"  class="hidden xs:block xss:block">
                    <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                </svg>
                <div class="flex flex-col space-y-1">
                    <div class="text-sm font-semibold text-grey-300">EMAIL ADDRESS</div>
                    <p class="text-sm tracking-wide"> cspro5@ched.gov.ph </p>
                </div>
            </div>
        </div>
        <div>
            <a :href="url" class="flex flex-row space-x-4 justify-start items-center">
                <div class="text-sm tracking-wider text-brand-blue uppercase"> Get Direction</div>
                <img src="../assets/img/arrow-right.png" class="h-4 w-8" alt="Map">
            </a>
        </div>

    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            url: "https://www.google.com/maps/place/CHED+Building,+EM's+Barrio+S,+Legazpi+City,+4500+Albay/@13.1429801,123.7234542,17z/data=!3m1!4b1!4m5!3m4!1s0x33a103e6ceb891bb:0xbee29176ea9f50dc!8m2!3d13.1429749!4d123.7256429"
        }
    },
}
</script>

<style>

</style>
