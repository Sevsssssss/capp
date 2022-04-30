<template>
<div>
    <div class="mx-3">
        {{tables}}
        <div class="flex justify-between items-start">
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal text-md">
                        Type: <span class="font-semibold">{{ type }}</span>
                    </div>
                    <div class="font-normal text-md">
                        Date Applied: <span class="font-semibold">{{ dateApplied }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal text-md">
                        Status: <span class="font-semibold">{{ status }}</span>
                    </div>
                </div>
                <!-- <p>ID Number: {{id}}</p> -->
            </div>
        </div>
        <hr />
    </div>
    <div class="m-3">

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="divide-x-2">
                        <th scope="col" class="px-6 py-3">EVALUATION REMARKS</th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="divide-x-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            <div class="flex flex-row justify-between">
                                <p class="py-2 font-semibold">Summary</p>
                            </div>

                            <textarea id="summary" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="summary"></textarea>
                        </th>

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            <p class="py-2 font-semibold">Recommendation</p>
                            <textarea id="recommendation" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="recommendation"></textarea>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <form @submit.prevent="submitApplication" class="p-4">

            <div v-if="tables.length < 1" class="overflow-x-auto shadow-lg rounded-lg">
                <div class="py-5 h-full flex flex-col justify-center items-center bg-white">
                    <span class="text-2xl m-5">Upload File</span>
                    <div @drop.prevent="drop; addFile" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
                        <span>Drag or Drop File</span>
                        <span>OR</span>
                        <label for="dropzoneFile">Select File</label>
                        <input type="file" id="dropzoneFile" class="dropzoneFile" />
                    </div>
                </div>
            </div>
            <div v-if="tables.length > 0" class="overflow-x-auto shadow-lg rounded-lg">
                <div class="flex flex-row py-3 px-4 justify-between">
                    <div>
                        DOCUMENTS FOR COMPLIANCE
                    </div>
                    <div @drop.prevent="drop; addFile" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone1 text-right">

                        <label for="dropzoneFile">Add File</label>
                        <input type="file" id="dropzoneFile" class="dropzoneFile" />
                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                        <tr>
                            <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                                {{ header.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(table, index) in tables" :key="(table, index)" class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                <a :href="table.file" target="_blank" class="text-blue-400">{{ table.name }}</a>
                            </th>
                            <td class="px-6 py-4 w-2/5">
                                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." v-model="tables[index].desc"></textarea>
                            </td>
                            <td>
                                <input  accept=".pdf,.doc" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {{table}}
            <!-- BUTTONS -->
            <div class="space-x-6 p-10">
                <button type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                    Cancel
                </button>
                <button type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" @click="submitFiles()">
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
// import {
//     useToast,
//     TYPE,
//     POSITION
// } from "vue-toastification";
import {
    ref
} from "vue";
import Parse from "parse";
//const toast = useToast();
export default {
    props: ["id"],
    name: "ComplyApplication",
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
            disapprovedCount: 0,
            disapprovedReqs: [],
            reqs: [],
            comments: [],
            summary: "",
            recommendation: "",
            headers: [{
                    title: "FILES",
                },
                {
                    title: "DESCRIPTION",
                },
            ],
            search: "",
        };
    },
    setup() {
        const active = ref(false);
        let dropzoneFile = ref("");
        let tables = ref([])
        let counter = ref(0)
        const drop = (e) => {
            dropzoneFile.value = e.dataTransfer.files[0];
            counter.value += 1;
            tables.value.push({
                id: counter.value,
                file: dropzoneFile.value,
                name: dropzoneFile.value.name,
            });
        };
        const selectedFile = () => {
            dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
            counter.value += 1;
            tables.value.push({
                id: counter.value,
                file: dropzoneFile.value,
                name: dropzoneFile.value.name,
                desc: "",
            });
        };
        const toggleActive = () => {
            active.value = !active.value;
        };
        return {
            active,
            toggleActive,
            dropzoneFile,
            tables,
            counter,
            drop,
            selectedFile
        };
    },
    methods: {
        async submitFiles() {
            const ApplicationCollect = Parse.Object.extend("Applications");
            const applQuery = new Parse.Query(ApplicationCollect);
            applQuery.equalTo("objectId", this.id);
            const application = await applQuery.first({
                useMasterKey: true,
            });

            application.set("resubmittedFiles", this.tables);
            application.set("applicationStatus", "For Verification")
            application
                .save()
                .then((application) => {
                    console.log("Object Updated: " + application.id);
                })
        },

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
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === "/hei/home") {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            const applications = Parse.Object.extend("Applications");
            const appQuery = new Parse.Query(applications);
            appQuery.equalTo("objectId", this.id);
            const application = await appQuery.first({
                useMasterKey: true,
            });

            //Query the program of the application
            const programs = Parse.Object.extend("Programs");
            const progQuery = new Parse.Query(programs);
            progQuery.equalTo("objectId", application.get("program"));
            const program = await progQuery.first();
            //Query the applicationType of the application
            const appTypes = Parse.Object.extend("ApplicationTypes");
            const appTypeQuery = new Parse.Query(appTypes);
            appTypeQuery.equalTo("objectId", application.get("applicationType"));
            const appType = await appTypeQuery.first();
            this.status = application.get("applicationStatus");
            this.type = appType.get("applicationTypeName");
            this.program = program.get("programName");
            this.reqs = application.get("requirements");
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            var month = application.createdAt.getMonth();
            var day = application.createdAt.getDate();
            var year = application.createdAt.getFullYear();
            this.dateApplied = months[month] + " " + day + ", " + year;
            this.summary = application.get("summary");
            this.recommendation = application.get("recommendation")
        }
    },
};
</script>

<style scoped>
.dropzone1 label {
    padding: 8px 12px;
    color: #fff;
    background-color: #0E3385;
    transition: 0.3s ease all;
    border-radius: 5px;
}

.dropzone1 input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #C4C4C4;
}

.active-dropzone label {
    background-color: #fff;
    color: #41b883;
}
</style>
