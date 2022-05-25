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
            <div class="font-semibold">
                REVISED PROCESSING FORM FOR MONITORING AND EVALUATION
            </div>
            <div>{{ Name }}</div>
            <div>per CMO {{ cmoNo }}, s.{{ seriesYear }}</div>
            <div>{{Program}}</div>
        </div>
        <div class="">
            <div class="overflow-x-auto shadow-md sm:rounded-lg py-8 ">
                <table class="w-full text-gray-500 text-left">
                    <tbody>
                        <!-- row 1 -->
                        <div class="bg-white border-b" v-for="cat in categories" :key="cat">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ cat.id }}</th>
                            <td class="px-6 py-4 font-semibold">{{ cat.Category }}</td>
                            <div v-for="subcat in cat.subcategory" :key="subcat">
                                <td class="px-6 py-4"></td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ cat.id }}.{{ subcat.id }}</th>
                                <td class="px-6 py-4 font-semibold">{{ subcat.Subcategory }}</td>
                                <div v-for="item in subcat.items" :key="item">
                                    <td class="px-6 py-4"></td>
                                    <td class="px-6 py-4"></td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ cat.id }}.{{ subcat.id }}.{{ item.id }}</th>
                                    <td class="px-6 py-4">{{ item.Item }}</td>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
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
                <label for="deleteFunc" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteCMO()">Delete</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";
const toast = useToast();
export default {
    props: ["id"],
    name: "EvalFileView",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            showModal1: false,
            categories: [],
            Name: "",
            cmoNo: "",
            seriesYear: "",
            Program: "",
        };
    },
    methods: {
        modal() {
            this.showModal1 = !this.showModal1;
        },
        async deleteCMO() {
            this.$refs.Spinner.show();

            //Query CMO
            const CMO = Parse.Object.extend("CHED_MEMO");
            const cmoQuery = new Parse.Query(CMO);
            cmoQuery.equalTo("objectId", this.id);

            const cmo = await cmoQuery.first();

            //Delete CMO
            cmo.destroy().then(
                () => toast("Deleting...", {
                    type: TYPE.WARNING,
                    timeout: 3000,
                    hideProgressBar: false,
                    position: POSITION.TOP_RIGHT,
                }),
                setTimeout(
                    function () {
                        this.$refs.Spinner.hide();
                    }.bind(this),
                    3000
                ),
                
                this.$router.push("/cmo"),
            );
            
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

            //Query CMO
            const CMOs = Parse.Object.extend("CHED_MEMO");
            const cmoQuery = new Parse.Query(CMOs);
            cmoQuery.equalTo("objectId", this.id);
            const CMO = await cmoQuery.first({
                useMasterKey: true,
            });

            //Store CMO Data
            var categories = [];

            for (var i = 0; i < CMO.get("evaluationFormReqs").length; i++) {

                var subcat = [];

                for (var j = 0; j < CMO.get("evaluationFormReqs")[i].subcategory.length; j++) {

                    var items = [];

                    for (var k = 0; k < CMO.get("evaluationFormReqs")[i].subcategory[j].items.length; k++) {
                        items.push({
                            id: CMO.get("evaluationFormReqs")[i].subcategory[j].items[k].id,
                            Item: CMO.get("evaluationFormReqs")[i].subcategory[j].items[k].Item,
                        })
                    }

                    subcat.push({
                        id: CMO.get("evaluationFormReqs")[i].subcategory[j].id,
                        Subcategory: CMO.get("evaluationFormReqs")[i].subcategory[j].Subcategory,
                        items: items,
                    })

                }
                this.Name = CMO.get("evaluationFormName");

                this.cmoNo = CMO.get("CMO_No");
                this.seriesYear = CMO.get("Series_Year");
                categories.push({
                    id: CMO.get("evaluationFormReqs")[i].id,
                    Category: CMO.get("evaluationFormReqs")[i].Category,
                    Desc: CMO.get("evaluationFormReqs")[i].Desc,
                    subcategory: subcat,
                })

            }
            this.categories = categories;
        }
    },
};
</script>
