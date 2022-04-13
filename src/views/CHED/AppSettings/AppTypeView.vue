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
                REQUIREMENTS FOR APPLICATION OF {{AppType}}
            </div>
        </div>
        <div class="">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="font-semibold text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Requirements</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in reqs" :key="i" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4">
                            <th>{{ i.req.id }}</th>
                            </td>
                            <td class="px-6 py-4">
                            <th>{{ i.req.applicationReq }}</th>
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
// import Parse from "parse";
export default {
    name: "AppTypeView",
    components: {},
    props: ["id", "AppType"],
};
</script>
