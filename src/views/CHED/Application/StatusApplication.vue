<template>
  <div class="m-3">
    <div>
      <div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col p-4 text-left space-y-2">
            <span class="text-2xl font-semibold uppercase">{{ HeiName }}</span>
            <div class="font-normal text-sm uppercase">
              APPLICATION FOR: <span class="font-semibold">{{ type }}</span>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="text-left p-4 pr-6 space-y-2">
              <div class="font-semibold text-md uppercase">
                APPLICATION STATUS - <span class=""> {{ status }}</span>
              </div>
              <div class="font-semibold text-sm">
                Date Applied:
                <span class="font-normal">{{ dateApplied }}</span>
              </div>
            </div>
            <!-- <p>ID Number: {{id}}</p> -->
          </div>
        </div>
        <hr />
        <div class="py-4 px-4">
          <div class="flex justify-start space-x-4">
            <div class="font-semibold text-sm">
              Point Person: <span class="font-normal">{{ rep }}</span>
            </div>
            <div class="font-semibold text-sm">
              Email: <span class="font-normal">{{ email }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="status === 'FOR APPROVAL'">
        <ForApproval></ForApproval>
      </div>
      <div v-else-if="status === 'FOR REVISION'">
        <ForRevision></ForRevision>
      </div>
      <div v-else-if="status === 'FOR EVALUATION'">
        <ForEvaluation></ForEvaluation>
      </div>
      <div v-else-if="status === 'FOR ISSUANCE'">
        <ForIssuance></ForIssuance>
      </div>
      <div v-else-if="status === 'COMPLETED'">
        <ForCompleted></ForCompleted>
      </div>
      <div class="space-x-6 py-8 px-3 flex justify-center">
        <button
          @click="$router.go(-1)"
          type="button"
          class="
            btn
            text-blue-700
            bg-transparent
            border border-blue-700
            hover:bg-white
          "
          data-dismiss-target="#alert-additional-content-1"
          aria-label="Close"
        >
          <div v-if="status != 'COMPLETED'">Dismiss</div>
          <div v-else>Back</div>
        </button>
        <div v-if="status === 'FOR APPROVAL'">
          <label
            for="for-approval"
            class="
              btn
              modal-button
              border-none
              text-white
              bg-blue-700
              hover:bg-blue-800
            "
          >
            Submit</label
          >
        </div>
        <div v-else-if="status === 'FOR REVISION'">
          <label
            for="for-approval"
            class="
              btn
              modal-button
              border-none
              text-white
              bg-blue-700
              hover:bg-blue-800
            "
          >
            Re-Submit</label
          >
        </div>
        <div v-else-if="status === 'FOR EVALUATION'">
          <label
            for="for-evaluation"
            class="
              btn
              modal-button
              border-none
              text-white
              bg-blue-700
              hover:bg-blue-800
            "
          >
            Evaluate</label
          >
        </div>
        <div v-else-if="status === 'FOR ISSUANCE'">
          <label
            for=""
            class="
              btn
              modal-button
              border-none
              text-white
              bg-blue-700
              hover:bg-blue-800
            "
          >
            Complete</label
          >
        </div>
        <!-- <div v-else-if="status === 'COMPLETED'">
        <label for="" class="btn modal-button border-none text-white bg-blue-700 hover:bg-blue-800">
            BACK</label>
    </div> -->
      </div>
      <!-- For Approval Modal -->
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
              <select
                class="
                  font-normal
                  rounded-md
                  select select-ghost select-sm
                  w-full
                "
                style="outline: none"
                id="application_sort"
              >
                <option disabled selected>Select Supervisor</option>
                <option>Joshua Sarmiento</option>
                <option>Sev Sarate</option>
                <option>Duane</option>
                <option>Jeff</option>
                <option>Saq</option>
              </select>
            </div>
          </div>
          <div class="modal-action">
            <label
              for="for-approval"
              class="
                btn btn-sm
                rounded-md
                text-blue-700
                bg-transparent
                border border-blue-700
                hover:bg-white
              "
              >Cancel</label
            >
            <label
              class="
                btn btn-sm
                rounded-md
                bg-blue-700
                hover:bg-blue-800
                border-none
              "
              >Assign</label
            >
          </div>
        </div>
      </div>
    </div>
    <!-- For Evaluation Modal -->
    <input type="checkbox" id="for-evaluation" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative rounded-md text-left">
        <div class="font-semibold text-md">RE-ASSIGN SUPERVISOR</div>
        <p class="py-2 text-sm">
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </p>
        <!-- Filter -->
        <div class="flex flex-row py-6 justify-start items-start">
          <!-- sort -->
          <div class="month-sort flex flex-row border rounded-md w-full">
            <select
              class="
                font-normal
                rounded-md
                select select-ghost select-sm
                w-full
              "
              style="outline: none"
              id="application_sort"
            >
              <option disabled selected>Select Supervisor</option>
              <option>Joshua Sarmiento</option>
              <option>Sev Sarate</option>
              <option>Duane</option>
              <option>Jeff</option>
              <option>Saq</option>
            </select>
          </div>
        </div>
        <div class="modal-action">
          <label
            for="for-evaluation"
            class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            "
            >Cancel</label
          >
          <label
            class="
              btn btn-sm
              rounded-md
              bg-blue-700
              hover:bg-blue-800
              border-none
            "
            >Assign</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ForApproval from "../../Application/ForApproval.vue";
import ForEvaluation from "../../Application/ForEvaluation.vue";
import ForRevision from "../../Application/ForRevision.vue";
import ForIssuance from "../../Application/ForIssuance.vue";
import ForCompleted from "../../Application/ForCompletedView.vue";
import Parse from 'parse'
export default {
  props: ["id", "HeiName", "type", "status", "dateApplied", "rep", "email"],
  name: "StatusApplication",
  components: {
    ForApproval,
    ForEvaluation,
    ForRevision,
    ForIssuance,
    ForCompleted,
  },
  data() {
    return {
      // id: this.$route.params.id,
      show: false,
      statusShow: "",
      headers: [
        {
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
      tables: [
        {
          id: 1,
          credential: "Articles of Incorporation and By-Laws..",
          file: "ArticlesofInc.pdf",
        },
        {
          id: 2,
          credential: "Copy(ies) of Transfer of Certificate(s) Title (TCT)",
          file: "Copy(ies)ofTransferof.pdf",
        },
        {
          id: 3,
          credential: "Ownership of School Building",
          file: "OwnershipofSchoolBuilding.pdf",
        },
        {
          id: 4,
          credential: "Campus Development and Landscaping Plan",
          file: "CampusDevelopme.pdf",
        },
        {
          id: 5,
          credential:
            "Pictures of School Buildings, offices and other facilities",
          file: "PicturesofSchool.pdf",
        },
        {
          id: 6,
          credential: "Certificate of Occupancy for the building(s)",
          file: "CertificateofOccupancy.pdf",
        },
        {
          id: 7,
          credential: "Feasibility study",
          file: "Feasibilitystudy.pdf",
        },
      ],
    };
  },
  mounted: async function () {
    // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
    const AccessTypes = Parse.Object.extend("AccessTypes");
    const query = new Parse.Query(AccessTypes);
    query.equalTo("name", Parse.User.current().get("access_type"));

    const querResult = await query.find();
    var accType = querResult[0].get("privileges");
    var flag = 0;
    for (var i = 0; i < accType.length; i++) {
      if (accType[i] === "/application") {
        flag = 1;
      }
    }
    if (flag === 0) {
      this.$router.push("403");
    } else {
      console.log("Hi!, You have permission to access this Page");
      //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
      //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    }
  },
};
</script>

<style></style>
