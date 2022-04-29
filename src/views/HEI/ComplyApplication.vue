<template>
<div>
    <div class="mx-3">
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

            <div class="overflow-x-auto shadow-lg rounded-lg">
                <div class="py-5 h-full flex flex-col justify-center items-center bg-white">
                    <span class="text-2xl m-5">Upload File</span>
                    <div @drop.prevent="drop; addFile" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
                        <span>Drag or Drop File</span>
                        <span>OR</span>
                        <label for="dropzoneFile">Select File</label>
                        <input type="file" id="dropzoneFile" class="dropzoneFile" />
                    </div>
                    <span class="m-3 font-semibold">File: <span class="text-brand-blue/50">{{ dropzoneFile.name }}</span></span>

                </div>

            </div>
            {{tables}}
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
import {
    ref
} from "vue";
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
            counter: 0,
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
            drop,
            selectedFile
        };
    },
    methods: {
        
        async submitApplication(values) {
            //count how many rows have uploader
            try {
                let requirement = null;
                const applications = Parse.Object.extend("Applications");
                const appQuery = new Parse.Query(applications);
                appQuery.equalTo("objectId", this.id);
                const application = await appQuery.first({
                    useMasterKey: true,
                });

                for (var i = 0; i < this.disapprovedCount; i++) {
                    const file = values.target[i].files[0];
                    console.log(file);
                    console.log(file.name);
                    console.log(file.type);
                    requirement = new Parse.File(
                        file.name.replace(/[^a-zA-Z]/g, ""),
                        file,
                        file.type
                    );
                    this.reqs[this.disapprovedReqs[i]].file = requirement;
                    this.reqs[this.disapprovedReqs[i]].status = "";
                    this.reqs[this.disapprovedReqs[i]].comment = "";
                }
                for (var j = 0; j < this.reqs.length; j++) {
                    this.reqs[j].status = "";
                    this.reqs[j].comment = "";
                }

                application
                    .save({
                        requirements: this.reqs,
                        applicationStatus: "For Approval",
                        selectedSupervisor: "",
                    })
                    .then(
                        (application) => {
                            toast("Application Updated: " + application.id, {
                                    type: TYPE.SUCCESS,
                                    timeout: 3000,
                                    position: POSITION.TOP_RIGHT,
                                }),
                                setTimeout(() => {
                                    this.$router.replace({
                                        path: "/HEIapplication"
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
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error);
            }
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
