import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../components/common/IndexView.vue'

const routes = [
  {
      path:'/',
      name:'login',
      component:()=>import('@/components/common/LoginView')
  },

  {
    path: '/index',
    name: 'index',
    component: index,
    children:[
      {
        path:'/home',
        name:'home',
        component: () => import('@/views/HomeView')
      },
      { name:'materiallist',
        path:'/materiallist',
        component:()=>import('@/views/MaterialList')
      },
      {
        path:'/publishrogram',
        component:()=>import('@/views/ProPub')
      },
      {
        path:'/publishnotice',
        component:()=>import('@/views/NoticePub')
      },
      {
        path:'/planlist',
        component:()=>import('@/views/PlanList')
      },
      {
        path:'/planexamine',
        component:()=>import('@/views/PlanJudge')
      },
    
      {
        path:'/devicelist',
        component:()=>import('@/views/DeviceList')
      },
      {
        path:'/groupmanage',
        component:()=>import('@/views/GroupMng')
      },
      {
        path:'/usermanage',
        component:()=>import('@/views/UserView')
      },
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
