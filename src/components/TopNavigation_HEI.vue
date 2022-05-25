<template>
<div>
    <div class="w-full bg-brand-darkblue flex shadow-sm text-brand-white px-3 lg:px-10 py-3 justify-between items-center fixed z-10">
        <div class="text-xl uppercase font-bold flex items-center gap-3 lg:order-first lg:mx-0">
            <img src="../assets/img/CHED_logo.png" class="h-8" alt="CHED Logo" />
            CHEDRO V <span class="text-sm">HEI</span>
        </div>
        <div class="flex items-center lg:order-last lg:right-0 lg:absolute lg:pr-10">
            <div class="flex justify-evenly space-x-2">
                <button @click="notifApp()" class="indicator">
                    <BellOutline class="h-6" />
                    
                    <span class="indicator-item indicator-top indicator-end  badge1 badge-accent text-xs"> {{unreadNotifsText}} </span> 
                </button>
                
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
import BellOutline from "vue-material-design-icons/BellOutline.vue";


export default {
    name: "TopNavigation",
    components: {
        BellOutline,
    },
    data() {
        return {
            unreadNotifs: 0,
            unreadNotifsText: "",
        }
    },
    methods: {
        notifApp() {
            this.$router.push("/hei/notif");
        },
        // accountDetails() {
        //     this.$router.push("/ched/account");
        // },
    },
    mounted: async function() {
        //Application Notifs
        const applicationQuery = new Parse.Query('Notifications');
        applicationQuery.equalTo("user", Parse.User.current().id);
        const applicationSub = await applicationQuery.subscribe();
        const appQueryUnread = applicationQuery.equalTo("isRead", false);
        const appQueryUnreadCount = await appQueryUnread.count();

        //Open Subscription to Notifications
        applicationSub.on('open', () => {
            console.log("Application Subscription Open");
        });

        //Display a Toast(Banner) when a Notification is created
        applicationSub.on('create', () => {
            this.unreadNotifs += 1;
            if(this.unreadNotifs > 99){
                this.unreadNotifsText = "99+";
            } else{
                this.unreadNotifsText = this.unreadNotifs.toString();
            }
        });
    

        this.unreadNotifs = appQueryUnreadCount;

        if(this.unreadNotifs > 99){
            this.unreadNotifsText = "99+";
        } else{
            this.unreadNotifsText = this.unreadNotifs.toString();
        }
    }
};
</script>

<style>
.badge1 {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    height: 15px/* 20px */;
    font-size: 0.875rem/* 14px */;
    line-height: 1.25rem/* 20px */;
    width: fit-content;
    padding: 2px;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: hsl(var(--n) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--nc) / var(--tw-text-opacity));
    border-radius: var(--rounded-badge, 1.9rem);
}
</style>
