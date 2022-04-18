<template>
<div class="flex flex-col center h-full p-5">
    <div class="noDataAvail">
        No Data Available
    </div>
    <div v-if="names ==='HeiView'">
        <button @click="addHei()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2 font-semibold">Add HEI</div>
        </button>
    </div>
    <div v-else-if="names ==='RqatView'">
        <button @click="addRQAT()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2 font-semibold">Add RQAT</div>
        </button>
    </div>
    <div v-else-if="names ==='EmployeeView'">
        <button @click="addEmployee()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2 font-semibold">Add Employee</div>
        </button>
    </div>
    <div v-else-if="names ==='EvalInstView'">
        <button @click="addEvalIns()" class="
              btn btn-md
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            ">
            <div class="flex flex-row">
                <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                <div class="btn-text">Add Evalutation Ins.</div>
            </div>
        </button>
    </div>

    <div v-else-if="names ==='DisciplinesView'">
        <div class="h-fit pr-2 pt-3 items-center">
            <label type="button" for="createDisciplines" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                <div class="pl-2">Add Discipline</div>
            </label>
        </div>
    </div>

    <div v-else-if="names ==='AccessTypesView'">
        <div class="h-fit pr-5 pt-3 items-center">
            <label type="button" for="createAccessType" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                </svg>
                <div class="pl-2">Add Access Type</div>
            </label>
        </div>
    </div>

    <div v-else-if="names ==='AppSettingsView'">
        <button @click="addAppType()" type="button" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
            </svg>
            <div class="pl-2">APPLICATION TYPE NAME</div>
        </button>
    </div>

    <input type="checkbox" id="createDisciplines" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD A DISCIPLINE</div>
            <p class="py-2 text-sm">Input the entire name of the dicipline.</p>
            <form>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Discipline Name:</label>
                    <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Name" v-model="disciplineName" />
                </div>
            </form>
            <div class="modal-action">
                <label for="createDisciplines" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="addDiscipline()">Submit</label>
            </div>
        </div>
    </div>

    <input type="checkbox" id="createAccessType" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD ACCESS TYPES</div>
            <p class="py-2 text-sm">Input the name and choose its priviliges.</p>
            <form>
                <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Access Type:</label>
                    <input type="text" id="base-input" class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-md
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
              " placeholder="Enter Name" v-model="atname" />
                    <div class="font-medium text-sm mt-2">
                        Choose Home Type:
                        <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                            <div class="label-text viewSubCatbool pr-3" style="align-self: center">
                                <input type="radio" id="homeType" value="/home" class="radio mr-1" v-model="homeType" />
                                CHED Home
                            </div>
                            <div class="label-text viewSubCatbool" style="align-self: center">
                                <input type="radio" id="homeType" value="/HEIhome" class="radio mr-1" v-model="homeType" />
                                HEI Home
                            </div>
                        </label>
                    </div>
                    <div v-if="homeType == '/home'" class="font-medium text-sm mt-2">
                        Privileges:
                        <div class=" grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 text-left">
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/application" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Application
                                </div>
                            </label>
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/application:id" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Application Status
                                </div>
                            </label>

                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/hei" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEIs Account
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/hei/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add HEI
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/hei/upload" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Upload HEI Accounts
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/rqat" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    RQAT Account
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/rqat/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add RQAT
                                </div>
                            </label>
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/employees" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Employees
                                </div>
                            </label>
                            <label class="flex flex-row cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/employees/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add Employees
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/evaluationins" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Evaluation Ins.
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/evaluationins/view" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Evaluation Ins. View
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/evaluationins/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Evaluation Ins. Add
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/reporting" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Reporting
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/app-settings" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Application Types
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/app-settings/add" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Add Application Type
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/app-settings/appTypeView" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    View Application Type
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/access-settings" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Access Types
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/designations" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    Designations
                                </div>
                            </label>
                        </div>
                    </div>

                    <div v-if="homeType == '/HEIhome'" class="font-medium text-sm mt-2">
                        HEI Privileges:
                        <div class="form-control flex mt-1 flex-row">
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/HEIapply" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEI Apply
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/HEIapplication" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEI Application
                                </div>
                            </label>
                            <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center;">
                                <input type="checkbox" class="checkbox mr-1" value="/HEIapplication/:id" v-model="checkedAccessTypes" />
                                <div class="label-text viewSubCatbool" style="align-self: center">
                                    HEI Edit Application
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            <div class="modal-action">
                <label for="createAccessType" class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            ">Cancel</label>
                <label class="
              btn btn-sm
              bg-blue-700
              rounded-md
              hover:bg-blue-800
              border-none
            " @click="addAccessType()">Submit</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
export default {
    name: "NoDataAvail",
    props: ["names"],
    data() {
        return {
            atname: "",
            checkedAccessTypes: [],
            homeType: "",
        }
    },
    methods: {
        addHei() {
            this.$router.push("/hei/add");
        },
        addRQAT() {
            this.$router.push("/rqat/add");
        },
        addEmployee() {
            this.$router.push("/employees/add");
        },
        addEvalIns() {
            this.$router.push("/employees/add");
        },
        addAppType() {
            this.$router.push("/app-settings/add");
        },
        addAccessType() {
            const accessType = Parse.Object.extend("AccessTypes");
            const newAccessType = new accessType();
            try {
                newAccessType.save({
                    name: this.atname.toUpperCase(),
                    hometype: this.homeType,
                    privileges: this.checkedAccessTypes,
                });
                if (
                    confirm(
                        "Application Type added. Would you like to add another Application Type?"
                    )
                ) {
                    document.location.reload();
                } else {
                    document.location.reload();
                }
            } catch (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        },
        mounted: async function () {
            var accessTypesTable = [];
            const AccessTypes = Parse.Object.extend("AccessTypes");
            const query = new Parse.Query(AccessTypes);
            const querResult = await query.find();
            for (var i = 0; i < querResult.length; i++) {
                const accessType = querResult[i];
                var accessPriv = "";
                for (var x = 0; x < accessType.get("privileges").length; x++) {
                    var accessPrivIndex = accessType.get("privileges")[x];
                    if (accessPriv === "") {
                        accessPriv = accessPriv + accessPrivIndex;
                    } else {
                        accessPriv = accessPriv + ", " + accessPrivIndex;
                    }
                }
                accessTypesTable.push({
                    Name: accessType.get("name"),
                    Privileges: accessPriv,
                });
            }
            this.totalEntries = querResult.length;
            this.tables = accessTypesTable;
            // console.log(this.tables);
        },
    },
};
</script>

<style>
</style>
