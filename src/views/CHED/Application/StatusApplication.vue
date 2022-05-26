<template>
<div class="m-3">
        <div>
            <div class="flex flex-row justify-between">
                <div class="flex flex-col p-4 text-left space-y-2">
                    <!-- <span class="text-2xl font-semibold uppercase">{{ HeiName }}</span> -->
                    <div class="font-normal text-sm uppercase">
                        APPLICATION FOR: <span class="font-semibold">{{ type }}</span>
                    </div>
                    <div class="font-normal text-sm uppercase">
                        PROGRAM:
                        <span class="font-semibold">{{ program }}
                            <!--{{ type }}--></span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="text-left p-4 pr-6 space-y-2">
                        <div class="font-normal text-sm uppercase">
                            APPLICATION STATUS - <span class="font-semibold"> {{ status }}</span>
                        </div>
                        <div class="font-normal text-sm uppercase">
                            Date Applied:
                            <span class="font-semibold">{{ dateApplied }}</span>
                        </div>
                    </div>
                    <!-- <p>ID Number: {{id}}</p> -->
                </div>
            </div>
            <hr />
        </div>

        <div v-if="status.toUpperCase() === 'FOR APPROVAL'">
            <ForApproval :appID="appID" />
        </div>
        <div v-if="status.toUpperCase() === 'FOR PAYMENT'">
            <ForPayment :appID="appID" />
        </div>
        <div v-else-if="status.toUpperCase() === 'FOR REVISION'">
            <ForRevision :appID="appID" />
        </div>
        <div v-else-if="status.toUpperCase() === 'FOR INSPECTION'">
            <ForEvaluation :appID="appID" />
        </div>
         <div v-else-if="status.toUpperCase() === 'FOR INSPECTION ASSIGNED'">
            <ForEvalAssigned :appID="appID" />
        </div>
        <div v-else-if="status.toUpperCase() === 'FOR VERIFICATION'">
            <ForVerification :appID="appID"/>
        </div>
        <div v-else-if="status.toUpperCase() === 'FOR ISSUANCE'">
            <ForIssuance :appID="appID"/>
        </div>
        <div v-else-if="status.toUpperCase() === 'COMPLETED'">
            <ForCompleted></ForCompleted>
        </div>
</div>
</template>

<script>
import ForApproval from "../../Application/ForApproval.vue";
import ForPayment from "../../Application/ForPayment.vue";
import ForEvaluation from "../../Application/ForEvaluation.vue";
import ForRevision from "../../Application/ForRevision.vue";
import ForVerification from "../../Application/ForVerification.vue";
import ForIssuance from "../../Application/ForIssuance.vue";
import ForCompleted from "../../Application/ForCompletedView.vue";
import ForEvalAssigned from "../../Application/ForEvalAssigned.vue";
import Parse from "parse";

export default {
    props: ["appID"],
    name: "StatusApplication",
    components: {
        ForApproval,
        ForPayment,
        ForEvaluation,
        ForRevision,
        ForVerification,
        ForIssuance,
        ForCompleted,
        ForEvalAssigned,
    },
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: "",
            status: "",
            rep: "",
            email: "",
            type: "",
            dateApplied: "",
            program: "",
            headers: [{
                    title: "CREDENTIALS",
                },
                {
                    title: "FILES",
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
        };
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var i = 0; i < accType.length; i++) {
            if (accType[i] === "/application") {
                console.log(accType[i])
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

            // Query the application from the db
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);
            query.equalTo("objectId", this.appID);

            const application = await query.first({
                useMasterKey: true,
            });

            //Query the program of the application
            const programs = Parse.Object.extend("Programs");
            const progQuery = new Parse.Query(programs);
            progQuery.equalTo("objectId", application.get("program"));

            const program = await progQuery.first();

            //Query the applicationType of the application
            const appTypes = Parse.Object.extend("ApplicationTypes");
            const appTypeQuery = new Parse.Query(appTypes);
            appTypeQuery.equalTo("objectId", application.get("applicationType"));

            const appType = await appTypeQuery.first();

            //Store Application Data
            this.status = application.get("applicationStatus");
            this.type = appType.get("applicationTypeName");

            this.program = program.get("programName");
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
            this.dateApplied = months[month] + " " + day + ", " + year;
        }
    },
};
</script>

<style></style>
