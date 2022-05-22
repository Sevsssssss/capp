<template>
<div class="mx-3">
    <div class="py-4 px-1">
        <div class="flex justify-start space-x-4">
            <div class="font-normal text-sm">
                Point Person: <span class="font-semibold">{{ rep }}</span>
            </div>
            <div class="font-normal text-sm">
                Email: <span class="font-semibold">{{ email }}</span>
            </div>
        </div>
    </div>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in searchHEI" :key="table" class="bg-white border-b ">
                    <th scope="row" class=" px-6 py-4  font-medium text-gray-900  text-wrap break-words">
                        {{table.credential}}
                    </th>
                    <td class="px-6 py-4 text-blue-400">
                        <a :href="table.file" target="_blank" class="text-blue-400">view</a>
                    </td>
                    <td class="px-6 py-4">
                        <svg v-if="table.status == 'Approved'" :name="table.id" :id="table.id" class="check" width="24" height="24" style="fill: green">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                        <p v-else></p>
                        <!--<input type="radio"  :id="'approved ' + table.id" :value="'approved ' + table.id" class="radio" v-model="statusShow">-->
                    </td>
                    <td class="px-6 py-4">
                        <svg v-if="table.status == 'Disapproved'" :name="table.id" :id="table.id" class="check" width="24" height="24" style="fill: green">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                        <!--<input type="radio" :id="'disapproved ' + table.id" :value="'disapproved ' + table.id" class="radio" v-model="statusShow">-->
                    </td>
                    <td class="px-6 py-4">
                        <p :name="table.id" :id="table.id" :v-model="comment[table.id - 1]" @change="comment[table.id - 1]"> {{table.comment}} </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex flex-row center pt-10">
        <div class="pr-5">
            <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                <div>BACK</div>
            </button>
        </div>
        <!-- <div>
            <label for="for-approval" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                Re-Submit</label>
        </div> -->
    </div>
</div>
</template>

<script>
import Parse from "parse";
export default {
    props: ["appID"],
    name: "ForRevision",
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
                {
                    title: "APPROVED",
                },
                {
                    title: "DISAPPROVED",
                },
                {
                    title: "COMMENTS",
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
        this.email = application.get("email");
        this.rep = application.get("pointPerson");
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
                status: application.get("requirements")[i].status,
                comment: application.get("requirements")[i].comment,
            });
        }

        this.tables = storedApplications;
    },
};
</script>

<style>

</style>
