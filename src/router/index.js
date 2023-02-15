import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/home/Login'
import Index from '@/home/Index'
import BasicSet from '@/home/BasicSet'
import Scrdata from '@/home/Scrdata'
import AddSc from '@/home/AddSc'
import Category from '@/home/Category'
import Dm from '@/home/Dm'
import Addm from '@/home/Addm'
import Dmdata from '@/home/Dmdata'
import EditDm from '@/home/EditDm'
import Dmbook from '@/home/Dmbook'
import EditBook from '@/home/EditBook'
import Book from '@/home/Book'
import Shop from '@/home/Shop'
import Shopdata from '@/home/Shopdata'
import AddShop from '@/home/AddShop'
import ScriptDataApi from '@/home/ScriptDataApi'
// import { component } from 'vue/types/umd'
import admin_login from '@/admin/login/Login.vue'
Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const user = {
  path: '/',
  name: 'index',
  component: Index,
  meta: {
    needLogin: true
  },
  children: [{
      path: '/alldata',
      name: 'alldata',
      component: (_) => import('@/home/Alldata.vue'),
      meta: {
        needLogin: true
      },
    },
    {
      path: '/set',
      name: 'basicset',
      component: BasicSet,
      meta: {
        needLogin: true
      },
    },
    {
      path: '/dm',
      name: 'dm',
      component: Dm,
      meta: {
        needLogin: true
      },
      children: [{
          path: '/addm',
          name: 'addm',
          component: Addm,
          meta: {
            needLogin: true
          },
        },
        {
          path: '/dmdata',
          name: 'dmdata',
          component: Dmdata,
          meta: {
            needLogin: true
          },
        },
        {
          path: '/editdm',
          name: 'editdm',
          component: EditDm,
          meta: {
            needLogin: true
          },
        },
        {
          path: '/dmbook',
          name: 'dmbook',
          component: Dmbook,
          meta: {
            needLogin: true
          },
        }
      ]
    }, {
      path: '/book',
      name: 'book',
      component: Book,
      children: [{
          path: '/script',
          name: 'script',
          component: Scrdata,
          meta: {
            needLogin: true
          },
        },
        {
          path: '/editbook',
          name: 'editbook',
          component: EditBook,
          meta: {
            needLogin: true
          },
        },{
          path: '/addbook',
          name: 'addbook',
          component: () => import('@/home/AddSc.vue'),
          meta: {
            needLogin: true
          },
        }
      ]
    }, {
      path: '/bookuser',
      name: 'bookuser',
      component: () => import('@/home/BookUser.vue'),
      children: [{
          path: '/seescript',
          name: 'seescript',
          component: () => import('@/home/SeeBook.vue'),
          meta: {
            needLogin: true
          },
        },
        {
          path: '/add',
          name: 'addsc',
          component: () => import('@/home/ImportScript.vue'),
          meta: {
            needLogin: true
          },
        }
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      component: Category,
      meta: {
        needLogin: true
      },
    }, {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta: {
        needLogin: true
      },
      children: [{
        path: '/shopdata',
        name: 'shopdata',
        component: Shopdata,
        meta: {
          needLogin: true
        },
      }, {
        path: '/addshop',
        name: 'addshop',
        component: AddShop,
        meta: {
          needLogin: true
        },
      }, {
        path: '/editshop',
        name: 'editshop',
        component: ()=>import('@/home/EditShop.vue'),
        meta: {
          needLogin: true
        },
      }]
      
    }, {
      path: '/user',
      name: 'wxuser',
      component: (_) => import('@/home/Wxuser.vue'),
      children: [{
        path: '/userdata',
        name: 'userdata',
        component: (_) => import('@/home/Userdata.vue'),
        meta: {
          needLogin: true
        },
      },{
        path: '/edituser',
        name: 'edituser',
        component: (_) => import('@/home/EditUser.vue'),
        meta: {
          needLogin: true
        },
      }]
    }, {
      path: '/grouping',
      name: 'grouping',
      component: (_) => import('@/home/Grouping.vue'),
      children: [{
        path: '/groupingdata',
        name: 'groupingdata',
        component: (_) => import('@/home/gr/a.vue'),
        meta: {
          needLogin: true
        },
      }, {
        path: '/grouping/editgrouping',
        name: 'editgrouping',
        component: (_) => import('@/home/gr/editgrouping.vue'),
        meta: {
          needLogin: true
        },
      }, {
        path: '/noaudit',
        name: 'noaudit',
        component: (_) => import('@/home/gr/b.vue'),
        meta: {
          needLogin: true
        },
      }]

    }, {
      path: '/smallcon',
      name: 'smallcon',
      component: (_) => import('@/home/SmallCon.vue'),
      meta: {
        needLogin: true
      },
      children: [{
        path: '/mokuai',
        name: 'mokuai',
        component: (_) => import('@/home/a/mokuai.vue'),
        meta: {
          needLogin: true
        },
      }, {
        path: '/b',
        name: 'b',
        component: (_) => import('@/home/a/b.vue'),
        meta: {
          needLogin: true
        },
      }]
    },
    {
      path: '/vipprice',
      name: 'vipprice',
      component: (_) => import('@/home/vip.vue'),
      meta: {
        needLogin: true
      },
    },
    {
      path: '/active',
      name: 'active',
      component: (_) => import('@/home/actives/index.vue'),
      meta: {
        needLogin: true
      },
      children: [{
        path: '/activedata',
        name: 'activedata',
        component: (_) => import('@/home/actives/all.vue'),
        meta: {
          needLogin: true
        },
      },{
        path: '/addactive',
        name: 'addactive',
        component: (_) => import('@/home/actives/addactive.vue'),
        meta: {
          needLogin: true
        },
      }]
    },
    {
      path: '/opinion',
      name: 'opinion',
      component: (_) => import('@/home/opinion/index.vue'),
      meta: {
        needLogin: true
      },
    }
  ]
}

const admin = {
  path: '/admin/index',
  name: 'admin_index',
  component: () => import('@/admin/index/index.vue'),
  meta: {
    needAdminLogin: true
  },
  children: [{
      path: '/admin/index/control',
      name: 'control',
      component: () => import('@/admin/control/control.vue'),
      meta: {
        needAdminLogin: true
      },
    },
    {
      path: '/admin/index/shop',
      name: 'admin_shop',
      component: () => import('@/admin/shop/shop.vue'),
      meta: {
        needAdminLogin: true
      },
    },
    {
      path: '/admin/index/addshop',
      name: 'admin_add_shop',
      component: () => import('@/admin/shop/addshop.vue'),
      meta: {
        needAdminLogin: true
      },
    },
    {
      path: '/admin/script/gather',
      name: 'gather',
      component: () => import('@/admin/script/gather.vue'),
      meta: {
        needAdminLogin: true
      },
    }, {
      path: '/admin/shop/editShop',
      name: 'editShop',
      component: () => import('@/admin/shop/editShop.vue'),
      meta: {
        needAdminLogin: true
      },
    },
  ]
}
export default new Router({
  mode: 'history',
  routes: [user, admin, {
      path: '/login',
      name: "Login",
      component: Login,
    }, {
      path: '/scriptdk',
      name: 'scriptdk',
      component: ScriptDataApi
    },
    {
      path: '/admin/login',
      name: "admin_login",
      component: admin_login
    }
  ]
})
