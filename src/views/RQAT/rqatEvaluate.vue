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
        <div>{{ evalDesc }}</div>
        <div>per CMO {{ cmoNo }}, s.{{ seriesYear }}</div>
    </div>
    <div class="flex flex-col text-sm w-full pl-10">
        <div class="flex space-x-8">
            <div class="flex flex-col items-start uppercase font-semibold">
                <span class=" ">Name of Institution: </span>
                <span class=" ">address: </span>
                <span class=" ">Porgram(s): </span>
                <span class=" ">Date of Evalution</span>
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
        <div class="relative overflow-x-auto shadow-md">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="divide-x-2">
                        <!-- <th scope="col" class="px-6 py-3" v-for="head in header" :key="head.title">
                            {{ head.title }}
                        </th>
                        <th scope="col" class=" py-3">
                            <span class="sr-only">Remarks</span>
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in categories" :key="cat" class="divide-x-2 border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 w-2/5">
                            <div class="leading-relaxed text-sm space-y-2">
                            <th class="">( {{ cat.id }} )</th>
                            <td class="font-semibold pl-4">
                                {{ cat.Category }}
                            </td>
                            <div v-for="subcat in cat.subcategory" :key="subcat">
                                <div class="aoe2">
                                    <td class="pl-4">{{ cat.id }}.{{ subcat.id }}</td>
                                    <td class="font-normal pl-8">{{ subcat.Subcategory }}</td>
                                </div>
                                <td v-if="subcat.items.length == 0" class="font-normalpx-2 py-4">
                                <div class="flex justify-start items-start">
                                    <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
                                </div>
                            </td>
                            
                                
                            
                                <div v-for="item in subcat.items" :key="item" class="flex flex-row justify-between">
                                   <div class="aoe2">
                                        <td class="font-normal pl-8">
                                        {{ cat.id }}.{{ subcat.id }}.{{ item.id }}
                                        </td>
                                        <td class="font-normal pl-8">{{ item.Item }}</td>
                                   </div>
                                    
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
                                </div>
                            </div>
                        </div>
                        </th>
                        <!-- <div v-for="subcat in cat.subcategory" :key="subcat">
                            
                            <td v-if="subcat.items.length == 0" class="font-normalpx-2 py-4">
                                <div class="flex justify-start items-start">
                                    <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
                                </div>
                            </td>
                            <td v-else>
                                <div v-for="item in subcat.items" :key="item">
                                    <td class="px-2 py-4">
                                        <div class="flex justify-start items-start">
                                            <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
                                        </div>
                                    </td>
                                </div>
                            </td>
                        </div>
                        
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
                        </td> -->
                        
                    </tr>
                </tbody>
        </table>
    </div>
</div>
<div class="py-4">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        <p class="py-2 font-semibold">Summary</p>
                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
                    </th>

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <p class="py-2 font-semibold">Recommendation</p>
                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300" placeholder="Leave a comment..."></textarea>
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
    <button type="submit" class="submit w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
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
            categories: [{
                    id: 1,
                    subcategory: [{
                            id: 1,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "A doctoral degree holder in Education or a related field",
                        },
                        {
                            id: 2,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "Holder of a valid certificate of registration and updated professional license (PRC ID) as provided in Section 11 of RA 8981.",
                        },
                        {
                            id: 3,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "Employed full - time. ",
                        },
                        {
                            id: 4,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "With at least three (3) years of very satisfactory teaching experience in tertiary level.",
                        },
                        {
                            id: 5,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "With at least three (3) years of very satisfactory teaching experience in either the elementary or secondary level",
                        },
                        {
                            id: 6,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "With at least 2 years of very managerial/administrative experience",
                        },
                        {
                            id: 7,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                            ],
                            Subcategory: "With updated notarized contract of employment",
                        },
                    ],
                    Category: "DEAN OR DEPARTMENT CHAIR",
                    Desc: "(CMO 76, s. 2017), and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                },
                {
                    id: 2,
                    subcategory: [{
                            id: 1,
                            items: [{
                                    id: 1,
                                    Item: "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)",
                                },
                                {
                                    id: 2,
                                    Item: "Faculty teaching general education and major subjects should have an appropriate master’s degree in the field they are assigned to teach.",
                                },
                                {
                                    id: 3,
                                    Item: "Physical Education Teacher",
                                },
                                {
                                    id: 4,
                                    Item: "Teacher has a BS P.E. degree or BEEd/ BSEd major/minor in P.E. or any other bachelor's degree with certificate in P.E.",
                                },
                                {
                                    id: 5,
                                    Item: "Holder of a valid certificate of registration and updated professional license (PRC ID) as provided in Section 11 of RA 8981.",
                                },
                                {
                                    id: 6,
                                    Item: "With updated notarized contract of employment",
                                },
                            ],
                            Subcategory: "General Requirements",
                        },
                        {
                            id: 2,
                            items: [{
                                    id: 1,
                                    Item: "Holder of a valid certificate of registration and updated professional license (PRC ID) as provided in Section 11 of RA 8981.",
                                },
                                {
                                    id: 2,
                                    Item: "Holder of Master’s degree in education or any of the allied fields",
                                },
                            ],
                            Subcategory: "Qualifications of the Professional Education Faculty",
                        },
                    ],
                    Category: "FACULTY",
                },
            ],
            programName: "Bachelor of Early Childhood Education (BECEd",
            cmoNo: "76",
            seriesYear: "2017",
            evalDesc: "EVALUATION FORM FOR BACHELOR OF EARLY CHILDHOOD EDUCATION (BECED)",
        };
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
