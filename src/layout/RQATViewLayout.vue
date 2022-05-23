<template>
<div class="">
    <div class="flex">
        <TopNavigationRQAT class="z-40" />
        <sidebar-menu :menu="menu" class="z-10" @update:collapsed="toggle" v-model="collapsed">
            <template v-slot:toggle-icon>
                <MenuOpen class="h-6" /></template>
            <template v-slot:footer>
                <div class="p-5 grid grid-cols-1 content-center space-y-4" :class="collapsed ? '' : 'hidden'">
                    <div class="flex flex-row justify-center">
                        <button @click="accountDetails()" class="flex space-x-1 mr-3 justify-center items-center text-blue-500 ">
                            <svg style="fill: #0085FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm2.595 7.812a3.51 3.51 0 0 1 0-1.623l-.992-.573 1-1.732.992.573A3.496 3.496 0 0 1 17 14.645V13.5h2v1.145c.532.158 1.012.44 1.405.812l.992-.573 1 1.732-.992.573a3.51 3.51 0 0 1 0 1.622l.992.573-1 1.732-.992-.573a3.496 3.496 0 0 1-1.405.812V22.5h-2v-1.145a3.496 3.496 0 0 1-1.405-.812l-.992.573-1-1.732.992-.572zM18 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>
                        </button>
                        <button for="my-modal-7" id="my-modal-7" type="submit" class="flex space-x-1 justify-center items-center text-blue-500" @click="modal()">
                            <Logout class="h-6" />
                            <span class="text-sm hover:font-semibold">Logout</span>
                        </button>
                    </div>
                    <p class="flex justify-center text-sm text-grey-300 tracking-wide">
                        Copyright &copy; {{ new Date().getFullYear() }} CHEDROV
                    </p>
                </div>
            </template>
        </sidebar-menu>
        <div class="w-full content" :class="
          collapsed
            ? 'pl-[290px] transition-width duration-300'
            : 'pl-[65px] transition-width duration-300'
        ">
            <!-- <BreadCrumbs :crumbs="menu" @selected="selected" /> -->
            <nav class="breadcrumbs w-full mt-14 p-3 fixed shadow-sm" style="background-color: white">
                <ul class="flex text-sm">
                    <li class="list space-x-3 cursor-pointer" v-for="(breadcrumb, idx) in breadcrumbs" :key="idx" @click="routeTo(idx)">
                        <span class="name">{{ breadcrumb.name }}</span>
                    </li>
                </ul>
            </nav>
            <div class="main-content h-screen bg-grey-700" style="padding-top: 100px">
                <router-view />
            </div>
        </div>
    </div>
    <div :class="{ 'modal-open ': validate1() }" class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Logout Account</div>
            <p class="py-2 text-sm">Are you sure you want to logout?</p>
            <div class="modal-action">
                <label for="my-modal-7" class="
              btn btn-sm
              rounded-md
              text-blue-700
              bg-transparent
              border border-blue-700
              hover:bg-white
            ">Cancel</label>
                <label for="my-modal-7" class="
              btn btn-sm
              bg-blue-700
              hover:bg-blue-800
              rounded-md
              border-none
            " @click="Logout(), scrollToTop()">Logout</label>
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
    color: theme("colors.blue.500");
}

.v-sidebar-menu .vsm--link {
    /* font-family: theme("fontFamily.body"); */
    padding: 5px 10px 5px 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: theme("colors.grey.300");
    font-size: 14px;
}

.v-sidebar-menu .vsm--link:hover {
    background-color: theme("colors.grey.600");
}

.v-sidebar-menu .vsm--link_active {
    background-color: theme("colors.grey.600");
    color: theme("colors.blue.500");
    box-shadow: none !important;
}

.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    background-color: transparent;
    width: 30px;
    height: 30px;
    padding-left: 4px;
}

.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link .vsm--icon {
    background-color: transparent;
    padding-left: 8px;
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
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import Parse from "parse";
import TopNavigationRQAT from "@/components/TopNavigation_RQAT.vue";
import {
    SidebarMenu
} from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import Logout from "vue-material-design-icons/Logout.vue";

import FilePlus from "@/assets/sidebar_icons/file-plus.svg";
import HomeOutline from "@/assets/sidebar_icons/home.svg";
//import FileOutline from "@/assets/sidebar_icons/file.svg";

const toast = useToast();

export default {
    name: "ViewLayout",
    components: {
        TopNavigationRQAT,
        SidebarMenu,
        MenuOpen,
        Logout,
    },
    watch: {
        $route() {
            this.updateList();
        },
    },
    mounted: async function () {
        console.log("hi");
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));
        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === "/rqat/assignments") {
            flag = 1;
            this.menu.push({
                href: "/rqat/assignments",
                title: "Assignments",
                icon: {
                    element: "img",
                    attributes: {
                        src: HomeOutline,
                    },
                },
            });
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            const AccessTypes = Parse.Object.extend("AccessTypes");
            const query = new Parse.Query(AccessTypes);
            query.equalTo("objectId", Parse.User.current().get("access_type"));

            const querResult = await query.find();
            var userPriv = querResult[0].get("privileges");
            if (userPriv.find((e) => e === "/rqat/assignments")) {
                this.menu.push({
                    href: "/rqat/history",
                    title: "History",
                    icon: {
                        element: "img",
                        attributes: {
                            src: FilePlus,
                        },
                    },
                });
            }
            // if (userPriv.find((e) => e === "/HEIapplication")) {
            //   this.menu.push({
            //     href: "/HEIapplication",
            //     title: "Application",
            //     icon: {
            //       element: "img",
            //       attributes: {
            //         src: FileOutline,
            //       },
            //     },
            //   });
            // }

            this.updateList();
        }
        //Application Notifs
        let applicationQuery = new Parse.Query('Notifications');
        applicationQuery.equalTo("users", Parse.User.current().id);
        let applicationSub = await applicationQuery.subscribe();

        applicationSub.on('open', () => {
            console.log("Application Subscription Open");
            console.log(Parse.User.current().id)
        });

        applicationSub.on('create', (notif) => {
             toast(notif.get("message") + "create", {
                type: TYPE.INFO,
                timeout: 5000,
                hideProgressBar: false,
                position: POSITION.TOP_RIGHT,
            });
            console.log(notif.get("message") + "create");
            console.log(notif.get("users"))
        });

        applicationSub.on('update', (notif) => {
             toast(notif.get("message") + "upate", {
                type: TYPE.INFO,
                timeout: 5000,
                hideProgressBar: false,
                position: POSITION.TOP_RIGHT,
            });
            console.log(notif.get("message") + "upate");
            console.log(notif.get("users"))
        });
    },
    methods: {
        accountDetails() {
            this.$router.push("/rqat/account");
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        validate1() {
            return this.showModal1;
        },
        modal() {
            this.showModal1 = !this.showModal1;
        },
        Logout() {
            toast("Logging out..", {
                type: TYPE.WARNING,
                closeButton: false,
                timeout: 2000,
                position: POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                Parse.User.logOut();
                this.$router.push("/");
            }, 2000);
        },
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
            showModal1: false,
            collapsed: true,
            breadcrumbs: [],
            menu: [],
        };
    },
};
</script>
