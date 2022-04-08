<template>
<div class="">
    <div class="flex">
        <TopNavigation class="z-40" />
        <sidebar-menu :menu="menu" class="z-10" @update:collapsed="toggle" v-model="collapsed">
            <template v-slot:toggle-icon>
                <MenuOpen class="h-6" /></template>
            <template v-slot:footer>
                <div class="p-5 grid grid-cols-1 content-center" :class="collapsed ? '' : 'hidden'">
                    <button class="flex pl-20 pb-5 text-blue-500">
                        <Logout class="h-6" />Logout
                    </button>
                    <p class="pl-10 text-xs font-bold text-grey-300 tracking-wide">
                        Copyright &copy; 2022 CHEDROV
                    </p>
                </div>
            </template>
        </sidebar-menu>
        <div class="w-full content" :class="
          collapsed
            ? 'pl-[290px]  transition-width duration-300'
            : 'pl-[65px] transition-width duration-300'
        ">
            <!-- <BreadCrumbs :crumbs="menu" @selected="selected" /> -->
            <div class="breadcrumbs mt-14 w-full bg-white p-3 fixed shadow-sm">
                <ul class="flex text-sm">
                    <li class="list cursor-pointer" v-for="(breadcrumb, idx) in breadcrumbs" :key="idx" @click="routeTo(idx)">
                        <span class="name">{{ breadcrumb.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="main-content h-screen pt-28 bg-grey-700 ">
                <router-view />
            </div>
        </div>
    </div>
</div>
</template>

<style>
.v-sidebar-menu {
    z-index: 10;
    box-shadow: -15px 0 20px 0;
    padding-top: 150px;
    background-color: theme("colors.brand.white");
}

.v-sidebar-menu .vsm--scroll {
    width: calc(100% + 29px);
}

.v-sidebar-menu .vsm--toggle-btn {
    width: auto;
    height: auto;
    padding: 5px 10px 5px 10px;
    margin-top: 50px;
    right: 0;
    position: absolute;
    top: 55px;
    background-color: theme("colors.brand.darkblue");
    border-radius: 5px 0 0 5px;
}

.v-sidebar-menu.vsm_collapsed .vsm--toggle-btn {
    left: 0;
    border-radius: 0 0 0 0;
    transform: rotate(180deg);
}

.v-sidebar-menu .vsm--mobile-bg {
    background-color: theme("colors.grey.500");
}

.v-sidebar-menu.vsm_collapsed .vsm--link_active {
    background-color: theme("colors.grey.500");
    color: theme("colors.blue.600");
}

.v-sidebar-menu .vsm--link {
    /* font-family: theme("fontFamily.body"); */
    padding: 5px 10px 5px 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: theme("colors.grey.300");
}

.v-sidebar-menu .vsm--link:hover {
    background-color: theme("colors.grey.600");
    color: theme("colors.blue.600");
}

.v-sidebar-menu .vsm--link_active {
    background-color: theme("colors.grey.600");
    color: theme("colors.blue.600");
    box-shadow: none !important;
}

.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    background-color: transparent;
}

.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link .vsm--icon {
    background-color: transparent;
}

.hide {
    left: -100%;
    transition: all 0.5s ease-in-out;
}

.footer {
    vertical-align: middle;
}
</style>

<script>
import TopNavigation from "@/components/TopNavigation.vue";
import {
    SidebarMenu
} from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import Logout from "vue-material-design-icons/Logout.vue";

import FileOutline from "@/assets/sidebar_icons/file-3-line.svg";
import HomeOutline from "@/assets/sidebar_icons/home-outline.svg";

export default {
    name: "ViewLayout",
    components: {
        TopNavigation,
        SidebarMenu,
        MenuOpen,
        Logout,
    },
    watch: {
        $route() {
            this.updateList();
        },
    },
    mounted() {
        this.updateList();
    },

    methods: {
        updateList() {
            this.breadcrumbs = this.$route.meta.breadcrumb;
        },
        toggle() {
            this.collapsed = !this.collapsed;
        },
        routeTo(pRouteTo) {
            if (this.breadcrumbs[pRouteTo].link) {
                this.$router.push(this.breadcrumbs[pRouteTo].link);
            }
        },
    },
    data() {
        return {
            collapsed: true,
            breadcrumbs: [],
            menu: [{
                    href: "/HEIhome",
                    title: "Home",
                    icon: {
                        element: "img",
                        attributes: {
                            src: HomeOutline
                        },
                    },
                },
                {
                    href: "/HEIapply",
                    title: "Apply",
                    icon: {
                        element: "img",
                        attributes: {
                            src: FileOutline
                        },
                    },
                },
                {
                    href: "/HEIapplication",
                    title: "Application",
                    icon: {
                        element: "img",
                        attributes: {
                            src: FileOutline
                        },
                    },
                },
            ],
        };
    },
};
</script>
