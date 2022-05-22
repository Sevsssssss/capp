<template>
<div>
    <div class="w-full bg-brand-darkblue flex shadow-sm text-brand-white px-3 lg:px-10 py-3 justify-between items-center fixed z-10">
        <div class="text-xl uppercase font-bold flex items-center gap-3 lg:order-first lg:mx-0">
            <img src="../assets/img/CHED_logo.png" class="h-8" alt="CHED Logo" />
            CHEDRO V <span class="text-sm">SUPER ADMIN</span>
        </div>
        <div class="flex items-center lg:order-last lg:right-0 lg:absolute lg:pr-10">
            <div class="flex justify-evenly space-x-2">
                <button @click="notifApp()" class="indicator">
                    <BellOutline class="h-6" />
                    
                    <span class="indicator-item indicator-top indicator-end  badge1 badge-accent text-xs">99+</span> 
                </button>
                <button @click="accountDetails()" class="flex space-x-1 mr-3 justify-center items-center text-blue-500 ">
                    <svg style="fill: #FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm2.595 7.812a3.51 3.51 0 0 1 0-1.623l-.992-.573 1-1.732.992.573A3.496 3.496 0 0 1 17 14.645V13.5h2v1.145c.532.158 1.012.44 1.405.812l.992-.573 1 1.732-.992.573a3.51 3.51 0 0 1 0 1.622l.992.573-1 1.732-.992-.573a3.496 3.496 0 0 1-1.405.812V22.5h-2v-1.145a3.496 3.496 0 0 1-1.405-.812l-.992.573-1-1.732.992-.572zM18 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BellOutline from "vue-material-design-icons/BellOutline.vue";


export default {
    name: "TopNavigation",
    components: {
        BellOutline,
    },
    data() {
        return {}
    },
    methods: {
        notifApp() {
            this.$router.push("/notif");
        },
        accountDetails() {
            this.$router.push("/ched/account");
        },
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
