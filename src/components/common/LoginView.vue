<template>
  <div class="main">
    <div class="left">
        <el-image 
        :src="require('@/assets/login.png')"
        fit="fill"
        class="imgleft">
        </el-image>
        <span>Copyright © 2022 有限公司 版权所有</span>
    </div>
    <div class="right">
        <el-form class="form">
        <h1 class="title">Hello!</h1>
        <p class="welcome">欢迎登录<span style="color: #1890ff;">商用画屏发布系统</span></p>
            <el-form-item >
                <el-input placeholder="请输入账号" class="account" v-model="loginData.user_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" class="password" v-model="loginData.user_pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="large" 
                type="primary" 
                class="loginbtn"
                @click="login">登 录</el-button>
            </el-form-item>
            
        </el-form>
        <p class="phone">客服热线:400-668-123</p>
    </div>
    
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import {ref} from 'vue'
import axios from 'axios'
const { useRouter }=require("vue-router")
const loginData=ref({
    user_name:'',
    user_pwd:'',
})
const router=useRouter();
const login=()=>{
           axios({
               url:`/api/user/login`,
               method:'post',
               data:{
                   userName:loginData.value.user_name,
                   userPwd:loginData.value.user_pwd,
               }
           }).then(res=>{               
               console.log(res)
               if(res.data.msg=='登陆成功'){
                console.log(loginData.value)
                  // console.log(resData.data.msg[0].status)            
                   console.log("连接成功")
                   router.push('/home')
               }else{
                   ElMessage({
                       showClose:true,
                       type:'error',
                       message:'请检查您的用户名与密码',
                   })
               }
            console.log(res)
           }).catch(function(err){
               console.log("连接失败",err)

           })
       }

</script>
<style>
.el-input__wrapper{
    transition: all .3s;
    background-color: #f2f3f5!important;
    display: inline-flex;
    border-radius: 40px;
    border: none;
}
</style>
<style lang="scss" scoped>

.form{
    text-align: left;
}
.welcome{
    
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 2px;
    color: #999;
    margin-bottom: 30px;
}
.title{
    font-size: 60px;
    margin-bottom: 20px;
}
.loginbtn{
    width:60%!important;
    border-radius: 40px;
    height: 50px;
    margin-top: 50px;
}
.main{
    display: flex;
    justify-content: space-between;
}
.left{
    width: 100%;
    height: 100%;
}
.right{
   border-radius: 0 8px 8px 0;
    // padding: 20px;
    background: #f9fbff;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.right .account{
    position: relative;
    width: 400px;
    height: 56px;
    min-width: 0;
    display: inline-flex;
}
.right .password{
    position: relative;
    width: 400px;
    height: 56px;
    min-width: 0;
    display: inline-flex;
}
.phone{
    position:fixed;
    bottom: 40px;
    right: 26%;
}
</style>