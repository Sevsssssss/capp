import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@ocrv/vue-tailwind-pagination/styles'



//I move this line of codes in App.vue
// import Parse from 'parse'
// Parse.initialize("capp", "master");
// Parse.serverURL = 'http://localhost:1337/parse'

createApp(App).use(router).mount('#app');


