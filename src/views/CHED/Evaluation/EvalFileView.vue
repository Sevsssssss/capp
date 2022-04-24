<template>
<div class="m-3">
    <div class="flex flex-row p-2 justify-end">
        <!-- <button class="flex flex-row" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
            </svg>
            <div class="font-semibold text-grey-300">Back</div>
        </button> -->
        <div class="flex space-x-2 pr-2">
            <!-- add -->
            <button @click="$router.replace({ path: '/evaluationins/edit' })" class="btn btn-md bg-brand-darkblue hover:bg-brand-blue border-none">
                <div class="flex flex-row">
                    <svg class="mr-1" style="width: 20px; height: 20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                    </svg>
                    <div class="btn-text">EDIT</div>
                </div>
            </button>
            <button class="btn btn-md bg-brand-darkblue hover:bg-brand-blue border-none">
                <div class="flex flex-row">
                    <svg class="mr-1" style="width: 20px; height: 20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                    <label for="deleteFunc" class="btn-text">DELETE</label>
                </div>
            </button>
        </div>
    </div>
    <!-- <div class="flex space-x-10 text-left center">
        <div class="">
            <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px">
        </div>
        <div class="">
            <div class="font-bold" style="width: 490px;"> COMMISION ON HIGHER EDUCATION OFFICE OF PROGRAMS AND STANDARDS MONITORING INSTRUMENT FOR UNDERGRADUATE ACADEMIC PROGRAMS</div>
        </div>
    </div> -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-3 p-5">
        <div class="flex flex-row justify-center items-center space-x-4">
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
        <div class="text-center p-5">
            <div class="font-semibold">
                REVISED PROCESSING FORM FOR MONITORING AND EVALUATION
            </div>
            <div>{{ Name }}</div>
            <div>per CMO {{ cmoNo }}, s.{{ seriesYear }}</div>
            <div>{{Program}}</div>
        </div>
        <div class="">
            <div class="overflow-x-auto">
                <table class="table eval-table w-full">
                    <tbody>
                        <!-- row 1 -->
                        <div v-for="cat in categories" :key="cat">
                            <th>{{ cat.id }}</th>
                            <td class="font-bold">{{ cat.Category }}</td>
                            <div v-for="subcat in cat.subcategory" :key="subcat">
                                <td></td>
                                <th>{{ cat.id }}.{{ subcat.id }}</th>
                                <td class="font-medium">{{ subcat.Subcategory }}</td>
                                <div v-for="item in subcat.items" :key="item">
                                    <td></td>
                                    <td></td>
                                    <th>{{ cat.id }}.{{ subcat.id }}.{{ item.id }}</th>
                                    <td class="font-thin">{{ item.Item }}</td>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Document</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to delete this
                document?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none">Delete</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
export default {
    props: ["id"],
    name: "EvalFileView",
    components: {},
    data() {
        return {
            categories: [],
            Name: "",
            cmoNo: "",
            seriesYear: "",
            Program: "",
        };
    },
    methods: {},
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("name", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            console.log(accType[y])
            if (accType[y] === "/evaluationins") {
                flag = 1;
            }
        }
        if (flag === 0) {
            console.log(this.$route.path)
            this.$router.push("/403");
        } else {
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
        }
    },
};
</script>
