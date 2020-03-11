import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SignIn from '../views/Authentication/SignIn'
import store from '../store/index'

import Admin from '../components/Admin/Nav.vue'
import AdminDashboard from '../views/Admin/Dashboard'
import AdminUsers from '../views/Admin/Users'
import AdminRegister from '../views/Admin/Register'
import AdminSetting from '../views/Admin/Setting'
Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/signin");
};


const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  beforeEnter: ifAuthenticated
},
{
  path: '/about',
  name: 'About',
  component: About,
  beforeEnter: ifAuthenticated
},
{
  path: '/signin',
  name: 'SignIn',
  component: SignIn,
  beforeEnter: ifNotAuthenticated
},
{
  path: '/admin',
  name: 'Admin',
  component: Admin,
  redirect: 'admin/dashboard',
  beforeEnter: ifAuthenticated,
  children: [
    {
      path: 'dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard
    },
    {
      path: 'users',
      name: 'AdminUsers',
      component: AdminUsers
    },
    {
      path: 'setting',
      name: 'AdminSetting',
      component: AdminSetting
    },
    {
      path: 'register',
      name: 'AdminRegister',
      component: AdminRegister
    },
  ]
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router