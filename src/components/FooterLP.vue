<template>
<div class="bg-brand-darkblue  text-primary-content">
    <footer class="footer footer-center p-10 text-neutral-content rounded">
        <div class="grid grid-flow-col gap-4">
            <label for="aboutUs" class="link link-hover">About us</label>
            <label for="contacts" class="link link-hover">Contact</label>
            <label for="developer" class="link link-hover">Developers</label>
        </div>
        <div>
            <div class="grid grid-flow-col gap-4">
                <div class="flex space-x-4 items-center">
                    <div class=" font-bold">
                        <p class="text-sm tracking-wide"></p>
                    </div>
                    <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="50px" height="50px" />
                    <img src="../assets/img/CcsLogo.png" alt="CssLogo" width="50px" height="50px" />
                    <img src="../assets/img/AteneoLogo.png" alt="AdnuLogo" width="50px" height="50px" />
                </div>
            </div>
        </div>
        <div>
            <p>Copyright © {{new Date().getFullYear()}} - CHED Regional Office V</p>
        </div>
    </footer>
    <!-- Developers -->
    <input type="checkbox" id="developer" class="modal-toggle" />
    <label for="developer" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
            <!-- <div class="font-bold text-gray-500 text-xl flex pb-2">
                Developers
            </div> -->
            <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-12 h-12 rounded-full" src="../assets/img/JMPic.jpg" alt="Joshua image">
                            </div>
                            <div class="flex-1 text-left min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Joshua Matinez
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    joshuamartinez@gbox.adnu.edu.ph
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-12 h-12 rounded-full" src="../assets/img/JoshuaPic.jpg" alt="Joshua image">
                            </div>
                            <div class="flex-1 text-left min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Joshua A. Sarmiento
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    supremojoshua22@gmail.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex justify-between items-end">
                            <div class="flex space-x-4 items-center">
                                <div class="flex-shrink-0">
                                    <img class="w-12 h-12 rounded-full" src="../assets/img/JeffPic.jpg" alt="Jeff image">
                                </div>
                                <div class="flex-1 text-left min-w-0">
                                    <div class="">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Jeff Vincent C. Banday
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            jeffbanday@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-12 h-12 rounded-full" src="../assets/img/DuanePicc.jpeg" alt="Duane image">
                            </div>
                            <div class="flex-1 text-left min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Duane Xavier M. Bondad
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    dxbondad36@gmail.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-12 h-12 rounded-full" src="../assets/img/SaqPic.jpg" alt="Saq image">
                            </div>
                            <div class="flex-1 text-left min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Christian A. Saquillo
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li class="pt-3 pb-0 sm:pt-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-12 h-12 rounded-full" src="../assets/img/SevPic.jpeg" alt="Sev image">
                            </div>
                            <div class="flex-1 text-left min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Severino R. Sarate III
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    sevsarate28@gmail.com
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </label>
    </label>
    <!-- Contacts -->
    <input type="checkbox" id="contacts" class="modal-toggle" />
    <label for="contacts" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
            <!-- Content -->
            <div class="flex flex-col space-y-4 text-left">
                <!-- address -->
                <div class="flex flex-col space-y-1">
                    <div class="text-sm font-bold text-gray-900 truncate dark:text-white">ADDRESS</div>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400"> Brgy. 2 EMs Barrio South, Legazpi City, Albay, 4500 </p>
                </div>
                <!-- contact number -->
                <div class="flex flex-col space-y-1">
                    <div class="text-sm font-bold text-gray-900 truncate dark:text-white">CONTACT NUMBER</div>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400"> (052) 481 5096 </p>
                </div>
                <!-- email address -->
                <div class="flex flex-col space-y-1">
                    <div class="text-sm font-bold text-gray-900 truncate dark:text-white">EMAIL ADDRESS</div>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400"> cspro5@ched.gov.ph </p>
                </div>
            </div>
        </label>
    </label>
    <!-- About us -->
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
export default {}
</script>

<style>

</style>
