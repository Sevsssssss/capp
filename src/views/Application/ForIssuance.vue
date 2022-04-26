<template>
<div class="mx-3">
    <div class="py-4 px-1 flex justify-between">
        <div class="flex justify-start space-x-4">
            <div class="font-normal text-sm">
                Point Person: <span class="font-semibold">{{ rep }}</span>
            </div>
            <div class="font-normal text-sm">
                Email: <span class="font-semibold">{{ email }}</span>
            </div>
        </div>
    </div>
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
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-wrap break-words">
                        {{ table.credential }}
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
            <label for="for-issuance" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                Completed
            </label>
        </div>

    </div>
    <input type="checkbox" id="for-issuance" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">For Completion</div>
            <p>This action cannot be undone. Are you sure you want this file to be completed?</p>
            <div class="modal-action">
                <label for="for-issuance" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label @click="completed()" class="btn btn-sm rounded-md bg-blue-700 hover:bg-blue-800 border-none">Complete</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import {
//     useToast,
//     TYPE,
//     POSITION
// } from "vue-toastification";
import Parse from "parse";



export default {
    props: ["appID"],
    name: "ForIssuance",
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
            search: "",
            supervisor: false,
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
    methods: {
        supervisorChecker() {
            return this.supervisor;
        },
         completed() {
            try {
                alert("Sample Completed")

            } catch (error) {
                alert(error.message)
            }
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
        appTypeQuery.equalTo("objectId", application.get("applicationType"));
        this.email = application.get("email");
        this.rep = application.get("pointPerson");

        

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
};
</script>

<style></style>
