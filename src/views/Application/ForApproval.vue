<template>
<form v-on:submit.prevent="submit">
    <div class="m-3">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="table in searchHEI" :key="table" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 flex flex-col font-medium text-gray-900">
                            {{ table.credential }}
                            <div class="mt-2">
                                File:
                                <a :href="table.file" target="_blank" class="text-blue-400">View File</a>
                            </div>
                        </th>
                        <!-- <td class="px-6 py-4 flex text-blue-400">
                        {{table.file}}
                    </td> -->
                        <td class="px-6 py-4">
                            <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id - 1] = 'Approved'" value="Approved" class="radio" :v-model="statusShow[table.id - 1, v$.approved.$model]" /> 
                        </td>
                        <td class="px-6 py-4">
                            <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id - 1] = 'Disapproved'" value="Disapproved" class="radio" :v-model="statusShow[table.id - 1, v$.disapproved.$model]"/>
                        </td>
                        <td class="px-6 py-4">
                            <textarea v-if=" statusShow[table.id - 1] === 'Disapproved' " id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." :v-model="comment[table.id - 1, v$.comment.$model]"></textarea>
                            <textarea v-else-if="statusShow[table.id - 1] === 'Approved' || statusShow[table.id - 1] === null " disabled id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Comment disabled..."></textarea>
                            <textarea v-else disabled id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Comment disabled..."></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-row justify-center items-center space-x-6 py-10">
            <div class="">
                <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" aria-label="Close">
                    <div>Dismiss</div>
                </button>
            </div>
            <div v-if="statusShow.includes('Disapproved')">
                <button @click="modalRevise()" for="for-revision" id="for-revision" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Revise
                </button>
            </div>
            <div v-else>
                <button @click="modal()" for="for-approval" id="for-approval" type="submit" class="submit btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">SELECT SUPERVISOR</div>
            <p class="py-2 text-sm">
                You've been selected for a chance to get one year of subscription to
                use Wikipedia for free!
            </p>
            <div class="flex flex-row py-6 justify-start items-start">
                <div class="month-sort flex flex-row border rounded-md w-full">
                    <select class="font-normal rounded-md select select-ghost select-sm w-full" style="outline: none" id="application_sort" :v-model="selectedRQAT">
                        <option v-for="rqat in rqats" :key="rqat">
                            {{ rqat.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="modal-action">
                <label for="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-approval" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitChanges()">Continue</label>
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate2() }" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">REVISE {{ type }}</div>
            <p class="py-2 text-sm">
                Are you sure??
            </p>
            <div class="modal-action">
                <label for="for-revision" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="for-revision" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="submitRevision()">Continue</label>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const toast = useToast();

export default {
    props: ["appID"],
    name: "ForApproval",
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            showModal1: false,
            showModal2: false,
            statusShow: [],
            v$: useVuelidate(),
            comment: [],
            type: "",
            rqats: [{
                id: 1,
                name: "Maging Sino ka Man",
            }, ],
            selectedRQAT: "",
            el: document.body,
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "APPROVED",
                },
                {
                    title: "DISAPPROVED",
                },
                {
                    title: "COMMENTS",
                },
            ],
            tables: [],
            search: "",
            disapproved: '',
            approved: '',
        };
    },
    validations() {
        return {
            approved: {
                required,
            },
            disapproved: {
                required,
            },
            comment: {
                required,
            },
        }
    },
    computed: {
        searchHEI() {
            return this.tables.filter((p) => {
                return (
                    p.credential.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                );
            });
        },
    },
    methods: {
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },
        validate2() {
            return this.showModal2;
        },
        async submitChanges() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                var requirements = [];

                for (var i = 0; i < this.statusShow.length; i++) {
                    console.log(this.comment[i]);
                    requirements.push({
                        id: application.get("requirements")[i].id,
                        file: application.get("requirements")[i].file,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }
                application.set("requirements", requirements);
                application.set("applicationStatus", "For Evaluation");
                application.set("selectedRQAT", this.selectedRQAT);

                application
                    .save()
                    .then((application) => {
                        toast(this.type.toLowerCase() + " has been moved for evalutaion", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,

                            }),
                            console.log("Object Updated: " + application.id);
                    })

                setTimeout(() => {
                    this.$router.replace({
                        path: "/application"
                    })
                }, 2000);
            } catch (error) {
                alert("Error" + error.message);
                console.log(error);
            }
        },
        async submitRevision() {
            try {
                const applications = Parse.Object.extend("Applications");
                const query = new Parse.Query(applications);
                query.equalTo("objectId", this.appID);

                const application = await query.first();

                var requirements = [];

                for (var i = 0; i < this.statusShow.length; i++) {
                    console.log(this.comment[i]);
                    requirements.push({
                        id: application.get("requirements")[i].id,
                        file: application.get("requirements")[i].file,
                        status: this.statusShow[i],
                        comment: this.comment[i],
                    });
                }
                application.set("requirements", requirements);
                application.set("applicationStatus", "For Revision");
                application.set("selectedRQAT", this.selectedRQAT);

                application
                    .save()
                    .then((application) => {
                        toast(this.type.toLowerCase() + " has been moved for revision", {
                                type: TYPE.INFO,
                                timeout: 2000,
                                position: POSITION.TOP_RIGHT,
                                hideProgressBar: false,
                                closeButton: false,
                            }),
                            console.log("Object Updated: " + application.id);
                    })

                setTimeout(() => {
                    this.$router.replace({
                        path: "/application"
                    })
                }, 2000);
            } catch (error) {
                alert("Error" + error.message);
                console.log(error);
            }
        },

        checkBox() {
            console.log(this.comment);
        },
        modal() {
            var has_error = 0;
            //var error_text = "Account not created due to the following reasons:\n";
            if (
                this.approved == '' ||
                this.disapproved == ''
            ) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;
            }
        },
        modalRevise() {
            var has_error = 0;
            //var error_text = "Account not created due to the following reasons:\n";
            if (
                this.comment == null
            ) {
                toast("Please fill out the comment for disapproving the file", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal2 = !this.showModal2;
            }
        }
    },

    mounted: async function () {
        var storedApplications = [];
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();
        this.type = application.get("applicationType");

        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo(
            "objectId",
            application.get("applicationType")
        );

        const applicationType = await appTypeQuery.first();
        for (var i = 0; i < application.get("requirements").length; i++) {
            this.statusShow.push("");
            this.comment.push("");
            storedApplications.push({
                id: application.get("requirements")[i].id,
                credential: applicationType.get("applicationReqs")[i].applicationReq,
                file: application.get("requirements")[i].file.url(),
            });
        }

        this.tables = storedApplications;
    },
};
</script>

<style></style>
