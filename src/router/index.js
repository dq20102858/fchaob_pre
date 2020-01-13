import Vue from 'vue'
import Router from 'vue-router'
import Design from '@/components/design/Design.vue'
import DesignDetail from '@/components/design/DesignDetail.vue'
import Home from '@/components/home/Home.vue'
import Login from '@/components/login/Login.vue'
import Register from '@/components/login/Register.vue'
import ForgetPassword from '@/components/login/ForgetPassword.vue'
import SysDetail from '@/components/design/SysDetail.vue'
import Transfer from '@/components/design/Transfer.vue'
import Test from '@/components/test.vue'

Vue.use(Router)

export const constantRoutes = [
 {
   path: '/login',
   name: 'login',
   component: Login
 },
 {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
   path: '/forgetPassword',
   name: 'forgetPassword',
   component: ForgetPassword
 },
 {
   path: '/test',
   name: 'test',
   component: Test
 },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
	 {
	     path: '/home',
	     name: 'home',
	     component: Home
	   },
	 {
	   path: '/design',
	   name: 'design',
	   component: Design
	 },
	 {
	   path: '/designDetail',
	   name: 'designDetail',
	   component: DesignDetail
	 },
  {
	   path: '/sysDetail',
	   name: 'sysDetail',
	   component: SysDetail
	 },
   {
	   path: '/transfer',
	   name: 'transfer',
	   component: Transfer
	 },
	 { path: '*', redirect: '/404', hidden: true }
  // 404 page must be placed at the end !!!

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
