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
import EvalFileView from "../views/EvalFileView.vue";
import AddEvaluationInsView from "../views/AddEvaluationInsView.vue";
import ReportingView from "../views/ReportingView.vue";
import HEI_Application from "../views/HEI/HEI_Application.vue";
import HEI_Apply from "../views/HEI/HEI_Apply.vue";
import HEI_Home from "../views/HEI/HEI_Home.vue";
import Edit_HEI_Application from '../views/HEI/EditApplication.vue';
import NotFoundPage from '../views/NotFoundPage.vue'
import StatusApplication from '../views/Application/StatusApplication.vue'


const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: NotFoundPage,
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
        meta:{
          breadcrumb: [
            {name: 'Application'},
          ]
        }
      },
      {
        path: "/application/:id",
        name: "StatusApplication",
        component: StatusApplication,
        props: true,
        meta:{
          breadcrumb: [
            { name: 'Application', link: '/application' },
            { name: 'Status'}
          ]
        }
      },
      {
        path: "/hei",
        name: "hei",
        component: HeiView,
        meta:{
          breadcrumb: [
            {name: 'HEI'},
          ]
        }
      },
      {
        path: "/hei/add",
        name: "addhei",
        component: AddHeiView,
        meta:{
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'ADD'}
          ]
        }
      },
      {
        path: "/rqat",
        name: "rqat",
        component: RqatView,
        meta:{
          breadcrumb: [
            {name: 'RQAT'},
          ]
        }
      },
      {
        path: "/rqat/add",
        name: "addrqat",
        component: AddRQATView,
        meta:{
          breadcrumb: [
            { name: 'RQAT', link: '/rqat' },
            { name: 'ADD'}
          ]
        }
      },
      {
        path: "/employees",
        name: "employees",
        component: EmployeesView,
        meta:{
          breadcrumb: [
            {name: 'EMPLOYEE'},
          ]
        }
      },
      {
        path: "/employees/add",
        name: "addemployee",
        component: AddEmployeeView,
        meta:{
          breadcrumb: [
            { name: 'EMPLOYEE', link: '/employees' },
            { name: 'ADD'}
          ]
        }
      },
      {
        path: "/evaluationins",
        name: "evaluationins",
        component: EvaluationInsView,
        meta:{
          breadcrumb: [
            {name: 'EVALUATION Ins.'},
          ]
        }
      },
      {
        path: "/evaluationins/view",
        name: "evaluationinsfile",
        component: EvalFileView,
        meta:{
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'STATUS'}
          ]
        }
      },
      {
        path: "/evaluationins/add",
        name: "addevaluationins",
        component: AddEvaluationInsView,
        meta:{
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'ADD'}
          ]
        }
      },
      {
        path: "/reporting",
        name: "reporting",
        component: ReportingView,
        meta:{
          breadcrumb: [
            {name: 'REPORTING'},
          ]
        }
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
        meta:{
          breadcrumb: [
            {name: 'Home'},
          ]
        }
      },
      {
        path: "/HEIapply",
        name: "HEIapply",
        component: HEI_Apply,
        meta:{
          breadcrumb: [
            {name: 'Apply'},
          ]
        }
      },
      {
        path: "/HEIapplication",
        name: "HEIapplication",
        component: HEI_Application,
        meta:{
          breadcrumb: [
            {name: 'Application'},
          ]
        }
      },
      {
        path: "/HEIapplication/:id",
        name: "EditHEIapplication",
        component: Edit_HEI_Application,
        props: true,
        meta:{
          breadcrumb: [
            { name: 'Application', link: '/HEIapplication' },
            { name: 'Edit'}
          ]
        }
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
