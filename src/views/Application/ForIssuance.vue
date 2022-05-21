<template>
<div class="my-3 mx-2">
    <div class="overflow-x-auto shadow-lg rounded-lg">
        <div class="py-5 h-full flex flex-col justify-center items-center bg-white">
            <span class="text-2xl m-5">Upload File</span>
            <div @drop.prevent="drop" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
                <span>Drag or Drop File</span>
                <span>OR</span>
                <label for="dropzoneFile">Select File</label>
                <input type="file" id="dropzoneFile" class="dropzoneFile" />
            </div>
            <span class="m-3 font-semibold">File: <span class="text-brand-blue/50">{{ dropzoneFile.name }}</span></span>

        </div>

    </div>
    <div class="flex flex-row center py-10">
        <div class="pr-5">
            <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                <div>Dismiss</div>
            </button>
        </div>
        <div>
            <label for="" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800" @click="submitFile()">
                Complete</label>
        </div>

    </div>
    <VueInstantLoadingSpinner ref="Spinner"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import {
    ref
} from "vue";
//import DropZoneVue from '../CHED/Hei/DropZone.vue';
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";
const toast = useToast();
export default {
    props: ["appID"],
    components: {
        VueInstantLoadingSpinner,
    },
    data(){
        return{
            statusTracker: [],
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
            selectedFile
        };
    },
    methods: {
        validate(filename) {
            console.log("validate")
            var regex = /^.+\.(([pP][dD][fF])|([jJ][pP][gG]))$/;
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
        async submitFile() {
            if (this.dropzoneFile === "") {
                toast("Error", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
            } else {
                var validation = this.validate(this.dropzoneFile);
                if (validation) {
                    const applications = Parse.Object.extend("Applications");
                    const query = new Parse.Query(applications);
                    query.equalTo("objectId", this.appID);

                    const application = await query.first();

                    let certification = null;
                    certification = new Parse.File(
                        this.dropzoneFile.name.replace(/[^a-zA-Z]/g, ""),
                        this.dropzoneFile,
                        this.dropzoneFile.type
                    );

                    application.set("certificate", certification);
                    application.set("applicationStatus", "Completed");

                    this.statusTracker.push({
                        status: "Completed",
                        detail: "Application Complete!",
                        dateTime: new Date(),
                    });
                    application.set("statusTracker", this.statusTracker);

                    application
                        .save()
                        .then((application) => {
                            const params = {
                                email: application.get("email"),
                                status: "Your Application issuance is completed",
                                type: "sendStatusUpdate",
                                approved: true,
                            };
                            Parse.Cloud.run("sendStatusUpdate", params);
                            toast("For Issuance Completed!", {
                                type: TYPE.SUCCESS,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                            });
                            setTimeout(
                                () =>
                                this.$router.push({
                                    path: "/application",
                                }),
                                1000
                            );
                            this.$refs.Spinner.show();
                            setTimeout(
                                function () {
                                    this.$refs.Spinner.hide();
                                }.bind(this),
                                2000
                            );
                            console.log("Object Updated: " + application.id);
                        })
                }
            }
        }
    },
    mounted: async function () {
        var storedApplications = [];

        //Query Application
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();
        this.statusTracker = application.get("statusTracker");
    },
}
</script>

<style>
.dropzone {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
    border: 2px dashed #C4C4C4;
    background-color: #fff;
    transition: 0.3s ease all;
}

.dropzone label {
    padding: 8px 12px;
    color: #fff;
    background-color: #0E3385;
    transition: 0.3s ease all;
    border-radius: 5px;
}

.dropzone input {
    display: none;
}

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #C4C4C4;
}

.active-dropzone label {
    background-color: #fff;
    color: #41b883;
}
</style>
