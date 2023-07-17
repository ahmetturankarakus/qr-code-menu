import { createWebHashHistory, createRouter } from 'vue-router';

import RegisterUser from './components/RegisterUser.vue';
import UserMenu from './components/UserMenu.vue';
import AppBranch from './components/AppBranch.vue';
import AppCategory from './components/AppCategory.vue';
import AppProduct from './components/AppProduct.vue';
import UserQrCode from './components/UserQrCode.vue';

import App from './App.vue';

const routes = [
    { name: 'home', path: '/', component: App },
    { name: 'register', path: '/register/:id', component: RegisterUser, props: true },
    { name: 'menu', path: '/menu', component: UserMenu },
    { name: 'branch', path: '/branch', component: AppBranch },
    {name: 'category', path:'/category/:id',component:AppCategory,props:true},
    {name:'products',path:'/products',component:AppProduct},
    {name:'qr-code',path:'/qr-code/:id',component:UserQrCode,props:true}
];
const router = createRouter(
    {
        history: createWebHashHistory(), routes
    }
)
export default router;
