<template>
  <div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="EmployeeView" />
  </div>
  <div v-else class="p-3">
    <div class="grid xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3">
      <div
        class="bg-brand-white shadow-md rounded-md m-3 p-4"
        v-for="data in datas"
        :key="data"
      >
        <div class="flex flex-col justify-between text-left">
          <div class="flex flex-row">
            <div :class="'homeIcon ' + data.color" class="mr-3">
              <svg class="icon" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"
                />
              </svg>
            </div>
            <div class="text-sm font-semibold" style="color: #8fa0b9">
              {{ data.title }}
            </div>
          </div>
          <div class="text-2xl text-right font-semibold text-grey-300">
            {{ data.num }}
          </div>
        </div>
      </div>
    </div>
    <!-- Can't Read -->
    <!-- <DataCards :datas="datas" /> -->
    <!-- Table -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-2">
      <!-- Table header -->
      <div class="flex flex-row justify-between items-center">
        <!-- Search -->
        <div class="flex space-x-4 pl-5 py-4">
          <div class="">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
              <div
                class="
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pl-3
                  pointer-events-none
                "
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                v-model="search"
                type="text"
                id="search"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-80
                  pl-10
                  p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                "
                placeholder="Search for items"
              />
            </div>
          </div>
          <!-- Filter -->
          <div class="flex flex-row">
            <!-- sort -->
            <div class="month-sort flex flex-row">
              <select
                class="
                  font-normal
                  rounded-md
                  select select-ghost select-sm
                  w-full
                  max-w-xs
                "
                style="outline: none"
                id="Employee"
                v-model="sort_type"
                @change="filterEmployees()"
              >
                <option disabled selected>Sort by Designation</option>
                <option>All</option>
                <option>CHED Director</option>
                <option>Supervisor</option>
                <option>Employees</option>
                <option>Others</option>
              </select>
            </div>
          </div>
        </div>
        <!-- button -->
        <div class="h-fit pr-5 pt-3 items-center">
          <button
            @click="addEmployee()"
            type="button"
            class="
              flex
              items-center
              text-white
              bg-brand-darkblue
              hover:bg-blue-800
              focus:ring-4 focus:ring-blue-300
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              mr-2
              mb-2
              dark:bg-blue-600 dark:hover:bg-blue-700
              focus:outline-none
              dark:focus:ring-blue-800
            "
          >
            <svg
              style="fill: white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z"
              />
            </svg>
            <div class="pl-2">Add Employee</div>
          </button>
        </div>
      </div>
      <!-- Table body -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            "
          >
            <tr>
              <th
                scope="col"
                class="px-6 py-3"
                v-for="header in headers"
                :key="header"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="table in searchEmployee"
              :key="table"
            >
              <th
                scope="row"
                class="
                  px-6
                  py-4
                  font-medium
                  text-gray-900
                  dark:text-white
                  whitespace-nowrap
                "
              >
                {{ table.Name }}
              </th>
              <td class="px-6 py-4">
                <div>{{ table.ContactNo }}</div>
              </td>
              <td class="px-6 py-4">
                {{ table.Username }}
              </td>
              <td class="px-6 py-4">
                {{ table.Email }}
              </td>
              <td class="px-6 py-4">
                {{ table.Designation }}
              </td>
              <td class="px-6 py-4">
                <div class="hover:text-brand-red/60">
                  <svg style="width: 20px; height: 20px" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Table Footer -->
        <div class="table-footer flex flex-row justify-between">
          <div class="flex flex-row pl-4 justify-center items-center">
            <span class="text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">{{
                1 + numPerPage * currentpage
              }}</span>
              to
              <span class="font-semibold text-gray-900 dark:text-white">{{
                (currentpage + 1) * numPerPage > totalEntries
                  ? totalEntries
                  : (currentpage + 1) * numPerPage
              }}</span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">{{
                totalEntries
              }}</span>
              Entries
            </span>
          </div>
          <div class="p-2 pr-4">
            <div class="btn-group">
              <ul class="inline-flex -space-x-px">
                <li>
                  <a
                    href="javascript:void(0)"
                    class="
                      py-2
                      px-3
                      ml-0
                      leading-tight
                      text-gray-500
                      bg-white
                      rounded-l-lg
                      border border-gray-300
                      hover:bg-gray-100 hover:text-gray-700
                      dark:bg-gray-800
                      dark:border-gray-700
                      dark:text-gray-400
                      dark:hover:bg-gray-700
                      dark:hover:text-white
                    "
                    @click="prevPage()"
                    >Previous</a
                  >
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="
                      py-2
                      px-3
                      leading-tight
                      text-gray-500
                      bg-white
                      rounded-r-lg
                      border border-gray-300
                      hover:bg-gray-100 hover:text-gray-700
                      dark:bg-gray-800
                      dark:border-gray-700
                      dark:text-gray-400
                      dark:hover:bg-gray-700
                      dark:hover:text-white
                    "
                    @click="nextPage()"
                    >Next</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";

// var dataNumber = 10;
// var page = 0;

import NoDataAvail from "@/components//NoDataAvail.vue";

export default {
  name: "EmployeesView",
  data() {
    return {
      currentpage: 0,
      numPerPage: 10,
      totalEntries: 0,
      headers: [
        {
          title: "EMPLOYEE NAME",
        },
        {
          title: "CONTACT NUMBER",
        },
        {
          title: "USERNAME",
        },
        {
          title: "EMAIL",
        },
        {
          title: "DESIGNATION",
        },
      ],
      tables: [],
      search: "",
      sort_type: "Sort by Designation",
    };
  },
  components: {
    NoDataAvail,
  },
  computed: {
    searchEmployee() {
      return this.tables
        .filter((p) => {
          return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
        })
        .slice(
          this.numPerPage * this.currentpage,
          (this.currentpage + 1) * this.numPerPage
        );
    },
  },
  methods: {
    addEmployee() {
      this.$router.push("/employees/add");
    },
    newEntCount() {
      this.totalEntries = this.tables.filter((p) => {
        return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      }).length;
    },
    prevPage() {
      if (this.currentpage > 0) this.currentpage -= 1;
    },
    nextPage() {
      if ((this.currentpage + 1) * this.numPerPage < this.totalEntries) {
        this.currentpage += 1;
      }
    },
    async filterEmployees() {
      var i = 0;

      if (this.sort_type == "CHED Director") {
        var empDir = [];

        const query = new Parse.Query(Parse.User);
        query.notEqualTo("access_type", "HEI");
        query.equalTo("designation", "DIRECTOR");

        const querResult = await query.find({ useMasterKey: true });
        for (i = 0; i < querResult.length; i++) {
          const emp = querResult[i];

          empDir.push({
            Name:
              emp.get("name")["lastname"] +
              ", " +
              emp.get("name")["firstname"] +
              " " +
              emp.get("name")["middleinitial"] +
              ".",
            Email: emp.get("email"),
        ContactNo: emp.get("contact_num"),
            Username: emp.get("username"),
            Designation: emp.get("designation"),
          });
        }
        this.tables = empDir;
      }
      if (this.sort_type == "Supervisor") {
        var empSuper = [];

        const query = new Parse.Query(Parse.User);
        query.notEqualTo("access_type", "HEI");
        query.equalTo("designation", "EDUCATION SUPERVISOR");

        const querResult = await query.find({ useMasterKey: true });
        for (i = 0; i < querResult.length; i++) {
          const emp = querResult[i];

          empSuper.push({
            Name:
              emp.get("name")["lastname"] +
              ", " +
              emp.get("name")["firstname"] +
              " " +
              emp.get("name")["middleinitial"] +
              ".",
            Email: emp.get("email"),
        ContactNo: emp.get("contact_num"),
            Username: emp.get("username"),
            Designation: emp.get("designation"),
          });
        }
        this.tables = empSuper;
      }
      if (this.sort_type == "Employees") {
        var empEmp = [];

        const query = new Parse.Query(Parse.User);
        query.notEqualTo("access_type", "HEI");
        query.equalTo("designation", "CHED EMPLOYEE");

        const querResult = await query.find({ useMasterKey: true });
        for (i = 0; i < querResult.length; i++) {
          const emp = querResult[i];

          empEmp.push({
            Name:
              emp.get("name")["lastname"] +
              ", " +
              emp.get("name")["firstname"] +
              " " +
              emp.get("name")["middleinitial"] +
              ".",
            Email: emp.get("email"),
        ContactNo: emp.get("contact_num"),
            Username: emp.get("username"),
            Designation: emp.get("designation"),
          });
        }
        this.tables = empEmp;
      }
      if (this.sort_type == "Others") {
        var empOthers = [];

        const query = new Parse.Query(Parse.User);
        query.notEqualTo("access_type", "HEI");
        query.equalTo("designation", "SUPER ADMIN");

        const querResult = await query.find({ useMasterKey: true });
        for (i = 0; i < querResult.length; i++) {
          const emp = querResult[i];

          empOthers.push({
            Name:
              emp.get("name")["lastname"] +
              ", " +
              emp.get("name")["firstname"] +
              " " +
              emp.get("name")["middleinitial"] +
              ".",
            Email: emp.get("email"),
        ContactNo: emp.get("contact_num"),
            Username: emp.get("username"),
            Designation: emp.get("designation"),
          });
        }
        this.tables = empOthers;
      }
      if (this.sort_type == "All") {
        var empAll = [];

        const query = new Parse.Query(Parse.User);
        query.notEqualTo("access_type", "HEI");
        query.notEqualTo("designation", null);

        const querResult = await query.find({ useMasterKey: true });
        for (i = 0; i < querResult.length; i++) {
          const emp = querResult[i];

          empAll.push({
            Name:
              emp.get("name")["lastname"] +
              ", " +
              emp.get("name")["firstname"] +
              " " +
              emp.get("name")["middleinitial"] +
              ".",
            Email: emp.get("email"),
        ContactNo: emp.get("contact_num"),
            Username: emp.get("username"),
            Designation: emp.get("designation"),
          });
        }
        this.tables = empAll;
      }
    },
  },
  mounted: async function () {
    var employees = [];

    const query = new Parse.Query(Parse.User);

    query.notEqualTo("access_type", "HEI");
    query.notEqualTo("designation", null);
    const querResult = await query.find({ useMasterKey: true });
    for (var i = 0; i < querResult.length; i++) {
      const emp = querResult[i];

      employees.push({
        Name:
          emp.get("name")["lastname"] +
          ", " +
          emp.get("name")["firstname"] +
          " " +
          emp.get("name")["middleinitial"] +
          ".",
        Email: emp.get("email"),
        ContactNo: emp.get("contact_num"),
        Username: emp.get("username"),
        Designation: emp.get("designation"),
      });
    }
    this.totalEntries = querResult.length;
    this.tables = employees;
    
  },
};
</script>

<style>
</style>
