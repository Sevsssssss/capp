<template>
<div class="">
    <div class="flex">
        <TopNavigation class="z-40" />
        <sidebar-menu :menu="menu" class="z-10" @update:collapsed="toggle" v-model="collapsed">
            <template v-slot:toggle-icon>
                <MenuOpen class="h-6" /></template>
            <template v-slot:footer>
                <div class="p-5 grid grid-cols-1 content-center space-y-4" :class="collapsed ? '' : 'hidden'">
                    <button for="my-modal-7" id="my-modal-7" type="submit" class="flex space-x-1 justify-center items-center focus:outline-none text-blue-500" @click="modal()">
                        <Logout class="h-6" />
                        <span class="text-sm hover:font-semibold">Logout</span>
                    </button>
                    <p class="flex justify-center items-center text-sm text-grey-300 tracking-wide">
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
                <label for="my-modal-7" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-7" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none" @click="Logout(), scrollToTop()">Logout</label>
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
import TopNavigation from "@/components/TopNavigation.vue";
import {
    SidebarMenu
} from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import Logout from "vue-material-design-icons/Logout.vue";
import HomeOutline from "@/assets/sidebar_icons/home.svg";
import FileOutline from "@/assets/sidebar_icons/file.svg";
import BankLine from "@/assets/sidebar_icons/bank-line.svg";
import ClipboardLine from "@/assets/sidebar_icons/clipboard-line.svg";
import GroupLine from "@/assets/sidebar_icons/group-line.svg";
import FileChartOutline from "@/assets/sidebar_icons/file-chart-line.svg";
import TeamLine from "@/assets/sidebar_icons/team-line.svg";
import FileSettingsLine from "@/assets/sidebar_icons/file-settings-line.svg";
import AccessTypeLine from "@/assets/sidebar_icons/shield-user-line.svg";
import BookLine from "@/assets/sidebar_icons/book-line.svg";
import ContactLine from "@/assets/sidebar_icons/contacts-line.svg";


const toast = useToast();

export default {
    name: "ViewLayout",
    components: {
        TopNavigation,
        SidebarMenu,
        MenuOpen,
        Logout,
    },
    data() {
        return {
            showModal1: false,
            collapsed: true,
            breadcrumbs: [],
            menu: [],
        };
    },
    watch: {
        $route() {
            this.updateList();
        },
    },
    methods: {
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

    mounted: async function () {
        console.log("hi");
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === "/home") {
            flag = 1;
            this.menu.push({
                href: "/home",
                title: "Home",
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

            // THESE LINES OF CODE CREATES MENU FOR THE USER
            const AccessTypes = Parse.Object.extend("AccessTypes");
            const query = new Parse.Query(AccessTypes);
            query.equalTo("objectId", Parse.User.current().get("access_type"));

            const querResult = await query.find();
            var userPriv = querResult[0].get("privileges");
            if (userPriv.find((e) => e === "/application")) {
                this.menu.push({
                    href: "/application",
                    title: "Application",
                    icon: {
                        element: "img",
                        attributes: {
                            src: FileOutline,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/hei")) {
                this.menu.push({
                    href: "/hei",
                    title: "HEIs Account",
                    icon: {
                        element: "img",
                        attributes: {
                            src: BankLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/rqat")) {
                this.menu.push({
                    href: "/rqat",
                    title: "RQAT Account",
                    icon: {
                        element: "img",
                        attributes: {
                            src: TeamLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/employees")) {
                this.menu.push({
                    href: "/employees",
                    title: "Employees",
                    icon: {
                        element: "img",
                        attributes: {
                            src: GroupLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/cmo")) {
                this.menu.push({
                    href: "/cmo",
                    title: "Ched Memorandum Order",
                    icon: {
                        element: "img",
                        attributes: {
                            src: ClipboardLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/evaluationins")) {
                this.menu.push({
                    href: "/evaluationins",
                    title: "Evaluation Ins.",
                    icon: {
                        element: "img",
                        attributes: {
                            src: ClipboardLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/reporting")) {
                this.menu.push({
                    href: "/reporting",
                    title: "Reporting",
                    icon: {
                        element: "img",
                        attributes: {
                            src: FileChartOutline,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/app-settings")) {
                this.menu.push({
                    href: "/app-settings",
                    title: "Application Types",
                    icon: {
                        element: "img",
                        attributes: {
                            src: FileSettingsLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/access-settings")) {
                this.menu.push({
                    href: "/access-settings",
                    title: "Access Types",
                    icon: {
                        element: "img",
                        attributes: {
                            src: AccessTypeLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/heiTypes")) {
                this.menu.push({
                    href: "/heiTypes",
                    title: "Hei Types",
                    icon: {
                        element: "img",
                        attributes: {
                            src: BankLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/designations")) {
                this.menu.push({
                    href: "/designations",
                    title: "Designations",
                    icon: {
                        element: "img",
                        attributes: {
                            src: ContactLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/disciplines")) {
                this.menu.push({
                    href: "/disciplines",
                    title: "Disciplines",
                    icon: {
                        element: "img",
                        attributes: {
                            src: BookLine,
                        },
                    },
                });
            }
            if (userPriv.find((e) => e === "/programs")) {
                this.menu.push({
                    href: "/programs",
                    title: "Programs",
                    icon: {
                        element: "img",
                        attributes: {
                            src: BookLine,
                        },
                    },
                });
            }
            this.updateList();
        }
        //Application Notifs
        let applicationQuery = new Parse.Query('Notifications');
        applicationQuery.equalTo("user", Parse.User.current().id);
        let applicationSub = await applicationQuery.subscribe();

        //Open Subscription to Notifications
        applicationSub.on('open', () => {
            console.log("Application Subscription Open");
        });

        //Display a Toast(Banner) when a Notification is created
        applicationSub.on('create', (notif) => {

            toast(notif.get("message"), {
                type: TYPE.INFO,
                timeout: 5000,
                hideProgressBar: false,
                position: POSITION.TOP_RIGHT,
            });
        });

        /////////////////////////////////////////////////////////////////////////////// Live Queries

        const query1 = new Parse.Query(Parse.User);
        const subscription = await query1.subscribe();

        subscription.on("open", async () => {
            var password = [];
            const emailQuery = new Parse.Query(Parse.User);
            emailQuery.equalTo("emailVerified", true)
            emailQuery.notEqualTo("receivedCredentials", true)
            await emailQuery.find({
                useMasterKey: true
            }).then((objectEmail) => {
                for (let e = 0; e < objectEmail.length; e++) {
                    if (
                        objectEmail[e].get("emailVerified") == true &&
                        objectEmail[e].get("receivedCredentials") == false
                    ) {

                        password.push(Math.random().toString(36).slice(-12))
                        console.log("first: " + password)
                        setTimeout(
                            () => {
                                const params = {
                                    username: objectEmail[e].get("username"),
                                    email: objectEmail[e].get("email"),
                                    password: password[e],
                                    type: "sendCredentials",
                                    approved: true,
                                };
                                console.log(objectEmail[e].id);
                                Parse.Cloud.run("sendEmailNotification", params)
                            },
                            2000
                        );

                        objectEmail[e].setPassword(password[e]);
                        console.log("second: " + password[e])
                        objectEmail[e].set("receivedCredentials", true);
                        objectEmail[e].save(null, {
                            useMasterKey: true,
                        });
                    }
                }

            });

        });
    },
};
</script>
