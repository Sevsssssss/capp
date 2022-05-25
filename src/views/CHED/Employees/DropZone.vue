<template>
<div>
    <div fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @drop.prevent="drop" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
        <div v-if="!dropzoneFile.name" class="flex flex-col space-y-2">
            <span>Drag or Drop File</span>
            <span>OR</span>
            <label for="dropzoneFile" class="">Select File</label>
            <input type="file" id="dropzoneFile" class="dropzoneFile" />
        </div>
        <div v-else class="flex flex-col  space-y-8">
            <div class="flex justify-center items-center space-x-2">
                <img v-if="dropzoneFile.name" style="height: 30px; width: 30px;" src="@/assets/img/excel.png" />
                <span class="text-brand-blue font-body">{{ dropzoneFile.name }}</span>
            </div>
            <div>
                <label for="dropzoneFile" class="">Select File</label>
                <input type="file" id="dropzoneFile" class="dropzoneFile" />
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center">
        <div class="w-fit space-x-4">
            <button class="btn-small btn-outline border text-black" @click="$router.go(-1)">
                Cancel
            </button>
            <button @click="upload()" class="btn-small mt-4 font-normal bg-brand-darkblue hover:bg-brand-lightblue" type="submit">
                Upload
            </button>
        </div>
    </div>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="showModal" class="modal-toggle" />
    <div :class="{ 'modal-open ': showMOdal() }" class="modal">
        <div class="modal-box rounded-md w-11/12 max-w-max">
            <div class="flex text-lg font-semibold uppercase pb-4">
                Are you sure you want to upload this HEI TABLE?
            </div>
            <div class="relative overflow-x-auto shadow-md">
                <div>
                    <div class="flex p-4">
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
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th v-for="head in headers" :key="head.title" scope="col" class="px-6 py-3">
                                {{head.title}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="table in searchTable" :key="table" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {{table.A}}
                            </th>
                            <td class="px-6 py-4">
                                {{table.B}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.C}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.D}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.E}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.F}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.G}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.H}}
                            </td>
                            <td class="px-6 py-4">
                                {{table.I}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="searchTable.length == 0" class="p-5 font-medium">
                    <!-- NO DATA FOUND {{search}} -->
                    Sorry, the keyword "{{ search }}" cannot be found in the database.
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
                    <div class="p-3">
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
            <div class="modal-action">
                <label @click="showValidate = false" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label @click="uploadtable()" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none">Submit</label>
            </div>
        </div>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    ref
} from "vue";
import Parse from "parse";
import Worker from "@/js/employeesParse.worker.js";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
const toast = useToast();
export default {
    data() {
        return {
            counter: 0,
            pending: false,
            address: {},
            headers: [{
                    title: "LASTNAME",
                },
                {
                    title: "FIRSTNAME",
                },
                {
                    title: "MIDDLE INITIAL",
                },
                {
                    title: "USERNAME",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "CONTACT NUMBER",
                },
                {
                    title: "ACCESS TYPE",
                },
                {
                    title: "DESIGNATION",
                },
                {
                    title: "DISCIPLINE",
                },
            ],
            tables: [],
            showValidate: false,
            currentpage: 0,
            numPerPage: 4,
            totalEntries: 0,
            search: "",
        }
    },
    components: {
        VueInstantLoadingSpinner,
    },
    setup() {
        const active = ref(false);
        let dropzoneFile = ref("");
        const drop = (e) => {
            dropzoneFile.value = e.dataTransfer.files[0];
        };
        const selectedFile = () => {
            dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
        };
        const toggleActive = () => {
            active.value = !active.value;
        };
        return {
            active,
            toggleActive,
            dropzoneFile,
            drop,
            selectedFile,
        };
    },
    computed: {
        searchTable() {
            // this.newEntCount();
            return this.tables
                .filter((p) => {
                    return p.A.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return p.A.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
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
        showMOdal() {
            return this.showValidate;
        },
        validate(filename) {
            console.log("validate");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (filename === "") {
                this.className = "alert-error";
                return false;
            } else if (regex.test(filename.name)) {
                return true;
            } else {
                toast("File not found. Check the file name and upload a .xlsx file!", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                return false;
            }
        },
        closeSpinner() {
            this.$refs.Spinner.hide();
        },
        createWorker(data, self) {
            console.log("worker");
            // var worker1 = new Worker();
            // if (typeof Worker !== "undefined") {
            console.log("in worker");
            if (typeof self.worker == "undefined") {
                console.log("setWorker");
                self.worker = new Worker();
            }
            self.worker.postMessage({
                d: data,
            });

            self.worker.onmessage = function (event) {
                console.log("onMessage");
                if (event.data.complete) {
                    console.log("Successfully parsed xlsx file!");
                    self.storeEmployees(event.data.rows);
                } else {
                    toast(event.data.reason, {
                        type: TYPE.ERROR,
                        timeout: 2000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    toast("Please verify that the EXCEL file is for Employee Accounts.", {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    self.closeSpinner();
                }
            };

            // }
        },
        // upload() {
        //     if (this.dropzoneFile === "") {
        //         toast("Please select a file", {
        //             type: TYPE.ERROR,
        //             timeout: 3000,
        //             hideProgressBar: true,
        //             position: POSITION.TOP_RIGHT,
        //         });
        //     } else {
        //         console.log("upload");
        //         var validation = this.validate(this.dropzoneFile);
        //         if (validation) {
        //             this.pending = true;
        //             this.$refs.Spinner.show();
        //             const self = this;
        //             var reader = new FileReader();
        //             reader.onload = function (e) {
        //                 var data = e.target.result;
        //                 try {
        //                     self.createWorker(data, self);
        //                 } catch (e) {
        //                     console.log(e);
        //                     this.pending = false;
        //                     this.$refs.Spinner.hide();
        //                 }
        //             };
        //             reader.readAsArrayBuffer(this.dropzoneFile);
        //         }
        //     }
        // },
        createTableWorker(data, self) {
            console.log("worker")
            // var worker1 = new Worker();
            // if (typeof Worker !== "undefined") {
            console.log("in worker")
            if (typeof self.worker == "undefined") {
                console.log('setWorker')
                self.worker = new Worker();
            }
            self.worker.postMessage({
                d: data
            });
            self.worker.onmessage = function (event) {
                console.log('onMessage')
                if (event.data.complete) {
                    self.tables = [];
                    self.totalEntries = 0;
                    console.log("Successfully parsed xlsx file!");
                    for (let i = 0; i < event.data.rows.length; i++) {
                        self.totalEntries = event.data.rows.length;
                        self.tables.push(event.data.rows[i]);
                    }
                    toast("Successfully parsed xlsx file", {
                        type: TYPE.INFO,
                        timeout: 3000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    self.closeSpinner();
                    console.log(self.tables)
                } else {
                    self.showValidate = !self.showValidate;
                    toast(event.data.reason, {
                        type: TYPE.ERROR,
                        timeout: 2000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    toast("Please verify that the EXCEL file is for HEI Account.", {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    self.closeSpinner();
                }
            };
            // }
        },
        upload() {
            var has_error = 0;
            if (this.dropzoneFile === "") {
                toast("Please select a file", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            } else if (this.dropzoneFile !== "") {
                var validation = this.validate(this.dropzoneFile);
                if (!validation) {
                    has_error = 1;
                } else if (validation) {
                    try {
                        this.pending = true;
                        this.$refs.Spinner.show();
                        const self = this;
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            try {
                                self.createTableWorker(data, self);
                            } catch (e) {
                                console.log(e);
                                this.pending = false;
                                this.$refs.Spinner.hide();
                                has_error = 1;
                            }
                        };
                        reader.readAsArrayBuffer(this.dropzoneFile);
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            if (has_error < 1) {
                this.showValidate = !this.showValidate;
            }
        },
        uploadtable() {
            console.log("upload")
            var validation = this.validate(this.dropzoneFile);
            if (validation) {
                try {
                    this.pending = true;
                    this.$refs.Spinner.show();
                    const self = this;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        try {
                            self.createWorker(data, self);
                        } catch (e) {
                            console.log(e);
                            this.pending = false;
                            this.$refs.Spinner.hide();
                        }
                    };
                    reader.readAsArrayBuffer(this.dropzoneFile);
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async storeEmployees(employeesData) {
            console.log("store");
            var password = [];
            for (let i = 0; i < employeesData.length; i++) {
                try {
                    password.push(Math.random().toString(36).slice(-12));
                    const newEmployee = new Parse.User();
                    var employeeName = {
                        lastname: employeesData[i].A,
                        firstname: employeesData[i].B,
                        middleinitial: employeesData[i].C,
                    };
                    newEmployee.set("name", employeeName);
                    newEmployee.set("username", employeesData[i].D);
                    newEmployee.set("password", password[i]);
                    newEmployee.set("email", employeesData[i].E);
                    newEmployee.set("contact_num", "0" + employeesData[i].F.toString());
                    newEmployee.set("receivedCredentials", false);

                    const accesstype = Parse.Object.extend("AccessTypes");
                    const accesstypeQuery = new Parse.Query(accesstype);
                    accesstypeQuery.equalTo("name", employeesData[i].G);
                    const accesstypeResult = await accesstypeQuery.find();

                    const designations = Parse.Object.extend("Designations");
                    const designationQuery = new Parse.Query(designations);
                    designationQuery.equalTo("name", employeesData[i].H);
                    const designationResult = await designationQuery.first();
                    var flag = 0;
                    if (designationResult === undefined) {
                        flag = 1;
                        const desig = Parse.Object.extend("Designations");
                        const newDesignation = new desig();

                        await newDesignation.save({
                            name: employeesData[i].H.toUpperCase(),
                        }).then(() => {

                            newEmployee.set("designation", newDesignation.id);

                            newEmployee.set("access_type", accesstypeResult[0].id);

                            if (employeesData[i].H == "EDUCATION SUPERVISOR") {

                                var DisciplinesArray = employeesData[i].I.split(",");
                                var DisciplinesIDArray = [];
                                for (var a = 0; a < DisciplinesArray.length; a++) {
                                    const disciplines = Parse.Object.extend("Disciplines");
                                    const disciplinesQuery = new Parse.Query(disciplines);
                                    disciplinesQuery.equalTo("MajorDiscipline", DisciplinesArray[a]);

                                    const disciplinesResult = disciplinesQuery.first();

                                    DisciplinesIDArray.push(disciplinesResult.id);

                                }
                                newEmployee.set("disciplines", DisciplinesIDArray);
                            }

                            newEmployee.save()

                        })

                    } else {
                        newEmployee.set("designation", designationResult.id);

                        newEmployee.set("access_type", accesstypeResult[0].id);

                        if (employeesData[i].H == "EDUCATION SUPERVISOR") {

                            var DisciplinesArray = employeesData[i].I.split(", ");
                            var DisciplinesIDArray = [];
                            for (var a = 0; a < DisciplinesArray.length; a++) {
                                const disciplines = Parse.Object.extend("Disciplines");
                                const disciplinesQuery = new Parse.Query(disciplines);
                                disciplinesQuery.equalTo("MajorDiscipline", DisciplinesArray[a]);

                                const disciplinesResult = await disciplinesQuery.first();

                                DisciplinesIDArray.push(disciplinesResult.id);

                            }
                            newEmployee.set("disciplines", DisciplinesIDArray);
                        }
                        if (flag === 0) {

                            await newEmployee.save()
                            this.counter = this.counter + 1;
                        }
                    }

                } catch (error) {
                    console.log(error.message);
                    if (this.counter > 0) {
                        this.counter = this.counter - 1;
                    }
                }
            }
            if (this.counter === 0) {
                toast(this.counter + " Employee Accounts Added, data already exists.", {
                    type: TYPE.WARNING,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });

            } else {
                toast(this.counter + " Employee Accounts Added!", {
                    type: TYPE.SUCCESS,
                    timeout: 3000,
                    position: POSITION.TOP_RIGHT,
                });
            }
            this.$refs.Spinner.hide();
            this.$router.push("/employees");
            // setTimeout(() => {
            //     this.$router.go()
            // }, 2000);
            this.pending = false;
        },
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
    border: 2px dashed #c4c4c4;
    background-color: #fff;
    transition: 0.3s ease all;
}

.dropzone label {
    padding: 8px 12px;
    color: #fff;
    background-color: #0e3385;
    transition: 0.3s ease all;
    border-radius: 5px;
}

.dropzone input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #c4c4c4;
}

.active-dropzone label {
    background-color: #fff;
    color: #41b883;
}
</style>
