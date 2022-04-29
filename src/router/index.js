import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "../views/LandingView.vue";
import CHEDViewLayout from "../layout/CHEDViewLayout.vue";
import HEIViewLayout from "../layout/HEIViewLayout.vue";
import RQATViewLayout from "../layout/RQATViewLayout.vue";

import CHED_HomeView from "../views/CHED/CHED_HomeView.vue";
import ApplicationView from "../views/CHED/Application/ApplicationView.vue";

import HeiView from "../views/CHED/Hei/HeiView.vue";
import UploadCSV from '../views/CHED/Hei/UploadCSV.vue'
import AddHeiView from "../views/CHED/Hei/AddHeiView.vue";
import EditHeiView from "../views/CHED/Hei/EditHeiView.vue"

import RqatView from "../views/CHED/Rqat/RqatView.vue";
import AddRQATView from "../views/CHED/Rqat/AddRQATView.vue";
import EditRQATView from "../views/CHED/Rqat/EditRQATView.vue"

import EmployeesView from "../views/CHED/Employees/EmployeesView.vue";
import AddEmployeeView from "../views/CHED/Employees/AddEmployeeView.vue";
import EditEmployeeView from "../views/CHED/Employees/EditEmployeeView.vue";

import EvaluationInsView from "../views/CHED/Evaluation/EvaluationInsView.vue";
import EvalFileView from "../views/CHED/Evaluation/EvalFileView.vue";
import AddEvaluationInsView from "../views/CHED/Evaluation/AddEvaluationInsView.vue";
import EditEvaluationsView from "../views/CHED/Evaluation/EditEvaluationsView.vue"

import ReportingView from "../views/CHED/Reporting/ReportingView.vue";

import HEI_Application from "../views/HEI/HEI_Application.vue";
import HEI_Apply from "../views/HEI/HEI_Apply.vue";
import HEI_Home from "../views/HEI/HEI_Home.vue";
import Edit_HEI_Application from '../views/HEI/EditApplication.vue';
import Comply_HEI_Application from '../views/HEI/ComplyApplication.vue';
import AccountDetails from '../views/HEI/AccountDetails.vue';
import ForApprovalView from '../views/HEI/ForApprovalView.vue';


import AccessSettingsView from '../views/CHED/AccessSettings/AccessSettingsView.vue';
import AppSettingsView from '../views/CHED/AppSettings/AppSettingsView.vue';
import AddApplicationView from '../views/CHED/AppSettings/AddApplicationTypeView.vue';
import ApplicationTypeView from '../views/CHED/AppSettings/AppTypeView.vue';
import EditApplicationView from '../views/CHED/AppSettings/EditApplicationTypeView.vue';

import DisciplineView from '../views/CHED/Disciplines/DisciplinesView.vue';
import DesignationsView from '../views/CHED/Designations/DesignationsView.vue';

import rqatEvaluationView from '../views/RQAT/rqatEvalView.vue';
import rqatEvaluate from '../views/RQAT/rqatEvaluate.vue';
import rqatHistory from '../views/RQAT/rqatHistory.vue';

import Parse from 'parse';

import Forbidden403 from "../views/errors/403.vue";
import NotFound404 from "../views/errors/404.vue";
import StatusApplication from '../views/CHED/Application/StatusApplication.vue';

const routes = [

  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: "/capp",
    component: CHEDViewLayout,
    children: [
      {
        path: "/home",
        name: "home",
        component: CHED_HomeView,
        meta: {
          breadcrumb: [
            { name: 'Dashboard' },
          ]
        }
      },
      {
        path: "/application",
        name: "application",
        component: ApplicationView,
        meta: {
          breadcrumb: [
            { name: 'Application' },
          ]
        }
      },
      {
        path: "/application/:id",
        name: "StatusApplication",
        component: StatusApplication,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/application' },
            { name: 'Status' }
          ]
        }
      },
      {
        path: "/hei",
        name: "hei",
        component: HeiView,
        meta: {
          breadcrumb: [
            { name: 'HEI' },
          ]
        }
      },
      {
        path: "/hei/add",
        name: "addhei",
        component: AddHeiView,
        meta: {
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'ADD HEI ACCOUNT' }
          ]
        }
      },

      {
        path: "/hei/edit/:id",
        name: "edithei",
        component: AddHeiView,
        meta:{
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'EDIT HEI ACCOUNT'}
          ]
        }
      },
      {
        path: "/hei/edit",
        name: "edithei",
        component: EditHeiView,
        meta:{
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'EDIT HEI ACCOUNT'}
          ]
        }
      },
      {
        path: "/hei/upload",
        name: "uploadCSV",
        component: UploadCSV,
        meta: {
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'UPLOAD CSV' }
          ]
        }
      },
      {
        path: "/rqat",
        name: "rqat",
        component: RqatView,
        meta: {
          breadcrumb: [
            { name: 'RQAT' },
          ]
        }
      },
      {
        path: "/rqat/add",
        name: "addrqat",
        component: AddRQATView,
        meta: {
          breadcrumb: [
            { name: 'RQAT', link: '/rqat' },
            { name: 'ADD RQAT ACCOUNT' }
          ]
        }
      },
      {
        path: "/rqat/edit",
        name: "editrqat",
        component: EditRQATView,
        meta:{
          breadcrumb: [
            { name: 'RQAT', link: '/rqat' },
            { name: 'EDIT RQAT ACCOUNT'}
          ]
        }
      },
      {
        path: "/employees",
        name: "employees",
        component: EmployeesView,
        meta: {
          breadcrumb: [
            { name: 'EMPLOYEE' },
          ]
        }
      },
      {
        path: "/employees/add",
        name: "addemployee",
        component: AddEmployeeView,
        meta: {
          breadcrumb: [
            { name: 'EMPLOYEE', link: '/employees' },
            { name: 'ADD EMPLOYEE ACCOUNT' }
          ]
        }
      },
      {
        path: "/employees/edit",
        name: "editemployee",
        component: EditEmployeeView,
        beforeEnter: () => {
          if (Parse.User.current().get("access_type") !== "SUPER ADMIN") {
            return { name: '403' }
          }
        },
        meta:{
          breadcrumb: [
            { name: 'EMPLOYEE', link: '/employees' },
            { name: 'EDIT EMPLOYEE ACCOUNT'}
          ]
        }
      },
      {
        path: "/evaluationins",
        name: "EvaluationInsView",
        component: EvaluationInsView,
        meta: {
          breadcrumb: [
            { name: 'EVALUATION Ins.' },
          ]
        }
      },
      {
        path: "/evaluationins/:id",
        name: "EvalFileView",
        component: EvalFileView,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'EDIT' }
          ]
        }
      },
      {
        path: "/evaluationins/add",
        name: "addevaluationins",
        component: AddEvaluationInsView,
        meta: {
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'ADD EVALUATION INs.' }
          ]
        }
      },
      {
        path: "/evaluationins/edit",
        name: "editevaluationins",
        component: EditEvaluationsView,
        beforeEnter: () => {
          if (Parse.User.current().get("access_type") !== "SUPER ADMIN" && Parse.User.current().get("access_type") !== "ADMIN" && Parse.User.current().get("access_type") !== "EDUCATION SUPERVISOR"){
            return { name: '403' }
          }
        },
        meta:{
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'EDIT EVALUATION INs.'}
          ]
        }
      },
      {
        path: "/reporting",
        name: "reporting",
        component: ReportingView,
        meta: {
          breadcrumb: [
            { name: 'REPORTING' },
          ]
        }
      },
      {
        path: "/app-settings",
        name: "app-settings",
        component: AppSettingsView,
        meta: {
          breadcrumb: [
            { name: 'APPLICATION SETTINGS' },
          ]
        }
      },

      {
        path: "/app-settings/add",
        name: "applicationType",
        component: AddApplicationView,
        meta: {
          breadcrumb: [
            { name: 'APPLICATION SETTINGS', link: '/app-settings' },
            { name: 'ADD APPLICATION TYPE' }
          ]
        }
      },
      {
        path: "/app-settings/edit/:appID",
        name: "EditEvalInstView",
        component: EditApplicationView,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'APPLICATION SETTINGS', link: '/app-settings' },
            { name: 'EDIT APPLICATION TYPE' }
          ]
        }
      },
      {
        path: "/app-settings/appTypeView",
        name: "AppTypeView",
        component: ApplicationTypeView,
        meta: {
          breadcrumb: [
            { name: 'APPLICATION SETTINGS', link: '/app-settings' },
            { name: 'VIEW' }
          ]
        }
      },
      {
        path: "/application/:appID",
        name: "StatusApplication",
        component: StatusApplication,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/application' },
            { name: 'Status' }
          ]
        }
      },
      {
        path: "/access-settings",
        name: "access-settings",
        component: AccessSettingsView,
        meta: {
          breadcrumb: [
            { name: 'SETTINGS' },
          ]
        }
      },
      {
        path: "/assignment",
        name: "assignment",
        component: rqatEvaluationView,
        meta: {
          breadcrumb: [
            { name: 'RQAT EVALUATION' },
          ]
        }
      },
      {
        path: "/designations",
        name: "designations",
        component: DesignationsView,
        meta: {
          breadcrumb: [
            { name: 'DESIGNATION' },
          ]
        }
      },
      {
        path: "/disciplines",
        name: "disciplines",
        component: DisciplineView,
        meta:{
          breadcrumb: [
            {name: 'DISCIPLINES'},
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
        meta: {
          breadcrumb: [
            { name: 'Home' },
          ]
        }
      },
      {
        path: "/HEIapply",
        name: "HEIapply",
        component: HEI_Apply,
        meta: {
          breadcrumb: [
            { name: 'Apply' },
          ]
        }
      },
      {
        path: "/HEIapplication",
        name: "HEIapplication",
        component: HEI_Application,
        meta: {
          breadcrumb: [
            { name: 'Application' },
          ]
        }
      },
      {
        path: "/HEIapplication/:id",
        name: "EditHEIapplication",
        component: Edit_HEI_Application,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/HEIapplication' },
            { name: 'Edit' }
          ]
        }
      },
      {
        path: "/HEIapplication/comply/:id",
        name: "ComplyApplication",
        component: Comply_HEI_Application,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/HEIapplication' },
            { name: 'Comply' }
          ]
        }
      },
      {
        path: "/HEIapplication/:id",
        name: "ForApprovalView",
        component: ForApprovalView,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/HEIapplication' },
            { name: 'View' }
          ]
        }
      },
      {
        path: "/account",
        name: "AccountDetails",
        component: AccountDetails,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Account Details', link: '/HEIapplication' },
            { name: 'View' }
          ]
        }
      },
    ]
  },
  {
    path: "/RQATPage",
    component: RQATViewLayout,
    children: [
      {
        path: "/assignments",
        name: "Assignments",
        component: rqatEvaluationView,
        meta: {
          breadcrumb: [
            { name: 'Assignments' },
          ]
        }
      },
      {
        path: "/assignments/:id",
        name: "Evaluate",
        component: rqatEvaluate,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Assignments', link: '/assignments' },
            { name: 'Evaluate' }
          ]
        }
      },
      {
        path: "/history",
        name: "History",
        component: rqatHistory,
        meta: {
          breadcrumb: [
            { name: 'History' },
          ]
        }
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


