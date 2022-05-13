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
            <button class="btn btn-md bg-brand-darkblue hover:bg-brand-blue border-none" @click="deleteEvalInst()">
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

            <div v-for="cmono in cmoNoYr" :key="cmono">
                per CMO No. {{cmono.cmoNo}} s. {{cmono.seriesYear}}
            </div>

            <!-- <div>per CMO {{ cmoNo }}, s.{{ seriesYear }}</div> -->
            <div>{{Program}}</div>
        </div>
        <div class="">
            <div class="overflow-x-auto">
                <table class="table eval-table w-full">
                    <tbody>
                        <!-- row 1 -->
                        <div v-for="cat in cmos" :key="cat">
                            <div v-for="category in cat.categories" :key="category">
                                <td class="font-bold">{{ category.id }} {{ category.Category }}</td>
                                <div v-for="subcat in category.subcategory" :key="subcat">
                                    <td></td>
                                    <th>{{ category.id }}.{{ subcat.id }}</th>
                                    <td class="font-medium">{{ subcat.Subcategory }}</td>
                                    <div v-for="item in subcat.items" :key="item">
                                        <td></td>
                                        <td></td>
                                        <th>{{ category.id }}.{{ subcat.id }}.{{ item.id }}</th>
                                        <td class="font-thin">{{ item.Item }}</td>
                                    </div>
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
            cmos: [],
            Name: "",
            cmoNoYr: [],
            Program: "",
        };
    },
    methods: {
        async deleteEvalInst() {
            const EvalInstruments = Parse.Object.extend("EvaluationForms");
            const evalQuery = new Parse.Query(EvalInstruments);
            evalQuery.equalTo("objectId", this.id);

            const evalInstrument = await evalQuery.first();
            if (confirm("Are You sure you want to delete this evaluation instrument?")) {
                evalInstrument.destroy().then(
                    (evalinst) => {
                        console.log("Deleted object: " + evalinst.id);
                    },
                    (error) => {
                        console.log("Error: " + error);
                    }
                );
            }
        }
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
            const evalInstruments = Parse.Object.extend("EvaluationInstruments");
            const evalQuery = new Parse.Query(evalInstruments);
            evalQuery.equalTo("objectId", this.id);
            const evalInstrument = await evalQuery.first({
                useMasterKey: true,
            });

            var cmos = [];

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
                    }else {
                        if (!catIndexes.includes(parseInt(evalInstrument.get("evalInstReqs")[c].checkedRequirements[cr]))) {
                            catIndexes.push(parseInt(evalInstrument.get("evalInstReqs")[c].checkedRequirements[cr]));
                            subcatIndexes.push([-1]);
                        }
                    }

                }

                var hasSubCat = [];

                for(var cs = 0; cs < catIndexes.length; cs++) {
                    if(subcatIndexes[cs].every(x => x < 0)) {
                        hasSubCat.push(false);
                    }
                    else{
                        hasSubCat.push(true);
                    }
                    for(var ss = 0; ss < subcatIndexes[cs].length; ss++){
                        if(subcatIndexes[cs][ss] == -1){
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
                            console.log(chedMemo.get("evaluationFormReqs")[i].subcategory.length);
                            for (var j = 0; j < chedMemo.get("evaluationFormReqs")[i].subcategory.length + 2; j++) {
                                //for(var sub = 0; sub < subcatIndexes.length)
                                if (subcatIndexes[catIndex].includes(j + 1)) {
                                    var items = [];

                                    for (var k = 0; k < chedMemo.get("evaluationFormReqs")[i].subcategory[j].items.length; k++) {
                                        items.push({
                                            id: chedMemo.get("evaluationFormReqs")[i].subcategory[j].items[k].id,
                                            Item: chedMemo.get("evaluationFormReqs")[i].subcategory[j].items[k].Item,
                                        })
                                    }

                                    subcat.push({
                                        id: chedMemo.get("evaluationFormReqs")[i].subcategory[j].id,
                                        Subcategory: chedMemo.get("evaluationFormReqs")[i].subcategory[j].Subcategory,
                                        items: items,
                                    })

                                }

                            }
                            this.Name = chedMemo.get("evaluationFormName");

                            if (!this.cmoNoYr.some(cmo => cmo.cmoNo === chedMemo.get("CMO_No") && cmo.seriesYear === chedMemo.get("Series_Year"))) {
                                this.cmoNoYr.push({
                                    cmoNo: chedMemo.get("CMO_No"),
                                    seriesYear: chedMemo.get("Series_Year"),
                                })
                            }

                            categories.push({
                                id: chedMemo.get("evaluationFormReqs")[i].id,
                                Category: chedMemo.get("evaluationFormReqs")[i].Category,
                                Desc: chedMemo.get("evaluationFormReqs")[i].Desc,
                                subcategory: subcat,
                            })
                        }
                        else{
                            this.Name = chedMemo.get("evaluationFormName");

                            if (!this.cmoNoYr.some(cmo => cmo.cmoNo === chedMemo.get("CMO_No") && cmo.seriesYear === chedMemo.get("Series_Year"))) {
                                this.cmoNoYr.push({
                                    cmoNo: chedMemo.get("CMO_No"),
                                    seriesYear: chedMemo.get("Series_Year"),
                                })
                            }

                            categories.push({
                                id: chedMemo.get("evaluationFormReqs")[i].id,
                                Category: chedMemo.get("evaluationFormReqs")[i].Category,
                                Desc: chedMemo.get("evaluationFormReqs")[i].Desc,
                                subcategory: [],
                            })
                        }
                        

                    }

                }
                this.categories = categories;
                this.Name = evalInstrument.get("evaluationFormName");

                //Query the program of the application
                const programs = Parse.Object.extend("Programs");
                const programQuery = new Parse.Query(programs);
                programQuery.equalTo("objectId", evalInstrument.get("evaluationFormProgram"));

                const program = await programQuery.first();

                this.Program = program.get("programName");
                cmos.push({
                    id: evalInstrument.get("evalInstReqs")[c].cmoID,
                    categories: categories,
                })

            }
            this.cmos = cmos;
        }
    },
};
</script>
