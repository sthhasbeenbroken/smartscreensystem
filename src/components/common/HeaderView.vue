<template>
  <header id="topbar">
    <el-row>
      <el-col  class="topbar-left">
        <div class="titlehead">
        商用画屏发布系统
         </div>
        <el-breadcrumb separator="">
        <el-breadcrumb-item class="title" >{{state.active.title}}</el-breadcrumb-item> 
        <!-- <el-breadcrumb-item v-for="(item,index) in state.active.content" :key="index"  >       
          <span v-if="index==0&&item.item1!=null">{{item.item1}}</span>
          <span v-else>{{item.item2}}</span>
          </el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="(item,i) in state.active.content" :key="i">
         <span class="breakcrumb" v-if="state.index2==item.index1">{{item.name}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
     </el-col>
     
    </el-row>
      <div class="info"  @click="showUserinfo()">
        <span class="name">name</span>
        <img class="protrait" src="@/assets/logo.png">
        <transition name="fade">
            <div class="out" ref="out" v-if="state.login_flag" >  
              <el-menu
              menu-trigger="click" router
              text-color="#999"
              style="border-radius:5px;">  
              <el-menu-item title="机构ID:10731" style="padding:0px;margin-left:10px;height:36px"> 机构ID:10731
              </el-menu-item>
             <el-menu-item :index="exit" title="退出登录" style="padding:0px;margin-left:10px;height:36px" >退出登录
              </el-menu-item > 
              </el-menu>       
            </div>
          </transition>
      </div>
  </header>
</template>
<script setup>
import {useStore} from 'vuex';
import {computed, reactive,getCurrentInstance} from 'vue'
// import { useRouter } from 'vue-router';
let internalInstance = getCurrentInstance();
let $bus = internalInstance.appContext.config.globalProperties.$bus
const state = reactive({
    active:[],
    msg:"hi",
    index1:null,
    index2:null,
    login_flag:false,
})
// const router = useRouter();
const store = useStore();
const menu=computed(()=>store.state.menu);
const getIndex=()=>{
    $bus.$on('sendIndex',(data)=>{
       console.log(data)
        state.index1=data.index;
        state.index2=data.index1;
        state.active=menu.value[data.index-1]; 
        console.log(state.active)
    })
    $bus.$on('sendValue',(data)=>{
      //console.log(data)
      state.active=[];
       console.log(state.active)
      state.active.title=data;
      state.index2=0;
      console.log(state.active)
    })
   
}
const exit='/'

const showUserinfo=()=>{
  state.login_flag=!state.login_flag;
}
getIndex();
   
   
  
</script>
<style>
.topbar-left .el-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    font-weight: 400;
    color: white;
    /* cursor: text; */
}
.topbar-left .el-breadcrumb .el-breadcrumb__inner{
    font-size: 14px;
    line-height: 48px;
    margin-left: 18px;
    color: white;
}

.el-col-24{
    display: flex;
    height: 48px;
}

</style>
<style lang="scss" scoped>
#topbar {
  position: relative;
  z-index: 10;
  background-color: #292d3e;
   height: 48px;
  display: flex;
//   line-height: 80px;
  color: white;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.1);
}
.info{
  position: fixed;
  right: 18px;
  line-height: 54px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.protrait{
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.titlehead{
margin: 0;
padding: 0;
width: 209px;
height: 48px;
display: flex;
justify-content: center;
  background: #292d3e;
  color: white;
align-items: center;
font-weight: 600;
}
.breakcrumb{
  color: white;
}
.out {
  border-radius: 5%;
  font-size: 12px;
  position: fixed;
  height: 56px;
  top: 50px;
  right: 10px;
  color: #666;
  width: 110px;
  background-color: white;
 text-align: left;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  // padding: 16px;
  padding: 0;
 margin: 0;
  text-align: center;
}
.user .out ul {
  list-style: none;
}
.user .out ul > li {
  height: 20px;
  line-height: 26px;
}

</style>