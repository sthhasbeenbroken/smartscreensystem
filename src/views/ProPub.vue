<template>
    <div>
        <div class="nvg">
          <el-form inline="true">
            <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="节目名称:">
                    <el-input  placeholder="请输入计划名称" v-model="proform.pro_name"/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="分辨率:">
                    <el-select v-model="proform.device">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="节目状态:">
                    <el-select v-model="proform.status">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            </el-row>
            <el-row>
             <el-col :span="16" class="btn">
            <el-form-item>              
                <el-button  @click="onSubmit">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>            
            </el-form-item>
            </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="add">
             <el-button type="primary" @click="dialogVisible = true">新建计划</el-button>
              <el-button type="primary" @click="dialogVisible = true">批量发布</el-button>
             <el-button class="adduser" @click="dialogVisible = true">批量删除</el-button>
        </div>
        <div class="main">
            <el-table :data="programlist" 
            :row-style="{height:48+'px'}"           
            >
            <el-table-column type="selection" width="40"/>
              <el-table-column label="缩略图" width="80"  >
                <template #default="scope">
                    <el-image  style="width: 48px; height: 48px" 
                    preview-teleported="true"
                    :preview-src-list="srclist"
                    :src="scope.row.programmeThumbnail"
                    alt="" :fit="fill" >
                    </el-image>
                </template>
              </el-table-column>
              <el-table-column property="programmeName" label="节目名称" width="200" />
              <el-table-column property="programmeRes" label="分辨率"  width="150"/>
              <el-table-column property="programmeLasting"   label="节目时长"  width="120"/>
              <el-table-column property="programmeSize"   label="节目大小"  width="120"/>
              <el-table-column property="programmeStatus" label="节目状态"  width="160"/>
              <el-table-column property="userId" label="作者"  width="120"/>
            
              <el-table-column property="programmeModifyTime" label="更新时间"  width="129"/>
              <el-table-column label="操作"  width="160">
                <template #default>
                    <el-button link type="primary" >详情</el-button>
                    <el-button link type="primary"  @click="handleClick">修改</el-button>
                     <el-button link type="primary" >复制</el-button>
                    <el-button link type="primary" >删除</el-button>
                </template>
             </el-table-column>
            </el-table>
        </div>
        <div class="footer">

        </div>
    <el-dialog
      title="新建节目"
      v-model="dialogVisible"
      width="80%"
      
      :before-close="handleClose">
      <div class="adduserdialog">
        
        <el-form ref="form" :model="addproform" label-width="100px">
        <div class="top">
            <div class="left">
         
          <el-form-item label="节目名称:">
            <el-input v-model="addproform.programmeName" placeholder="请输入节目名称"></el-input>
          </el-form-item>
          
       

          <el-form-item label="分辨率:"
          >
           <el-select v-model="addproform.programmeRes">
                    <el-option label="1920*1080" value="1920*1080" />
                    <el-option label="1080*1920" value="1080*1920" />
           </el-select>
          </el-form-item>
            </div>
            <div class="right">
                <el-scrollbar max-height="400px" v-if="imglist">
                    <el-input v-model="urll"></el-input>
                    <el-image :src="item.materialUrl" v-for="(item,index) in imglist" :key="index">
                       
                    </el-image>
                    
                </el-scrollbar>
            </div>
        </div>
            <div class="main">
             <div class="nvg2">
             <el-row>
                <el-col>          
                    <el-breadcrumb :separator-icon="ArrowRight" >
                     <el-breadcrumb-item>         
                        <el-icon :size="20"><Folder /></el-icon>
                        <span>全部</span>
                     </el-breadcrumb-item>
                     <el-breadcrumb-item v-if="radio1!='全部'">
                        {{radio1}}
                     </el-breadcrumb-item>
                     </el-breadcrumb>            
                </el-col>
             </el-row>
            <el-row>
                <el-col :span="24" @click="openfolderflag=false">
                    <el-radio-group v-model="radio1" >
                    <el-radio label="全部" size="large">全部</el-radio>
                    <el-radio label="图片" size="large">图片</el-radio>
                    <el-radio label="视频" size="large">视频</el-radio>
                    <el-radio label="音频" size="large">音频</el-radio>
                    <el-radio label="艺术" size="large">艺术</el-radio>
                    <el-radio label="党建" size="large">党建</el-radio>
                    </el-radio-group>
                </el-col>         
               
            </el-row> 
            </div>
            <div class="materiallist" v-if="!openfolderflag" >
                 <!-- <van-uploader :after-read="afterRead" /> -->
                <el-scrollbar max-height="400px">
                    <el-row>
       
                        <el-col  @click="oncheck(index)"  @mouseleave="item.enter=false"  @mouseenter="item.enter=true" :span="3" v-for="(item,index) in foldlist" :key="index">                      
                         <el-button  v-if="item.chosen" class="checkbtn" type="primary" :icon="Check" size="small" circle />
                        <el-image  :src="require('@/assets/doc.png')"></el-image>
                         <div>
                            <span>{{item.collectionsName}}</span>
                        </div>
                        <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        v-if="item.enter"
                        >        
                            <el-menu-item index="1"  @click="openfolder(),getmateriallist(materialbelong_id)">打开</el-menu-item>
                            <el-menu-item index="2">重命名</el-menu-item>
                            <el-menu-item index="3">删除</el-menu-item>                          
                        </el-menu>
                        </el-col>
                    </el-row>
                </el-scrollbar>
            </div>
        <div class="materiallist" v-if="openfolderflag" style="height:400px">
                 <!-- <van-uploader :after-read="afterRead" /> -->
                <el-scrollbar max-height="400px">
                    <el-row>
                       
                        <el-col  @click="materialoncheck(index)"  
                        @mouseleave="item.enter=false"  
                        @mouseenter="item.enter=true" 
                        :span="3" 
                        v-for="(item,index) in materiallist" 
                        :key="index">                      
                         <el-button  v-if="item.chosen" class="checkbtn" type="primary" :icon="Check" size="small" circle />
                         <el-image style="width:100px;height:100px" 
                         :src="item.materialUrl"
                         >
                         </el-image> 
                         <div>
                            <span>{{item.materialName}}</span>
                        </div>
                        <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        v-if="item.enter"
                        >        
                            <el-menu-item index="1" @click="choseimg(index)" >选择</el-menu-item>                         
                        </el-menu>
                        </el-col>
                    </el-row>
                </el-scrollbar>
            </div>
        </div>


        </el-form>
      </div>
      <template #footer>
      <span  class="dialog-footer">
        <el-button type="primary" @click="createpro()">保存</el-button>
         <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </template>
    </el-dialog>
    </div>
</template>
<script setup>
import{Check} from '@element-plus/icons-vue'
import axios from 'axios'
import {reactive, ref} from 'vue'
var urll=ref('');
/**folder */
var openfolderflag=ref(false);
const openfolder=()=>{
    openfolderflag.value=true;
}
var imglist=reactive(null);
const materialoncheck=(index)=>{
    // console.log(materiallist.value[index])
     materiallist.value[index].chosen=!materiallist.value[index].chosen
}
var materialbelong_id=ref('');
const radio1=ref('');
 const oncheck=(index)=>{
    // console.log(index)
    //  console.log(foldlist)
    materialbelong_id.value=foldlist.value[index].collectionsId;
    //  console.log(materialbelong_id.value)
    //  console.log(materiallist)
    foldlist.value[index].chosen=!foldlist.value[index].chosen
    // materiallist.value[index].chosen=!materiallist.value[index].chosen
}
var foldlist =ref([
    {chosen:false},
])
const collection=ref({
    institutionId:1
})
const getfoldlist=()=>{
    axios({
      url:`/api/folder/all`,
      method:'get',
      params:{
            institutionId:1
        }    
    }).then(res=>{
        foldlist.value=res.data.data
        for(let i = 0 ;i<foldlist.value.length;i++)
        foldlist.value[i].chosen = false
        // console.log(foldlist)
        // console.log(res)
    }).catch(function(err){
        console.log(collection.value.institutionId)
      console.log('连接失败',err)
    })
}

getfoldlist();
/**material */
const choseimg=(index)=>{
   // console.log(materiallist.value[index])
   console.log(imglist)
    imglist=materiallist.value[index] 
    console.log(imglist)
    urll=imglist.materialUrl
    addproform.value.materialUrls=urll;
    addproform.value.programmeThumbnail=urll;
    console.log(addproform)
    console.log(urll)
   
}

const materiallist=ref([
    {chosen:false}
])
const getmateriallist=(belong_id)=>{
    //console.log(belong_id)
    axios({
        url:`/api/folder/materials`,
        method:'get',
        params:{
            collectionsId:belong_id,
        }
    }).then(res=>{
      //  console.log(res)
        materiallist.value=res.data.data 
       for(let i = 0 ;i<materiallist.value.length;i++)
        materiallist.value[i].chosen = false
    //  console.log(materiallist.value)
        // console.log(res);
       
    }).catch(function(err){
      console.log('error',err)
    })
}

/**program */
const dialogVisible=ref(false)
const addproform=ref({
    programmeName:'',
    programmeId:'',
    programmeRes:'1920*1080',
    userId:'1',
    userName:'admin'

})
var programlist=ref([{}])
var suoimg=reactive({})
const getproinfo=()=>{
    axios({
    url:`/api/programme/institution/all`,
    method:'get',

    }).then(res=>{
        // userlist.value=res.data.data
        programlist.value=res.data.data
       console.log(programlist.value[0].programmeThumbnail)
        suoimg=programlist.value
        console.log(suoimg)
      // console.log(userlist)
    }).catch(function(err){
      console.log('连接失败',err)
    })
}
getproinfo();
const createpro=()=>{
     dialogVisible.value=false
    axios({
     url:`/api/programme/create`,
      method:'post',
      data:{
        userId:addproform.value.userId,
        userName:addproform.value.userName,
        programmeName:addproform.value.programmeName,
        programmeRes:addproform.value.programmeRes, 
        programmeLasting:"5,5", 
        materialUrls:addproform.value.materialUrls, 
        institutionId:1,
         materials:"3,4",
        programmeSize:2574, 
      }
    }).then(res=>{
    //    userlist.value=res.data.data
       console.log(res)
    
      // console.log(userlist)
    }).catch(function(err){
      console.log('连接失败',err)
    })
}
const proform=ref({
    pro_name:'',
    device:'',
    status:'',
})
const srclist=[
    "http://112.124.59.198/images/20220707105852.PNG",
              "http://112.124.59.198/images/20220707105900.PNG",
              "http://112.124.59.198/images/20220707105907.PNG"
    ]
    
</script>
<style lang="scss" scoped>
::v-deep .devtab .el-table .el-table__cell{
  color: black;
  background-color: white;
}

.devselector{
    // height: 290px;
    border: 1px #999 solid;
}
::v-deep .el-table .el-table__cell {
    background-color: #292d3e;
    border: none;
    color: white;
    font-weight: 500;
}
::v-deep .el-table th.el-table__cell.is-leaf {
    border: none;/* border-bottom: var(--el-table-border); */
}
::v-deep .el-table__body tr:hover > td{
    background-color:#232738 !important;
    color: white;
}
::v-deep .el-table__inner-wrapper::before{
    display: none;
}
::v-deep .adduserdialog .el-form-item__label{
    color: black;
    
   
}
::v-deep .adduserdialog .el-input__wrapper{
     background-color:white;
    //  width: 30%;
}
::v-deep .adduserdialog .el-input{
 width: 85%;
}
::v-deep .el-form-item__label{
    color: white;
}
.materiallist{
    margin: 10px;
}
.top{
    display: flex;
    justify-content: space-between;
    .right{
        flex: 1;
    }
    .left{
        flex: 1;
    }
}

::v-deep .el-input__wrapper{
    background-color: #232738;
    border: none;
    border-radius:none;
    width: 200px;
    overflow: hidden;
}
::v-deep .el-input__inner{
    border: none;
}
::v-deep .el-form-item{
    margin-left: 10px;
}
.adduser{
    margin-right: 46px;
}
.e-2{
    margin-top: 10px;
}
.btn{ 
    position: fixed;
    right: 28px;
    width: 200px;
}

.nvg{
    padding: 20px 0 0 0px;
    width: 100%;
    height: 110px;
    background-color:#292d3e ;

 
}
.add{
    justify-content: right;
    display: flex;
    align-items: center;
    margin-top: 16px;
    height: 64px;
    width: 100%;
    background-color:#292d3e ;
}
.main{

    width: 100%;
    background-color:#292d3e ;
    margin-top: 10px;
}
</style>
