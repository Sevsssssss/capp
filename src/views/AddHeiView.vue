

<template>
  <div class="main-page flex justify-center items-center p-10">
    <div
      class="
        card
        justify-center
        items-center
        add-hei
        space-x-3
        bg-brand-white
        shadow-lg
        rounded-lg
        m-3
        p-6
      "
    >
      <div class="card-body">
        <div class="flex flex-row">
          <div>
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z"
              />
            </svg>
          </div>
          <h2 class="card-title">ADD HEI ACCOUNT</h2>
        </div>
        <h6 style="text-align: start; font-weight: 500">
          HIGHER EDUCATION INSTITUTION
        </h6>
        <div class="line"></div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">HEI Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter HEI’s name"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input
            type="text"
            placeholder="Enter address"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Contact Number</span>
          </label>
          <input
            type="text"
            placeholder="09*********"
            class="input input-bordered w-full"
          />
        </div>
        <div class="flex flex-row">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Institutional Code</span>
            </label>
            <input
              type="text"
              placeholder="Enter Code"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Contact Number</span>
            </label>
            <select class="select select-bordered w-full">
              <option v-for="hei in heis" :key="hei">
                <div class="hei-name">{{ hei.title }}</div>
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-row">
          <button class="btn btn-margin btn-wide btn-outline">Cancel</button>
          <button class="btn btn-margin btn-wide">Add HEI</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddHeiView",
  data() {
    return {
      heis: [
        {
          title: "STATE UNIVERSITIES AND COLLEGES",
        },
        {
          title: "LOCAL UNIVERSITIES AND COLLEGES",
        },
        {
          title: "PRIVATE COLLEGES",
        },
        {
          title: "OTHER GOVERNMENT SCHOOLS",
        },
      ],
    };
  },
  components: {},
};
</script>

<style>
.main-page {
  align-items: center;
}

.add-hei {
  width: 783px;
}
.line {
  border-width: 1px;
}

.btn-margin {
  margin-left: 20px;
  margin-right: 20px;
}
</style>