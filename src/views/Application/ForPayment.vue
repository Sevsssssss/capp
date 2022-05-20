<template>
<form v-on:submit.prevent="submit">
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
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table v-if="fileCheck() == true" class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Proof of Payment for Application
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Proof of Payment for Evaluation
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            <a :href="applicationPaymentURL" target="_blank" class="text-blue-400">Payment for Application</a>
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            <a :href="evaluationPaymentURL" target="_blank" class="text-blue-400">Payment for Evaluation</a>
                        </th>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <div class="noDataAvail h-full p-20 text-center">
                    No Data Available
                    <!-- <button  type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Notify HEI</div>
                    </button> -->
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center space-x-6 py-10">
            <div class="">
                <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" aria-label="Close">
                    <div>Dismiss</div>
                </button>
            </div>
            <!-- <div v-if="statusShow.includes('Disapproved')">
                <button @click="modalRevise()" for="for-revision" id="for-revision" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Revise
                </button>
            </div> -->
            <div v-if="fileCheck() == true">
                <button @click="modal()" for="for-approval" id="for-approval" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ASSIGN SUPERVISOR</div>

            <div class="flex flex-row py-6 justify-start items-start">
                <div class="month-sort flex flex-row border rounded-md w-full">
                    <select class="font-normal rounded-md select select-ghost select-sm w-full" style="outline: none" id="application_sort" v-model="selectedSupervisor">
                        <option disabled>
                            Select A Supervisor
                        </option>
                        <option v-for="supervisor in supervisors" :key="supervisor" :value="supervisor.id">
                            {{ supervisor.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="modal-action">
                <label for="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label :for="this.selectedSupervisor != 'Select A Supervisor' ? 'for-approval' : '' " class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="this.selectedSupervisor != 'Select A Supervisor' ? submitChanges() : showToastSupervisor()">Continue</label>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">REVISE {{ type }}</div>
            <p class="py-2 text-sm">
                Are you sure??
            </p>
            <div class="modal-action">
                <label for="for-revision" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-revision" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitRevision()">Continue</label>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const toast = useToast();

export default {
    props: ["appID"],
    name: "ForApproval",
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            showModal1: false,
            showModal2: false,
            statusShow: [],
            v$: useVuelidate(),
            comment: [],
            type: "",
            applicationPaymentURL: "",
            evaluationPaymentURL: "",
            supervisors: [],
            selectedSupervisor: "Select A Supervisor",
            el: document.body,
            headers: [{
                    title: "CREDENTIALS",
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
            search: "",
            disapproved: '',
            approved: '',
            fileCheker: false,
        };
    },
    validations() {
        return {
            approved: {
                required,
            },
            disapproved: {
                required,
            },
            comment: {
                required,
            },
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
    methods: {
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },
        validate2() {
            return this.showModal2;
        },
        fileCheck() {
            return this.fileCheker;
        },
        async submitChanges() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();
                application.set("applicationStatus", "For Evaluation");
                application.set("selectedSupervisor", this.selectedSupervisor);

                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been moved for evaluation",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);
                        toast(this.type.toLowerCase() + " has been moved for evalutaion", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,

                            }),
                            console.log("Object Updated: " + application.id);
                    })

                setTimeout(() => {
                    this.$router.push({
                        path: "/application/ " + this.appID.slice(0, 2).join(""),
                    })
                }, 2000);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (error) {
                alert("Error" + error.message);
                console.log(error);
            }
        },
        async submitRevision() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                var requirements = [];

                for (var i = 0; i < this.statusShow.length; i++) {
                    requirements.push({
                        id: application.get("requirements")[i].id,
                        file: application.get("requirements")[i].file,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }
                application.set("requirements", requirements);
                application.set("applicationStatus", "For Revision");
                application.set("paymentStatus", "Verified");

                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application has been moved for revision",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);
                        toast(this.type.toLowerCase() + " has been moved for revision", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,
                            }),
                            console.log("Object Updated: " + application.id);
                    })

                setTimeout(() => {
                    this.$router.replace({
                        path: "/application/ " + this.appID.slice(0, 2).join(""),
                    })
                }, 2000);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (error) {
                alert("Error" + error.message);
                console.log(error);
            }
        },

        modal() {
            var has_error = 0;
            //var error_text = "Account not created due to the following reasons:\n";
            // if (
            //     this.statusShow.filter(x => x == "Approved").length != this.statusShow.length
            // ) {
            //     toast("Please fill out the required information", {
            //         type: TYPE.ERROR,
            //         timeout: 3000,
            //         hideProgressBar: true,
            //         position: POSITION.TOP_RIGHT,
            //     });
            //     has_error = 1;
            // }
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;
            }
        },
        modalRevise() {
            var has_error = 0;
            var missing_comment = 0;
            //var error_text = "Account not created due to the following reasons:\n";
            for (var i = 0; i < this.statusShow.length; i++) {
                if (this.statusShow[i] == 'Disapproved' && this.comment[i] == '')
                    missing_comment++;
            }
            if (
                missing_comment > 0
            ) {
                toast("Please fill out the comment for disapproving the file", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal2 = !this.showModal2;
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

        //Query Application
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();
        this.type = application.get("applicationType");
        if (application.get("payment") != undefined && application.get("payment").length == 2) {
            this.applicationPaymentURL = application.get("payment")[0].file.url()
            this.evaluationPaymentURL = application.get("payment")[1].file.url()
            this.fileCheker = true;
        } else {
            this.fileCheker = false;
        }

        //Query Application Type
        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo(
            "objectId",
            application.get("applicationType")
        );

        const applicationType = await appTypeQuery.first();
        this.email = application.get("email");
        this.rep = application.get("pointPerson");

        //Query Supervisors
        const Designations = Parse.Object.extend("Designations");
        const queryDes = new Parse.Query(Designations);
        queryDes.equalTo("name", "EDUCATION SUPERVISOR");

        const desigQueryResult = await queryDes.first();

        const user = new Parse.Query(Parse.User);
        user.equalTo("designation", desigQueryResult.id);
        const supervisorResult = await user.find();

        var dbSupervisors = [];

        for (var j = 0; j < supervisorResult.length; j++) {
            const sup = supervisorResult[j];

            dbSupervisors.push({
                id: sup.id,
                name: sup.get("name")["lastname"] +
                    ", " +
                    sup.get("name")["firstname"] +
                    " " +
                    sup.get("name")["middleinitial"] +
                    ".",
            })
        }

        this.supervisors = dbSupervisors;

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
