<template>
  <div class="h-full flex flex-col justify-center items-center bg-white">
    <span class="text-2xl m-5">Upload Excel File</span>
    <DropZoneVue></DropZoneVue>
    <span class="mt-12 font-semibold">{{ dropzoneFile.name }}</span>
  </div>
</template>

<script>
import DropZoneVue from "./DropZone.vue";
import { ref } from "vue";
import Parse from 'parse'

export default {
  name: "uploadCSV",
  components: {
    DropZoneVue,
  },
  setup() {
    let dropzoneFile = ref("");
    return {
      dropzoneFile,
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
      if (accType[i] === '/heiTypes') {
        flag = 1;
      }
    }
    if (flag === 0) {
      this.$router.push("/403");
    } else {
      console.log("Hi!, You have permission to access this Page");
      //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
      //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    }
  },
};
</script>

<style></style>
