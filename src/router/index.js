import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "../views/LandingView.vue";
import ViewLayout from "../layout/ViewLayout.vue";
import HomeView from "../views/HomeView.vue";
import ApplicationView from "../views/ApplicationView.vue";
import HeiView from "../views/HeiView.vue";
import AddHeiView from "../views/AddHeiView.vue";
import RqatView from "../views/RqatView.vue";
import EmployeesView from "../views/EmployeesView.vue";
import EvaluationInsView from "../views/EvaluationInsView.vue";
import ReportingView from "../views/ReportingView.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
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
        path: "/hei",
        name: "hei",
        component: HeiView,
      },
      {
        path: "/addhei",
        name: "addhei",
        component: AddHeiView,
      },
      {
        path: "/rqat",
        name: "rqat",
        component: RqatView,
      },
      {
        path: "/employees",
        name: "employees",
        component: EmployeesView,
      },
      {
        path: "/evaluationins",
        name: "evaluationins",
        component: EvaluationInsView,
      },
      {
        path: "/reporting",
        name: "reporting",
        component: ReportingView,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
