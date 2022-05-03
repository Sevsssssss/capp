<template>
  <div class="px-3 py-4">
    <DataCards :datas="numberOfHEI" />
    <!-- <div> {{numberOfHEI}} </div>
    <div> {{listofPrograms}} </div> -->

    <div v-for="appType in listofPrograms" :key="appType" class="relative overflow-x-auto shadow-md sm:rounded-lg">
        {{appType.applicationType}}
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        HEI Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        PROGRAM
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b " v-for="prog in appType.programList" :key="prog">
                    <td class="px-6 py-4">
                        {{prog.hei}}
                    </td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{prog.program}}
                    </td>
                </tr>
            </tbody>
            
        </table>
        <div class="table-footer flex flex-row justify-between">
            <div class="flex flex-row pl-4 justify-center items-center">
                <span class="text-sm text-gray-700">
                    Showing
                    <span class="font-semibold text-gray-900">{{
            totalEntries > 0 ? 1 + numPerPage * currentpage : 0
          }}</span>
                    to
                    <span class="font-semibold text-gray-900">{{
            (currentpage + 1) * numPerPage > totalEntries
              ? totalEntries
              : (currentpage + 1) * numPerPage
          }}</span>
                    of
                    <span class="font-semibold text-gray-900">{{
            totalEntries
          }}</span>
                    Entries
                </span>
            </div>
            <div class="p-2 pr-4">
                <div class="btn-group">
                    <ul class="inline-flex -space-x-px">
                        <li>
                            <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import DataCards from "@/components//DataCards.vue";
import Parse from 'parse'
export default {
  name: "ReportingView",
  components: {
        DataCards,
    },
  data() {
    return {
      numberOfHEI: [],
      listofPrograms: [],
      headers: [
        {
          title: "HEI",
        },
        {
          title: "TYPE",
        },
        {
          title: "PROGRAM",
        },
        {
          title: "DATE APPLIED",
        },
        {
          title: "STATUS",
        },
      ],
      tables: [
        {
          HeiName: "Ateneo De Naga University",
          address: "Naga City",
          type: "Initial Offering",
          rep: "Aiden Gibbs",
          email: "aadnu@adnu.edu.ph",
          program: "BSIT",
          dateApplied: "June 8, 2015",
          status: "FOR APPROVAL",
        },
        {
          rep: "Aiden Gibbs",
          email: "aadnu@adnu.edu.ph",
          HeiName: "Ateneo De Naga University",
          address: "Naga City",
          type: "Initial Offering",
          program: "BSIT",
          dateApplied: "June 8, 2015",
          status: "FOR REVISION",
        },
        {
          rep: "Aiden Gibbs",
          email: "aadnu@adnu.edu.ph",
          HeiName: "Ateneo De Naga University",
          address: "Naga City",
          type: "Initial Offering",
          program: "BSIT",
          dateApplied: "June 8, 2015",
          status: "FOR EVALUATION",
        },
        {
          rep: "Aiden Gibbs",
          email: "aadnu@adnu.edu.ph",
          HeiName: "Ateneo De Naga University",
          address: "Naga City",
          type: "Initial Offering",
          program: "BSIT",
          dateApplied: "June 8, 2015",
          status: "FOR ISSUANCE",
        },
        {
          rep: "Aiden Gibbs",
          email: "aadnu@adnu.edu.ph",
          HeiName: "Ateneo De Naga University",
          address: "Naga City",
          type: "Initial Offering",
          program: "BSIT",
          dateApplied: "June 8, 2015",
          status: "COMPLETED",
        },
      ],
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
    for (var y = 0; y < accType.length; y++) {
      if (accType[y] === this.$route.path) {
        flag = 1;
      }
    }
    if (flag === 0) {
      this.$router.push("/403");
    } else {
      console.log("Hi!, You have permission to access this Page");
      //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
      //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
      const applications = Parse.Object.extend("Applications");
      const query = new Parse.Query(applications);

      const ApplType = Parse.Object.extend("ApplicationTypes");
      const appTypeQuery = new Parse.Query(ApplType);
      const appTypeResults = await appTypeQuery.find();


      //For Number of HEIs
      for (var i = 0; i < appTypeResults.length; i++) {
        var listOfHEI = [];
        const applicationType = appTypeResults[i];
        const newQuery = query.equalTo("applicationType", applicationType.id)
        const querResult = await newQuery.find();
        var counter = 0;
        console.log(querResult.length)
        for (var j = 0; j < querResult.length; j++) {
          const application = querResult[j];
          if(!listOfHEI.includes(application.get("createdBy"))){
            listOfHEI.push(application.get("createdBy"));
            counter++;
          }
        }
        this.numberOfHEI.push({
          title: applicationType.get("applicationTypeName"),
          num: counter,
          type: "approval",
        })
      }

      //For List of Programs
      for (var k = 0; k < appTypeResults.length; k++) {
        var programList = [];
        const applicationType = appTypeResults[k];
        const newQuery = query.equalTo("applicationType", applicationType.id)
        const querResult = await newQuery.find();
        console.log(querResult.length)
        for (var l = 0; l < querResult.length; l++) {
          const application = querResult[l];

          const Programs = Parse.Object.extend("Programs");
          const progQuery = new Parse.Query(Programs);
          progQuery.equalTo("objectId", application.get("program"))
          const progResults = await progQuery.first();

          programList.push({
            program: progResults.get("programName"),
            hei: application.get("createdBy"), // Change to Name of HEI
          })
        }
        this.listofPrograms.push({
          applicationType: applicationType.get("applicationTypeName"),
          programList: programList,
        })
      }
    }
  },
};
</script>

<style></style>
