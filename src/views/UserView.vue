<template>
    <div>
        <div class="nvg">
          <el-form inline="true">
            <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="账户名:">
                    <el-input v-model="user.id" placeholder="请输入账户名" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="所属机构:">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="所属角色:">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
           </el-col>
           </el-row>
           <el-row class="e-2">
             <el-col :span="8">
            <el-form-item label="状态:">
                <el-select v-model="user.institution">
                    <el-option label="1" value="shanghai" />
                    <el-option label="2" value="beijing" />
                </el-select>
            </el-form-item>
            </el-col>
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
             <el-button class="adduser" type="primary" @click="showadd">新建账户</el-button>
        </div>
        <div class="main">
            <el-table :data="userlist" 
            :row-style="{height:60+'px'}"
            >
              <el-table-column prop="userName" label="账户名" width="150"  />
              <!-- <el-table-column property="name" label="所属机构" width="120" /> -->
              <el-table-column property="userBelongTo" label="所属角色"  width="120"/>
              <el-table-column property="userStatus"   label="状态"  width="80"/>
              <el-table-column property="userRealName" label="真实姓名"  width="140"/>
              <el-table-column property="userPhoneNumber" label="手机号"  width="150"/>
              <el-table-column property="userEmail" label="邮箱"  width="150"/>
              <el-table-column property="modifyTime" label="更新时间"  width="150"/>
              <el-table-column property="userType" label="用户类型"  width="190"/>
              <el-table-column  label="操作"  width="150">
                <template #default>
                    <el-button link type="danger" size="small">停用</el-button>
                    <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
             </el-table-column>
            </el-table>
        </div>
        <div class="footer">

        </div>
    <el-dialog
      title="添加账户"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="adduserdialog">
        <el-form :model="form" label-width="80px">
          <el-form-item label="账户名:">
          <el-input  v-model="form.userName" placeholder="请输入账户"></el-input> 
          </el-form-item>
          <el-form-item label="密码:"
          >
            <el-input type="password" placeholder="请输入密码" v-model="form.password">

            </el-input>
          </el-form-item>
          <el-form-item label="所属角色:">
            <el-select v-model="form.createBy" placeholder="请选择所属角色">
                <el-option label="管理员" value="00" />
                <el-option label="用户" value="01" />
            </el-select>
          </el-form-item>
          <el-form-item  label="帐号状态:">
            <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="启用" value="0" />
                <el-option label="停用" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱:"
         
            >
            <el-input  v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input  v-model="form.phonenumber" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
      <span  class="dialog-footer">
        <el-button type="primary" @click="adduser()">确 定</el-button>
         <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </template>
    </el-dialog>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import axios from 'axios'
var userlist = ref([{}])
const getuserinfo=()=>{
    axios({
      url:`/api/user/get`,
      method:'get',
    }).then(res=>{
        userlist.value=res.data.data
       console.log(userlist)
     
      // console.log(userlist)
    }).catch(function(err){
      console.log('连接失败',err)
    })
}

  getuserinfo()

const showadd=()=>{
   dialogVisible.value=true;
}
const adduser=()=>{
           axios({
               url:`/api/user/create`,
               method:'post',
               data:{
                institutionId:1,
               }
              
           }).then((res)=>{  
               console.log(form.value.loginName)             
              
               console.log(res)


           }).catch(function(err){
               console.log("连接失败",err)
           })
       }
var dialogVisible=ref(false)
const user=ref({
    id:'',
    institution:'',
    character:'',
})
const form=ref({
  loginName:'',
  userName:'',
  password:'',
  email:'',
  phonenumber:'',
  status:'',
  
})
  
</script>
<style lang="scss" scoped>
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
    width: 200px;
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
    height: 120px;
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
