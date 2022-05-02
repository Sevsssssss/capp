<template>
  <div class="px-3 py-4">
    <div> {{numberOfHEI}} </div>
    <div> {{listofPrograms}} </div>
  </div>
</template>

<script>
import Parse from 'parse'
export default {
  name: "ReportingView",
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
          applicationType: applicationType.get("applicationTypeName"),
          count: counter,
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
            hei: application.get("createdBy"),
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
