<template>
<div class="m-3">

    <div class="overflow-x-auto shadow-lg rounded-lg m-3 p-5">
        <div class="flex flex-row justify-center items-center space-x-4">
            <div class="">
                <img src="@/assets/img/CHED_logo.png" class="h-28 w-28" />
            </div>
            <div class="text-left">
                <div class="text-xl font-semibold">Republic of the Philippines</div>
                <div class="">OFFICE OF THE PRESIDENT</div>
                <div class="">COMMISSION ON HIGHER EDUCATION</div>
                <div class="">Regional Office V, Legazpi City</div>
            </div>
        </div>
        <div class="text-center p-5">
            <div class="font-semibold">
                REQUIREMENTS FOR APPLICATION OF {{this.$route.query.appTypeName.toUpperCase()}}
            </div>
        </div>
        <div class="">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="font-semibold text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="text-center px-6 py-3">ID</th>
                            <th class="text-center px-6 py-3">Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in appicationReqs" :key="i" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4">
                            <th class="text-left">{{ i.id}}</th>
                            </td>
                            <td class="px-6 py-4">
                            <th class="text-left">{{ i.name}}</th>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
export default {
    name: "AppTypeView",
    components: {},
    data() {
        return {
            applicationType: [],
            appicationReqs: [],
        };
    },
    methods: {},
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            if (accType[y] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            const ApplicationTypes = Parse.Object.extend("ApplicationTypes");
            const query = new Parse.Query(ApplicationTypes);
            query.equalTo("applicationTypeName", this.$route.query.appTypeName);

            const querResult = await query.find();
            var appReqs = [];
            for (var x = 0; x < querResult[0].get("applicationReqs").length; x++) {
                appReqs.push({
                    id: querResult[0].get("applicationReqs")[x].id,
                    name: querResult[0].get("applicationReqs")[x].applicationReq,
                });
            }
            this.appicationReqs = appReqs;
        }
    },
};
</script>
