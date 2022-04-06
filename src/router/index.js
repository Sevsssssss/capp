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
import NoFoundPage from '../views/NoFoundPage.vue'
import StatusApplication from '../views/Application/StatusApplication.vue'

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NoFoundPage',
    component: NoFoundPage,
  },
  {
    path: "/capp",
    component: ViewLayout,
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
        path: "/application/:id",
        name: "StatusApplication",
        component: StatusApplication,
        props: true,
      },
      {
        path: "/hei",
        name: "hei",
        component: HeiView,
      },
      {
        path: "/hei/add",
        name: "addhei",
        component: AddHeiView,
      },
      {
        path: "/rqat",
        name: "rqat",
        component: RqatView,
      },
      {
        path: "/rqat/add",
        name: "addrqat",
        component: AddRQATView,
      },
      {
        path: "/employees",
        name: "employees",
        component: EmployeesView,
      },
      {
        path: "/employees/add",
        name: "addemployee",
        component: AddEmployeeView,
      },
      {
        path: "/evaluationins",
        name: "evaluationins",
        component: EvaluationInsView,
      },
      {
        path: "/evaluationins/add",
        name: "addevaluationins",
        component: AddEvaluationInsView,
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
        path: "/HEIapplication/:id",
        name: "EditHEIapplication",
        component: Edit_HEI_Application,
        props: true,
      },
      {
        path: '/add-tables',
        redirect: '/HEIapplication'
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
