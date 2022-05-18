import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "../views/LandingView.vue";
import CHEDViewLayout from "../layout/CHEDViewLayout.vue";
import HEIViewLayout from "../layout/HEIViewLayout.vue";
import RQATViewLayout from "../layout/RQATViewLayout.vue";

import chedAccountDetails from '../views/CHED/AccountDetails.vue';
import CHED_HomeView from "../views/CHED/CHED_HomeView.vue";
import ApplicationView from "../views/CHED/Application/ApplicationView.vue";
import EvaluateView from "../views/CHED/EvaluationFile/Evaluate.vue";

import HeiView from "../views/CHED/Hei/HeiView.vue";
import UploadExcel from '../views/CHED/Hei/UploadExcel.vue';
import AddHeiView from "../views/CHED/Hei/AddHeiView.vue";
import EditHeiView from "../views/CHED/Hei/EditHeiView.vue"

import RqatView from "../views/CHED/Rqat/RqatView.vue";
import UploadExcelRqat from '../views/CHED/Rqat/UploadExcel.vue';
import AddRQATView from "../views/CHED/Rqat/AddRQATView.vue";
import EditRQATView from "../views/CHED/Rqat/EditRQATView.vue"

import EmployeesView from "../views/CHED/Employees/EmployeesView.vue";
import AddEmployeeView from "../views/CHED/Employees/AddEmployeeView.vue";
import UploadExcelEmployees from '../views/CHED/Employees/UploadExcel.vue';
import EditEmployeeView from "../views/CHED/Employees/EditEmployeeView.vue";

import EvaluationInsView from "../views/CHED/Evaluation/EvaluationInsView.vue";
import EvalFileView from "../views/CHED/Evaluation/EvalFileView.vue";
import AddEvaluationInsView from "../views/CHED/Evaluation/AddEvaluationInsView.vue";
import EditEvaluationsView from "../views/CHED/Evaluation/EditEvaluationsView.vue"

import CMOView from "../views/CHED/CMO/CMOView.vue";
import CMOFileView from "../views/CHED/CMO/CMOFileView.vue";
import AddCMOView from "../views/CHED/CMO/AddCMOView.vue";
import EditCMOView from "../views/CHED/CMO/EditCMOView.vue"

import ReportingView from "../views/CHED/Reporting/ReportingView.vue";

import HEI_Application from "../views/HEI/HEI_Application.vue";
import HEI_Apply from "../views/HEI/HEI_Apply.vue";
import HEI_Home from "../views/HEI/HEI_Home.vue";
import Edit_HEI_Application from '../views/HEI/EditApplication.vue';
import Comply_HEI_Application from '../views/HEI/ComplyApplication.vue';
import Payment_HEI_Application from '../views/HEI/ForPaymentView.vue';
import AccountDetails from '../views/HEI/AccountDetails.vue';
// import ForApprovalView from '../views/HEI/ForApprovalView.vue';


import AccessSettingsView from '../views/CHED/AccessSettings/AccessSettingsView.vue';
import AppSettingsView from '../views/CHED/AppSettings/AppSettingsView.vue';
import AddApplicationView from '../views/CHED/AppSettings/AddApplicationTypeView.vue';
import EditApplicationView from '../views/CHED/AppSettings/EditApplicationTypeView.vue';
import ApplicationTypeView from '../views/CHED/AppSettings/AppTypeView.vue';

import DisciplineView from '../views/CHED/Disciplines/DisciplinesView.vue';
import AddDisciplineView from '../views/CHED/Disciplines/AddDisciplineView.vue';
import EditDisciplineView from '../views/CHED/Disciplines/EditDisciplineView.vue';
import UploadExcelDisciplines from '../views/CHED/Disciplines/UploadExcel.vue';

import ProgramView from '../views/CHED/Programs/ProgramsView.vue';
import UploadExcelPrograms from '../views/CHED/Programs/UploadExcel.vue';


import DesignationsView from '../views/CHED/Designations/DesignationsView.vue';
import UploadExcelDesignations from '../views/CHED/Designations/UploadExel.vue';
import HeiTypesView from '../views/CHED/HeiTypes/HeiTypeView.vue';
import UploadExcelHeiType from '../views/CHED/HeiTypes/UploadExcel.vue';


import rqatEvaluationView from '../views/RQAT/rqatEvalView.vue';
import rqatEvaluate from '../views/RQAT/rqatEvaluate.vue';
import rqatHistory from '../views/RQAT/rqatHistory.vue';
import rqatAccountDetails from '../views/RQAT/AccountDetails.vue';

import appNotifView from '../views/CHED/AppNotification/AppNotifView.vue';

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
        path: "/notif",
        name: "appNotifView",
        component: appNotifView,
        meta: {
          breadcrumb: [
            { name: 'Inbox' },
          ]
        }
      },
      {
        path: "/ched/account",
        name: "chedAccountDetails",
        component: chedAccountDetails,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Account Details' }
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
        path: "/application/:status=:appID",
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
        path: "/application/evaluate=:appID",
        name: "EvaluateView",
        component: EvaluateView,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/application' },
            { name: 'Evaluate' }
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
        path: "/hei/edit=:heiID",
        name: "EditHeiView",
        component: EditHeiView,
        props: true,
        meta:{
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'EDIT HEI ACCOUNT'}
          ]
        }
      },
      {
        path: "/hei/upload",
        name: "uploadExcel",
        component: UploadExcel,
        meta: {
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'UPLOAD EXCEL' }
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
        path: "/rqat/upload",
        name: "uploadExcelRqat",
        component: UploadExcelRqat,
        meta: {
          breadcrumb: [
            { name: 'RQAT', link: '/rqat' },
            { name: 'UPLOAD EXCEL' }
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
        path: "/rqat/edit=:rqatID",
        name: "EditRQATView",
        props: true,
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
        path: "/employees/upload",
        name: "uploadExcelExmployees",
        component: UploadExcelEmployees,
        meta: {
          breadcrumb: [
            { name: 'EMPLOYEE', link: '/employees' },
            { name: 'UPLOAD EXCEL' }
          ]
        }
      },
      {
        path: "/employees/edit=:empID",
        name: "EditEmployeeView",
        component: EditEmployeeView,
        props: true,
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
        path: "/evaluationins/view=:id",
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
        path: "/evaluationins/edit=:id",
        name: "EditEvalInstView",
        component: EditEvaluationsView,
        props: true,
        meta:{
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'EDIT EVALUATION INs.'}
          ]
        }
      },
      {
        path: "/cmo",
        name: "CMOView",
        component: CMOView,
        meta: {
          breadcrumb: [
            { name: 'Ched Memorandum Order'}
          ]
        }
      },
      {
        path: "/CMO/view=:id",
        name: "CMOFileView",
        component: CMOFileView,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Ched Memorandum Order', link: '/cmo' },
            { name: 'VIEW' }
          ]
        }
      },
      {
        path: "/cmo/add",
        name: "addcmo",
        component: AddCMOView,
        meta: {
          breadcrumb: [
            { name: 'Ched Memorandum Order', link: '/cmo' },
            { name: 'ADD CMO' }
          ]
        }
      },
      {
        path: "/cmo/edit=:id",
        name: "EditCMOView",
        component: EditCMOView,
        props: true,
        meta:{
          breadcrumb: [
            { name: 'Ched Memorandum Order', link: '/cmo' },
            { name: 'EDIT CMO' }
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
        path: "/app-settings/edid=:appID",
        name: "EditAppTypeView",
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
        path: "/app-settings/view",
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
        path: "/designations/upload",
        name: "uploadExcelDesignations",
        component: UploadExcelDesignations,
        meta: {
          breadcrumb: [
            { name: 'DESIGNATION', link: '/designations' },
            { name: 'UPLOAD EXCEL' }
          ]
        }
      },
      {
        path: "/heiTypes",
        name: "heiTypes",
        component: HeiTypesView,
        meta: {
          breadcrumb: [
            { name: 'HEI TYPES' },
          ]
        }
      },
      {
        path: "/heiTypes/upload",
        name: "uploadExcelHeiTypes",
        component: UploadExcelHeiType,
        meta: {
          breadcrumb: [
            { name: 'HEI TYPES', link: '/heiTypes' },
            { name: 'UPLOAD EXCEL' }
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
      {
        path: "/disciplines/add",
        name: "adddisciplines",
        component: AddDisciplineView,
        meta:{
          breadcrumb: [
            { name: 'DISCIPLINES', link: "/disciplines/add" },
            {name: 'ADD DISCIPLINES'},
          ]
        }
      },
      {
        path: "/disciplines/edit=:id",
        name: "EditDisciplinesView",
        component: EditDisciplineView,
        props: true,
        meta:{
          breadcrumb: [
            { name: 'DISCIPLINES', link: "/disciplines/add" },
            {name: 'EDIT DISCIPLINES'},
          ]
        }
      },
      {
        path: "/disciplines/upload",
        name: "uploadExcelDisciplines",
        component: UploadExcelDisciplines,
        meta: {
          breadcrumb: [
            { name: 'DISCIPLNES', link: '/disciplines' },
            { name: 'UPLOAD EXCEL' }
          ]
        }
      },
      {
        path: "/programs/upload",
        name: "uploadExcelPrograms",
        component: UploadExcelPrograms,
        meta: {
          breadcrumb: [
            { name: 'PROGRAMS', link: '/programs' },
            { name: 'UPLOAD EXCEL' }
          ]
        }
      },
      {
        path: "/programs",
        name: "programs",
        component: ProgramView,
        meta:{
          breadcrumb: [
            {name: 'PROGRAMS'},
          ]
        }
      },
    ]
  },
  {
    path: "/HEIPage ",
    component: HEIViewLayout,
    children: [
      {
        path: "/hei/home",
        name: "HEIhome",
        component: HEI_Home,
        meta: {
          breadcrumb: [
            { name: 'Home' },
          ]
        }
      },
      {
        path: "/hei/apply",
        name: "HEIapply",
        component: HEI_Apply,
        meta: {
          breadcrumb: [
            { name: 'Apply' },
          ]
        }
      },
      {
        path: "/hei/application",
        name: "HEIapplication",
        component: HEI_Application,
        meta: {
          breadcrumb: [
            { name: 'Application' },
          ]
        },
      },
      {
        path: "/hei/application/revise=:id",
        name: "EditHEIapplication",
        component: Edit_HEI_Application,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: "/hei/application" },
            { name: 'Edit' }
          ]
        }
      },
      {
        path: "/hei/application/comply=:id",
        name: "ComplyApplication",
        component: Comply_HEI_Application,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: "/hei/application" },
            { name: 'Comply' }
          ]
        }
      },
      {
        path: "/hei/application/payment=:id",
        name: "PaymentApplication",
        component: Payment_HEI_Application,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: "/hei/application" },
            { name: 'Payment' }
          ]
        }
      },
      // {
      //   path: "/hei/application/:id",
      //   name: "ForApprovalView",
      //   component: ForApprovalView,
      //   props: true,
      //   meta: {
      //     breadcrumb: [
      //       { name: 'Application', link: "/hei/application" },
      //       { name: 'View' }
      //     ]
      //   }
      // },
      {
        path: "/hei/account",
        name: "AccountDetails",
        component: AccountDetails,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Account Details', link: "/hei/application" },
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
        path: "/rqat/assignments",
        name: "Assignments",
        component: rqatEvaluationView,
        meta: {
          breadcrumb: [
            { name: 'Assignments' },
          ]
        }
      },
      {
        path: "/rqat/assignments/evaluate=:id",
        name: "Evaluate",
        component: rqatEvaluate,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Assignments', link: '/rqat/assignments' },
            { name: 'Evaluate' }
          ]
        }
      },
      {
        path: "/rqat/history",
        name: "rqatEvaluationHistory",
        component: rqatHistory,
        meta: {
          breadcrumb: [
            { name: 'History' },
          ]
        }
      },
      {
        path: "/rqat/account",
        name: "rqatAccountDetails",
        component: rqatAccountDetails,
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Account Details', link: "/rqat/applications" },
            { name: 'View' }
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
