<template>
<div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="RqatView" />
</div>
<div v-else class="p-3">
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
                    <button @click="excelRQAT()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z" />
                        </svg>
                        <div class="pl-2">Upload Excel</div>
                    </button>
                </div>
                <!-- button -->
                <div class="h-fit pr-5 pt-3 items-center">
                    <button @click="addRQAT()" type="button" class="btn-table">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                        </svg>
                        <div class="pl-2">Add RQAT</div>
                    </button>
                </div>
            </div>
        </div>
        <!-- Table body -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                            {{ header.title }}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b " v-for="table in searchRqat" :key="table">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                            {{ table.rqatName }}
                        </th>
                        <td class="px-6 py-4">
                            <div class="text-md font-semibold">{{ table.hei }}</div>
                        </td>
                        <td class="px-6 py-4">
                            {{ table.contactNum }}
                        </td>

                        <td class="px-6 py-4">
                            {{ table.username }}
                        </td>
                        <td class="px-6 py-4">
                            {{ table.emailVerified }}
                        </td>
                        <!-- <td class="px-6 py-4">
                            {{ table.email }}
                        </td> -->
                        <td class="px-6 py-4">
                            <div class="flex  space-x-2 items-end justify-end">
                                <a href="#" @click="viewAssignments()" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>

                                <router-link :to="{
                                name: 'EditRQATView',
                                params: {
                                rqatID: table.id,
                                },
                            }">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </router-link>

                                <div>
                                    <label for="deleteFunc" class="hover:text-brand-red/60">
                                        <svg style="width: 20px; height: 20px" viewBox="0 0 24 24" @click="selectAcc(table.id)">
                                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="searchRqat.length == 0" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, the keyword "{{search}}" cannot be found in the database.
            </div>
            <!-- Table Footer -->
            <div class="table-footer flex flex-row justify-between">
                <div class="flex flex-row pl-3 justify-center items-center">
                    <span class="text-sm text-gray-700 ">
                        Showing
                        <span class="font-semibold text-gray-900 ">{{
                1 + numPerPage * currentpage
              }}</span>
                        to
                        <span class="font-semibold text-gray-900 ">{{
                (currentpage + 1) * numPerPage > totalEntries
                  ? totalEntries
                  : (currentpage + 1) * numPerPage
              }}</span>
                        of
                        <span class="font-semibold text-gray-900 ">{{
                totalEntries
              }}</span>
                        Entries
                    </span>
                </div>
                <div class="p-3 pr-3">
                    <div class="btn-group">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " @click="nextPage()">Next</a>
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
                <label @click="deleteRQAT" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none">Delete</label>
            </div>
        </div>

        <div v-else class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Archived Account</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are you sure you want to archived this
                account?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label @click="deleteRQAT" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none">Archived</label>
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
// var dataNumber = 10;
// var page = 0;

import NoDataAvail from "@/components//NoDataAvail.vue";
const toast = useToast();
export default {
    name: "RqatView",
    data() {
        return {
            currentpage: 0,
            application_counter: 0,
            numPerPage: 8,
            totalEntries: 0,
            currentDelAcc: "",
            headers: [{
                    title: "RQAT MEMBER NAME",
                },
                {
                    title: "HEI",
                },
                {
                    title: "CONTACT NUMBER",
                },
                {
                    title: "USERNAME",
                },
                {
                    title: "EMAIL VERIFIED",
                },
                //  {
                //     title: "EMAIL",
                // },
            ],

            datas: [{
                    title: "FOR APPROVAL",
                    num: 300,
                },
                {
                    title: "FOR REVISION",
                    num: 300,
                },
                {
                    title: "FOR ISSUANCE",
                    num: 300,
                },
                {
                    title: "FOR EVALUATION",
                    num: 300,
                },
                {
                    title: "FOR COMPLETION",
                    num: 300,
                },
            ],
            tables: [],
            search: "",
        };
    },
    components: {
        NoDataAvail,
        VueInstantLoadingSpinner,
    },
    computed: {
        searchRqat() {
            this.newEntCount();
            return this.tables
                .filter((p) => {
                    return (
                        p.rqatName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
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
        addRQAT() {
            this.$router.push("/rqat/add");
        },
        //Select RQAT to Delete
        async selectAcc(id) {
            this.currentDelAcc = id;

            const acc = new Parse.Query(Parse.User);
            acc.equalTo("objectId", this.currentDelAcc);
            const querResult = await acc.first({
                useMasterKey: true,
            });

            const applications = Parse.Object.extend("Applications");
            const queryApp = new Parse.Query(applications);
            queryApp.equalTo("selectedRQAT", querResult.id)
            const application = await queryApp.find();

            this.application_counter = application.length;

        },
        async deleteRQAT() {
            this.$refs.Spinner.show();
            //Query RQAT to be deleted
            const acc = new Parse.Query(Parse.User);
            acc.equalTo("objectId", this.currentDelAcc);
            const querResult = await acc.first({
                useMasterKey: true,
            });

            if (this.application_counter > 0) {
                querResult.set("isArchived", true);
                querResult.save({
                    useMasterKey: true,
                });
            } else {
                //Delete RQAT
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
                    window.location.reload()
                }, 3000);
            }
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
        viewAssignments() {
            this.$router.push("/rqat/AdminHistory");
        },

        //For Table Page Traversal
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return (
                    p.rqatName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
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
        excelRQAT() {
            this.$router.push("/rqat/upload");
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
            if (accType[y] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            //Query RQAT Access Type
            const AccessType = Parse.Object.extend("AccessTypes");
            const queryACC = new Parse.Query(AccessType);
            queryACC.equalTo("name", "RQAT");

            const accQuerResult = await queryACC.first();

            var rqats = [];

            //Query RQAT Users
            const query = new Parse.Query(Parse.User);
            query.equalTo("access_type", accQuerResult.id);
            query.notEqualTo("hei_affil", null);
            const querResult = await query.find();

            //Store RQATs
            for (var i = 0; i < querResult.length; i++) {
                const rqat = querResult[i];

                var heiAffil = "";
                if (rqat.get("hei_affil").hei != "None") {
                    const heis = new Parse.Query(Parse.User);
                    heis.equalTo("objectId", rqat.get("hei_affil").hei);
                    const hei = await heis.first();
                    heiAffil = hei.get("hei_name");
                } else {
                    heiAffil = rqat.get("hei_affil").hei;
                }

                rqats.push({
                    id: rqat.id,
                    rqatName: rqat.get("name")["lastname"] +
                        ", " +
                        rqat.get("name")["firstname"] +
                        " " +
                        rqat.get("name")["middleinitial"] +
                        ".",
                    hei: heiAffil,
                    contactNum: rqat.get("contact_num"),
                    username: rqat.get("username"),
                    email: rqat.get("email"),
                    emailVerified: rqat.get("emailVerified")
                });
            }
            this.totalEntries = querResult.length;
            this.tables = rqats;

            /////////////////////////////////////////////////////////////////////////////// Live Queries
            var password;
            const queryRQAT = new Parse.Query(Parse.User);
            const subscription = await queryRQAT.subscribe();
            subscription.on("update", async (object) => {
                console.log("object updated" + object);
                // this.count();

                var index = this.tables.findIndex((rqat) => rqat.id == object.id);

                var heiAff = "";
                if (object.get("hei_affil").hei != "None") {
                    const heisQ = new Parse.Query(Parse.User);
                    heisQ.equalTo("objectId", object.get("hei_affil").hei);
                    const heiQ = await heisQ.first();
                    heiAff = heiQ.get("hei_name");
                } else {
                    heiAff = object.get("hei_affil").hei;
                }

                this.tables[index] = {
                    ...this.tables[index],
                    rqatName: object.get("name")["lastname"] +
                        ", " +
                        object.get("name")["firstname"] +
                        " " +
                        object.get("name")["middleinitial"] +
                        ".",
                    hei: heiAff,
                    contactNum: object.get("contact_num"),
                    username: object.get("username"),
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

                        const params = {
                            username: objectEmail.get("username"),
                            email: objectEmail.get("email"),
                            password: password,
                            type: "sendCredentials",
                            approved: true,
                        };
                        Parse.Cloud.run("sendEmailNotification", params);
                        objectEmail.setPassword(password);
                        objectEmail.set("receivedCredentials", true);
                        objectEmail.save(null, {
                            useMasterKey: true,
                        });
                    }
                });

                /////////////////////////////UPDATE TABLE

             
            });
        }
    },
};
</script>

<style></style>
