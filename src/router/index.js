import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "../views/LandingView.vue";
import ViewLayout from "../layout/ViewLayout.vue";
import HEIViewLayout from "../layout/HEIViewLayout.vue";
import HomeView from "../views/HomeView.vue";
import ApplicationView from "../views/ApplicationView.vue";
import HeiView from "../views/HeiView.vue";
import AddHeiView from "../views/AddHeiView.vue";
import RqatView from "../views/RqatView.vue";
import AddRQATView from "../views/AddRQATView.vue";
import EmployeesView from "../views/EmployeesView.vue";
import AddEmployeeView from "../views/AddEmployeeView.vue";
import EvaluationInsView from "../views/EvaluationInsView.vue";
import AddEvaluationInsView from "../views/AddEvaluationInsView.vue";
import ReportingView from "../views/ReportingView.vue";
import HEI_Application from "../views/HEI/HEI_Application.vue";
import HEI_Apply from "../views/HEI/HEI_Apply.vue";
import HEI_Home from "../views/HEI/HEI_Home.vue";
import Edit_HEI_Application from '../views/HEI/EditApplication.vue';
import Parse from 'parse';

import Forbidden403 from "../views/errors/403.vue";
import NotFound404 from "../views/errors/404.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: "/capp",
    component: ViewLayout,
    beforeEnter: () => {
      if (Parse.User.current().get("user_type") === "hei") {
        return { name: '403' }
      }
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
      },
      {
        path: "/application",
        name: "application",
        component: ApplicationView,
      },
      {
        path: "/hei",
        name: "hei",
        component: HeiView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin") {
            return { name: '403' }
          }
        },
      },
      {
        path: "/hei/add",
        name: "addhei",
        component: AddHeiView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin") {
            return { name: '403' }
          }
        },
      },
      {
        path: "/rqat",
        name: "rqat",
        component: RqatView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin") {
            return { name: '403' }
          }
        },
      },
      {
        path: "/rqat/add",
        name: "addrqat",
        component: AddRQATView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin") {
            return { name: '403' }
          }
        },
      },
      {
        path: "/employees",
        name: "employees",
        component: EmployeesView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin") {
            return { name: '403' }
          }
        },
      },
      {
        path: "/employees/add",
        name: "addemployee",
        component: AddEmployeeView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin") {
            return { name: '403' }
          }
        },
      },
      {
        path: "/evaluationins",
        name: "evaluationins",
        component: EvaluationInsView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin" && Parse.User.current().get("user_type") !== "admin" && Parse.User.current().get("user_type") !== "education supervisor"){
            return { name: '403' }
          }
        },
      },
      {
        path: "/evaluationins/add",
        name: "addevaluationins",
        component: AddEvaluationInsView,
        beforeEnter: () => {
          if (Parse.User.current().get("user_type") !== "super admin" && Parse.User.current().get("user_type") !== "admin" && Parse.User.current().get("user_type") !== "education supervisor"){
            return { name: '403' }
          }
        },
      },
      {
        path: "/reporting",
        name: "reporting",
        component: ReportingView,
      },
    ]
  },
  {
    path: "/HEIPage",
    component: HEIViewLayout,
    beforeEnter: () => {
      if (Parse.User.current().get("user_type") !== "hei") {
        return { name: '403' }
      }
    },
    children: [
      {
        path: "/HEIhome",
        name: "HEIhome",
        component: HEI_Home,
      },
      {
        path: "/HEIapply",
        name: "HEIapply",
        component: HEI_Apply,
      },
      {
        path: "/HEIapplication",
        name: "HEIapplication",
        component: HEI_Application,
      },
      {
        path: "/HEIapplication/edit",
        name: "EditHEIapplication",
        component: Edit_HEI_Application,
      },

    ]
  },
  {
    path: "/403",
    name: "403",
    component: Forbidden403,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound404,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'landing' && Parse.User.current() === null) next({ name: 'landing' })
  else next()
})

export default router
