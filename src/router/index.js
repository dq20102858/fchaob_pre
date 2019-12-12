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

export default new Router({
  routes: [
	  {
	    path: '',
	    name: 'login',
	    component: Login
	  },
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
	}
  ]
})
