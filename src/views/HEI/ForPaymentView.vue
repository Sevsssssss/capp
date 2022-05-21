<template>
<div>
    <div class="mx-3">
        <div class="flex justify-between items-start">
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal text-sm">
                        Type: <span class="font-semibold">{{ type }}</span>
                    </div>
                    <div class="font-normal text-sm">
                        Date Applied: <span class="font-semibold">{{ dateApplied }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="p-4 text-left space-y-3 uppercase">
                    <div class="font-normal text-sm">
                        Status: <span class="font-semibold">{{ status }}</span>
                    </div>
                </div>
                <!-- <p>ID Number: {{id}}</p> -->
            </div>
        </div>
        <hr />

        <form @submit.prevent="submitPayment" class="m-5">
            <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <div>
                    <span class="">Please Proceed with payment to CHED Region V and upload the receipts here.</span>
                </div>
            </div>

            <div class="overflow-x-auto shadow-lg rounded-lg p-5">
                <div class="">
                    <label class="label">
                        <span class="label-text">Upload Proof of Payment for Application:</span>

                    </label>
                    <input ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                </div>
                <div class="">
                    <label class="label">
                        <span class="label-text">Upload Proof of Payment for Evaluation:</span>

                    </label>
                    <input ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                </div>
            </div>

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
    <div class="m-3">

    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";

const toast = useToast();

export default {
    props: ["id", "statusA"],
    name: "PaymentApplication",
    components: {
        VueInstantLoadingSpinner,
    },
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
            payment: [],
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
            statusTracker: [],
            search: "",
        };
    },
    methods: {
        async submitPayment(values) {
            
            //count how many rows have uploader
            try {
                
                let pay = null;
                const applications = Parse.Object.extend("Applications");
                const appQuery = new Parse.Query(applications);
                appQuery.equalTo("objectId", this.id);
                const application = await appQuery.first({
                    useMasterKey: true,
                });

                for (var i = 0; i < 2; i++) {
                    const file = values.target[i].files[0];
                    pay = new Parse.File(
                        file.name.replace(/[^a-zA-Z]/g, ""),
                        file,
                        file.type
                    );
                    this.payment.push({
                        file: pay,
                        paymentFor: i == 0 ? "Application" : "Evaluation",
                    })
                }

                this.statusTracker.push({
                    status: "For Verification",
                    detail: "Application moved to Verification by CHED",
                    dateTime: new Date(),
                });

                application
                    .save({
                        payment: this.payment,
                        paymentStatus: "For Verification",
                        statusTracker: this.statusTracker,
                    })
                    .then(
                        (application) => {
                            this.$refs.Spinner.show();
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
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
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
            this.statusTracker = application.get("statusTracker")


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
