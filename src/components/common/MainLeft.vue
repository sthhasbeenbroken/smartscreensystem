<template>
<div></div>
  <div id="left">
    <el-menu
      active-text-color="#98AFC7"
      text-color="#FFFFFF"
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="flag"
      background-color="#292d3e"
      menu-trigger="click" router>
      <el-menu-item  @click="handleHomeTitle(house.title)" :index="house.path">
      <template v-slot:title>
          <div class="left-width">
           <el-icon>
            <component :is="house.icon"></component>
           </el-icon>
            <span  class="title">{{house.title}}</span>
          </div>
        </template>
      </el-menu-item>
      <el-sub-menu v-for="(item,index) in menu" :index='item.index' :key="index">
        <template v-slot:title>
          <div class="left-width">
           <el-icon>
            <component :is="item.icon"></component>
           </el-icon>
            <span  class="title">{{item.title}}</span>
          </div>
        </template>
        <el-menu-item-group v-for="(list,index1) in item.content" :key="index1">
          <el-menu-item @click="handleTitle(item.index,list.index1)" :index="list.path" v-if="list.name!= null">
            <el-icon>
            <component :is="list.icon"></component>
           </el-icon>
            {{list.name}}
            </el-menu-item>
          <!-- <el-menu-item @click="handleTitle(item.index,list.index1)" :index="list.path" v-if="list.item2 != null">
          <el-icon>
            <component :is="list.icon"></component>
           </el-icon>
            {{list.item2}}
          </el-menu-item> --> 
        </el-menu-item-group>
      </el-sub-menu>  
    </el-menu>
  </div>
</template>
<script setup>
// import { reactive, toRef } from '@vue/reactivity';
import {useStore} from 'vuex';
import {computed, getCurrentInstance} from 'vue' ;
 import { useRouter } from 'vue-router';
let internalInstance = getCurrentInstance();
let $bus = internalInstance.appContext.config.globalProperties.$bus
    const store=useStore();
     const route=useRouter();
    const  handleTitle=(index,index1)=> {
      let obj = {
        index:index,
        index1:index1
      }
      $bus.$emit('sendIndex',obj)
      // console.log(index,index1)
    };

    const handleHomeTitle=(value)=>{     
      $bus.$emit('sendValue',value)
      // route.push('/home')
      console.log(value)
    }
    const menu=computed(()=>store.state.menu);
    const flag=computed(()=>store.state.flag); 
    const house=computed(()=>store.state.house);
</script>
<style>

</style>
<style lang="scss" scoped>
::v-deep .el-menu{
  border: none;
  width: 209px;
}
.left-width .title{
  padding: 2px 2px 0 2px;
}
.titlehead{
  height: 35px;
  align-content: center;
  line-height: 35px;
  background: #292d3e;
  color: white;
  width: 209px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 697px;
  min-width: 20px;
}

</style>