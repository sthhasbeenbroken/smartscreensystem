<template>
    <div>
        <div class="nvg">
          <el-form inline="true">
            <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="计划名称:">
                    <el-input  placeholder="请输入计划名称" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="计划状态:">
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
             <el-button type="primary" @click="dialogVisible = true">新建计划</el-button>
             <el-button class="adduser" @click="dialogVisible = true">批量删除</el-button>
        </div>
        <div class="main">
            <el-table :data="planlist" 
            :row-style="{height:48+'px'}"           
            >
            <el-table-column type="selection" width="40"/>
              <el-table-column label="缩略图" width="80"  >
                <template #default="scope">
                    <el-image  style="width: 48px; height: 48px"
                    v-if="scope.$index<3" 
                    preview-teleported="true"
                    :preview-src-list="srclist"
                    :src="imglist[scope.$index]"
                    alt="" :fit="fill" ></el-image>
                    <el-image  style="width: 48px; height: 48px"
                    v-else
                    preview-teleported="true"
                    :preview-src-list="srclist"
                    :src="imglist[0]"
                    alt="" :fit="fill" ></el-image>
                    
                </template>
              </el-table-column>
              <el-table-column property="planName" label="计划名称" width="200" />
              <el-table-column property="planStatus" label="计划状态"  width="150"/>
              <el-table-column property="playMode"   label="播放模式"  width="120"/>
              <el-table-column property="planStart" label="播放日期"  width="180"/>
              <el-table-column property="userName" label="作者"  width="120"/>
              <el-table-column property="userName" label="审核人"  width="100"/>
              <el-table-column property="modifyTime" label="更新时间"  width="129"/>
              <el-table-column property="address" label="操作"  width="160">
                <template #default="scope">
                    <el-button link type="primary" >详情</el-button>
                    <el-button link type="primary"  @click="handleClick">修改</el-button>
                     <el-button link type="primary" >复制</el-button>
                      <el-button link type="primary" @click="publish(scope.$index)">发布</el-button>
                    <el-button link type="primary" >删除</el-button>
                </template>
             </el-table-column>
            </el-table>
        </div>
        <div class="footer">

        </div>
    <el-dialog
      title="新建计划"
      v-model="dialogVisible"
      width="70%"
      
      :before-close="handleClose">
      <div class="adduserdialog">
        <el-form ref="form" :model="planform" label-width="100px">
        <el-row>
          <el-col :span="10">
          <el-form-item label="计划名称:">
            <el-input v-model="planform.name" placeholder="请输入计划名称"></el-input>
          </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
            <el-date-picker
              v-model="planform.startdate"
              type="date"
              placeholder="选择开始日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
            </el-col>
            <el-col :span="12">
            <el-date-picker
              v-model="planform.enddate"
              type="date"
              placeholder="选择结束日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
            </el-col>
          </el-row>
          <br>
          <el-row >
            <el-form-item label="选择时间段:">
            <div class="demo-time-range">
              <el-time-select
                v-model="planform.starttime"
                :max-time="endTime"
                class="mr-4"
                placeholder="Start time"
                start="08:30"
                step="00:15"
                end="18:30"
              />
              <el-time-select
                v-model="planform.endtime"
                :min-time="startTime"
                placeholder="End time"
                start="08:30"
                step="00:15"
                end="18:30"
              />
            </div>
          </el-form-item>
          </el-row>


          <div class="devselector">
             <br>

            <div class="devtab">
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
                    <el-button link type="primary" >删除</el-button>
                </template>
             </el-table-column>
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
    // var name='test'
    var urlindex=0;
    const imglist=["http://112.124.59.198/images/20220707105852.PNG"
                ,"http://112.124.59.198/images/apple.PNG"
                ]
    // const print=(index)=>{
    //   console.log(index)
    // }
  const websocketonopen=()=>{ //连接建立之后执行send方法发送数据

    let _urls={}
    if(urlindex==0){
      _urls={  
            "type":"PICTURE",
            "url":[
              "http://112.124.59.198/images/20220707105852.PNG",
              "http://112.124.59.198/images/20220707105900.PNG",
              "http://112.124.59.198/images/20220707105907.PNG"
                ]     
        }
    }
    if(urlindex==1){
       _urls={
        "type":"VIDEO",
        "url":"https://www.apple.com/105/media/cn/mac/family/2018/46c4b917_abfd_45a3_9b51_4e3054191797/films/bruce/mac-bruce-tpl-cn-2018_1280x720h.mp4",
        
      }
     }
     if(urlindex==2){
        _urls={
          "type":"MUSIC",
          "url":["http://www.ytmp3.cn/down/56075.mp3",
          "http://www.ytmp3.cn/down/55884.mp3"]
        }
     }
        websocketsend(JSON.stringify(_urls));
      }
     const websocketonerror=()=>{//连接建立失败重连
        initWebSocket();
      }
    const  websocketonmessage=(e)=>{ //数据接收
        const redata = JSON.parse(e.data);
        console.log(redata)
      }
    const  websocketsend=(Data)=>{//数据发送
        websock.send(Data);
      }
    const  websocketclose=(e)=>{  //关闭
        console.log('断开连接',e);
      }
    var websock= null
        const initWebSocket=()=>{ //初始化weosocket
        const wsuri = 'ws://112.124.59.198:8080/';
        websock = new WebSocket(wsuri);
        websock.onmessage = websocketonmessage;
        websock.onopen = websocketonopen;
        websock.onerror = websocketonerror;
        websock.onclose = websocketclose;
      }
 import { ElMessage } from 'element-plus'
const publish=(index)=>{
  urlindex=index;
  ElMessage({
    message:'发布成功',
    type: 'success',
 })
  initWebSocket();
}
import {ref,reactive} from 'vue'
import axios from 'axios'
/**datetransformer */
var datestring=[];
var dateendstring=[];
var newdatestring="";
var newdateendstring="";
const former=()=>{
 newdatestring="";
 newdateendstring="";
  datestring=planform.value.startdate.toString().split(' ');
  dateendstring=planform.value.enddate.toString().split(' ');
  console.log(datestring);
  newdatestring+=datestring[3]
  if(datestring[1]=='Jul')
  {
    newdatestring+='-'+'07'
  }
  newdatestring+='-'+datestring[2]+' '+planform.value.starttime+":00"
  console.log(newdatestring)
  
  newdateendstring+=dateendstring[3]
    if(dateendstring[1]=='Jul')
  {
    newdateendstring+='-'+'07'
  }
  newdateendstring+='-'+dateendstring[2]+' '+planform.value.endtime+":00"
  console.log(newdateendstring)
}
/**createplanform */
const submit=()=>{
  dialogVisible.value=false
  former()
  axios({
    url:`api/plan/create`,
    method:`post`,
    data:{
    planName:planform.value.name,
    operation:"save",
    playMode:"LASTING",
    planReason:"",
    playTactics:"REPLACE",
    planStart:newdatestring,
    planEnd: newdateendstring,
    devices:"1",
    institutionId:1,
    playDtos:[
        {
            playBeginTime:newdatestring,
            playEndTime:newdateendstring,
            playPeriod:"00:00:00-24:00:00",
            programmeIds:"9",
            playHtm:"playHtml"
        }
    ]
    }
  }).then(res=>{
    console.log(res)
  })
}
const dialogVisible=ref(false)
const user=ref({
    id:'',
    institution:'',
    character:'',

})

var planlist=ref([{}]);
const getplaninfo=()=>{
    axios({
    url:`/api/plan/get/page`,
    method:'get',

    }).then(res=>{
        // userlist.value=res.data.data
        console.log(res)
        planlist.value=res.data.data;
       console.log(planlist)
    }).catch(function(err){
      console.log('连接失败',err)
    })
}
getplaninfo();
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


const planform=ref({
  name:'',
  starttime:'',
  endtime:'',
  startdate:'',
  enddate:'',
});
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
