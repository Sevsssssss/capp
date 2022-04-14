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
});

