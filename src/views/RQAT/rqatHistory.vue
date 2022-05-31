<template>
<div v-if="!table.length" style="height: 100%">
  <NoDataAvail names="ApplicationView" />
</div>
<div v-else class="px-3 py-2">
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="header in head" :key="header">
                        {{header.title}}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tables in table" :key="tables" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
                        <th v-if="tables.status != 'For Inspection'" scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {{tables.program}}
                        </th>
                        <td v-if="tables.status != 'For Inspection'" class="px-6 py-4">
                            {{tables.HeiName}}
                        </td>
                        <td v-if="tables.status != 'For Inspection'" class="px-6 py-4">
                            {{tables.address}}
                        </td>
                        <td v-if="tables.status != 'For Inspection'" class="px-6 py-4">
                            {{tables.rep}}
                        </td>
                        <td v-if="tables.status != 'For Inspection'" class="px-6 py-4">
                            {{tables.email}}
                        </td>
                        <td v-if="tables.status != 'For Inspection'" class="px-6 py-4">
                            {{tables.dateApplied}}
                        </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import NoDataAvail from "@/components//NoDataAvail.vue";
import Parse from 'parse'
export default {
    name: "rqatEvaluationHistory",
    components: {
        NoDataAvail,
    },
    data() {
        return {
            search: "",
            head: [{
                    title: "PROGRAM",
                },
                {
                    title: "HEI NAME",
                },
                {
                    title: "ADDRESS",
                },
                {
                    title: "REPRESENTATIVE",
                },
                {
                    title: "EMAIL",
                },
                {
                    title: "Date Evaluated",
                },
            ],
            table: [],
        };
    },
    methods: {

    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === '/rqat/assignments') {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
            console.log("Hello");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            var storedApplications = [];

            //Query Applications assigned to RQAT
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);
            query.equalTo("selectedRQAT", Parse.User.current().id);

            const querResult = await query.find();

            //Store Applications' data
            for (var i = 0; i < querResult.length; i++) {
                const application = querResult[i];
                const user = new Parse.Query(Parse.User);
                user.equalTo("objectId", application.get("createdBy"));
                const hei = await user.first();
                
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
                var month = application.createdAt.getMonth();
                var day = application.createdAt.getDate();
                var year = application.createdAt.getFullYear();

                //Query the applicationType of the application
                const appTypes = Parse.Object.extend("ApplicationTypes");
                const appTypeQuery = new Parse.Query(appTypes);
                appTypeQuery.equalTo("objectId", application.get("applicationType"));

                const appType = await appTypeQuery.first();

                //Query the program of the application
                const programs = Parse.Object.extend("Programs");
                const programQuery = new Parse.Query(programs);
                programQuery.equalTo("objectId", application.get("program"));

                const program = await programQuery.first();

                const heiAddress = hei.get("address").street == undefined || hei.get("address").street == "" ?
                hei.get("address").barangay + ", " + hei.get("address").city + ", " +
                hei.get("address").province + ", " + hei.get("address").regionName :
                hei.get("address").street + ", " + hei.get("address").barangay + ", " + hei.get("address").city + ", " +
                hei.get("address").province + ", " + hei.get("address").regionName;

                storedApplications.push({
                    id: i + 1,
                    rep: application.get("pointPerson"),
                    email: application.get("email"),
                    type: appType.get("applicationTypeName"),
                    requirements: application.get("requirements"),
                    dateApplied: months[month] + " " + day + ", " + year,
                    status: application.get("applicationStatus"),
                    program: program.get("programName"),
                    HeiName: hei.get("hei_name"),
                    address: heiAddress,
                    appID: application.id,
                });
            }
            this.totalEntries = querResult.length;
            this.table = storedApplications;

             const subscription = await query.subscribe();

            subscription.on("update", async (object) => {
                console.log("object updated" + object);
                var index = this.tables.findIndex((application) => application.appID == object.id);


                this.tables[index] = {
                    ...this.tables[index],
                    status: object.get("applicationStatus"),
                };
            });
        }
    },
};
</script>

<style></style>
