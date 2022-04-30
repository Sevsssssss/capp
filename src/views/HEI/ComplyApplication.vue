<template>
<div>
    <div class="mx-3">
        {{filesReturned}}
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
        <form @submit.prevent="submitFiles" class="p-4">

            <div class="overflow-x-auto shadow-lg rounded-lg">
                <div class="flex flex-row py-3 px-4 items-center justify-between">
                    <div>
                        DOCUMENTS FOR COMPLIANCE
                    </div>
                    <div v-if="filesReturned.length < 1" class="h-fit pr-5 pt-3 items-center">
                        <button @click="addFile()" type="button" class="btn-table">
                            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                            </svg>
                            <div class="pl-2">Add File</div>
                        </button>
                    </div>
                </div>
                <table v-if="filesReturned.length < 1" class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                        <tr>
                            <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                                {{ header.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(desc, index) in desc" :key="(desc, index)" class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                <input accept=".pdf,.doc" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                                <!-- <a :href="table.file" target="_blank" class="text-blue-400">{{ table.name }}</a> -->
                            </th>
                            <td class="px-6 py-4 w-2/5">
                                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." v-model="desc.desc"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                File
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Comments
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="table in filesReturned" :key="table" class="bg-white border-b">
                            <th v-if="table.comment !== ''" scope="row" class="px-6 py-4 font-medium text-gray-900">
                                <a :href="table.file" target="_blank" class="text-blue-400">{{ table.desc }}</a>
                            </th>
                            <td v-if="table.comment !== ''" class="px-6 py-4">
                                {{ table.comment }}
                            </td>
                            <td v-if="table.comment !== ''" class="flex items-end px-6 py-4">
                                <input v-if="table.comment != ''" accept=".pdf,.doc" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
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
                <button type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    Submit
                </button>
            </div>
        </form>
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
            desc: [],
            filesReturned: [],
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
            descCounter: 0,
        };
    },
    methods: {
        async submitFiles(values) {
            console.log(values)
            var filesToResubmit = [];
            var counter = 0;

            let files = null;
            const applications = Parse.Object.extend("Applications");
            const appQuery = new Parse.Query(applications);
            appQuery.equalTo("objectId", this.id);
            const application = await appQuery.first({
                useMasterKey: true,
            });

            for (var i = 1; i < this.desc.length * 2; i += 2) {
                const file = values.target[i].files[0];
                console.log(file.name)

                files = new Parse.File(
                    file.name.replace(/[^a-zA-Z]/g, ""),
                    file,
                    file.type
                );
                filesToResubmit.push({
                    id: this.counter,
                    file: files,
                    name: files.name,
                    desc: this.desc[counter].desc,
                })
                counter++;
            }

            application.set("resubmittedFiles", filesToResubmit);
            application.set("applicationStatus", "For Verification")
            application
                .save()
                .then(
                    (application) => {
                        toast("Application Updated: " + application.id, {
                                type: TYPE.SUCCESS,
                                timeout: 3000,
                                position: POSITION.TOP_RIGHT,
                            }),
                            setTimeout(() => {
                                this.$router.replace({
                                    path: "/hei/application"
                                });
                            }, 3000);
                        // console.log("New Access Type Added:" + newApplication.id)
                    },
                    (e) => {
                        toast("Application Update Failed: " + e.message, {
                            type: TYPE.ERROR,
                            timeout: 2000,
                            hideProgressBar: true,
                            position: POSITION.TOP_RIGHT,
                        });
                        // alert("Access Type Adding Failed: " + error)
                    }
                );
        },
        addFile() {
            this.desc.push({
                desc: "",
            })
            this.counter = this.counter + 1;
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

            this.filesReturned = application.get("resubmittedFiles");
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
