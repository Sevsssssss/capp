<template>
<div v-if="evalitems()" class="shadow-lg rounded-lg my-3 py-5">
    {{ categories }}
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
        <div>{{ evalDesc }}</div>
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
                        <th scope="col" class="px-6 py-3" v-for="head in header" :key="head.title">
                            {{ head.title }}
                        </th>
                        <th scope="col" class=" py-3">
                            <span class="sr-only">Remarks</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="req in eval" :key="req">
                        <td class="aoe">
                            {{req.Requirement}}
                        </td>
                        <td class="px-2 py-4">
                            <div class="flex justify-start items-start">
                                <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
                            </div>
                        </td>
                        <td class="px-6 py-4 ">
                            <div class="flex items-center">
                                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                <label for="checkbox-all" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <td class="px-6 py-4 ">
                            <div class="flex items-center">
                                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                <label for="checkbox-all" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <td class="px-2 py-4 text-end">
                            <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
                        </td>
                    </tr>


                </tbody>
            </table>
        </div>
    </div>
<div class="py-4">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            programName: "Bachelor of Early Childhood Education (BECEd",
            cmoNo: "76",
            seriesYear: "2017",
            evalDesc: "EVALUATION FORM FOR BACHELOR OF EARLY CHILDHOOD EDUCATION (BECED)",
            eval: [],
        };
    },
    methods: {
        evalitems() {
            console.log(this.categories.length);
            for (var i = 0; i < this.categories.length; i++) {
                // console.log(this.categories[i].subcategory.length)
                // console.log(this.categories[i].Category);
                this.eval.push({
                    id: i + 1,
                    Requirement: this.categories[i].Category,
                });
                for (var x = 0; x < this.categories[i].subcategory.length; x++) {
                    // console.log(this.categories[i].subcategory[x].Subcategory);
                    this.eval.push({
                        id: x + 1,
                        Requirement: this.categories[i].subcategory[x].Subcategory,
                    });
                    //var itemLen = this.categories[i].subcategory[x].items.length;
                    for (
                        var y = 0; y < this.categories[i].subcategory[x].items.length; y++
                    ) {
                        console.log(this.categories[i].subcategory[x].items[y].Item);
                        this.eval.push({
                            id: y + 1,
                            Requirement: this.categories[i].subcategory[x].items[y].Item,
                        });
                    }
                }
            }
            return true;
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
            const evalInstruments = Parse.Object.extend("EvaluationForms");
            const evalQuery = new Parse.Query(evalInstruments);
            evalQuery.equalTo("objectId", this.id);
            const evalInstrument = await evalQuery.first({
                useMasterKey: true,
            });

            var categories = [];

            for (var i = 0; i < evalInstrument.get("evaluationFormReqs").length; i++) {

                var subcat = [];

                for (var j = 0; j < evalInstrument.get("evaluationFormReqs")[i].subcategory.length; j++) {

                    var items = [];

                    for (var k = 0; k < evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items.length; k++) {
                        items.push({
                            id: evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items[k].id,
                            Item: evalInstrument.get("evaluationFormReqs")[i].subcategory[j].items[k].Item,
                        })
                    }

                    subcat.push({
                        id: evalInstrument.get("evaluationFormReqs")[i].subcategory[j].id,
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
        //}
    },
};
</script>

<style></style>
