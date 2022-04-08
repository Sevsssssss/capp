<template>
<div class="flex flex-row justify-between pt-6">
    <div class="flex-col space-y-6 text-sm text-left">
        <!-- first row to upload -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Board Resolution</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Campus development and landscaping plans</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>

        </div>
        <!-- second row -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Pictures of school building(s)</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Duly noted curriculum</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>

        </div>
        <!-- third row -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Budget for the succeeding school year</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">List of Library Holdings</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Data on enrolment of the program</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Schedule of tuition</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>

        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">List of laboratory facilities and equipment</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Copy of retirement plan of the school</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>

        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">List of equipment and other instructional devices/aids</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
    </div>
    <div class="text-left px-14">
        <p class="label-xl">Credentials for Renewal</p>
        <ul class="list-disc">
            <li v-for="i in items" :key="i.item">{{i.item}}</li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            items: [{
                    item: 'Board Resolution',
                },
                {
                    item: 'Campus development and landscaping plans',
                },
                {
                    item: 'Pictures of school building(s)',
                },
                {
                    item: 'Duly noted curriculum',
                },
                {
                    item: 'Budget for the succeeding school year',
                },
                {
                    item: 'List of Library Holdings ',
                },
                {
                    item: 'Data on enrolment of the program'
                },
                {
                    item: 'Schedule of tuition'
                },
                {
                    item: 'List of laboratory facilities and equipment '
                },
                {
                    item: 'Copy of retirement plan of the school '
                },
                {
                    item: 'List of equipment and other instructional devices/aids'
                },
                {
                    item: 'Copy of the latest Financial Statement'
                },
            ]
        }
    },
}
</script>

<style>

</style>
