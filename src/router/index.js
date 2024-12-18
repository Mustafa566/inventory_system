import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/User/Profile.vue'
import Orders from '../views/User/Orders.vue'
import Accounts from '../views/Admin/Accounts.vue'
import ViewProducts from '../views/Products/ViewProducts.vue'
import AddProducts from '../views/Products/AddProducts.vue'
import Purchase from '../views/Products/Purchase.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/', 
    redirect: { name: 'Home' }
  },
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
    path: '/Orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/Accounts',
    name: 'Accounts',
    component: Accounts
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
  },
  {
    path: '/Purchase',
    name: 'Purchase',
    component: Purchase
  }
]

const router = new VueRouter({
 
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
