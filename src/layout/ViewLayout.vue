<template>
  <div class="">
    <div class="flex">
      <TopNavigation class="z-40" />
      <sidebar-menu
        :menu="menu"
        class="z-10"
        @update:collapsed="toggle"
        v-model="collapsed"
      >
        <template v-slot:toggle-icon><MenuOpen class="h-6" /></template>
        <template v-slot:footer
          ><div
            class="p-5 grid grid-cols-1 content-center"
            :class="collapsed ? '' : 'hidden'"
          >
            <button class="flex pl-20 pb-5 text-blue-100">
              <Logout class="h-6" />Logout
            </button>
            <p class="pl-10 text-xs font-bold text-grey-300 tracking-wide">
              Copyright &copy; 2022 CHEDROV
            </p>
          </div>
        </template>
      </sidebar-menu>
      <div
        class="w-full content"
        :class="
          collapsed
            ? 'pl-[290px]  transition-width duration-300'
            : 'pl-[65px] transition-width duration-300'
        "
      >
        <BreadCrumbs :menu="menu" @selected="selected"/>
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
  color: theme("colors.blue.100");
  box-shadow: none !important;
}
.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
  fill: theme("colors.brand.darkblue");
  background-color:  transparent;
}
.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link:hover .vsm--icon {
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
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import Logout from "vue-material-design-icons/Logout.vue";

import FileOutline from "@/assets/sidebar_icons/file-3-line.svg";
import BankLine from "@/assets/sidebar_icons/bank-line.svg";
import ClipboardLine from "@/assets/sidebar_icons/clipboard-line.svg";
import GroupLine from "@/assets/sidebar_icons/group-line.svg";
import FileChartOutline from "@/assets/sidebar_icons/file-chart-line.svg";
import TeamLine from "@/assets/sidebar_icons/team-line.svg";

export default {
  name: "ViewLayout",
  components: {
    TopNavigation,
    SidebarMenu,
    MenuOpen,
    Logout,
    BreadCrumbs,
  },

  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },

  data() {
    return {
      collapsed: true,
      menu: [
        {
          href: "/application",
          title: "Application",
          icon: {
            element: "img",
            attributes: { src: FileOutline },
          },
        },
        {
          href: "/hei",
          title: "HEIs Account",
          icon: {
            element: "img",
            attributes: { src: BankLine },
          },
        },
        {
          href: "/rqat",
          title: "RQAT Account",
          icon: {
            element: "img",
            attributes: { src: TeamLine },
          },
        },
        {
          href: "/employees",
          title: "Employees",
          icon: {
            element: "img",
            attributes: { src: GroupLine },
          },
        },
        {
          href: "/evaluationins",
          title: "Evaluation Ins.",
          icon: {
            element: "img",
            attributes: { src: ClipboardLine },
          },
        },
        {
          href: "/reporting",
          title: "Reporting",
          icon: {
            element: "img",
            attributes: { src: FileChartOutline },
          },
        },
      ],
    };
  },
};
</script>
