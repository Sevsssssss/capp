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

        <form @submit.prevent="submitApplication" class="m-5">
            <div class="alert alert-info shadow-lg my-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Please Proceed with payment to CHED Region V and upload the receipts here.</span>
                </div>
            </div>
            <div class="overflow-x-auto shadow-lg rounded-lg p-5">
                <div class="">
                    <label class="label">
                        <span class="label-text">Upload Proof of Payment for Application:</span>
                        <span class="label-text-alt">required</span>
                    </label>
                    <input ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                </div>
                <div class="">
                    <label class="label">
                        <span class="label-text">Upload Proof of Payment for Evaluation:</span>
                        <span class="label-text-alt">required</span>
                    </label>
                    <input ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                </div>
            </div>
        </form>

        <!-- BUTTONS -->
        <div class="space-x-6 p-10">
            <button type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                Cancel
            </button>
            <button type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" @click="submitFiles()">
                Submit
            </button>
        </div>
    </div>
    <div class="m-3">

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
    props: ["id", "statusA"],
    name: "PaymentApplication",
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
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "FILES",
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
        if (homeType === "/hei/home") {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            var storedReqs = [];
            // Query the application from the db
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
            for (var i = 0; i < application.get("requirements").length; i++) {
                if (application.get("requirements")[i].status == "Disapproved") {
                    this.disapprovedReqs.push(i);
                    this.disapprovedCount++;
                }

                storedReqs.push({
                    credential: appType.get("applicationReqs")[i].applicationReq,
                    file: application.get("requirements")[i].file.name(),
                    comment: application.get("requirements")[i].comment,
                });
            }
            this.tables = storedReqs;
        }
    },
};
</script>

<style></style>
