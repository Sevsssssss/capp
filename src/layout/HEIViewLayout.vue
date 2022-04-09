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
        <template v-slot:toggle-icon> <MenuOpen class="h-6" /></template>
        <template v-slot:footer>
          <div
            class="p-5 grid grid-cols-1 content-center space-y-4"
            :class="collapsed ? '' : 'hidden'"
          >
            <button
              @click="Logout(), scrollToTop()"
              class="flex space-x-1 justify-center items-center text-blue-500"
            >
              <Logout class="h-6" />
              <span class="text-sm hover:font-semibold">Logout</span>
            </button>
            <p class="flex justify-center text-sm text-grey-300 tracking-wide">
              Copyright &copy; {{ new Date().getFullYear() }} CHEDROV
            </p>
          </div>
        </template>
      </sidebar-menu>
      <div
        class="w-full content"
        :class="
          collapsed
            ? 'pl-[290px] transition-width duration-300'
            : 'pl-[65px] transition-width duration-300'
        "
      >
        <!-- <BreadCrumbs :crumbs="menu" @selected="selected" /> -->
        <nav
          class="breadcrumbs w-full mt-14 p-3 fixed shadow-sm"
          style="background-color: white"
        >
          <ul class="flex text-sm">
            <li
              class="list space-x-3 cursor-pointer"
              v-for="(breadcrumb, idx) in breadcrumbs"
              :key="idx"
              @click="routeTo(idx)"
            >
              <span class="name">{{ breadcrumb.name }}</span>
            </li>
          </ul>
        </nav>
        <div
          class="main-content h-screen bg-grey-700"
          style="padding-top: 100px"
        >
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
import Parse from "parse";
import TopNavigation from "@/components/TopNavigation.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import MenuOpen from "vue-material-design-icons/MenuOpen.vue";
import Logout from "vue-material-design-icons/Logout.vue";

import FilePlus from "@/assets/sidebar_icons/file-plus.svg";
import HomeOutline from "@/assets/sidebar_icons/home.svg";
import FileOutline from "@/assets/sidebar_icons/file.svg";

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
    scrollToTop(){
      window.scrollTo(0, 0);
    },
    Logout() {
      Parse.User.logOut();
      this.$router.push("/");
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
      collapsed: true,
      breadcrumbs: [],
      menu: [
        {
          href: "/HEIhome",
          title: "Home",
          icon: {
            element: "img",
            attributes: {
              src: HomeOutline,
            },
          },
        },
        {
          href: "/HEIapply",
          title: "Apply",
          icon: {
            element: "img",
            attributes: {
              src: FilePlus,
            },
          },
        },
        {
          href: "/HEIapplication",
          title: "Application",
          icon: {
            element: "img",
            attributes: {
              src: FileOutline,
            },
          },
        },
      ],
    };
  },
};
</script>
