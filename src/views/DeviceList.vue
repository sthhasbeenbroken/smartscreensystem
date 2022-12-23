<template>
    <div>
        <div class="nvg">
          <el-form inline="true">
            <el-row>
            <el-col :span="8">
                <el-form-item label="设备名称:&nbsp;">
                    <el-input v-model="user.id" placeholder="请输入设备名称" />
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
                <el-form-item label="所属分组:">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
           </el-col>
           </el-row>
           <el-row>
            <el-col :span="8">
                <el-form-item label="MAC地址:">
                    <el-input v-model="user.id" placeholder="请输入MAC地址" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="分辨率:&nbsp;&nbsp;&nbsp;">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="设备状态:">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
           </el-col>
           </el-row>
           <el-row>
            <el-col :span="8">
                <el-form-item label="系统版本:&nbsp;">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="当前计划:">
                    <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="SN:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
                    <el-input v-model="user.id" placeholder="请输入SN号" />
                </el-form-item>
           </el-col>
           </el-row>
           
           <el-row class="e-2">
             <el-col :span="8">
            
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
             <el-button class="adduser" type="primary" >批量导入</el-button>
             <el-button class="adduser"  >模板下载</el-button>
            <el-button class="adduser"  disabled>批量删除</el-button>
             <el-button class="adduser" disabled >批量控制</el-button>
              <el-button class="adduser-last" disabled>数据导出</el-button>
        </div>
        <div class="main">
            <el-table :data="userlist" 
            :row-style="{height:60+'px'}"
            
            >
              <el-table-column type="selection" width="40" :selectable="selector"/>
              <el-table-column property="date" label="设备名称" width="120"  />
              <el-table-column property="name" label="所属机构" width="120" />
              <el-table-column property="address" label="所属分组"  width="110"/>
              <el-table-column property="state"   label="MAC地址"  width="100"/>
              <el-table-column property="address" label="分辨率"  width="100"/>
              <el-table-column property="address" label="设备状态"  width="150"/>
              <el-table-column property="address" label="系统升级"  width="150"/>
              <el-table-column property="address" label="当前计划"  width="150"/>
              <el-table-column property="address" label="操作"  width="250">
                <template #default>
                    <el-button link type="primary" >详情</el-button>
                    <el-button link type="primary" @click="handleClick">控制</el-button>
                    <el-button link type="primary" >刷新</el-button>
                    <el-button link type="primary" >编辑</el-button>
                    <el-button link type="primary" >删除</el-button>

                </template>
             </el-table-column>
            </el-table>
        </div>
        <div class="footer">

        </div>
   
    </div>
</template>
<script setup>
import {ref} from 'vue'
const user=ref({
    id:'',
    institution:'',
    character:'',
})
const selector=()=>{
    return false;
}
const userlist = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518',
    state:"·已启用"
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518',
    state:"·已启用"
  },
    {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518',
    state:"·已启用"
  },
    {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518',
    state:"·已启用"
  },
  ]
    
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
    margin-right: 0px;
    margin-left: 8px;
}
.adduser-last{
    margin-right: 10px;
    margin-left: 8px;
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
    height: 220px;
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
