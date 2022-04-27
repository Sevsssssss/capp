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
            <div class="font-semibold">
                REVISED PROCESSING FORM FOR MONITORING AND EVALUATION
            </div>
            <div>{{ Name }}</div>
            <div>per CMO {{ cmoNo }}, s.{{ seriesYear }}</div>
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
                <div class="relative overflow-x-auto shadow-md m-5">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="divide-x-2">
                                <th scope="col" class="px-6 py-3 text-center" v-for="head in header" :key="head.title">
                                    {{ head.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr scope="row" v-for="(req, index) in eval" :key="(req, index)" class="divide-x-2 bg-white border dark:bg-gray-800 dark:border-gray-700">
                                <td class=" text-center p-5 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {{ req.id }}
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
                                <td class="">
                                    <div class="flex justify-start items-start">
                                        <textarea v-model="comment1[index]" rows="3" id="message1" class="object-fill textarea p-2.5 w-full h-full text-sm text-gray-900 rounded-none" placeholder="Leave a comment..."></textarea>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-center">
                                        <input :name="req.id" :id="req.id" type="radio" @change="statusShow[req.id] = 'Complied'" value="Complied" class="radio" :v-model="statusShow[req.id - 1, v$.complied.$model]">
                                        <label class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-center">
                                        <input :name="req.id" :id="req.id" type="radio" @change="statusShow[req.id] = 'NotComplied'" value="NotComplied" class="radio" :v-model="statusShow[req.id - 1, v$.notcomplied.$model]" />
                                        <label class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td class="text-end">
                                    <textarea v-model="comment2[index]" rows="3" id="message2" class="object-fill textarea p-2.5 w-full text-sm text-gray-900 rounded-none" placeholder="Leave a comment..."></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="py-4">
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
                                    <p class="py-2 font-semibold">Recommendation</p>
                                    <textarea id="recommendation" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..." v-model="recommendation"></textarea>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="space-x-6 p-10">
                <button type="button" class="w-40 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                    Cancel
                </button>
                <button @click="submitEvaluation()" type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    Submit
                </button>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Parse from "parse";
export default {
    props: ["id"],
    name: "rqatEvaluate",
    components: {},
    data() {
        return {
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
                application.set("applicationStatus", "Non Compliant");
                application.set("actualSituations", actualSituations);
                application.set("remarks", remarks);
                application.set("summary", this.summary);
                application.set("recommendation", this.recommendation);
            } else {
                application.set("applicationStatus", "For Issuance");
                application.set("actualSituations", actualSituations);
                application.set("remarks", remarks);
                application.set("summary", this.summary);
                application.set("recommendation", this.recommendation);
            }

            application
                .save()
                .then((application) => {
                    // toast(this.type.toLowerCase() + " has been moved for evalutaion", {
                    //         type: TYPE.INFO,
                    //         timeout: 2000,
                    //         position: POSITION.TOP_RIGHT,
                    //         hideProgressBar: false,
                    //         closeButton: false,

                    //     }),
                    console.log("Object Updated: " + application.id);
                })
        },
        getSummary() {
            this.summary = "";
            for (var i = 0; i < this.comment1.length; i++) {
                if (this.comment1[i] != undefined && this.comment1[i] != "")
                    this.summary = this.summary + " " + this.comment1[i];
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
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            console.log(accType[y])
            if (accType[y] === "/assignments") {
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
            this.address = user.get("address");

            console.log("Hello" + user.get("hei_name"));

            //Query Evaluation Instrument
            const evalInstruments = Parse.Object.extend("EvaluationForms");
            const evalQuery = new Parse.Query(evalInstruments);
            evalQuery.equalTo("evaluationFormProgram", application.get("program"));
            const evalInstrument = await evalQuery.first({
                useMasterKey: true,
            });

            this.Name = evalInstrument.get("evaluationFormName");
            this.cmoNo = evalInstrument.get("evaluationFormCMOno");
            this.seriesYear = evalInstrument.get("evaluationFormSeries");

            //Query the program of the application
            const programs = Parse.Object.extend("Programs");
            const programQuery = new Parse.Query(programs);
            programQuery.equalTo("objectId", application.get("program"));

            const program = await programQuery.first();

            this.program = program.get("programName");

            var categories = [];

            for (var i = 0; i < evalInstrument.get("evaluationFormReqs").length; i++) {
                var subcat = [];
                this.comment1.push("");
                this.comment2.push("");
                for (var j = 0; j < evalInstrument.get("evaluationFormReqs")[i].subcategory.length; j++) {
                    var items = [];
                    this.comment1.push("");
                    this.comment2.push("");
                    for (var k = 0; k < evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items.length; k++) {
                        this.comment1.push("");
                        this.comment2.push("");
                        items.push({
                            id: k + 1,
                            Item: evalInstrument.get("evaluationFormReqs")[i].subcategory[j]
                                .items[k].Item,
                        });
                    }

                    subcat.push({
                        id: j + 1,
                        Subcategory: evalInstrument.get("evaluationFormReqs")[i].subcategory[j]
                            .Subcategory,
                        items: items,
                    });
                }
                categories.push({
                    id: i + 1,
                    Category: evalInstrument.get("evaluationFormReqs")[i].Category,
                    Desc: evalInstrument.get("evaluationFormReqs")[i].Desc,
                    subcategory: subcat,
                });
            }
            this.categories = categories;

            for (var z = 0; z < this.categories.length; z++) {
                //console.log(i)
                // console.log(this.categories[i].Category);
                this.eval.push({
                    id: this.categories[z].id,
                    Requirement: this.categories[z].Category,
                    type: "Category",
                });
                //this.catCounter++;
                //this.subcatCounter = this.categories[i].subcategory.length;
                for (var x = 0; x < this.categories[z].subcategory.length; x++) {
                    // console.log(this.categories[i].subcategory[x].Subcategory);
                    this.eval.push({
                        id: this.categories[z].id + "." + this.categories[z].subcategory[x].id,
                        Requirement: this.categories[z].subcategory[x].Subcategory,
                        type: "SubCategory",
                    });
                    //var itemLen = this.categories[i].subcategory[x].items.length;
                    //this.subcatCounter++;
                    //this.itemCounter =this.categories[i].subcategory[x].items.length;
                    for (
                        var a = 0; a < this.categories[z].subcategory[x].items.length; a++
                    ) {
                        //console.log(this.categories[i].subcategory[x].items[y].Item);
                        this.eval.push({
                            id: this.categories[z].id + "." + this.categories[z].subcategory[x].id + "." + this.categories[z].subcategory[x].items[a].id,
                            Requirement: this.categories[z].subcategory[x].items[a].Item,
                            type: "Item",
                        });
                        //this.itemCounter++;
                    }
                }
            }
        }
    },
};
</script>

<style></style>
