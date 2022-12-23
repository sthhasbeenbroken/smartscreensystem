import { createStore } from 'vuex'

export default createStore({
  state: {
    flag: false, 
    house:{
      icon:'House',
      title:"首页概览",
      path:'/home',
    },
    menu: [
      
     {
       index: '1',
       icon: 'Picture',
       title: '素材管理',
       content:[{name:'素材列表',path:'/materiallist',icon:'DataBoard',index1:1}],
      
     },
     {
       index: '2',
       title: '节目制作与发布',
       icon:'SetUp',
       content:[{name:'发布节目',path:'/publishrogram',icon:'DataBoard',index1:1},{name: '发布公告',path: '/publishnotice',icon:'FolderChecked',index1:2}],
     },
     {
       index: '3',
       title: '计划管理',
       icon:'DataAnalysis',
       content:[{name:'计划列表',path:'/planlist',icon:'DataBoard',index1:1},{name: '计划审核',path: '/planexamine',icon:'FolderChecked',index1:2}],
     },
     {
       index:'4',
       title:'设备管理',
       icon:'Monitor',
       content:[{name:'设备列表',path:'/devicelist',icon:'DataBoard',index1:1},{name: '分组管理',path: '/groupmanage',icon:'Guide',index1:2}]
     },
     {
      index:'5',
      title:"系统管理",
      icon:'Setting',
      content:[{name:'账户管理',path:'/usermanage',icon:'User',index1:1},]
     },
 
   ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
