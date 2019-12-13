import Vue from 'vue'
import Router from 'vue-router'
import Design from '@/components/design/Design.vue'
import DesignDetail from '@/components/design/DesignDetail.vue'
import Home from '@/components/home/Home.vue'
import Login from '@/components/login/Login.vue'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export const constantRoutes = [
 {
   path: '/login',
   name: 'login',
   component: Login
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
 
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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


