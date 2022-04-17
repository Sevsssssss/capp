import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "../views/LandingView.vue";
import CHEDViewLayout from "../layout/CHEDViewLayout.vue";
import HEIViewLayout from "../layout/HEIViewLayout.vue";
import CHED_HomeView from "../views/CHED/CHED_HomeView.vue";
import ApplicationView from "../views/CHED/Application/ApplicationView.vue";

import HeiView from "../views/CHED/Hei/HeiView.vue";
import UploadCSV from '../views/CHED/Hei/UploadCSV.vue'
import AddHeiView from "../views/CHED/Hei/AddHeiView.vue";

import RqatView from "../views/CHED/Rqat/RqatView.vue";
import AddRQATView from "../views/CHED/Rqat/AddRQATView.vue";
import EmployeesView from "../views/CHED/Employees/EmployeesView.vue";
import AddEmployeeView from "../views/CHED/Employees/AddEmployeeView.vue";
import EvaluationInsView from "../views/CHED/Evaluation/EvaluationInsView.vue";
import EvalFileView from "../views/CHED/Evaluation/EvalFileView.vue";
import AddEvaluationInsView from "../views/CHED/Evaluation/AddEvaluationInsView.vue";
import ReportingView from "../views/CHED/Reporting/ReportingView.vue";
import HEI_Application from "../views/HEI/HEI_Application.vue";
import HEI_Apply from "../views/HEI/HEI_Apply.vue";
import HEI_Home from "../views/HEI/HEI_Home.vue";
import Edit_HEI_Application from '../views/HEI/EditApplication.vue';
import AccessTypesView from '../views/CHED/AccessSettings/AccessSettingsView.vue';
import AppTypesView from '../views/CHED/AppSettings/AppSettingsView.vue';
import AddApplicationView from '../views/CHED/AppSettings/AddApplicationTypeView.vue';
import ApplicationTypeView from '../views/CHED/AppSettings/AppTypeView.vue';
import DesignationsView from '../views/CHED/Designations/DesignationsView.vue';

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
        beforeEnter: (to) => {
          if (!checkHomeType(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            { name: 'ADD HEI ACCOUNT' }
          ]
        }
      },
      {
        path: "/hei/upload",
        name: "uploadCSV",
        component: UploadCSV,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'RQAT', link: '/rqat' },
            { name: 'ADD RQAT ACCOUNT' }
          ]
        }
      },
      {
        path: "/employees",
        name: "employees",
        component: EmployeesView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'EMPLOYEE', link: '/employees' },
            { name: 'ADD EMPLOYEE ACCOUNT' }
          ]
        }
      },
      {
        path: "/evaluationins",
        name: "evaluationins",
        component: EvaluationInsView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'EVALUATION Ins.' },
          ]
        }
      },
      {
        path: "/evaluationins/view",
        name: "evaluationinsfile",
        component: EvalFileView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'EVALUATION Ins.', link: '/evaluationins' },
            { name: 'ADD EVALUATION INs.' }
          ]
        }
      },
      {
        path: "/reporting",
        name: "reporting",
        component: ReportingView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'REPORTING' },
          ]
        }
      },
      {
        path: "/app-settings",
        name: "app-settings",
        component: AppTypesView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'APPLICATION SETTINGS', link: '/app-settings' },
            { name: 'ADD APPLICATION TYPE' }
          ]
        }
      },
      {
        path: "/app-settings/appTypeView",
        name: "AppTypeView",
        component: ApplicationTypeView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        component: AccessTypesView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'SETTINGS' },
          ]
        }
      },
      {
        path: "/designations",
        name: "Designations",
        component: DesignationsView,
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        meta: {
          breadcrumb: [
            { name: 'DESIGNATIONS' },
          ]
        }
      },
    ]
  },
  {
    path: "/HEIPage",
    component: HEIViewLayout,
    beforeEnter: (to) => {
      if (!checkHomeType(to)) {
        return { name: '403' }
      }
    },
    children: [
      {
        path: "/HEIhome",
        name: "HEIhome",
        component: HEI_Home,
        beforeEnter: (to) => {
          if (!checkHomeType(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
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
        beforeEnter: (to) => {
          if (!hasPermission(to)) {
            return { name: '403' }
          }
        },
        props: true,
        meta: {
          breadcrumb: [
            { name: 'Application', link: '/HEIapplication' },
            { name: 'Edit' }
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


function hasPermission(to) {
  console.log('hi');
  const at = getAccessType();
  // for (var i = 0; i < at.get('privileges').length; i++) {
  //   if (at[0].get('privileges')[i] === to.path) {

  //     console.log('yes')
  //     t();
  //   }

  // }
  at.then((at) => {
    var accType = at[0].get('privileges');
    // console.log(accType);
    for (var i = 0; i < accType.length; i++) {
      if (accType[i] === to.path) {

        return true;
        // t();
      }

    }
    return false;
  })
  console.log(to);
  // f();
  // console.log(to.path)
  // function t(){
  //   return true;
  // }
  // function f(){
  //   return false;
  // }

}

async function getAccessType() {
  const AccessTypes = Parse.Object.extend("AccessTypes");
  const query = new Parse.Query(AccessTypes);
  query.equalTo('name', Parse.User.current().get('access_type'))

  const querResult = await query.find();
  return querResult;
}
// var o ='';
async function checkHomeType(to) {
  console.log('OHAYU')
  const AccessTypes = Parse.Object.extend("AccessTypes");
  const query = new Parse.Query(AccessTypes);
  query.equalTo('name', Parse.User.current().get('access_type'))

  // const querResult = await query.find();
  await query.find().then((hometype) => {
    if (hometype[0].get('hometype') === to.path) {
      console.log('he')
      return true;
    } else {
      console.log('ehh')
      return false;
    }
  })


}

// function checkHomeType(to){
//   var name = to.path;
//   const AccessTypes = Parse.Object.extend("AccessTypes");
//   const query = new Parse.Query(AccessTypes);
//   query.equalTo('name', Parse.User.current().get('access_type'))

//   query.find().then((querResult, this.name) => {
//     if (querResult[0].get('hometype') === to.path) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   })

// }

export default router

