<template>
<div>
    <div fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @drop.prevent="drop" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
        <span>Drag or Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input type="file" id="dropzoneFile" class="dropzoneFile" />
    </div>
    <span class="mt-5 font-semibold">File:
        <span class="text-brand-blue/50">{{ dropzoneFile.name }}</span></span>
    <button @click="upload()" class="btn-small mt-4 font-normal bg-brand-darkblue" type="submit">
        Submit
    </button>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    ref
} from "vue";
import Parse from 'parse';
import Worker from "@/js/heiParse.worker.js";
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
        VueInstantLoadingSpinner
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
                toast("Please upload a .pdf or .jpg file!", {
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
                    self.storeHEIs(
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

        async storeHEIs(heiData) {
            console.log("store")
            for (let i = 0; i < heiData.length; i++) {
                this.counter = this.counter + 1;
                try {
                    const AccessType = Parse.Object.extend("AccessTypes");
                    const queryACC = new Parse.Query(AccessType);
                    queryACC.equalTo("name", "HEI");

                    const accQuerResult = await queryACC.first();

                    this.hei_acc_id = accQuerResult.id;
                    var password = Math.random().toString(36).slice(-12);
                    const newHEI = new Parse.User();
                    newHEI.set("hei_name", heiData[i].A);
                    newHEI.set("username", heiData[i].B);
                    newHEI.set("password", password);
                    newHEI.set("email", heiData[i].C);
                    newHEI.set("address", heiData[i].D);
                    newHEI.set("number", heiData[i].E.toString());
                    newHEI.set("inst_code", heiData[i].F.toString());

                    const heiType = Parse.Object.extend("HEI_Types");
                    const queryHEIType = new Parse.Query(heiType);
                    queryHEIType.equalTo("name", heiData[i].G.toUpperCase());

                    const queryRes = await queryHEIType.first();
                    console.log(queryRes)
                    if (queryRes === undefined) {
                        const heiType = Parse.Object.extend("HEI_Types");
                        const newHeiType = new heiType();
                        try {
                            newHeiType.save({
                                name: heiData[i].G.toUpperCase(),
                            }).then(() => {
                                newHEI.set("hei_type", newHeiType.id);
                                newHEI.set("access_type", this.hei_acc_id);
                                newHEI.set("hasTransactions", false);
                                await newHEI.save().then(() => {
                                    const params = {
                                        name: heiData[i].A,
                                        username: heiData[i].B,
                                        email: heiData[i].C,
                                        password: password,
                                        type: "sendCredentials",
                                        approved: true,
                                    };
                                    Parse.Cloud.run("sendEmailNotification", params);
                                })
                            })

                        } catch (error) {
                            console.log(error.message);
                        }
                    } else {
                        newHEI.set("hei_type", queryRes.id);
                        newHEI.set("access_type", this.hei_acc_id);
                        newHEI.set("hasTransactions", false);
                        await newHEI.save().then(() => {
                            const params = {
                                name: heiData[i].A,
                                username: heiData[i].B,
                                email: heiData[i].C,
                                password: password,
                                type: "sendCredentials",
                                approved: true,
                            };
                            Parse.Cloud.run("sendEmailNotification", params);
                        })
                    }

                } catch (error) {
                    console.log(error.message);
                    this.counter = this.counter - 1;
                }
            }
            toast(this.counter + " HEI Accounts Added!", {
                type: TYPE.SUCCESS,
                timeout: 3000,
                position: POSITION.TOP_RIGHT,
            });
            this.$refs.Spinner.hide();
            this.$router.push("/hei");
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
