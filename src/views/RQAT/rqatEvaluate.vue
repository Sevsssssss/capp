<template>
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
                <p class="">Ateneo De Naga University</p>
                <p class="">Naga City</p>
                <p class="">BSIT</p>
                <p class="">March 12, 2050</p>
            </div>
        </div>
    </div>
    <div>
        <div class="py-4">
            <div class="relative overflow-x-auto shadow-md m-5">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            ">
                        <tr class="divide-x-2">
                            <th scope="col" class="px-6 py-3 text-center" v-for="head in header" :key="head.title">
                                {{ head.title }}
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr scope="row" v-for="req in eval" :key="req" class="bg-white border dark:bg-gray-800 dark:border-gray-700 ">
                            <td class="text-center p-5 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {{req.id}}
                            </td>
                            <td v-if="req.type == 'Category'" class="font-bold">
                                {{req.Requirement}}
                            </td>
                            <td v-else-if="req.type == 'SubCategory'" class=" ml-5">
                                {{req.Requirement}}
                            </td>
                            <td v-else-if="req.type == 'Item'" class="ml-12">
                                {{req.Requirement}}
                            </td>
                            <!-- v-if="req.type == 'Category' && subcatCounter == 0 || req.type == 'SubCategory' && itemCounter == 0" -->
                            <td class="">
                                <div class="flex justify-start items-start">
                                    <textarea rows="3" class="textarea p-2.5 w-full text-sm text-gray-900 " placeholder="Leave a comment..."></textarea>
                                </div>
                            </td>
                            <td class="px-6 py-4 ">
                                <div class="text-center">
                                    <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="px-6 py-4 ">
                                <div class="text-center">
                                    <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class=" text-end">
                                <textarea rows="3" class="textarea p-2.5 w-full text-sm text-gray-900 " placeholder="Leave a comment..."></textarea>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div class="py-4">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="
                text-xs text-gray-700
                uppercase
                bg-gray-50
                dark:bg-gray-700 dark:text-gray-400
                ">
                        <tr class="divide-x-2">
                            <th scope="col" class="px-6 py-3">FINAL REMARKS</th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="
                    divide-x-2
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                ">
                            <th scope="row" class="
                    px-6
                    py-4
                    font-medium
                    text-gray-900
                    dark:text-white
                    whitespace-nowrap
                    ">
                                <p class="py-2 font-semibold">Summary</p>
                                <textarea id="message" rows="6" class="
                        block
                        p-2.5
                        w-full
                        text-sm text-gray-900
                        bg-gray-50
                        rounded-md
                        border border-gray-300
                    " placeholder="Leave a comment..."></textarea>
                            </th>

                            <th scope="row" class="
                    px-6
                    py-4
                    font-medium
                    text-gray-900
                    dark:text-white
                    whitespace-nowrap
                    ">
                                <p class="py-2 font-semibold">Recommendation</p>
                                <textarea id="message" rows="6" class="
                        block
                        p-2.5
                        w-full
                        text-sm text-gray-900
                        bg-gray-50
                        rounded-md
                        border border-gray-300
                    " placeholder="Leave a comment..."></textarea>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
            <button type="submit" class="
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
</template>

<script>
import Parse from "parse";
export default {
    props: ["id"],
    name: "rqatEvaluate",
    components: {},
    data() {
        return {
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
            categories: [],
            eval: [],
            catCounter: 0,
            subcatCounter: 0,
            itemCounter: 0,
            Name: "",
            Program:"",
            cmoNo: "",
            seriesYear: "",

            instName: "",
            address: "",
            program: "",
            evalDate: "",
        };
    },
    methods: {
        evalitems() {
            console.log(this.categories.length);
            //this.catCounter = this.categories.length;
            for (var i = 0; i < this.categories.length; i++) {
                //console.log(i)
                // console.log(this.categories[i].Category);
                this.eval.push({
                    id: this.categories[i].id,
                    Requirement: this.categories[i].Category,
                    type: "Category",
                });
                //this.catCounter++;
                //this.subcatCounter = this.categories[i].subcategory.length;
                for (var x = 0; x < this.categories[i].subcategory.length; x++) {
                    // console.log(this.categories[i].subcategory[x].Subcategory);
                    this.eval.push({
                        id: this.categories[i].subcategory[x].id,
                        Requirement: this.categories[i].subcategory[x].Subcategory,
                        type: "SubCategory",
                    });
                    //var itemLen = this.categories[i].subcategory[x].items.length;
                    //this.subcatCounter++;
                    //this.itemCounter =this.categories[i].subcategory[x].items.length;
                    for (
                        var y = 0; y < this.categories[i].subcategory[x].items.length; y++
                    ) {
                        //console.log(this.categories[i].subcategory[x].items[y].Item);
                        this.eval.push({
                            id: this.categories[i].subcategory[x].items[y].id,
                            Requirement: this.categories[i].subcategory[x].items[y].Item,
                            type: "Item",
                        });
                        //this.itemCounter++;
                    }
                }
            }
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        // const AccessTypes = Parse.Object.extend("AccessTypes");
        // const query = new Parse.Query(AccessTypes);
        // query.equalTo("name", Parse.User.current().get("access_type"));

        // const querResult = await query.find();
        // var accType = querResult[0].get("privileges");
        // var flag = 0;
        // for (var y = 0; y < accType.length; y++) {
        //     console.log(accType[y])
        //     if (accType[y] === "/evaluationins") {
        //         flag = 1;
        //     }
        // }
        // if (flag === 0) {
        //     console.log(this.$route.path)
        //     this.$router.push("/403");
        // } else {
        console.log("Hi!, You have permission to access this Page");
        //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
        //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        const applications = Parse.Object.extend("Applications");
        const appQuery = new Parse.Query(applications);
        appQuery.equalTo("objectId", this.id);
        const application = await appQuery.first({
            useMasterKey: true,
        });


        // const Users = Parse.Object.extend("User");
        // const userQuery = new Parse.Query(Users);
        // userQuery.equalTo("objectId", application.get("createdBy"));
        // const user = await appQuery.first({
        //     useMasterKey: true,
        // });

        //  this.instName = user.get("hei_name")
        //  this.address = user.get("address")




        

        const evalInstruments = Parse.Object.extend("EvaluationForms");
        const evalQuery = new Parse.Query(evalInstruments);
        evalQuery.equalTo("evaluationFormProgram", application.get("program"));
        const evalInstrument = await evalQuery.first({
            useMasterKey: true,
        });

        var categories = [];

        for (var i = 0; i < evalInstrument.get("evaluationFormReqs").length; i++) {

            var subcat = [];
            var catID = evalInstrument.get("evaluationFormReqs")[i].id;
            for (var j = 0; j < evalInstrument.get("evaluationFormReqs")[i].subcategory.length; j++) {

                var items = [];
                var subcatID = evalInstrument.get("evaluationFormReqs")[i].subcategory[j].id;

                for (var k = 0; k < evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items.length; k++) {
                    items.push({
                        id: catID + "." + subcatID + "." + evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items[k].id,
                        Item: evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items[k].Item,
                    })
                }

                subcat.push({
                    id: catID + "." + evalInstrument.get("evaluationFormReqs")[i].subcategory[j].id,
                    Subcategory: evalInstrument.get("evaluationFormReqs")[i].subcategory[j].Subcategory,
                    items: items,
                })
            }
            this.Name = evalInstrument.get("evaluationFormName");
            this.Program = evalInstrument.get("evaluationFormProgram");
            this.cmoNo = evalInstrument.get("evaluationFormCMOno");
            this.seriesYear = evalInstrument.get("evaluationFormSeries");
            categories.push({
                id: evalInstrument.get("evaluationFormReqs")[i].id,
                Category: evalInstrument.get("evaluationFormReqs")[i].Category,
                Desc: evalInstrument.get("evaluationFormReqs")[i].Desc,
                subcategory: subcat,
            })
        }
        this.categories = categories;

        for (var q = 0; q < this.categories.length; q++) {
            //console.log(i)
            // console.log(this.categories[i].Category);
            this.eval.push({
                id: this.categories[q].id,
                Requirement: this.categories[q].Category,
                type: "Category",
            });
            //this.catCounter++;
            //this.subcatCounter = this.categories[i].subcategory.length;
            for (var x = 0; x < this.categories[q].subcategory.length; x++) {
                // console.log(this.categories[i].subcategory[x].Subcategory);
                this.eval.push({
                    id: this.categories[q].subcategory[x].id,
                    Requirement: this.categories[q].subcategory[x].Subcategory,
                    type: "SubCategory",
                });
                //var itemLen = this.categories[i].subcategory[x].items.length;
                //this.subcatCounter++;
                //this.itemCounter =this.categories[i].subcategory[x].items.length;
                for (
                    var y = 0; y < this.categories[q].subcategory[x].items.length; y++
                ) {
                    //console.log(this.categories[i].subcategory[x].items[y].Item);
                    this.eval.push({
                        id: this.categories[q].subcategory[x].items[y].id,
                        Requirement: this.categories[q].subcategory[x].items[y].Item,
                        type: "Item",
                    });
                    //this.itemCounter++;
                }
            }
        }
        //}
    },
};
</script>

<style></style>
