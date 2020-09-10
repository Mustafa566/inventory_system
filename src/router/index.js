import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Account/Profile.vue'
import Accounts from '../views/Admin/Accounts.vue'
import Update from '../views/Admin/Update.vue'
import ViewProducts from '../views/Products/ViewProducts.vue'
import AddProducts from '../views/Products/AddProducts.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/Accounts',
    name: 'Accounts',
    component: Accounts
  },
  {
    name: 'Update',
    path: '/Update/:id',
    component: Update,
    props: route => ({
      profileId: route.params.id // maps route param "id" to prop "profileId"
    })
  },
  {
    path: '/ViewProducts',
    name: 'ViewProducts',
    component: ViewProducts
  },
  {
    path: '/AddProducts',
    name: 'AddProducts',
    component: AddProducts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
