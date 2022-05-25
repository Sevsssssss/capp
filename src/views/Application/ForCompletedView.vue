<template>
<div class="m-3">
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tables in table" :key="tables" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-wrap break-words">
                            {{ tables.credential }}
                        </th>
                        <td class="flex gap-4 px-6 py-4 text-blue-400">
                            <a href="#" target="_blank" class="text-blue-400">view</a>
                            <a href="#">
                                <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19.92,12.08L12,20L4.08,12.08L5.5,10.67L11,16.17V2H13V16.17L18.5,10.66L19.92,12.08M12,20H2V22H22V20H12Z" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="flex flex-row center pt-10">
        <button @click="$router.go(-1)" type="button" class="btn text-blue-700 bg-transparent border border-blue-700 hover:bg-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
            <div>Back</div>
        </button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            // id: this.$route.params.id,
            show: false,
            statusShow: '',
            headers: [{
                    title: "CERTIFICATE",
                },
                {
                    title: "FILES",
                },
            ],
            table: [{
                    id: 1,
                    credential: 'Articles of Incorporation and By-Laws..',
                    file: 'ArticlesofInc.pdf',
                },
                {
                    id: 2,
                    credential: 'Copy(ies) of Transfer of Certificate(s) Title (TCT)',
                    file: 'Copy(ies)ofTransferof.pdf',
                },
            ],
            search: '',
        }
    },
}
</script>

<style>
</style>
