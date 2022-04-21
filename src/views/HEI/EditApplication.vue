<template>
<div>
    <div class="mx-3">
        <div class="flex justify-between items-start">
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal text-md">Type: <span class="font-semibold ">{{ type }}</span> </div>
                    <div class="font-normal text-md">Date Applied: <span class="font-semibold ">{{ dateApplied }}</span> </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal text-md ">Status: <span class="font-semibold">{{ status }}</span> </div>
                </div>
                <!-- <p>ID Number: {{id}}</p> -->
            </div>
        </div>
        <hr>
    </div>
    <div class="m-3">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="table in searchHEI" :key="table" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            {{ table.credential }}
                        </th>
                        <td class="px-6 py-4">
                            {{ table.file }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.comment }}
                        </td>
                        <td class="flex items-end px-6 py-4">
                            <a v-if="table.comment === ''"></a>
                            <input v-if="table.comment != ''" accept=".pdf,.doc" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- BUTTONS -->
        <div class="space-x-6 p-10">
            <button type="button" class="
                w-40
                py-2.5
                px-5
                mr-2
                mb-2
                text-sm
                font-medium
                text-gray-900
                focus:outline-none
                bg-white
                rounded-lg
                border border-gray-200
                hover:bg-gray-100 hover:text-blue-700
              ">
                Cancel
            </button>
            <button type="submit" class="
                submit
                w-40
                text-white
                bg-blue-700
                hover:bg-blue-800
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                mr-2
                mb-2
              ">
                Submit
            </button>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
export default {
    props: ["id"],
    name: "EditHEIapplication",
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: "",
            status: "",
            rep: "",
            email: "",
            type: "",
            dateApplied: "",
            program: "",
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "FILES",
                },
                {
                    title: "COMMENTS",
                },
            ],
            tables: [{
                    credential: "Articles of Incorporation and By-Laws..",
                    file: "ArticlesofInc.pdf",
                    comment: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit.",
                },
                {
                    credential: "Copy(ies) of Transfer of Certificate(s) Title (TCT)",
                    file: "Copy(ies)ofTransferof.pdf",
                    comment: "",
                },
                {
                    credential: "Ownership of School Building",
                    file: "OwnershipofSchoolBuilding.pdf",
                    comment: "",
                },
                {
                    credential: "Campus Development and Landscaping Plan",
                    file: "CampusDevelopme.pdf",
                    comment: "",
                },
            ],
            search: "",
        };
    },

    computed: {
        searchHEI() {
            return this.tables.filter((p) => {
                return (
                    p.credential.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
            });
        },
    },
    mounted: async function () {
        console.log("hi");
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("name", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === "/HEIhome") {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        }
    },
};
</script>

<style></style>
