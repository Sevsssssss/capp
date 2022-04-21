<template>
<div class="m-3">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in searchHEI" :key="table" class="bg-white border-b ">
                    <th scope="row" class=" px-6 py-4  font-medium text-gray-900 text-wrap break-words">
                        {{table.credential}}
                    </th>
                    <td class="px-6 py-4 text-blue-400">
                       <a :href="table.file" target="_blank" class="text-blue-400">view</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex flex-row center py-10">
        <div class="pr-5">
            <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                <div>Dismiss</div>
            </button>
        </div>
        <div>
            <label for="for-evaluation" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                Assign</label>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
export default {
    props: ["appID"],
    name: "ForEvaluation",
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: [],
            comment: [],
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "FILES",
                },
            ],
            tables: [],
            search: '',
        }
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
        var storedApplications = [];
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();
        this.type = application.get("applicationType");

        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo(
            "objectId",
            application.get("applicationType")
        );

        const applicationType = await appTypeQuery.first();
        for (var i = 0; i < application.get("requirements").length; i++) {
            this.statusShow.push("");
            this.comment.push("");
            storedApplications.push({
                id: application.get("requirements")[i].id,
                credential: applicationType.get("applicationReqs")[i].applicationReq,
                file: application.get("requirements")[i].file.url(),
            });
        }

        this.tables = storedApplications;
    },

}
</script>

<style>

</style>
