<template>
<div>
    <div class="w-full" style="background-color: #f0f3fa; padding: 60px">
        <!-- Header -->'
        <div class="flex flex-row text-left space-x-4">
            <!-- <img src="../assets/img/CHED_logo.png" alt="" > -->
            <img src="@/assets/img/CHED_logo.png" class="h-28 w-28" />
            <div class="flex flex-col justify-start items-start space-y-2">
                <div class="font-semibold text-2xl xxs:leading-tight">
                    CHED Program Applications Management System
                </div>
                <p class="font-medium body-small">
                    The CHED Programs Application Management System was developed in order to have a more efficient
                    and effective way of managing HEIs program applications. This system should take away the hassle
                    of the manual application process that the CHED is currently implementing. The system will consist
                    of two (2) main systems which are the CHED who will use the admin side and the HEIs who will utilize
                    the client side of the application/system. </p>
            </div>
        </div>
    </div>
    <div class="mx-10 pb-8">
        <div class="font-semibold text-2xl xxs:leading-tight mt-10">
            HOW TO APPLY?
        </div>
        <div class="
          grid
          xxl:grid-cols-3
          xl:grid-cols-3
          lg:grid-cols-3
          md:grid-cols-2
          sm:grid-cols-2
        ">
            <div class="flex flex-row p-4" v-for="table in tables" :key="table">
                <div class="font-semibold mr-3" style="font-size: 90px; color: #bdccf0">
                    {{ table.step }}
                </div>
                <div class="text-left" style="align-self: center">
                    <div class="font-semibold">
                        {{ table.title }}
                    </div>
                    <div class="text-sm xxs:leading-tight">
                        {{ table.desc }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from 'parse'
export default {
    data() {
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
        };
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === '/hei/home') {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
            console.log("HEI Home page");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

        }
    },
};
</script>

<style>
</style>
