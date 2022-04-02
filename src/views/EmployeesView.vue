<template>
  <div class="" style="padding: 10px">
    <div class="top-row flex flex-row" style="justify-content: space-between;">
            <TableTopLeft/>

            <div class="right-side flex flex-row">
                <div class="month-sort flex flex-row">
                    <select class="select select-ghost select-sm w-full max-w-xs" style="outline: none">
                        <option disabled selected>Sort by type</option>
                        <option>Private</option>
                        <option>State Univeristies</option>
                        <option>Local Universities</option>
                        <option>Others</option>
                    </select>
                </div>

                <button @click="addEmployee()" class="btn btn-primary1 bg-brand-darkblue">
                    <div class="flex flex-row add-hei-content">
                        <svg style="fill:white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z"/></svg>
                        <div class="btn-text">Add Employee</div>
                    </div>
                </button>
            </div>
        </div>
    <DataTables :headers="headers" :tables="tables" />
  </div>
</template>

<script>
import DataTables from "@/components//DataTables.vue";
import TableTopLeft from "@/components//TableTopLeft.vue";

export default {
  name: "ApplicationView",
  data() {
    return {
      headers: [
        { title: "RQAT MEMBER NAME" },
        { title: "HEI" },
        { title: "COTACT NUMBER" },
        { title: "USERNAME" },
        { title: "ACTION" },
      ],

      datas: [
        {
          title: "FOR APPROVAL",
          num: 300,
        },
        {
          title: "FOR REVISION",
          num: 300,
        },
        {
          title: "FOR ISSUANCE",
          num: 300,
        },
        {
          title: "FOR EVALUATION",
          num: 300,
        },
        {
          title: "FOR COMPLETION",
          num: 300,
        },
      ],
      tables: [
        {
          InstNo: "56543",
          HeiName: "Ateneo De Naga University",
          address: "Naga City",
          type: "Private Institution",
          email: "ateneodenaga@gbox.adnu.edu.ph",
        },
        {
          InstNo: "20746",
          HeiName: "Bicol University",
          address: "Legazpi City",
          type: "State University",
          email: "bu@bicol-u.edu.ph",
        },
        {
          InstNo: "12865",
          HeiName: "Catanduanes State University",
          address: "Virac",
          type: "State University",
          email: "areneo@gbox.adnu.edu.ph",
        },
        {
          InstNo: "95848",
          HeiName: "Aquinas University of Legazpi",
          address: "Legazpi City",
          type: "Private",
          email: "ust@ust-legazpi.edu.ph",
        },
        {
          InstNo: "56543",
          HeiName: "Camarines Norte State College",
          address: "Daet",
          type: "State College",
          email: "cnsc@cnsc.edu.ph",
        },
      ],
    };
  },
  components: {
    DataTables,
    TableTopLeft,
  },
  methods: {
        addEmployee() {
            this.$router.push("/employees/add");
        },
    },
};
</script>

<style>
.app-data {
  text-align: left;
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  align-items: center;
}

.app-label {
  padding-left: 10px;
  font-size: 14px;
  line-height: 14px;
  text-align: start;
  vertical-align: middle;
  color: #8fa0b9;
  display: block;
}
</style>
