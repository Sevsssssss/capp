<template>
  <div class="" style="padding: 10px">
    <div class="grid grid-cols-3">
      <div
        class="hei-cont space-x-3 bg-brand-white shadow-lg rounded-lg m-3 p-6"
        v-for="data in datas"
        :key="data"
      >
        <div class="column">
          <div class="flex flex-row">
            <div>
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                />
              </svg>
            </div>
            <div class="app-label font-semibold">{{ data.title }}</div>
          </div>
          <footer class="app-data" style="text-align: right">
            {{ data.num }}
          </footer>
        </div>
      </div>
    </div>
    <DataTables :headers="headers" :tables="tables" />
  </div>
</template>

<script>
import DataTables from "@/components//DataTables.vue";

export default {
  name: "ApplicationView",
  data() {
    return {
      headers: [
        { title: "REPRESENTATIVE" },
        { title: "EMAIL" },
        { title: "HEI" },
        { title: "PROGRAM" },
        { title: "STATUS" },
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
