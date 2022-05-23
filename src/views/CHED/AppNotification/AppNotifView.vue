<template>
<div class="relative overflow-x-auto">
    <div class="flex p-4 justify-between items-center ">
        <div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
            </div>
        </div>
        <div>
            <span class="font-semibold text-brand-darkblue text-sm"><a href="#" @click="onUpdate()">REFRESH</a></span>
        </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th class="px-6 py-3 text-left">
                    <div class="flex space-x-4 justify-end">
                        <!-- <span> <a href="#">Sort</a> </span> -->
                        <span> <a href="#">Delete</a> </span>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <router-link :to="{
                                name: 'appNotifItem',
                                params: {
                                    id: item.id,
                                    item: item.item,
                                    date: item.date,
                                },
                            }">
                        <div class="flex justify-between">
                            <span class="truncate text-grey-300"> {{item.item}} </span>
                            <span class="text-sm text-grey-300 font-normal"> {{item.date}} </span>
                        </div>
                    </router-link>
                </th>
            </tr>
        </tbody>
    </table>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
</div>
</template>

<script>
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";

export default {
    data() {
        return {
            items: [{
                    id: 1,
                    item: "Get your friends a GOMO for just P269 only at Shopee's Payday Sale! You can Check out this and other exclusive deals on Shopee today.",
                    date: "May 15",
                },
                {
                    id: 2,
                    item: "Ano na Get your friends a GOMO for just P269 only at Shopee's Payday Sale! You can Check out this and other exclusive deals on Shopee today.",
                    date: "May 22",
                },
                {
                    id: 3,
                    item: "Get your friends a GOMO for just P269 only at Shopee's Payday Sale! You can Check out this and other exclusive deals on Shopee today.",
                    date: "May 30",
                },
            ]
        }
    },
    components: {
        VueInstantLoadingSpinner,
    },
    methods: {
        onUpdate() {
            this.$refs.Spinner.show();
            this.$router.go()
            setTimeout(
                function () {
                    this.$refs.Spinner.hide();
                }.bind(this),
                3000
            );
        },
    },
    mounted: async function () {
        
            const Notifications = Parse.Object.extend("Notifications");
            const query = new Parse.Query(Notifications);
            query.equalTo("user", Parse.User.current().id);
            const querResult = await query.find();

            var notifs = [];

            for (var i = 0; i < querResult.length; i++) {
                const notification = querResult[i];

                notifs.push({
                    id: i + 1,
                    item: notification.get("message"),
                    date: notification.get("date_and_time"),
                    isRead: notification.get("isRead"),
                })

            }
            this.items = notifs;
            
    },
}
</script>

<style>

</style>
