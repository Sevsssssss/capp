<template>
<form v-on:submit.prevent="submit">
    <div class="shadow-lg rounded-lg my-3 py-5">
        <div class="flex flex-row justify-center items-center space-x-4 text-sm">
            <div class="">
                <img src="@/assets/img/CHED_logo.png" class="h-28 w-28" />
            </div>
            <div class="text-left">
                <div class="text-xl font-semibold">Republic of the Philippines</div>
                <div class="">OFFICE OF THE PRESIDENT</div>
                <div class="">COMMISSION ON HIGHER EDUCATION</div>
                <div class="">Regional Office V, Legazpi City</div>
            </div>
        </div>
        <div class="text-center p-5 text-sm">
            <!-- <div class="font-semibold">
                REVISED PROCESSING FORM FOR MONITORING AND EVALUATION
            </div> -->
            <div class="font-semibold">{{ Name }}</div>
            <div v-for="cmono in cmoNoYr" :key="cmono">
               <span class="font-normal"> per CMO No. {{cmono.cmoNo}} s. {{cmono.seriesYear}} </span>
            </div>
        </div>
        <div class="flex flex-col text-sm w-full pl-10">
            <div class="flex space-x-8">
                <div class="flex flex-col items-start uppercase font-semibold">
                    <span class="">Name of Institution: </span>
                    <span class="">address: </span>
                    <span class="">Porgram(s): </span>
                    <span class="">Date of Evalution</span>
                </div>
                <div class="flex flex-col items-start">
                    <p class="">{{ instName }}</p>
                    <p class="">{{ address }}</p>
                    <p class="">{{ program }}</p>
                    <p class="">{{ dateApplied }}</p>
                </div>
            </div>
        </div>
        <div>
            <div class="py-4">
                <div class="overflow-x-auto shadow-md m-5">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="divide-x-2">
                                <th scope="col" class="px-6 py-3 text-center" v-for="head in header" :key="head.title">
                                    {{ head.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(cat, catIndex) in eval" :key="(cat, catIndex)">
                            <tr scope="row" class="divide-x-2 bg-white border dark:bg-gray-800 dark:border-gray-700">
                                <td class=" text-center p-5 px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {{ cat.id }}
                                </td>
                                <td  class="aoe font-bold p-2">
                                    {{ cat.name }}
                                </td>
                                <!-- v-if="req.type == 'Category' && subcatCounter == 0 || req.type == 'SubCategory' && itemCounter == 0" -->
                                <!-- <td v-if="req.type != 'Category'" class="">
                                    <div class="flex justify-start items-start">
                                        <textarea v-model="comment1[index]" rows="3" id="message1" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Leave a comment..."></textarea>
                                    </div>
                                </td>
                                <td v-if="req.type != 'Category'" class="px-6 py-4">
                                    <div class="text-center">
                                        <input :name="req.id" :id="req.id" type="radio" @change="statusShow[index] = 'Complied'" value="Complied" class="radio" :v-model="statusShow[index, v$.complied.$model]">
                                        <label class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td v-if="req.type != 'Category'" class="px-6 py-4">
                                    <div class="text-center">
                                        <input :name="req.id" :id="req.id" type="radio" @change="statusShow[index] = 'NotComplied'" value="NotComplied" class="radio" :v-model="statusShow[index, v$.notcomplied.$model]" />
                                        <label class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td v-if="req.type != 'Category'" class="text-end">
                                    <textarea v-if=" statusShow[index] === 'NotComplied' " v-model="comment2[index]" rows="3" id="message2" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Leave a comment..."></textarea>
                                    <textarea v-else-if="statusShow[index] === 'Complied' || statusShow[index] === null " disabled v-model="comment2[index]" rows="3" id="message2" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Comment disabled..."></textarea>
                                    <textarea v-else disabled v-model="comment2[index]" rows="3" id="message2" class="object-fill textarea textarea-disabled p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Comment disabled..."></textarea>
                                </td> -->
                            </tr>
                            <tr scope="row" v-for="(req, index) in cat.cat" :key="(req, index)" class="divide-x-2 bg-white border dark:bg-gray-800 dark:border-gray-700">
                                <td class=" text-center p-5 px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {{ req.id }} {{index}}
                                </td>
                                <td v-if="req.type == 'Category'" class="aoe font-bold p-2">
                                    {{ req.Requirement }}
                                </td>
                                <td v-else-if="req.type == 'SubCategory'" class="aoe p-5 ml-5">
                                    {{ req.Requirement }}
                                </td>
                                <td v-else-if="req.type == 'Item'" class="aoe p-10 ml-12">
                                    {{ req.Requirement }}
                                </td>
                                <!-- v-if="req.type == 'Category' && subcatCounter == 0 || req.type == 'SubCategory' && itemCounter == 0" -->
                                <td  class="">
                                    <div class="flex justify-start items-start">
                                        <textarea v-model="comment1[catIndex][index]" rows="3" id="message1" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Leave a comment..."></textarea>
                                    </div>
                                </td>
                                <td  class="px-6 py-4">
                                    <div class="text-center">
                                        <input :name="req.key" :id="req.key" type="radio" @change="statusShow[catIndex][index] = 'Complied'" value="Complied" class="radio" :v-model="statusShow[catIndex][index, v$.complied.$model]">
                                        <label class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td  class="px-6 py-4">
                                    <div class="text-center">
                                        <input :name="req.key" :id="req.key" type="radio" @change="statusShow[catIndex][index] = 'NotComplied'" value="NotComplied" class="radio" :v-model="statusShow[catIndex][index, v$.complied.$model]" />
                                        <label class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td v-if="req.type != 'Category'" class="text-end">
                                    <textarea v-if=" statusShow[catIndex][index] === 'NotComplied' " v-model="comment2[catIndex][index]" rows="3" id="message2" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Leave a comment..."></textarea>
                                    <textarea v-else-if="statusShow[catIndex][index] === 'Complied' || statusShow[catIndex][index] === null " disabled v-model="comment2[index]" rows="3" id="message2" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Comment disabled..."></textarea>
                                    <textarea v-else disabled v-model="comment2[catIndex][index]" rows="3" id="message2" class="object-fill textarea textarea-disabled p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Comment disabled..."></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="py-2">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="divide-x-2">
                                <th scope="col" class="px-6 py-3">FINAL REMARKS</th>
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
                                        <a @click="getSummary()">Generate Summary</a>
                                        <!-- <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" @click="getSummary()">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                        </svg> -->
                                    </div>

                                    <textarea id="summary" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="summary"></textarea>
                                </th>

                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    <div class="flex flex-row justify-between">
                                        <p class="py-2 font-semibold">Recommendations</p>
                                        <a @click="getRecommendation()">Generate Recommendations</a>
                                        <!-- <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" @click="getSummary()">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                        </svg> -->
                                    </div>

                                    <textarea id="recommendation" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="recommendation"></textarea>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="space-x-6 p-10">
                <button @click="$router.go(-1)" type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                    Cancel
                </button>
                <button for="my-modal-6" id="my-modal-6" @click="modal()" type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    Submit
                </button>
            </div>
            <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
            <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box relative rounded-md text-left">
                    <div class="text-brand-darkblue font-bold label-xl">
                        Add Evaluation Instrument
                    </div>
                    <p class="text-sm xxs:leading-tight text-grey-200">
                        Are you sure you want to add this Evaluation Instrument?
                    </p>
                    <div class="modal-action">
                        <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">
                            Cancel
                        </label>
                        <label for="my-modal-6" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="submitEvaluation()">
                            Continue
                        </label>
                    </div>
                </div>
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
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Parse from "parse";
const toast = useToast();
export default {
    props: ["id"],
    name: "rqatEvaluate",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            showModal1: false,
            v$: useVuelidate(),
            header: [{
                    title: "ID",
                },
                {
                    title: "AREAS OF EVALUATION",
                },
                {
                    title: "ACTUAL SITUATION",
                },
                {
                    title: "COMPLIED",
                },
                {
                    title: "NOT COMPLIED",
                },
                {
                    title: "REMARKS",
                },
            ],
            statusShow: [],
            categories: [],
            eval: [],
            catCounter: 0,
            subcatCounter: 0,
            itemCounter: 0,
            Name: "",
            Program: "",
            cmoNo: "",
            seriesYear: "",
            dateApplied: "",
            instName: "",
            address: "",
            program: "",
            evalDate: "",
            complied: '',
            notcomplied: '',
            comment1: [],
            comment2: [],
            summary: "",
            recommendation: "",
            cmoNoYr: [],
            statusTracker: [],
            hei: "",
            appliType: "",
            initPermit: "",
        };
    },
    validations() {
        return {
            complied: {
                required,
            },
            notcomplied: {
                required,
            },
            comment1: {
                required,
            },
            comment2: {
                required,
            },
            summary: {
                required,
            },
            recommendation: {
                required,
            },
        }
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
        modal() {
            var has_error = 0;
            var missing_comment = 0;
            // var missing_comment1 = 0;
            var missing_checkbox = 0;
            console.log(this.comment1.length)
            for (var i = 0; i < this.comment1.length; i++) {
                if (this.comment1[i] == null || this.comment1[i] == '') {
                    missing_comment++;
                }
            }
            // for (var x = 0; x < this.comment2.length; x++) {
            //     if(this.comment2[x] == null ||  this.comment2[x] == ''){
            //         missing_comment1++;
            //         console.log(this.comment2[i])
            //     }
            // }
            for (var j = 0; j < this.statusShow.length; j++) {
                if (this.statusShow[j] == 'NotComplied' && this.comment2[j] == '') {
                    missing_checkbox++;
                }
            }
            if (
                this.summary == "" || this.recommendation == "" || missing_comment > 0 || this.statusShow.length == 0 || missing_checkbox > 0
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
                this.showModal1 = !this.showModal1;
            }
        },
        async submitEvaluation() {
            const Applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(Applications);
            query.equalTo("objectId", this.id);
            const application = await query.first();
            var actualSituations = [];
            var counter = 0;
            //ACTUAL SITUATIONS
            for (var i = 0; i < this.categories.length; i++) {
                actualSituations.push({
                    id: counter,
                    content: this.comment1[counter],
                    type: "Category",
                });
                counter++;
                for (var j = 0; j < this.categories[i].subcategory.length; j++) {
                    actualSituations.push({
                        id: counter,
                        content: this.comment1[counter],
                        type: "SubCategory",
                    });
                    counter++;
                    for (var k = 0; k < this.categories[i].subcategory[j].items.length; k++) {
                        actualSituations.push({
                            id: counter,
                            content: this.comment1[counter],
                            type: "Item",
                        });
                        counter++;
                    }
                }
            }
            //REMARKS
            var remarks = [];
            counter = 0;
            for (i = 0; i < this.categories.length; i++) {
                remarks.push({
                    id: counter,
                    content: this.comment1[counter],
                    type: "Category",
                });
                counter++;
                for (j = 0; j < this.categories[i].subcategory.length; j++) {
                    remarks.push({
                        id: counter,
                        content: this.comment1[counter],
                        type: "SubCategory",
                    });
                    counter++;
                    for (k = 0; k < this.categories[i].subcategory[j].items.length; k++) {
                        remarks.push({
                            id: counter,
                            content: this.comment1[counter],
                            type: "Item",
                        });
                        counter++;
                    }
                }
            }
            if (this.statusShow.includes("NotComplied")) {
                var today = new Date();
                var complianceDueDate = this.appliType == this.initPermit ? today.setDate(today.getDate() + 45): today.setDate(today.getDate() + 30);
                console.log(complianceDueDate)
                application.set("applicationStatus", "For Compliance");
                application.set("actualSituations", actualSituations);
                application.set("remarks", remarks);
                application.set("summary", this.summary);
                application.set("recommendation", this.recommendation);
                application.set("complianceDueDate", new Date(complianceDueDate));
                if (application.get("inCompliance") == false) {
                    application.set("inCompliance", true)
                }
                this.statusTracker.push({
                    status: "For Compliance",
                    detail: "Application didn't comply.",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);
                application
                    .save()
                    .then((application) => {
                        const params = {
                            email: application.get("email"),
                            status: "Your Application didn't comply.",
                            type: "sendStatusUpdate",
                            approved: true,
                        };
                        Parse.Cloud.run("sendStatusUpdate", params);
                        console.log("Object Updated: " + application.id);
                    })
                const Notifications = Parse.Object.extend("Notifications");
                const newNotification = new Notifications();
                newNotification.set("message", "Your Application has been moved for compliance");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.hei);
                newNotification.set("isRead", false);
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });
            } else {
                application.set("applicationStatus", "For Issuance");
                application.set("actualSituations", actualSituations);
                application.set("remarks", remarks);
                application.set("summary", this.summary);
                application.set("recommendation", this.recommendation);
                this.statusTracker.push({
                    status: "For Issuance",
                    detail: "Application Approved, waiting for Issuance.",
                    dateTime: new Date(),
                });
                application.set("statusTracker", this.statusTracker);
                application
                    .save()
                    .then((application) => {
                        console.log("Object Updated: " + application.id);
                    })
                const Notifications = Parse.Object.extend("Notifications");
                const newNotification = new Notifications();
                newNotification.set("message", "Your Application has been processed. Please wait for Issuance");
                newNotification.set("date_and_time", new Date());
                newNotification.set("user", this.hei);
                newNotification.set("isRead", false);
                newNotification.save().then((notif) => {
                    console.log("Notification Saved: " + notif.id);
                }, (error) => {
                    console.log("Error: " + error.message);
                });
            }
            toast("Successfully Evaluated!", {
                type: TYPE.SUCCESS,
                timeout: 2000,
                position: POSITION.TOP_RIGHT,
            });
            // this.sendEmail().then(() => {
            setTimeout(
                () =>
                this.$router.push({
                    path: "/rqat/assignments",
                }),
                1000
            );
            this.$refs.Spinner.show();
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                2000
            );
        },
        getSummary() {
            this.summary = "";
            for (var i = 0; i < this.comment1.length; i++) {
                if (this.comment1[i] != undefined && this.comment1[i] != "")
                    this.summary = this.summary + " " + this.comment1[i];
            }
        },
        //For Recommendation Generation from Remarks
        getRecommendation() {
            this.recommendation = "";
            for (var i = 0; i < this.comment2.length; i++) {
                for(var j = 0; j < this.comment2[i].length; j++){
                    if (this.comment2[i][j] != undefined && this.comment2[i][j] != "" && this.statusShow[i][j] == 'NotComplied')
                        this.recommendation = this.recommendation + " " + this.comment2[i][j];
                }
            }
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        submitButton() {
            try {
                alert("No data to submit")
            } catch (error) {
                alert(error.message)
            }
        },
    },
    mounted: async function () {
        //THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));
        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            console.log(accType[y])
            if (homeType === "/rqat/assignments") {
                flag = 1;
            }
        }
        if (flag === 0) {
            console.log(this.$route.path)
            console.log("heheh")
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
            this.statusTracker = application.get("statusTracker")
            this.hei = application.get("createdBy")
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
            const Users = Parse.Object.extend("User");
            const userQuery = new Parse.Query(Users);
            userQuery.equalTo("objectId", application.get("createdBy"));
            const user = await userQuery.first({
                useMasterKey: true,
            });
            this.instName = user.get("hei_name");
            const heiAddress = user.get("address").street + ", " + user.get("address").barangay + ", " + user.get("address").city + ", " +
                user.get("address").province + ", " + user.get("address").regionName;
            this.address = heiAddress;
            console.log("Hello" + user.get("hei_name"));
            
            //Query Evaluation Instrument
            const evalInstruments = Parse.Object.extend("EvaluationInstruments");
            const evalQuery = new Parse.Query(evalInstruments);
            evalQuery.equalTo("evaluationFormProgram", application.get("program"));
            const evalInstrument = await evalQuery.first({
                useMasterKey: true,
            });

            //Query the program of the application
            const programs = Parse.Object.extend("Programs");
            const programQuery = new Parse.Query(programs);
            programQuery.equalTo("objectId", application.get("program"));

            const program = await programQuery.first();

            this.program = program.get("programName");

            //For Getting
            var categoryCounter = 0;

            //For Textboxes
            var categoryCount = 0;

            //Query Evaluation Instrument to be used
            for (var c = 0; c < evalInstrument.get("evalInstReqs").length; c++) {

                const CHEDMEMOS = Parse.Object.extend("CHED_MEMO");
                const chedMemoQ = new Parse.Query(CHEDMEMOS);
                chedMemoQ.equalTo("objectId", evalInstrument.get("evalInstReqs")[c].cmoID);
                const chedMemo = await chedMemoQ.first({
                    useMasterKey: true,
                });

                var catIndexes = [];
                var subcatIndexes = [];
                
                for (var cr = 0; cr < evalInstrument.get("evalInstReqs")[c].checkedRequirements.length; cr++) {
                    if (evalInstrument.get("evalInstReqs")[c].checkedRequirements[cr].indexOf(".") > -1) {
                        var contents = evalInstrument.get("evalInstReqs")[c].checkedRequirements[cr].split(".");

                        if (catIndexes.includes(parseInt(contents[0]))) {
                            var index = catIndexes.indexOf(parseInt(contents[0]));
                            subcatIndexes[index].push(parseInt(contents[1]))
                        } else {
                            catIndexes.push(parseInt(contents[0]));
                            subcatIndexes.push([parseInt(contents[1])]);
                        }
                    } else {
                        if (!catIndexes.includes(parseInt(evalInstrument.get("evalInstReqs")[c].checkedRequirements[cr]))) {
                            catIndexes.push(parseInt(evalInstrument.get("evalInstReqs")[c].checkedRequirements[cr]));
                            subcatIndexes.push([-1]);
                        }
                    }

                }

                var hasSubCat = [];

                for (var cs = 0; cs < catIndexes.length; cs++) {
                    if (subcatIndexes[cs].every(x => x < 0)) {
                        hasSubCat.push(false);
                    } else {
                        hasSubCat.push(true); 
                    }
                    for (var ss = 0; ss < subcatIndexes[cs].length; ss++) {
                        if (subcatIndexes[cs][ss] == -1) {
                            subcatIndexes[cs].splice(ss, 1)
                        }
                    }
                }

                var categories = [];

                for (var i = 0; i < chedMemo.get("evaluationFormReqs").length; i++) {
                    var subcat = [];
                    if (catIndexes.includes(i + 1)) {
                        var catIndex = catIndexes.indexOf(i + 1)
                        if(hasSubCat[catIndex] == true){
                            for (var j = 0; j < chedMemo.get("evaluationFormReqs")[i].subcategory.length; j++) {
                                if (subcatIndexes[catIndex].includes(j + 1)) {
                                    var items = [];
                                    for (var k = 0; k < chedMemo.get("evaluationFormReqs")[i].subcategory[j].items.length; k++) {
                                        items.push({
                                            id: k + 1,
                                            key: chedMemo.get("CMO_No"),
                                            Item: chedMemo.get("evaluationFormReqs")[i].subcategory[j]
                                                .items[k].Item,
                                        });
                                    }

                                    subcat.push({
                                        id: j + 1,
                                        key: chedMemo.get("CMO_No"),
                                        Subcategory: chedMemo.get("evaluationFormReqs")[i].subcategory[j]
                                            .Subcategory,
                                        items: items,
                                    });
                                }
                            }

                            this.Name = chedMemo.get("evaluationFormName");

                            if (!this.cmoNoYr.some(cmo => cmo.cmoNo === chedMemo.get("CMO_No") && cmo.seriesYear === chedMemo.get("Series_Year"))) {
                                this.cmoNoYr.push({
                                    cmoNo: chedMemo.get("CMO_No"),
                                    seriesYear: chedMemo.get("Series_Year"),
                                })
                            }
                            categoryCounter++;
                            categories.push({
                                id: categoryCounter,
                                key: chedMemo.get("CMO_No"),
                                Category: chedMemo.get("evaluationFormReqs")[i].Category,
                                Desc: chedMemo.get("evaluationFormReqs")[i].Desc,
                                subcategory: subcat,
                            });
                        }
                    }
                }
                categoryCount += this.categories.length;
                this.categories = categories;

                for (var z = 0; z < this.categories.length; z++) {
                    var categoryReqs = []
                    this.statusShow.push([]);
                        this.comment1.push([]);
                        this.comment2.push([]);
                    for (var x = 0; x < this.categories[z].subcategory.length; x++) {
                        this.statusShow[z + categoryCount].push("");
                        this.comment1[z + categoryCount].push("");
                        this.comment2[z + categoryCount].push("");
                        categoryReqs.push({
                            id: this.categories[z].id + "." + this.categories[z].subcategory[x].id,
                            key: this.categories[z].key +"-"+ this.categories[z].id + "." + this.categories[z].subcategory[x].id,
                            Requirement: this.categories[z].subcategory[x].Subcategory,
                            type: "SubCategory",
                        });
                        for (var a = 0; a < this.categories[z].subcategory[x].items.length; a++) {
                            this.statusShow[z + categoryCount].push("");
                            this.comment1[z + categoryCount].push("");
                            this.comment2[z + categoryCount].push("");
                            categoryReqs.push({
                                id: this.categories[z].id + "." + this.categories[z].subcategory[x].id + "." + this.categories[z].subcategory[x].items[a].id,
                                key: this.categories[z].key +"-"+ this.categories[z].id + "." + this.categories[z].subcategory[x].id + "." + this.categories[z].subcategory[x].items[a].id,
                                Requirement: this.categories[z].subcategory[x].items[a].Item,
                                type: "Item",
                            });
                        }
                    }

                    this.eval.push({
                        id: this.categories[z].id,
                        key: this.categories[z].key +"-"+ this.categories[z].id ,
                        name: this.categories[z].Category,
                        cat: categoryReqs,
                    });
                }
            }
            console.log(categoryCounter)
            //Get Application Type of Application and id of Initial Permit Application Type for compliance due date
            this.appliType = application.get("applicationType");

            const ApplicationTypes = Parse.Object.extend("ApplicationTypes");
            const appTypeQuery = new Parse.Query(ApplicationTypes);
            appTypeQuery.equalTo("applicationTypeName", "INITIAL PERMIT")
            const appType = await appTypeQuery.first();
            this.initPermit = appType.id
        }
    },
};
</script>

<style></style>