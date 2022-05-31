<template>
<div class="m-3">
    <div class="p-3">
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
            <div class="font-semibold">{{ Name }}</div>

            <div v-for="cmono in cmoNoYr" :key="cmono">
                <span class="font-normal"> per CMO No. {{cmono.cmoNo}} s. {{cmono.seriesYear}} </span>
            </div>

            <div>{{Program}}</div>
        </div>
        <div class="overflow-x-auto shadow-md sm:rounded-lg py-8">
            <table class="w-full text-gray-500 text-left">
                <tbody>
                    <!-- row 1 -->
                    <div class="bg-white border-b" v-for="cat in cmos" :key="cat">
                        <div v-for="category in cat.categories" :key="category">
                            <td class="px-6 py-4 font-semibold">{{ category.id }} {{ category.Category }}</td>
                            <div v-for="subcat in category.subcategory" :key="subcat">
                                <td class="px-6 py-4"></td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ category.id }}.{{ subcat.id }}</th>
                                <td class="px-6 py-4 font-semibold">{{ subcat.Subcategory }}</td>
                                <div v-for="item in subcat.items" :key="item">
                                    <td class="px-6 py-4"></td>
                                    <td class="px-6 py-4"></td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ category.id }}.{{ subcat.id }}.{{ item.id }}</th>
                                    <td class="px-6 py-4">{{ item.Item }}</td>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </table>
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
        //Delete Evaluation Instrument
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

            //Query Evaluation Instrument
            const evalInstruments = Parse.Object.extend("EvaluationInstruments");
            const evalQuery = new Parse.Query(evalInstruments);
            evalQuery.equalTo("objectId", this.id);
            const evalInstrument = await evalQuery.first({
                useMasterKey: true,
            });

            //Grab CMOs selected in Evaluation Instrument
            var cmos = [];

            for (var c = 0; c < evalInstrument.get("evalInstReqs").length; c++) {

                //Query CMOs
                const CHEDMEMOS = Parse.Object.extend("CHED_MEMO");
                const chedMemoQ = new Parse.Query(CHEDMEMOS);
                chedMemoQ.equalTo("objectId", evalInstrument.get("evalInstReqs")[c].cmoID);
                const chedMemo = await chedMemoQ.first({
                    useMasterKey: true,
                });

                //Save Categories and Sub Categories Selected
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
                        if (hasSubCat[catIndex] == true) {
                            for (var j = 0; j < chedMemo.get("evaluationFormReqs")[i].subcategory.length; j++) {
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
                        } else {
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
