<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="HeiView" />
</div>
<div v-else class="p-3">
    <div class="grid xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3">
        <div class="bg-brand-white shadow-md rounded-md m-2 p-4" v-for="data in datas" :key="data">
            <div class="flex flex-col justify-between text-left">
                <div class="flex flex-row">
                    <div :class="'homeIcon ' + data.color" class="mr-3">
                        <svg class="icon" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
                        </svg>
                    </div>
                    <div class="text-sm font-semibold" style="color: #8fa0b9">
                        {{ data.title }}
                    </div>
                </div>
                <div class="text-2xl text-right font-semibold text-grey-300">
                    {{ data.num }}
                </div>
            </div>
        </div>
    </div>
    <!-- Can't Read -->
    <!-- <DataCards :datas="datas" /> -->
    <!-- Table -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
        <!-- Table header -->
        <div class="flex flex-row justify-between items-center">
            <!-- Search -->
            <div class="flex space-x-4 pl-5 py-4">
                <div class="">
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder="Search for items" />
                    </div>
                </div>
                <!-- Filter -->
                <div class="flex flex-row">
                    <!-- sort -->
                    <div class="month-sort flex flex-row">
                        <select class="font-normal rounded-md select select-ghost select-sm w-full max-w-xs" style="outline: none" id="hei_sort" v-model="sort_type" @change="filterHEI()">
                            <option disabled selected>Sort by type</option>
                            <option v-for="hType in hei_Types" :key="hType" :value="hType">{{hType.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-center items-center">
                <!-- button -->
                <div class="pr-4">
                    <label class="hover:text-brand-lightblue hover:" @click="onUpdate()">
                        <svg class="" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
                        </svg>
                    </label>
                </div>
                <div class="h-fit pt-3 items-center">
                    <button @click="excelHei()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload Excel</div>
                    </button>
                </div>
                <!-- button -->
                <div class="h-fit pr-5 pt-3 items-center">
                    <button @click="addHei()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add HEI</div>
                    </button>
                </div>
            </div>
        </div>
        <!-- Table body -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500" :ref="table">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                            {{ header.title }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="sort_type_var == false">
                    <tr class="bg-white border-b" v-for="table in searchHEI" :key="table">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            {{ table.InstNo }}
                        </th>
                        <td class="px-6 py-4">
                            <div class="flex flex-col">
                                <div class="text-md font-semibold">{{ table.HeiName }}</div>
                                <div>{{ table.address }}</div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            {{ table.type }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.userName }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.emailVerified }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex space-x-4 items-end justify-end">
                                <router-link :to="{
                                name: 'EditHeiView',
                                params: {
                                heiID: table.id,
                                },
                            }">
                                    <a href="#" v-if="table.status != 'For Compliance'" class="font-medium text-blue-600 hover:underline">Edit</a>
                                </router-link>
                                <!-- <a href="#" @click="$router.replace({ path: '/hei/edit' })" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> -->
                                <div>
                                    <label for="deleteFunc" class="hover:text-brand-red/60" @click="selectAcc(table.InstNo)">
                                        <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="searchHEI.length == 0" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, the keyword "{{ search }}" cannot be found in the database.
            </div>
            <div v-if="sort_type_var == true" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, there is no data with the type of "{{ sort_type.name }}" in the
                database.
            </div>
            <!-- Table Footer -->
            <div class="table-footer flex flex-row justify-between">
                <div class="flex flex-row pl-3 justify-center items-center">
                    <span class="text-sm text-gray-700">
                        Showing
                        <span class="font-semibold text-gray-900">{{
                1 + numPerPage * currentpage
              }}</span>
                        to
                        <span class="font-semibold text-gray-900">{{
                (currentpage + 1) * numPerPage > totalEntries
                  ? totalEntries
                  : (currentpage + 1) * numPerPage
              }}</span>
                        of
                        <span class="font-semibold text-gray-900">{{
                totalEntries
              }}</span>
                        Entries
                    </span>
                </div>
                <div class="p-3 pr-3">
                    <div class="btn-group">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div v-if="application_counter == 0" class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Account</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to delete this
                account?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteAccount()">Delete</label>
            </div>
        </div>

        <div v-else class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Archive Account</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to archived this
                account?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteAccount()">Archived</label>
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
import NoDataAvail from "@/components//NoDataAvail.vue";
import Parse from "parse";
const toast = useToast();
export default {
    name: "HeiView",
    components: {
        NoDataAvail,
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            currentDelAcc: "",
            application_counter: 0,
            currentpage: 0,
            numPerPage: 5,
            totalEntries: 0,
            columns: [{
                    label: "Name",
                    field: "name",
                },
                {
                    label: "Age",
                    field: "age",
                    type: "number",
                },
                {
                    label: "Created On",
                    field: "createdAt",
                    type: "date",
                    dateInputFormat: "yyyy-MM-dd",
                    dateOutputFormat: "MMM do yy",
                },
                {
                    label: "Percent",
                    field: "score",
                    type: "percentage",
                },
            ],
            rows: [{
                    id: 1,
                    name: "John",
                    age: 20,
                    createdAt: "",
                    score: 0.03343,
                },
                {
                    id: 2,
                    name: "Jane",
                    age: 24,
                    createdAt: "2011-10-31",
                    score: 0.03343,
                },
                {
                    id: 3,
                    name: "Susan",
                    age: 16,
                    createdAt: "2011-10-30",
                    score: 0.03343,
                },
                {
                    id: 4,
                    name: "Chris",
                    age: 55,
                    createdAt: "2011-10-11",
                    score: 0.03343,
                },
                {
                    id: 5,
                    name: "Dan",
                    age: 40,
                    createdAt: "2011-10-21",
                    score: 0.03343,
                },
                {
                    id: 6,
                    name: "John",
                    age: 20,
                    createdAt: "2011-10-31",
                    score: 0.03343,
                },
            ],
            colors: ["approval", "revision", "payment", "evaluation", "forcompliance", "verification", "issuance", "completed", "noncompliant"],
            headers: [{
                    title: "INSTITUTIONAL CODE",
                },
                {
                    title: "HEI NAME",
                },
                {
                    title: "TYPE",
                },
                {
                    title: "USERNAME",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "EMAIL_VERIFIED",
                },
            ],
            datas: [{
                    title: "STATE UNIVERSITIES AND COLLEGES",
                    num: 46,
                    color: "orange",
                },
                {
                    title: "LOCAL UNIVERSITIES AND COLLEGES",
                    num: 23,
                    color: "blue",
                },
                {
                    title: "PRIVATE COLLEGES",
                    num: 57,
                    color: "violet",
                },
                {
                    title: "OTHER GOVERNMENT SCHOOLS",
                    num: 23,
                    color: "green",
                },
            ],
            tables: [],
            search: "",
            sort_type: "Sort by type",
            sort_type_var: false,
            hei_Types: [],
        };
    },

    computed: {
        searchHEI() {
            this.newEntCount();
            return this.tables
                .filter((p) => {
                    return (
                        p.HeiName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                    );
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        onUpdate() {
            this.$refs.Spinner.show();
            this.$router.go()
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
        async selectAcc(instNum) {
            this.currentDelAcc = instNum;

            const acc = new Parse.Query(Parse.User);
            acc.equalTo("inst_code", this.currentDelAcc);
            const querResult = await acc.first({
                useMasterKey: true,
            });

            const applications = Parse.Object.extend("Applications");
            const queryApp = new Parse.Query(applications);
            queryApp.equalTo("createdBy", querResult.id)
            const application = await queryApp.find();

            this.application_counter = application.length;

        },
        async deleteAccount() {
            this.$refs.Spinner.show();

            const acc = new Parse.Query(Parse.User);
            acc.equalTo("inst_code", this.currentDelAcc);
            const querResult = await acc.first({
                useMasterKey: true,
            });

            // const applications = Parse.Object.extend("Applications");
            // const queryApp = new Parse.Query(applications);
            // queryApp.equalTo("createdBy", querResult.id)
            // const application = await queryApp.find();

            // this.application_counter = application.length;

            if (this.application_counter > 0) {
                //if (confirm("This account would be archived instead of deleted due to having past transactions. Would you like to continue?")) {
                querResult.set("isArchived", true);
                querResult.save({
                    useMasterKey: true,
                });
                //console.log("archived")
                //}
            } else {
                querResult.destroy({
                    useMasterKey: true,
                });
                toast("Deleting...", {
                    type: TYPE.WARNING,
                    timeout: 3000,
                    hideProgressBar: false,
                    position: POSITION.TOP_RIGHT,
                });
                setTimeout(() => {
                    document.location.reload()
                }, 3000);

            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
        excelHei() {
            this.$router.push("/hei/upload");
        },
        addHei() {
            this.$router.push("/hei/add");
        },
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return p.HeiName.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).length;
        },
        prevPage() {
            if (this.currentpage > 0) this.currentpage -= 1;
        },
        nextPage() {
            if ((this.currentpage + 1) * this.numPerPage < this.totalEntries) {
                this.currentpage += 1;
            }
        },
        async filterHEI() {
            var heisPriv = [];

            const AccessType = Parse.Object.extend("AccessTypes");
            const queryACC = new Parse.Query(AccessType);
            queryACC.equalTo("name", "HEI");

            const accQuerResult = await queryACC.first();

            const query = new Parse.Query(Parse.User);
            query.equalTo("access_type", accQuerResult.id);
            query.equalTo("hei_type", this.sort_type.id);
            const querResult = await query.find({
                useMasterKey: true,
            });
            for (var i = 0; i < querResult.length; i++) {
                const hei = querResult[i];

                const index = this.hei_Types.findIndex(object => {
                    return object.id == hei.get("hei_type");
                });

                const heiAddress = hei.get("address").street + ", " + hei.get("address").barangay + ", " + hei.get("address").city + ", " +
                    hei.get("address").province + ", " + hei.get("address").regionName;

                heisPriv.push({
                    id: hei.id,
                    InstNo: hei.get("inst_code"),
                    HeiName: hei.get("hei_name"),
                    address: heiAddress,
                    type: this.hei_Types[index].name,
                    email: hei.get("email"),
                });
            }
            if (heisPriv.length > 0) {
                this.sort_type_var = false;
                this.tables = heisPriv;
            } else {
                this.sort_type_var = true;
            }

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
            if (accType[y] === "/application") {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

            const AccessType = Parse.Object.extend("AccessTypes");
            const queryACC = new Parse.Query(AccessType);
            queryACC.equalTo("name", "HEI");

            const accQuerResult = await queryACC.first();

            var heis = [];
            const query = new Parse.Query(Parse.User);
            query.equalTo("access_type", accQuerResult.id);
            const querResult = await query.find({
                useMasterKey: true,
            });

            const HEITypes = Parse.Object.extend("HEI_Types");
            const hTypeQuery = new Parse.Query(HEITypes);

            const hTypeQuerResult = await hTypeQuery.find();

            var heiTypes = [];
            var hTypeCounter = [];

            for (var h = 0; h < hTypeQuerResult.length; h++) {
                const heiType = hTypeQuerResult[h];
                heiTypes.push({
                    id: heiType.id,
                    name: heiType.get("name"),
                });
                hTypeCounter.push(0);
            }

            this.hei_Types = heiTypes;

            for (var i = 0; i < querResult.length; i++) {
                const hei = querResult[i];

                const index = heiTypes.findIndex(object => {
                    return object.id == hei.get("hei_type");
                });

                const htypeName = heiTypes[index].name;

                console.log(index);

                hTypeCounter[index] += 1;

                const heiAddress = hei.get("address").street == undefined || hei.get("address").street == "" ?
                    hei.get("address").barangay + ", " + hei.get("address").city + ", " +
                    hei.get("address").province + ", " + hei.get("address").regionName :
                    hei.get("address").street + ", " + hei.get("address").barangay + ", " + hei.get("address").city + ", " +
                    hei.get("address").province + ", " + hei.get("address").regionName;

                heis.push({
                    id: hei.id,
                    InstNo: hei.get("inst_code"),
                    HeiName: hei.get("hei_name"),
                    userName: hei.get("username"),
                    address: heiAddress,
                    type: htypeName,
                    email: hei.get("email"),
                    emailVerified: hei.get("emailVerified"),
                });
            }
            this.totalEntries = querResult.length;
            this.tables = heis;

            var dataCol = [];
            for (var t = 0; t < heiTypes.length; t++) {
                dataCol.push({
                    title: heiTypes[t].name,
                    num: hTypeCounter[t],
                    color: this.colors[t],
                })

            }

            this.datas = dataCol;
            /////////////////////////////////////////////////////////////////////////////// Live Queries
            var password;
            const subscription = await query.subscribe();
            // subscription.on('open', () => {
            //     console.log('subscription opened');
            // });
            // subscription.on('create', (object) => {
            //     console.log('object created' + object);
            // });
            // subscription.on('enter', (object) => {
            //     console.log('object entered' + object);
            // });
            // subscription.on('leave', (object) => {
            //     console.log('object left' + object);
            // });
            // subscription.on('delete', (object) => {
            //     console.log('object deleted' + object);
            // });
            // subscription.on('close', () => {
            //     console.log('subscription closed');
            // });
            subscription.on("update", async (object) => {
                console.log("object updated" + object);
                // this.count();

                var index = this.tables.findIndex((hei) => hei.id == object.id);
                const heiAddress = object.get("address").street == undefined || object.get("address").street == "" ?
                    object.get("address").barangay + ", " + object.get("address").city + ", " +
                    object.get("address").province + ", " + object.get("address").regionName :
                    object.get("address").street + ", " + object.get("address").barangay + ", " + object.get("address").city + ", " +
                    object.get("address").province + ", " + object.get("address").regionName;

                // const HEITypes1 = Parse.Object.extend("HEI_Types");
                const hTypeQuery1 = hTypeQuery.equalTo("objectId", object.get("hei_type"))

                // 
                const htype = await hTypeQuery1.first();

                this.tables[index] = {
                    ...this.tables[index],
                    InstNo: object.get("inst_code"),
                    HeiName: object.get("hei_name"),
                    userName: object.get("username"),
                    address: heiAddress,
                    type: htype.get("name"),
                    email: object.get("email"),
                    emailVerified: object.get("emailVerified"),
                };

                const emailQuery = new Parse.Query(Parse.User);
                emailQuery.equalTo("objectId", object.id);
                await emailQuery.first({
                    useMasterKey: true
                }).then((objectEmail) => {
                    if (
                        objectEmail.get("emailVerified") == true &&
                        objectEmail.get("receivedCredentials") == false
                    ) {

                        password = Math.random().toString(36).slice(-12);
                        console.log("first: " + password)
                        const params = {
                            name: objectEmail.get("hei_name"),
                            username: objectEmail.get("username"),
                            email: objectEmail.get("email"),
                            password: password,
                            type: "sendCredentials",
                            approved: true,
                        };
                        console.log(objectEmail.id);
                        Parse.Cloud.run("sendEmailNotification", params);

                        objectEmail.setPassword(password);
                        console.log("second: " + password)
                        objectEmail.set("receivedCredentials", true);
                        objectEmail.save(null, {
                            useMasterKey: true,
                        });
                    }
                });

            });
        }
    },
};
</script>

<style scoped>
.dropzone {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
    border: 2px dashed #41b883;
    background-color: #fff;
    transition: 0.3s ease all;
}

.dropzone label {
    padding: 8px 12px;
    color: #fff;
    background-color: #41b883;
    transition: 0.3s ease all;
}

.dropzone input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
}

.active-dropzone label {
    background-color: #fff;
    color: #41b883;
}
</style>
