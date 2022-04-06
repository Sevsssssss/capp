<template>
<!--Header-->
<div class="" style="margin: 11px">
    <div class="top-row flex flex-row" style="justify-content: space-between;">

        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">CMO No.*</span>
            </label>
            <input type="text" placeholder="Enter CMO No." class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">Series*</span>
            </label>
            <input type="text" placeholder="Enter Series Year" class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="form-control mr-3 w-full">
            <label class="label">
                <span class="label-text">Description*</span>
            </label>
            <input type="text" placeholder="Enter Description" class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="flex flex-row center" style="margin-top: 35px;">
            <button @click="addEvalIns()" class="btn btn-wide  bg-brand-darkblue hover:bg-brand-blue border-none p-2">
                Add Category
            </button>
        </div>
    </div>

    <!-- Body -->
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="mx-5 top-row flex flex-row" style="justify-content: space-between;">

            <div class="flex flex-row">
                <div class="form-control w-full mr-3">
                    <label class="label">
                        <span class="label-text">Category*</span>
                    </label>
                    <input type="text" placeholder="Enter Criteria Name" class="input input-bordered w-full max-w-xs" />
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <textarea class="textarea textarea-bordered" placeholder="Enter Description" style="height: 48px; width:190px;"></textarea>
                </div>
            </div>

            <div class="flex flex-row center"  style="margin-top: 35px;">
                <button @click="addEvalIns()" class="btn btn-wide  bg-brand-darkblue hover:bg-brand-blue border-none p-2">
                    Add Sub-Category
                </button>
            </div>

        </div>

        <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 22px">
            <div class="px-4 top-row flex flex-row ">

                <div class="flex flex-row">
                    <div class="form-control w-full mr-3">
                        <label class="label">
                            <span class="label-text">Sub Category</span>
                        </label>
                        <input type="text" placeholder="Enter Criteria Name" class="input input-bordered w-full max-w-xs" />
                    </div>

                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Item</span>
                        </label>
                        <textarea class="textarea textarea-bordered" placeholder="Enter requirements" style="height: 48px; width:190px;"></textarea>
                        
                    </div>
                </div>

            </div>

        </div>

    </div>

    <!-- Footer -->
    <div class="table-footer flex flex-row" style="justify-content: center;">
        <div class="flex flex-row pt-5">
            <button class="btn btn-margin  btn-outline" @click="$router.go(-1)">Cancel</button>
            <button class="
              btn btn-margin 
              submit
              bg-brand-darkblue
              hover:bg-brand-blue
            " @click="addHEI()">
                Create
            </button>
        </div>
    </div>

</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
