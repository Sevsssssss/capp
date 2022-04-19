<template>
<div class="m-3">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
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
                        {{table.credential}}
                        <div class=" mt-2">
                            File: <a :href="table.file" target="_blank" class="text-blue-400">View File</a>
                        </div>
                    </th>
                    <!-- <td class="px-6 py-4 flex text-blue-400">
                        {{table.file}}
                    </td> -->
                    <td class="px-6 py-4">
                        <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id - 1] = 'Approved'" value="Approved" class="radio" :v-model="statusShow[table.id - 1]">
                    </td>
                    <td class="px-6 py-4">
                        <input type="radio" :name="table.id" :id="table.id" @change="statusShow[table.id - 1] = 'Disapproved'" value="Disapproved" class="radio" :v-model="statusShow[table.id - 1]">
                    </td>
                    <td class="px-6 py-4">
                        <textarea id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." v-model="comment[table.id - 1]"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
        <div>Dismiss</div>
    </button>
    
    <label for="for-approval" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
        Submit</label>

    <input type="checkbox" id="for-approval" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative rounded-md text-left">
                <div class="font-semibold text-md">SELECT SUPERVISOR</div>
                <p class="py-2 text-sm">
                    You've been selected for a chance to get one year of subscription to
                    use Wikipedia for free!
                </p>
                <!-- Filter -->
                <div class="flex flex-row py-6 justify-start items-start">
                    <!-- sort -->
                    <div class="month-sort flex flex-row border rounded-md w-full">
                        <select class="font-normal rounded-md select select-ghost select-sm w-full" style="outline: none" id="application_sort" :v-model="selectedRQAT">
                            <option disabled selected>Select RQAT</option>
                            <option>Joshua Sarmiento</option>
                            <option>Sev Sarate</option>
                            <option>Duane</option>
                            <option>Jeff</option>
                            <option>Saq</option>
                        </select>
                    </div>
                </div>
                <div class="modal-action">
                    <label for="for-approval" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                    <label @click="submitChanges" class="btn btn-sm rounded-md bg-blue-700 hover:bg-blue-800 border-none">Assign</label>
                </div>
            </div>
        </div>
            
</div>
</template>

<script>
import Parse from "parse";
export default {
    props: ["appID"],
    name: "ForApproval",
    
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: [],
            comment: [],
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
            tables: [{
                    id: 1,
                    credential: 'Articles of Incorporation and By-Laws..',
                    file: 'ArticlesofInc.pdf',
                },
                {
                    id: 2,
                    credential: 'Copy(ies) of Transfer of Certificate(s) Title (TCT)',
                    file: 'Copy(ies)ofTransferof.pdf',
                },
                {
                    id: 3,
                    credential: 'Ownership of School Building',
                    file: 'OwnershipofSchoolBuilding.pdf',
                },
                {
                    id: 4,
                    credential: 'Campus Development and Landscaping Plan',
                    file: 'CampusDevelopme.pdf',
                },
                {
                    id: 5,
                    credential: 'Pictures of School Buildings, offices and other facilities',
                    file: 'PicturesofSchool.pdf',
                },
                {
                    id: 6,
                    credential: 'Certificate of Occupancy for the building(s)',
                    file: 'CertificateofOccupancy.pdf',
                },
                {
                    id: 7,
                    credential: 'Feasibility study',
                    file: 'Feasibilitystudy.pdf',
                },
            ],
            search: '',
        }
    },
    computed: {
        searchHEI() {
            return this.tables.filter(p => {
                return p.credential.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            });
        }
    },
    methods: {
        async submitChanges() {
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);
            query.equalTo("objectId", this.appID);

            const application = await query.first();

            var requirements = [];

            
            for(var i = 0; i < this.statusShow.length; i++) {
                console.log(this.comment[i])
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
            
            application.save().then((application) => {
                console.log("Object Updated: " + application.id);
            })
        },
        checkBox() {
            console.log(this.comment);
        }
    },

    mounted: async function () {
        var storedApplications = [];
        const applications = Parse.Object.extend("Applications");
        const query = new Parse.Query(applications);
        query.equalTo("objectId", this.appID);

        const application = await query.first();

        const applicationTypes = Parse.Object.extend("ApplicationTypes");
        const appTypeQuery = new Parse.Query(applicationTypes);
        appTypeQuery.equalTo("applicationTypeName", application.get("applicationType"));

        const applicationType = await appTypeQuery.first();
        for(var i = 0; i < application.get("requirements").length; i++){
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

}
</script>

<style>

</style>
