<template>
    <div>
        <div class="nvg">
          <el-form inline="true">
            <el-row >
            <el-col :span="10">
                <el-form-item label="搜索:">
                    <el-input v-model="search"  />
                </el-form-item>
            </el-col>
            
             <el-col :span="8" class="btn">
            <el-form-item>              
                <el-button  @click="onSubmit">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>            
            </el-form-item>
            </el-col></el-row>
          </el-form>
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
                <el-col :span="9" @click="openfolderflag=false">
                    <el-radio-group v-model="radio1" >
                    <el-radio label="全部" size="large">全部</el-radio>
                    <el-radio label="图片" size="large">图片</el-radio>
                    <el-radio label="视频" size="large">视频</el-radio>
                    <el-radio label="音频" size="large">音频</el-radio>
                    <el-radio label="艺术" size="large">艺术</el-radio>
                    <el-radio label="党建" size="large">党建</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="4"/>
                <el-col :span="7">
                    <el-button type="primary" disabled>批量删除</el-button>
                    <el-button type="primary">全选</el-button>
                    <el-button type="primary" @click="newfolderVisable=true">新建文件夹</el-button>
                    <el-button type="primary" v-if="openfolderflag" @click="dialogVisable=true">upload</el-button> 
                </el-col>
                <el-dialog 
                 v-model="dialogVisable">
                <el-col :span="3" >
                    <el-upload class="avatar-uploader" v-if="openfolderflag"
                        ref="upload"
                        action="http://112.124.59.198/images/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        :data="resData"
                        :on-success="onSuccess"
                        :on-progress="onProgress"
                        >
                    </el-upload>
                    <el-button @click="save">save</el-button>
                </el-col>
                </el-dialog>
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
       
        <div class="materiallist" v-if="openfolderflag" >
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
                            <el-menu-item index="1" >打开</el-menu-item>
                            <el-menu-item index="2">重命名</el-menu-item>
                            <el-menu-item index="3">删除</el-menu-item>                          
                        </el-menu>
                        </el-col>


                       
                    </el-row>
                </el-scrollbar>
            </div>
        </div>
        <div class="footer">

        </div>
    <el-dialog
      title="上传素材"
      v-model="uploadDialog"
      width="30%"
      :before-close="handleClose">
      <div class="adduserdialog">
        <el-form ref="form1" :model="form" label-width="80px">
          <el-form-item label="账户名:"
           :rules="[
            {
              required: true,
              message: 'Please input filefold name',
              trigger: 'blur',
            },

          ]"
          >
          <el-input  v-model="form.name" placeholder="请输入文件夹"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <template #footer>
      <span  class="dialog-footer">
        <el-button type="primary" @click="submit()">确 定</el-button>
         <el-button @click="uploadDialog = false">取 消</el-button>
      </span>
      </template>
    </el-dialog>
        <el-dialog
      title="新建文件夹"
      v-model="newfolderVisable"
      width="30%"
      :before-close="handleClose">
      <div class="adduserdialog">
        <el-form ref="form1" :model="folderform" >
          <el-form-item label="文件夹名称:" label-width="90px">
          <el-input  v-model="folderform.collectionsName" 
          placeholder="请输入文件夹名称">
          </el-input>
          </el-form-item>
          <el-form-item label="文件夹类型:" >
          <el-select v-model="folderform.collectionsCategory">
                <el-option label="图片" value="PICTURE" />
                <el-option label="视频" value="VDEIO" />
          </el-select>
          </el-form-item>
                    <!-- <el-form-item label="机构ID:" >
          <el-select v-model="folderform.institutionId">
                <el-option label="图片" value="PICTURE" />
                <el-option label="视频" value="VDEIO" />
          </el-select>
          </el-form-item>
                    <el-form-item label="userid:" >
          <el-select v-model="folderform.collectionsCategory">
                <el-option label="图片" value="PICTURE" />
                <el-option label="视频" value="VDEIO" />
          </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <template #footer>
      <span  class="dialog-footer">
        <el-button type="primary" @click="addfolder()">确 定</el-button>
         <el-button @click="newfolderVisable = false">取 消</el-button>
      </span>
      </template>
    </el-dialog>
    </div>
</template>
<script setup>
import{ArrowRight,Check} from '@element-plus/icons-vue'
import axios from 'axios'
// import { ElMessage } from 'element-plus'
import {reactive, ref} from 'vue'
var dialogVisable=ref(false)
const upload=ref('')
var materialbelong_id=ref('');
var openfolderflag=ref(false);
//  const afterRead = (file) => {
//       // 此时可以自行将文件上传至服务器
//       console.log(file);
//       material.value.material_img=file.content;
//       material.value.material_name=file.name;
//       console.log(material)
//     };
var formdata=new FormData()
const handleRemove=(file, fileList)=> {
        console.log(file, fileList);
      }
const handlePictureCardPreview=(file)=> {
       console.log(file.url);
       
      }

const onSuccess=(response,event)=> {
    console.log(event)
    console.log(response)
    Object.keys(event).forEach((key) => { 
        // console.log(key)//遍历每个参数 进行添加
        // console.log(event[key])
        if (event[key]) {
            formdata.append(key, event[key]);
        }
        // console.log(formdata.get(key))
    });
    console.log(formdata)
}
const newmaterial={
    chosen: false,
collectionsId: 1,
enter: false,
materialCategory: "PICTURE",
materialId: 6,
materialName: "11111",
materialOriginName: null,
materialSize: null,
materialUrl: "http://112.124.59.198/images/11111.PNG",
userName: null,
}
const save=()=>{
     materiallist.value.push(newmaterial)
     console.log(materiallist.value)
    const formData = new FormData() // 或 try等内部  const formData = new FormData()
    //将params所有参数添加到formData中  包括其中file
    Object.keys(newmaterial).forEach((key) => { //遍历每个参数 进行添加
     if (newmaterial[key]){
    formData.append(key,newmaterial[key])}
    });
    console.log(formData)

    dialogVisable.value=false
    axios({
        url:`/api/folder/material/upload`,
        method:'post',
        params:{
            files:formData,
           collections_id:1,
        }
    }).then(res=>{
        console.log(res)

    }).catch(function(err){
      console.log('error',err)
    })
        // 获取上传视频的本地localUrl

}
const getmateriallist=(belong_id)=>{
    console.log(belong_id)
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
     console.log(materiallist.value)
        // console.log(res);
       
    }).catch(function(err){
      console.log('error',err)
    })
}
const materiallist=ref([
    {chosen:false}
])
   
 const openfolder=()=>{
    openfolderflag.value=true;
 }


/**新建文件夹 */
const collection=ref({
    institutionId:1
})
var newfolderVisable = ref(false);
const folderform =reactive({
    collectionsName:'',
    collectionsCategory:'',
    institutionId:1,
    userId:1,
})
const addfolder = ()=>{

    console.log(folderform)
    axios({
        url:'/api/folder/create',
        method:'post',
        data:{
            collectionsName:folderform.collectionsName,
            collectionsCategory:folderform.collectionsCategory,
            institutionId:folderform.institutionId,
            userId:folderform.userId,
        }
    }).then(res=>{
    //    console.log(folderform)
         console.log(res);
        newfolderVisable.value=false;
    }).catch(function(err){
      console.log('添加失败error',err)
    })
}
/**获取文件夹 */

var foldlist =ref([
    {chosen:false},
])

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
const uploadDialog=ref(false);
const oncheck=(index)=>{
    // console.log(index)
    //  console.log(foldlist)
    materialbelong_id.value=foldlist.value[index].collectionsId;
      console.log(materialbelong_id.value)
    //  console.log(materiallist)
    foldlist.value[index].chosen=!foldlist.value[index].chosen
    // materiallist.value[index].chosen=!materiallist.value[index].chosen
}
const materialoncheck=(index)=>{
    console.log(materiallist.value[index])
     materiallist.value[index].chosen=!materiallist.value[index].chosen
}
// const uploadMaterial=()=>{
//     uploadDialog.value=true;
// }

const search=ref('');
const radio1=ref('');


</script>
<style lang="scss" scoped>
.checkbtn{
    position: fixed;
    display: block;
    margin-left:100px ;
    z-index: 2;
    margin-bottom: 0;
}

::v-deep .el-radio{
    margin-right: 20px;
}
::v-deep .el-col-3{
    margin-left: 10px;
}
.materiallist {
    margin-top: 20px;
    width: 90%;
    height: 400px;
    background-color: #292d3e;
}
::v-deep .el-table .el-table__cell {
    background-color: #292d3e;
    border: none;
    color: white;
    font-weight: 500;
}
::v-deep .el-breadcrumb__inner {
    display: flex;
    // align-items: center;
     line-height:2;
}
::v-deep .el-breadcrumb{
    line-height:2;
}
::v-deep .el-table th.el-table__cell.is-leaf {
    border: none;/* border-bottom: var(--el-table-border); */
}
::v-deep .el-table__body tr:hover > td{
    background-color:#232738 !important;
}
::v-deep .el-table__inner-wrapper::before{
    display: none;
}
::v-deep .adduserdialog .el-form-item__label{
    color: black;
   
}
::v-deep .adduserdialog .el-input__wrapper{
     background-color:white;
     width: 30%;
}
::v-deep .adduserdialog .el-input{
 width: 85%;
}
::v-deep .el-form-item__label{
    color: white;
}
::v-deep .el-input__wrapper{
    background-color: #232738;
    border: none;
    border-radius:none;
    width: 400px;
}
::v-deep .el-input__inner{
    border: none;
}
::v-deep .el-form-item{
    margin-left: 10px;
}
.adduser{
    margin-right: 48px;
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
    height: 54px;
    background-color:#292d3e ;
}
.nvg2{
    padding: 20px 0 0 28px;
   
    height: 84px;
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
    // padding: 10px 0 0 20px;
    width: 100%;
    background-color:#292d3e ;
    margin-top: 24px;
}
</style>
