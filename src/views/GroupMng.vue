<template>
    <div>
        <div class="nvg">
          <el-form inline="true">
            <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="分组名称:">
                    <el-input  placeholder="请输入分组名" />
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
             <el-button class="adduser" type="primary" @click="dialogVisible = true">新建分组</el-button>
        </div>
        <div class="main">
            <el-table :data="userlist" 
            :row-style="{height:48+'px'}"           
            >
            <el-table-column type="selection" width="40"/>
              <el-table-column property="date" label="分组ID" width="250"  />
              <el-table-column property="name" label="分组名" width="250" />
              <el-table-column property="address" label="所属机构"  width="220"/>
              <el-table-column property="state"   label="设备数量"  width="120"/>
              <el-table-column property="address" label="描述"  width="220"/>
              <el-table-column property="address" label="操作"  width="180">
                <template #default>
                    <el-button link type="primary" size="small">详情</el-button>
                    <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
             </el-table-column>
            </el-table>
        </div>
        <div class="footer">

        </div>
    <el-dialog
      title="新建分组"
      v-model="dialogVisible"
      width="70%"
      
      :before-close="handleClose">
      <div class="adduserdialog">
        <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="10">
          <el-form-item label="分组名称:"
          :rules="[
            {
              required: true,
              message: 'Please input groupname',
              trigger: 'blur',
            },
            {
              
              message: 'Please input correct groupname',
              trigger: ['blur', 'change'],
            },
          ]">
            <el-input placeholder="请输入分组名称"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="10">
          <el-form-item label="所属机构:">
            <el-select v-model="user.institution">
                        <el-option label="1" value="shanghai" />
                        <el-option label="2" value="beijing" />
            </el-select>
          </el-form-item>
          </el-col>
          </el-row>
          <el-form-item label="描述:">
            <el-input placeholder="描述最多200个字"></el-input>
          </el-form-item>
          
          <el-form-item label="设备选择:"
          :rules="[
            {
              required: true,
              message: 'Please input username',
              trigger: 'blur',
            },
           ]"
          >
          </el-form-item>
          <div class="devselector">
             <br>
            <el-row >
                <el-col :span="8">
                    <el-form-item label="设备名称:">
                        <el-input  placeholder="请输入设备名称" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分辨率:">
                        <el-select v-model="user.institution">
                            <el-option label="1" value="shanghai" />
                            <el-option label="2" value="beijing" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">    
                    <el-button  @click="onSubmit">重置</el-button>
                    <el-button type="primary" @click="onSubmit">查询</el-button>            
                </el-col>       
            </el-row>
            <div class="devtab">
            <el-table :data="userlist" 
            :row-style="{height:48+'px'}"           
            >
            <el-table-column type="selection" width="40"/>
              <el-table-column property="date" label="设备名称" width="220"  />
              <el-table-column property="name" label="MAC地址" width="180" />
              <el-table-column property="address" label="分辨率"  width="150"/>
              <el-table-column property="state"   label="所属机构"  width="150"/>
              <el-table-column property="address" label="当前计划"  width="130"/>
              <el-table-column property="address" label="设备状态"  width="100"/>
                
            </el-table>
            </div>
           </div>
        </el-form>
      </div>
      <template #footer>
      <span  class="dialog-footer">
        <el-button type="primary" @click="submit()">保存</el-button>
         <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </template>
    </el-dialog>
    </div>
</template>
<script setup>
import {ref} from 'vue'
const dialogVisible=ref(false)
const user=ref({
    id:'',
    institution:'',
    character:'',

})
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
    height: 72px;
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
