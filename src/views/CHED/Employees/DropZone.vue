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
                Submit
            </button>
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
            counter: 0
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
    methods: {
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
                    setTimeout(() => {
                        //    event.data.reason
                        toast("Please verify that the EXCEL file is for Employee Accounts.", {
                            type: TYPE.WARNING,
                            timeout: 3000,
                            hideProgressBar: true,
                            position: POSITION.TOP_RIGHT,
                        });
                    }, 3000);
                    self.closeSpinner();
                }
            };

            // }
        },
        upload() {
            if (this.dropzoneFile === "") {
                toast("Please select a file", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
            } else {
                console.log("upload");
                var validation = this.validate(this.dropzoneFile);
                if (validation) {
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
                }
            }
        },

        async storeEmployees(employeesData) {
            console.log("store");
            for (let i = 0; i < employeesData.length; i++) {
                this.counter = this.counter + 1;
                try {
                    var password = Math.random().toString(36).slice(-12);
                    const newEmployee = new Parse.User();
                    var employeeName = {
                        lastname: employeesData[i].A,
                        firstname: employeesData[i].B,
                        middleinitial: employeesData[i].C,
                    };
                    newEmployee.set("name", employeeName);
                    newEmployee.set("username", employeesData[i].D);
                    newEmployee.set("password", password);
                    newEmployee.set("email", employeesData[i].E);
                    newEmployee.set("contact_num", "0" + employeesData[i].F.toString());

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

                            newEmployee.set("discipline", employeesData[i].I);

                            newEmployee.save().then(() => {
                                setTimeout(() => {
                                    const params = {
                                        name: this.employeeName,
                                        username: employeesData[i].D,
                                        email: employeesData[i].E,
                                        password: password,
                                        type: "sendCredentials",
                                        approved: true,
                                    };
                                    Parse.Cloud.run("sendEmailNotification", params);
                                }, 1000);

                            });

                        })

                    } else {
                        newEmployee.set("designation", designationResult.id);

                        newEmployee.set("access_type", accesstypeResult[0].id);

                        newEmployee.set("discipline", employeesData[i].I);
                        if (flag === 0) {

                            await newEmployee.save().then(() => {
                                setTimeout(() => {
                                    const params = {
                                        name: this.employeeName,
                                        username: employeesData[i].D,
                                        email: employeesData[i].E,
                                        password: password,
                                        type: "sendCredentials",
                                        approved: true,
                                    };
                                    Parse.Cloud.run("sendEmailNotification", params);
                                }, 1000);

                            });
                        }
                    }

                } catch (error) {
                    console.log(error.message);
                    this.counter = this.counter - 1;
                }
            }
            toast(this.counter + " EMPLOYEE Accounts Added!", {
                type: TYPE.SUCCESS,
                timeout: 3000,
                position: POSITION.TOP_RIGHT,
            });
            this.$refs.Spinner.hide();
            this.$router.push("/employees");
            setTimeout(() => {
                this.$router.go()
            }, 2000);
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
