<template>
<div class="main-page flex justify-center items-center p-10">
    <div class=" card justify-center items-center space-x-3 bg-brand-white shadow-lg rounded-lg m-3 p-6">
        <form @submit.prevent="handleSubmit" class="card-body">
            <div class="flex flex-row">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" /></svg>
                </div>
                <h2 class="card-title pl-3">ADD HEI ACCOUNT</h2>
            </div>
            <div class="line"></div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">HEI Name</span>
                </label>
                <input type="text" placeholder="Enter HEI’s name" class="input input-bordered w-full" v-model="name" />
                <label class="label">
                    <span class="label-text-alt" v-if="nameError"> {{nameError}}</span>
                </label>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" class="input input-bordered w-full" />
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Address</span>
                </label>
                <input type="text" placeholder="Enter address" class="input input-bordered w-full" />
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder="09*********" class="input input-bordered w-full" />
            </div>
            <div class="flex flex-row">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Institutional Code</span>
                    </label>
                    <input type="text" placeholder="Enter Code" class="input input-bordered" style="width: 170px" />
                </div>

                <div class="form-control w-full pl-4">
                    <label class="label">
                        <span class="label-text">HEI Type:</span>
                        <span class="label-text"><a>+ Add Designation</a></span>
                    </label>
                    <select class="select select-bordered w-full">
                        <option v-for="hei in heis" :key="hei">
                            <div class="hei-name">{{ hei.title }}</div>
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex flex-row pt-5">
                <button class="btn btn-margin btn-wide btn-outline">Cancel</button>
                <button class="btn btn-margin btn-wide submit  bg-brand-darkblue hover:bg-brand-blue">Add HEI</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name: "AddHeiView",
    data() {
        return {
            name: "",
            nameError: "",
            heis: [{
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
    methods: {
        handleSubmit() {
            // validate if there is a name
            this.nameError = this.name.length > 0 ? '' : 'HEI Name is Required'
        }
    },
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
    margin-left: 10px;
    margin-right: 10px;
}
</style>
