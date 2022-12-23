<template>
    <div class="home">
        <div class="top">
            <div class="devicecount">
                <img src="@/assets/devicecount.png" style="width:45px;height:45px">
                <div class="text">
                <p class="count">设备数量</p>
                <p style="font-size:22px"><strong>1</strong></p>
                </div>
            </div>
            <div class="programcount">
                <img src="@/assets/programcount.png" style="width:45px;height:45px">
                <div class="text">
                <p class="count">节目数量</p>
                <p style="font-size:22px"><strong>5</strong></p>
                </div>
            </div>
            <div class="plancount">
                <img src="@/assets/plancount.png" style="width:45px;height:45px">
                <div class="text">
                <p class="count">计划数量</p>
                <p style="font-size:22px"><strong>5</strong></p>
                </div>
            </div>
        </div>
        <div class="medium">
            <div class="devicestate" >
                <div class="card">设备状态</div>
                <div class="devin">
                <div class="echarts1" id="devstate" :style="{width:'60%',height:'80%'}"></div>
                <div class="texttab">
                <p>离线 <span>1台</span></p>
                <p>播放 <span>0台</span></p>
                <p>空闲 <span>0台</span></p>
                </div>
                </div>
           </div>
            <div class="material" >
                <div class="card">素材资源</div>
              <div class="devin">
                <div class="echarts2" id="material" :style="{width:'60%',height:'80%'}"></div>
                <div class="texttab">
                <p>图片 <span>26MB</span></p>
                <p>视频 <span>12MB</span></p>
                <p>音乐 <span>4MB</span></p>
                </div>
              </div>
            </div>
            
            <div class="devicedist" >
                <div class="card">设备分布
                    <el-select v-model="value" class="m-1" placeholder="Select" >
                    <el-option
                        v-for="item in state.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                  </el-select>
                </div>
                <div @click="todev" class="echarts3" id="devdist" :style="{width:'100%',height:'100%'}"></div>
            </div>
        </div>
        <div class="footer">
            <div class="plan">
                <div class="card">计划审核提醒</div>
                 <el-table :data="userlist" 
            :row-style="{height:60+'px'}"
            >
              <el-table-column property="date" label="序号" width="60"  />
              <el-table-column property="name" label="计划名称" width="150" />
              <el-table-column property="address" label="计划状态"  width="110"/>
              <el-table-column property="state"   label="提交时间"  width="160"/>
              <el-table-column property="address" label="提交人"  width="150"/>
              <el-table-column property="address" label="操作"  width="150"/>
                <!-- <template #default>
                    <el-button link type="danger" size="small">停用</el-button>
                    <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
             </el-table-column> -->
            </el-table>
            </div>
            <div class="eventrecord">
                <div class="card">事件记录</div>
                <div style="height:240px">
                    <el-scrollbar>
                    <div v-for="item in eventlist" :key="item" class="scrollbar-demo-item">
                        <div style="color:#666;font-size:12px;height:16px;padding:0px;margin:0px">{{item.time}}</div>
                        <div class="eventthing" v-if="item.title=='[计划]'" @click="toplan">{{item.title}}{{item.name}}</div>
                        <div class="eventthing" v-if="item.title=='[设备]'" @click="todev">{{item.title}}{{item.name}}</div>
                    </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts'
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const { onMounted, onUnmounted, reactive }=require("vue-demi");
const route = useRouter()
const todev=()=>{
    route.push('/devicelist');
}
const toplan=()=>{
    route.push('/planlist');
}
let echart=echarts;
const value = ref('分组');
const eventlist = ref([
    {
        time:'2022-06-28 10:58:22',
        title:'[计划]',
        name:'9898计划被拒绝'
    },
    {
        time:'2022-06-28 10:58:22',
        title:'[设备]',
        name:'测试误删'
    },    
    {
        time:'2022-06-28 10:58:22',
        title:'[计划]',
        name:'9898计划被拒绝'
    },
        {
        time:'2022-06-28 10:58:22',
        title:'[计划]',
        name:'9898计划被拒绝'
    },
])
const state =reactive({
    options:[
        {
         value:'分组',
         label:'分组'
        },
        {
         value:'机构',
         label:'机构'
        }
    ]
 })
// import *as echarts from 'echarts'
onMounted(()=>{
    initChart();
});
onUnmounted(()=>{
    echart.dispose;
});
const initChart=()=>{
    document.getElementById("material").removeAttribute('_echarts_instance_');
    document.getElementById("devstate").removeAttribute('_echarts_instance_');
    document.getElementById("devdist").removeAttribute('_echarts_instance_');
    let mchart =echart.init(document.getElementById('material',"dark"));
    let chart =echart.init(document.getElementById('devstate',"dark"));
    let cchart= echart.init(document.getElementById('devdist',"dark"));
    mchart.setOption({
        tooltip: {
        trigger: 'item'
         },
        legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'vertical',
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'right',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'center',
            itemWidth: 15,   // 设置图例图形的宽
            itemHeight: 15,  // 设置图例图形的高
            textStyle: {
            color: '#666',  // 图例文字颜色
            fontSize:'0'
            },
            },
        series: [
            { 
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                fontSize:18,
                color:'white',
                position: 'center'
            },
            emphasis: {
                label: {
                show: true,
                fontSize: '24',
                fontWeight: 'bold'
                }
            },
            labelLine: {
                normal:{
                    show:false
                },
                show: false
            },
            data: [
                { value: 26, name: '图片' },
                { value: 12, name: '视频' },
                { value: 4, name: '音频' },
            ],
        itemStyle: {
            normal: {
            color: function (colors) {
                var colorList = [
                '#ffd400',
                '#2b4490',
                '#6950a1',
                ];
                return colorList[colors.dataIndex];
                 }
               },
             },
         }
        ]
    })

    chart.setOption({
        tooltip: {
        trigger: 'item'
         },
        legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'vertical',
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'right',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'center',
            itemWidth: 15,   // 设置图例图形的宽
            itemHeight: 15,  // 设置图例图形的高
            textStyle: {
            color: '#666',  // 图例文字颜色
            fontSize:'0'
            },
            },
        series: [
            { 
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                fontSize:18,
                color:'white',
                show: true,
                position: 'center'
            },
            emphasis: {
                label: {
                show: true,
                fontSize: '24',
                fontWeight: 'bold'
                }
            },
            labelLine: {
                normal:{
                    show:false
                },
                show: false
            },
            data: [
                { value: 1, name: '离线' },
                { value: 0, name: '播放' },
                { value: 0, name: '空闲' },
            ],
        itemStyle: {
            normal: {
            color: function (colors) {
                var colorList = [
                '#72777b',
                '#1d953f',
                '#ffd400',
                ];
                return colorList[colors.dataIndex];
                 }
               },
             },
         }
        ]
    })
    cchart.setOption({
        xAxis: {
        type: 'category',
        data: ['罗老师', 'Tue','bro'],
        axisLabel:{
                     textStyle:{
                         color:"#fff"
                     }
                 }
        },
        yAxis: {
            type: 'value',
            splitLine:{
            show:false
            }
        },
        tooltip: {
		trigger: 'item',
        },
        series: [
            
            {        
            barWidth:20,
            data: [10, 2,5],
            type: 'bar'
            }
        ]
    })
}
</script>
<style>

</style>
<style lang="scss" scoped>
.scrollbar-demo-item {
  display: flex;
  border-bottom: 1px solid #666;
  justify-content: left;
  height: 50px;
  margin-left: 24px;
 margin-top: 4px;
 cursor: pointer;
}
.echarts3{
    margin-top: -20px;
    
}
::v-deep .el-table .el-table__cell {
    background-color: #232738;
    border: none;
    color: white;
    font-weight: 500;
}
::v-deep .el-table th.el-table__cell.is-leaf {
    border-bottom: none;/* border-bottom: var(--el-table-border); */
}
::v-deep .el-table__inner-wrapper::before{
    display: none;
}
::v-deep .el-table__empty-block{
    background-color: #292d3e;
}
::v-deep .el-table__body tr:hover > td{
    background-color:#232738 !important;
}
::v-deep .el-input__wrapper {
    height: 24px;
    background-color:#292d3e ;
    color:white;
}
.m-1{
    background-color: #292d3e;
    width: 100px;
    position: relative;
    left: 300px;
}
.devin{
    z-index: 1;
    height: 100%;
    display: flex;
   
}
.texttab{
    font-size: 14px;
    margin-top: 50px;
}
.texttab p{
    font-size: 14px;
    padding: 6px 0 1px 5px;
}
.medium{
    height: 230px;
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.material{
    width: 28%;
     background: #292d3e;
}
.devicestate{
     width: 28%;
      background: #292d3e;
}
.devicedist{
     width: 40%;
      background: #292d3e;
}
.card{
    text-align: left;
    font-size: 15px;
    padding: 16px 24px;
}
.card::before{
    content: "|";
    background-color: #1890ff!important;
    color: #1890ff!important;
    font-weight: 700!important;
    margin-right: 8px!important;
}
.top{
    width: 100%;
    justify-content: space-between;
    display: flex;
}
.footer{
     width: 100%;
    justify-content: space-between;
    display: flex;
    margin-top: 32px;
    height: 300px;
    .plan{
        width: 58%;
        background-color:#292d3e;
    }
    .eventrecord{
        width: 40%;
        background-color: #292d3e;
        .eventthing{
            font-size: 14px;
            margin-top: 20px;
            margin-left: -110px;
        }
    }
}
.devicecount{
    padding-left: 10px;
    display: flex;
    align-items: center;
    border-radius: 5%;
    width: 30%;
    height: 72px;
    background: #292d3e;
}
.text{
    text-align: left;
     margin-left: 16px;
}
.count{
    font-size: 14px;
    margin-bottom: 8px;
}
.programcount{
    padding-left: 10px;
     display: flex;
    align-items: center;
    border-radius: 5%;
    width: 30%;
    height: 72px;
    background: #292d3e;
}
.plancount{
    padding-left: 10px;
     display: flex;
    align-items: center;
    border-radius: 5%;
    height: 72px;
    width: 30%;
    background: #292d3e;
}
</style>