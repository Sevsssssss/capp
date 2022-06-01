<template>
<div class="flex px-20 xxs:px-10 md:px-0 sm:px-0 xs:px-0 bg-brand-lightblue/10 xxs:py-10 md:py-0 xl:py-0 xxl:py-0">
    <div class="flex justify-between">
        <div class="flex flex-col xxl:space-y-3 xl:space-y-4 md:space-y-2 sm-space-y-1 xxs:space-y-3 justify-center items-start text-left xxl:m-12 xl:m-12 md:m-10 sm:m-8 xs:m-8 xxs:m-2">
            <h3 class="font-body xxs:body-text md:body-m sm:body-m xs:body-text xl:text-2xl xl:font-bold xxs:leading-tight ">{{title}}</h3>
            <p class="text-sm w-3/4 xl:text-normal" v-for="detail in details" :key="detail">
                The CHED Programs Application Management System was developed in order to have a more efficient
                and effective way of managing HEIs program applications. This system should take away the hassle
                of the manual application process that the CHED is currently implementing. The system will consist
                of two (2) main systems which are the CHED who will use the admin side and the HEIs who will utilize
                the client side of the application/system.</p>
            <div class="pt-4">
                <label for="aboutUs" class="btn btn-primary  bg-brand-darkblue hover:bg-blue-500 border-none">About us</label>
            </div>
        </div>
        <div class="px-10 py-5 md:py-10 hidden lg:block w-full">
            <img src="@/assets/img/CardImg.png" alt="img">
        </div>
    </div>

    <input type="checkbox" id="aboutUs" class="modal-toggle" />
    <label for="aboutUs" class="modal cursor-pointer">
        <label class="modal-box relative w-11/12 max-w-5xl" for="">
        <div class="text-left">
            <p class="text-sm text-gray-500">
            The CHED Programs Application Management System was developed in order to have a more efficient 
            and effective way of managing HEIs program applications. This system should take away the hassle 
            of the manual application process that the CHED is currently implementing. The system will consist 
            of two (2) main systems which are the CHED who will use the admin side and the HEIs who will utilize 
            the client side of the application/system.</p>
            <br>
            <p class="text-sm text-gray-500 ">
            The admin side of the application will be utilized by the CHED. This includes a feature that enables 
            them to manage and create accounts for HEIs. When an HEI sends a program application they could monitor 
            and evaluate it using the system. It allows them to check the authenticity of the documents that the 
            HEIs submitted. If the submitted application has a deficiency the CHED staff could send a letter to the 
            HEIs using the application regarding their deficiencies. Once all documents are valid they are now able 
            to process the application. After a successful application, CHED could generate a certificate for government 
            authority to the HEIs. In addition, these process flows are applicable to the 4 main features/categories 
            of the system which are Renewal, Initial Offering, Government Recognition, Certificate of Program Compliance. 
            The system also allows CHED staff to generate reports containing the data of the application if necessary. 
            All these features are possible using the application.</p>
            <br>
            <p class="text-sm text-gray-500">
            The client side of the application will be utilized by the HEIs. They can login and modify their accounts
            which are given by the CHED staff. The system allows HEIs to utilize the 4 main features/categories of the 
            system. For Initial Offering, this section enables them to apply for courses or programs that they will be 
            operating in the coming school year. For Government Recognition, this section will allow them to apply for 
            the recognition of their programs that they are currently operating. For Certificate of Program Compliance, 
            this section will enable them to apply for the certificate that their program is in compliance with the CHED 
            Policies, Standards, and Guidelines. Lastly, the Renewal section would allow them to renew their government 
            authority. All these features require HEIs to upload all the required documents using the system. Once their 
            application is being processed and validated the application will update the status of their application. 
            Otherwise, if their application has deficiency the application will notify them and will receive a letter 
            for document compliance. The system will allow them to reupload or manage their submitted files to the ched 
            if needed. They will be notified once their application is successfut.</p>
        </div>
        </label>
    </label>
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
