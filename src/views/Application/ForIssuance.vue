<template>
<div class="my-3 mx-2">
    <div class="overflow-x-auto flex flex-col items-center justify-center">
        <span class="text-2xl m-5">Upload File</span>
        <div @drop.prevent="drop" @change="selectedFile" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
            <div v-if="!dropzoneFile.name" class="flex flex-col space-y-2">
                <span>Drag or Drop File</span>
                <span>OR</span>
                <label for="dropzoneFile" class="">Select File</label>
                <input type="file" id="dropzoneFile" class="dropzoneFile" />
            </div>
            <div v-else class="flex flex-col  space-y-8">
                <div class="flex justify-center items-center space-x-2">
                    <img v-if="dropzoneFile.name" style="height: 30px; width: 30px;" src="@/assets/img/pdf.png" />
                    <span class="text-brand-blue font-body">{{ dropzoneFile.name }}</span>
                </div>
                <div>
                    <label for="dropzoneFile" class="">Select File</label>
                    <input type="file" id="dropzoneFile" class="dropzoneFile" />
                </div>
            </div>
        </div>
        <div class="form-control pt-4 w-full max-w-xs items-start justify-center">
            <label class="label">
                <span class="label-text flex">Enter Authority/Permit No.:</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="permitNo" />
        </div>
    </div>

    <div class="flex flex-row center py-10">
        <div class="pr-5">
            <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                <div>Dismiss</div>
            </button>
        </div>
        <div>
            <label for="" class="btn border-none text-white bg-blue-700 hover:bg-blue-800" @click="submitFile()">
                Complete</label>
        </div>

    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
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
    data() {
        return {
            statusTracker: [],
            hei: "",
            permitNo: "",
        }
    },
    //Setup data and methods needed for dropZone
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
            if (this.dropzoneFile === "" || this.permitNo === "") {
                toast("Error", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
            } else {
                var validation = this.validate(this.dropzoneFile);
                if (validation) {

                    //Query Application
                    const applications = Parse.Object.extend("Applications");
                    const query = new Parse.Query(applications);
                    query.equalTo("objectId", this.appID);

                    const application = await query.first();

                    //Certificate File to be Issued
                    let certification = null;
                    certification = new Parse.File(
                        this.dropzoneFile.name.replace(/[^a-zA-Z]/g, ""),
                        this.dropzoneFile,
                        this.dropzoneFile.type
                    );

                    application.set("certificate", certification);
                    application.set("PermitNo", this.permitNo);
                    application.set("DateIssued", new Date());
                    application.set("applicationStatus", "Completed");

                    //Add New Status to the Status Tracker
                    this.statusTracker.push({
                        status: "Completed",
                        detail: "Application Complete!",
                        dateTime: new Date(),
                    });
                    application.set("statusTracker", this.statusTracker);

                    //Save changes to the application
                    application
                        .save()
                        .then((application) => {
                            const params = {
                                email: application.get("email"),
                                status: "Your Application is Completed",
                                type: "sendStatusUpdate",
                                approved: true,
                            };
                            Parse.Cloud.run("sendStatusUpdate", params);

                            //Add new Notification
                            const Notifications = Parse.Object.extend("Notifications");
                            const newNotification = new Notifications();

                            newNotification.set("message", "Your Application is complete.");
                            newNotification.set("date_and_time", new Date());
                            newNotification.set("user", this.hei);
                            newNotification.set("isRead", false);

                            //Save new Notification
                            newNotification.save().then((notif) => {
                                console.log("Notification Saved: " + notif.id);
                            }, (error) => {
                                console.log("Error: " + error.message);
                            });

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

        //Query Application
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();

        //Get Application Data
        this.statusTracker = application.get("statusTracker");
        this.hei = application.get("createdBy");
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
