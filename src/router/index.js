import Vue from 'vue'
import Router from 'vue-router'
import Design from '@/components/design/Design'
import DesignDetail from '@/components/design/DesignDetail'
import Home from '@/components/Home'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
	  {
	    path: '',
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
