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
        <div v-if="this.selectedRqat != null && this.selectedRqat  != ''">
            <p class="font-semibold uppercase badge badge-accent text-sm rounded-sm">ASSIGNED To: {{selectedRqat}}</p>
        </div>
        <div v-else class="font-normal text-sm">
            Evaluation Instrument:
            <a href="#" target="_blank" class="text-blue-400"> Click here </a>
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
        <div v-if="supervisorChecker()" class="pr-5">
            <div class="btn border text-white bg-brand-red hover:bg-brand-red/60">
                Request Re-Assign
            </div>
        </div>
        <div v-if="this.selectedRqat != null && this.selectedRqat  != ''">
        </div>
        <div v-else>
            <label for="for-evaluation" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                Assign RQAT
            </label>
        </div>

    </div>
    <input type="checkbox" id="for-evaluation" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ASSIGN RQAT MEMBER</div>
            <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-2">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search for RQAT name" />
                    </div>
            <!-- Filter -->
           <div class="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xxs:grid-cols-1 text-left pt-5">
                <label v-for="rqat in Rqat" :key="rqat" :value="rqat.id" class="flex flex-row cursor-pointer p-1" style="align-items: center">
                    <input type="checkbox" class="checkbox mr-1" value="/application" v-model="checkedAccessTypes" />
                    <div class="label-text viewSubCatbool" style="align-self: center">
                         {{ rqat.name }}
                    </div>
                </label>
            </div>
            <div class="modal-action">
                <label for="for-evaluation" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label @click="this.selectedRQAT != 'Select RQAT Member' ? assignRQAT() : showToastSupervisor()" class="btn btn-sm rounded-md bg-blue-700 hover:bg-blue-800 border-none">Assign</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";

const toast = useToast();

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
            search: "",
            Rqat: [],
            selectedRqat: '',
            selectedRQAT: "Select RQAT Member",
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
        async assignRQAT() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                application.set("selectedRQAT", this.selectedRQAT);

                application.save().then((application) => {
                    toast(this.type.toLowerCase() + " has been assigned to RQAT Member", {
                            type: TYPE.INFO,
                            timeout: 2000,
                            position: POSITION.TOP_RIGHT,
                            hideProgressBar: false,
                            closeButton: false,

                        }),
                        console.log("Object Updated: " + application.id);
                });
                setTimeout(() => {
                    this.$router.push({
                        path: "/application/ " + this.appID.slice(0, 2).join(""),
                    })
                }, 2000);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (error) {
                alert(error.message)
            }

        },
        showToastSupervisor() {
            toast("Please select the required supervisor", {
                type: TYPE.ERROR,
                timeout: 3000,
                hideProgressBar: true,
                position: POSITION.TOP_RIGHT,
            });
        }
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
        this.email = application.get("email");
        this.rep = application.get("pointPerson");
        this.selectedRqat = application.get("selectedRQAT");

        //Get to view applications to specific user (Education Supervisor)
        if (Parse.User.current().get("designation") == "EDUCATION SUPERVISOR") {
            query.equalTo("selectedSupervisor", Parse.User.current().id);
            query.equalTo("applicationStatus", "For Evaluation");
            this.supervisor = true;
        }

        appTypeQuery.equalTo("objectId", application.get("applicationType"));

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

        //Query RQAT
        const AccessTypeRQAT = Parse.Object.extend("AccessTypes");
        const queryACCR = new Parse.Query(AccessTypeRQAT);
        queryACCR.equalTo("name", "RQAT");

        const accQuerResultRQAT = await queryACCR.first();

        const user = new Parse.Query(Parse.User);
        user.equalTo("access_type", accQuerResultRQAT.id);
        const rqatResult = await user.find();

        var dbRqat = [];

        for (var j = 0; j < rqatResult.length; j++) {
            const rqat = rqatResult[j];

            dbRqat.push({
                id: rqat.id,
                name: rqat.get("name")["lastname"] +
                    ", " +
                    rqat.get("name")["firstname"] +
                    " " +
                    rqat.get("name")["middleinitial"] +
                    ".",
            });
        }

        this.Rqat = dbRqat;
    },
};
</script>

<style></style>
