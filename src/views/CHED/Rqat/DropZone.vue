<template>
<div>
    <div fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @drop.prevent="drop" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
        <span>Drag or Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input type="file" id="dropzoneFile" class="dropzoneFile" />
    </div>
    <div class="flex flex-col items-center">
        <span class="mt-5 font-semibold">File:
            <span class="text-brand-blue/50">{{ dropzoneFile.name }}</span></span>
        <button @click="upload()" class="btn-small mt-4 font-normal bg-brand-darkblue" type="submit">
            Submit
        </button>
    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    ref
} from "vue";
import Parse from 'parse';
import Worker from "@/js/rqatParse.worker.js";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
const toast = useToast();
export default {
    components: {
        VueInstantLoadingSpinner
    },
    data() {
        return {
            pending: false,
            counter: 0
        }
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
            console.log("validate")
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (filename === "") {
                this.className = "alert-error";
                return false;
            } else if (regex.test(filename.name)) {
                return true;
            } else {
                toast("Please upload a .xlsx file!", {
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
                    console.log("Successfully parsed xlsx file!");
                    self.storeRqat(
                        event.data.rows,
                    )

                } else {
                    alert(event.data.reason);
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
                console.log("upload")
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

        async storeRqat(rqatData) {
            console.log("store")
            for (let i = 0; i < rqatData.length; i++) {
                this.counter = this.counter + 1;
                try {
                    const AccessTypeRQAT = Parse.Object.extend("AccessTypes");
                    const queryACCR = new Parse.Query(AccessTypeRQAT);
                    queryACCR.equalTo("name", "RQAT");

                    const accQuerResultRQAT = await queryACCR.first();

                    this.rqat_acc_id = accQuerResultRQAT.id;
                    var months = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];
                    var today = new Date();
                    var month = today.getMonth();
                    var day = today.getDate();
                    var year = today.getFullYear();
                    var currentDay = months[month] + " " + day + ", " + year;

                    const newRQAT = new Parse.User();
                    var rqatName = {
                        lastname: rqatData[i].A,
                        firstname: rqatData[i].B,
                        middleinitial: rqatData[i].C,
                    };
                    const query = new Parse.Query(Parse.User);
                    query.equalTo("hei_name", rqatData[i].F);
                    const querResult = await query.first();
                    var heiAffil = {
                        hei: querResult.id,
                        affilrecordDate: currentDay,
                        affilendDate: "current",
                    }

                    var password = Math.random().toString(36).slice(-12);
                    newRQAT.set("name", rqatName);
                    newRQAT.set("username", rqatData[i].D);
                    newRQAT.set("password", "password");
                    newRQAT.set("contact_num", "0" + rqatData[i].E.toString());
                    newRQAT.set("hei_affil", heiAffil);
                    newRQAT.set("email", rqatData[i].G);
                    newRQAT.set("access_type", this.rqat_acc_id);
                    newRQAT.set("hasTransactions", false);
                    await newRQAT.save().then(() => {
                        const params = {
                            name: this.rqatName,
                            username: rqatData[i].D,
                            email: rqatData[i].G,
                            password: password,
                            type: "sendCredentials",
                            approved: true,
                        };
                        Parse.Cloud.run("sendEmailNotification", params);
                    })
                } catch (error) {
                    console.log(error.message);
                    this.counter = this.counter - 1;
                }
            }
            toast(this.counter + " RQAT Accounts Added!", {
                type: TYPE.SUCCESS,
                timeout: 3000,
                position: POSITION.TOP_RIGHT,
            });
            this.$refs.Spinner.hide();
            this.$router.push("/rqat");
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
