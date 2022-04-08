<template>
<div class="flex flex-row justify-between pt-6">
    <div class="flex-col space-y-6 text-sm text-left">
        <!-- first row to upload -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Articles of Incorporation and By-Laws...</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Copy(ies) of Transfer of Certificate(s) Title (TCT)</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!-- second row -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Ownership of School Building</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Campus Development and Landscaping Plan</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!-- third row -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Pictures of School Buildings, offices and other facilities</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Certificate of Occupancy</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Feasibility study</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Curriculum</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Library Information</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Physical facilities</span>
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
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Support Services</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Guidance and counseling</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">Medical and dental services...</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
        <!--  -->
        <div class="flex flex-row space-x-4 items-end">
            <div class="form-control w-64 max-w-xs">
                <label class="label">
                    <span class="text-sm">NSTP Information</span>
                </label>
                <input class="block w-full text-sm text-grey-200 bg-brand-white rounded-lg border border-grey-500 cursor-pointer dark:text-grey-300 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".pdf,.doc">
            </div>
        </div>
    </div>
    <div class="text-left px-14">
        <p class="text-lg">Credentials for Initial Permit</p>
        <ul class="list-disc text-md">
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
                    item: 'Articles of Incorporation and By-Laws, Copy of original Ordinance approving establishment, Copy of the Charter',
                },
                {
                    item: 'Copy(ies) of Transfer of Certificate(s) Title (TCT)',
                },
                {
                    item: 'Ownership of School Building',
                },
                {
                    item: 'Campus Development and Landscaping Plan',
                },
                {
                    item: 'Pictures of School Buildings, offices and other facilities',
                },
                {
                    item: 'Certificate of Occupancy for the building(s) to be used in the name of the HEI and indicated for educational purpose issued by the City/Municipality’s Office of Building Officials',
                },
                {
                    item: 'Feasibility study'
                },
                {
                    item: 'Curriculum'
                },
                {
                    item: 'Library Information'
                },
                {
                    item: 'Physical facilities'
                },
                {
                    item: 'List of equipment and other instructional devices/aids'
                },
                {
                    item: 'Support Services'
                },
                {
                    item: 'Guidance and counseling'
                },
                {
                    item: 'Medical and dental services for students and faculty, if outsourced to include notarized MOA'
                },
                {
                    item: 'NSTP Information'
                },
            ]
        }
    },
}
</script>

<style>

</style>
