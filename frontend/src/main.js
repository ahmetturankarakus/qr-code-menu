// import { createApp } from 'vue'
// import App from './App.vue'
// const router = require('./router');
// createApp(App).use(router).mount('#app');


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
