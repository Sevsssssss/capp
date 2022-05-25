<template>
<section class="min-h-screen">
    <div class="m-5 shadow-lg rounded-lg bg-brand-white">
        <form @submit.prevent="submitApplication">
            <div class="p-5">
                <div class="">
                    <div class="flex-col py-5 ">
                        <div class="flex justify-between items-center bg-brand-lightblue/5 w-full px-5 py-2 rounded-sm">
                            <div class="flex">
                                <div class="font-semibold text-lg">
                                    CHOOSE APPLICATION TYPE
                                </div>
                                <div class="dropdown dropdown-start pl-1 pr-16">
                                    <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </label>
                                    <div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-80">
                                        <div class="card-body flex justify-center m-4">
                                            <h2 class="font-semibold text-sm">
                                                CREDENTIALS FOR {{ selected }}
                                            </h2>
                                            <ul class="list-disc text-left">
                                                <li v-for="i in reqs" :key="i">
                                                    {{ i.req.applicationReq }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex" style="">
                                <select v-on:change="changeItem($event)" class="select select-bordered w-64 uppercase font-semibold">
                                    <option class="" v-for="i in applicationTypes" :key="i" :value="i.href">
                                        {{ i.appType.get("applicationTypeName") }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <!-- <hr /> -->
                        <div class="flex flex-row items-start px-2 pt-4">
                            <div class="form-control w-full max-w-xs mx-4">
                                <label class="label">
                                    <span class="text-sm">Point Person</span>
                                </label>
                                <input :class="{ 'input-error': validationStatus(v$.pointPerson) }" v-model="v$.pointPerson.$model" type="text" placeholder="Enter point person" class="input input-bordered w-full" />
                                <label class="label">
                                    <span v-if="validationStatus(v$.pointPerson)" :class="{'text-error': validationStatus(v$.pointPerson)}" class="label-text-alt">
                                        Point Person is Required
                                    </span>
                                </label>
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Email Address</span>
                                </label>
                                <input :class="{ 'input-error': validationStatus(v$.email) }" v-model="v$.email.$model" type="email" placeholder="Enter email address" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full max-w-xs mx-4">
                                <label class="label">
                                    <span class="label-text">Contact Number</span>
                                </label>
                                <input :class="{ 'input-error': validationStatus(v$.phoneNumber) }" v-model="v$.phoneNumber.$model" maxlength="11" type="number" @input="handleUserInput" placeholder="09*********" class="input input-bordered w-full" />
                            </div>
                        </div>
                        <div class="flex flex-col items-start justify-start px-6 pb-4">
                            <label class="label">
                                <span class="label-text">Program:</span>
                            </label>
                            <select v-model="programSelect" class="select select-bordered  w-fit ">
                                <option v-for="program in programs" :key="program" :value="program.id">
                                    {{program.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!-- Title -->
                    <div class="">
                        <div>
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="font-semibold text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th class="aoe text-center">Requirements</th>
                                        <th class="text-center">File Upload</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="i in reqs" :key="i" class="bg-white border-b hover:bg-gray-50">
                                        <td class="px-6 py-4 w-2/4 overflow-x-auto">
                                        <th class="">{{ i.req.applicationReq }}</th>
                                        </td>
                                        <td class="px-6 py-4 flex justify-end">
                                            <input :id="i.id" ref="file" name="file" class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer focus:outline-none focus:border-transparent" type="file" accept=".pdf,.doc" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- BUTTONS -->
                    <div class="space-x-6 p-10">
                        <button type="button" class="
                w-40
                py-2.5
                px-5
                mr-2
                mb-2
                text-sm
                font-medium
                text-gray-900
                focus:outline-none
                bg-white
                rounded-lg
                border border-gray-200
                hover:bg-gray-100 hover:text-blue-700
              ">
                            Cancel
                        </button>
                        <button @click="scrollToTop()" type="submit" class="
                submit
                w-40
                text-white
                bg-blue-700
                hover:bg-blue-800
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                mr-2
                mb-2
              ">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
</section>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
// import NoDataAvail from "@/components//NoDataAvail.vue";
import {
    required,
    email
} from "@vuelidate/validators";
import Parse from "parse";
const toast = useToast();
export default {
    name: "HEIapply",
    // components: { NoDataAvail,},
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            v$: useVuelidate(),
            pointPerson: "",
            email: "",
            phoneNumber: "",
            selected: "",
            applicationTypes: [],
            reqs: [],
            selProg: "",
            programSelect: "",
            programs: [
                // {
                //   id: 1,
                //   name: "Bachelor of Science in Information Technology",
                // },
            ],
            adminID: "",
        };
    },
    validations() {
        return {
            pointPerson: {
                required,
            },
            email: {
                required,
                email,
            },
            phoneNumber: {
                required,
            },
            programSelect: {
                required,
            }
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        submitApplication(values) {

            var has_error = 0;

            if (this.pointPerson == "" ||
                this.email == "" ||
                this.phoneNumber == "" ||
                this.programSelect == ""
            ) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.$refs.Spinner.show();
                try {
                    var reqFiles = [];
                    let requirement = null;
                    for (var i = 0; i < this.reqs.length; i++) {
                        const file = values.target[5 + i].files[0];
                        // console.log(file);
                        // console.log(file.name);
                        // console.log(file.type);
                        requirement = new Parse.File(
                            file.name.replace(/[^a-zA-Z]/g, ""),
                            file,
                            file.type
                        );
                        reqFiles.push({
                            id: i + 1,
                            file: requirement,
                            status: "",
                            comment: "",
                        });
                    }
                    // const file = values.target[4].files[0];
                    // console.log(file);
                    // console.log(file.name);
                    // console.log(file.type);
                    const application = Parse.Object.extend("Applications");
                    const newApplication = new application();
                    //requirement = new Parse.File(file.name, file, file.type);
                    var currentDate = new Date();
                    var yesterday = currentDate.setDate(currentDate.getDate() - 1);
                    newApplication
                        .save({
                            pointPerson: this.pointPerson,
                            email: this.email,
                            phoneNumber: this.phoneNumber,
                            requirements: reqFiles,
                            applicationType: this.selected,
                            applicationStatus: "For Approval",
                            createdBy: Parse.User.current().id,
                            program: this.programSelect,
                            selectedRQAT: [],
                            selectedSupervisor: '',
                            summary: '',
                            //certificate: '',
                            resubmittedFiles: [],
                            actualSituations: [],
                            remarks: [],
                            recommendation: '',
                            paymentStatus: 'For Verification',
                            complianceDueDate: new Date(yesterday),
                            statusTracker: [{
                                status: "For Approval",
                                detail: "Application was submitted to CHED",
                                dateTime: new Date(),
                            }],
                            inCompliance: false,
                        })
                        .then(
                            (newApplication) => {
                                toast("Application Added: " + newApplication.id, {
                                        type: TYPE.SUCCESS,
                                        timeout: 3000,
                                        position: POSITION.TOP_RIGHT,
                                    }),
                                    setTimeout(() => {
                                        this.$router.replace({
                                            path: "/hei/application"
                                        })
                                    }, 3000);
                                // console.log("New Access Type Added:" + newApplication.id)
                            },
                            (e) => {
                                toast("Application Adding Failed: " + e.message, {
                                    type: TYPE.ERROR,
                                    timeout: 2000,
                                    hideProgressBar: true,
                                    position: POSITION.TOP_RIGHT,
                                });
                                // alert("Access Type Adding Failed: " + error)
                            }
                        );
                    const Notifications = Parse.Object.extend("Notifications");
                    const newNotification = new Notifications();

                    newNotification.set("message", "New Application Created by " + Parse.User.current().get("hei_name"));
                    newNotification.set("date_and_time", new Date())
                    newNotification.set("user", this.adminID)
                    newNotification.set("isRead", false);

                    newNotification.save().then((notif) => {
                        console.log("Notification Saved: " + notif.id);
                    }, (error) => {
                        console.log("Error: " + error.message);
                    });
                } catch (error) {
                    toast("Please fill out the required information", {
                        type: TYPE.ERROR,
                        timeout: 3000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    console.log(error);
                }
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },
        changeItem: function changeItem(event) {
            for (var i = 0; i < this.applicationTypes.length; i++) {
                if (
                    this.applicationTypes[i].appType.get("applicationTypeName") ===
                    event.target.value
                ) {
                    this.showApplicationType(this.applicationTypes[i].appType);
                }
            }
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        handleUserInput(input) {
            var replacedInput = input.target.value
                .replace(/\D/g, "")
                .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !replacedInput[2] ?
                replacedInput[1] :
                "(" +
                replacedInput[1] +
                ") " +
                replacedInput[2] +
                (replacedInput[3] ? "-" + replacedInput[3] : "");
        },
        showApplicationType(appTypeObj) {
            this.selected = appTypeObj.id;
            var appTypeReqs = [];
            for (var i = 0; i < appTypeObj.get("applicationReqs").length; i++) {
                var req = appTypeObj.get("applicationReqs")[i];
                appTypeReqs.push({
                    req,
                });
            }
            // console.log(appTypeReqs);
            this.reqs = appTypeReqs;
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            if (accType[y] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            var applicationTypesMenu = [];
            // var applicationTypeReqs = [];
            const ApplicationTypes = Parse.Object.extend("ApplicationTypes");
            const query = new Parse.Query(ApplicationTypes);
            const queryResult = await query.find();
            if (queryResult !== null) {
                //this.selected = queryResult[0];
                this.showApplicationType(queryResult[0]);
            }
            // this.applicationTypes[0].appType.get('applicationTypeName')
            for (var i = 0; i < queryResult.length; i++) {
                const appType = queryResult[i];
                applicationTypesMenu.push({
                    appType,
                });
            }
            this.totalEntries = queryResult.length;
            this.applicationTypes = applicationTypesMenu;

            //Get Programs
            var programsMat = [];
            const Programs = Parse.Object.extend("Programs");
            const programsQuery = new Parse.Query(Programs);
            const progQueResult = await programsQuery.find();

            for (var j = 0; j < progQueResult.length; j++) {
                const prog = progQueResult[j];

                console.log(prog.get("programName"));
                programsMat.push({
                    id: prog.id,
                    name: prog.get("programName"),
                });
            }
            this.programs = programsMat;

            //Query Admin ID for Notifications
            const AccessType = Parse.Object.extend("AccessTypes");
            const ATquery = new Parse.Query(AccessType);
            ATquery.equalTo("name", "SUPER ADMIN");

            const admin = await ATquery.first();

            const users = new Parse.Query(Parse.User);
            users.equalTo("access_type", admin.id)
            const userAdmin = await users.first();

            this.adminID = userAdmin.id;

        }
    },
};
</script>

<style>
</style>
