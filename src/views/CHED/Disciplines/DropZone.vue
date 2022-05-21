<template>
<div>
    <div fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @drop.prevent="drop" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
        <div v-if="!dropzoneFile.name" class="flex flex-col space-y-2">
            <span>Drag or Drop File</span>
            <span>OR</span>
            <label for="dropzoneFile" class="">Select File</label>
            <input type="file" id="dropzoneFile" class="dropzoneFile" />
        </div>
        <!-- <span>OR</span> -->
        <div v-else class="flex justify-center items-center space-x-2">
            <img v-if="dropzoneFile.name" style="height: 30px; width: 30px;" src="@/assets/img/excel.png" />
            <span class="text-brand-blue font-body">{{ dropzoneFile.name }}</span>
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
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    ref
} from "vue";
import Parse from "parse";
import Worker from "@/js/disciplinesParse.worker.js";
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
                    self.storeDisciplines(event.data.rows);
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

        async storeDisciplines(disciplinesData) {
            console.log("store");
            var specificDisc = [];
            console.log(disciplinesData.length)
            for (let i = 0; i < disciplinesData.length; i++) {
                this.counter = this.counter + 1;
                try {
                    if ((disciplinesData[i].C !== disciplinesData[i + 1].C) || (i === disciplinesData.length - 2)) {
                        specificDisc.push({
                            id: disciplinesData[i].A,
                            SpecDiscCode: disciplinesData[i].A,
                            SpecificDiscipline: disciplinesData[i].B
                        })
                        if (i === disciplinesData.length - 2) {
                            specificDisc.push({
                                id: disciplinesData[i + 1].A,
                                SpecDiscCode: disciplinesData[i + 1].A,
                                SpecificDiscipline: disciplinesData[i + 1].B
                            })
                        }
                        const Disciplines = Parse.Object.extend("Disciplines");
                        const queryDisc = new Parse.Query(Disciplines);
                        queryDisc.equalTo("MajDiscCode", disciplinesData[i].D);

                        const queryRes = await queryDisc.first();

                        if (queryRes === undefined) {
                            const newDiscipline = new Disciplines();
                            try {
                                newDiscipline.save({
                                    MajDiscCode: disciplinesData[i].D.toString(),
                                    MajorDiscipline: disciplinesData[i].C.toUpperCase(),
                                    specificDiscipline: specificDisc
                                })
                                specificDisc = [];
                            } catch (error) {
                                console.log(error.message);
                            }
                        } else {
                            this.counter = this.counter - 1;
                            var existingSpecificDisc = queryRes.get("specificDiscipline");
                            for (let y = 0; y < specificDisc.length; y++) {
                                var flag = 0;
                                for (let z = 0; z < existingSpecificDisc.length; z++) {
                                    if (specificDisc[y].id === existingSpecificDisc[z].id) {
                                        flag = 1;
                                    }
                                }
                                if (flag === 0) {
                                    existingSpecificDisc.push(specificDisc[y])
                                }

                            }
                            queryRes.set("specificDiscipline", existingSpecificDisc);
                            queryRes.save();
                            specificDisc = [];
                        }
                    } else {
                        specificDisc.push({
                            id: disciplinesData[i].A,
                            SpecDiscCode: disciplinesData[i].A,
                            SpecificDiscipline: disciplinesData[i].B
                        })
                        this.counter = this.counter - 1;
                    }

                } catch (error) {
                    console.log(error.message);
                    this.counter = this.counter - 1;
                }
            }
            toast(this.counter + " DISCIPLINES Added!", {
                type: TYPE.SUCCESS,
                timeout: 3000,
                position: POSITION.TOP_RIGHT,
            });
            this.$refs.Spinner.hide();
            this.$router.push("/disciplines");
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
