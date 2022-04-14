import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@ocrv/vue-tailwind-pagination/styles'
import Vuelidate from 'vuelidate'
import 'flowbite';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
//I move this line of codes in App.vue
// import Parse from 'parse'
// Parse.initialize("capp", "master");
// Parse.serverURL = 'http://localhost:1337/parse'

createApp(App).use(router).mount('#app');
createApp(App).use(Vuelidate);
createApp(App).use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    hideProgressBar: false,
    // Enqueueing prevent Duplicates
    filterToasts: toasts => {
        // Keep track of existing types
        const types = {};
        return toasts.reduce((aggToasts, toast) => {
          // Check if type was not seen before
          if (!types[toast.type]) {
            aggToasts.push(toast);
            types[toast.type] = true;
          }
          return aggToasts;
        }, []);
      },
    //   filterBeforeCreate: (toast, toasts) => {
    //     if (toasts.filter(
    //       t => t.type === toast.type
    //     ).length !== 0) {
    //       // Returning false discards the toast
    //       return false;
    //     }
    //     // You can modify the toast if you want
    //     return toast;
    //   }
});

