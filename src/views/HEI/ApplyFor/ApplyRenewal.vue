<template>
<div class="flex flex-row justify-between pt-6">
<div class="flex-col space-y-6">
    <!-- first row to upload -->
    <div class="flex flex-row space-x-2 items-end">
        <div class="flex-col w-64 text-left space-y-3">
            <p>Board Resolution</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
        <div class="flex-col w-64 text-left space-y-3">
            <p>Campus development and landscaping plans</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
    </div>
    <!-- second row -->
    <div class="flex flex-row space-x-2 items-end">
        <div class="flex-col w-64 text-left space-y-3">
            <p>Pictures of school building(s)</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
        <div class="flex-col w-64 text-left space-y-3">
            <p>Duly noted curriculum</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
    </div>
    <!-- third row -->
     <div class="flex flex-row space-x-2 items-end">
        <div class="flex-col w-64 text-left space-y-3">
            <p>Budget for the succeeding school year</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
        <div class="flex-col w-64 text-left space-y-3">
            <p>List of Library Holdings </p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
    </div>
    <!--  -->
    <div class="flex flex-row space-x-2 items-end">
        <div class="flex-col w-64 text-left space-y-3">
            <p>Data on enrolment of the program</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
        <div class="flex-col w-64 text-left space-y-3">
            <p>Schedule of tuition</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
    </div>
    <!--  -->
    <div class="flex flex-row space-x-2 items-end">
        <div class="flex-col w-64 text-left space-y-3">
            <p>List of laboratory facilities and equipment </p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
        <div class="flex-col w-64 text-left space-y-3">
            <p>Copy of retirement plan of the school </p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
    </div>
    <!--  -->
    <div class="flex flex-row space-x-2 items-end">
        <div class="flex-col w-64 text-left space-y-3">
            <p>List of equipment and other instructional devices/aids</p>
            <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
        </div>
        <div class="flex-col w-64 text-left space-y-3">
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
            items: [
                {item: 'Board Resolution',},
                {item: 'Campus development and landscaping plans',},
                {item: 'Pictures of school building(s)',},
                {item: 'Duly noted curriculum',},
                {item: 'Budget for the succeeding school year',},
                {item: 'List of Library Holdings ',},
                {item: 'Data on enrolment of the program'},
                {item: 'Schedule of tuition'},
                {item: 'List of laboratory facilities and equipment '},
                {item: 'Copy of retirement plan of the school '},
                {item: 'List of equipment and other instructional devices/aids'},
                {item: 'Copy of the latest Financial Statement'},
            ]
        }
    },
}
</script>

<style>

</style>
