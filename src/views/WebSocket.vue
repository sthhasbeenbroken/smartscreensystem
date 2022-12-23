<template>
  <div class="test">

  </div>
</template>

<script setup>
import{onUnmounted} from 'vue'
    // var name='test'
    
     const websocketonopen=()=>{ //连接建立之后执行send方法发送数据
        let actions = 
        {  
            "type":"PICTURE",
            "url":[
                "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                ,"https://www.itying.com/images/flutter/1.png"
                ,"http://112.124.59.198/images/11111.PNG"
                ]     
        }
    
        websocketsend(actions);
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
    initWebSocket()

    onUnmounted(()=>{
      websock.close() //离开路由之后断开websocket连接
    })



    
</script>
<style lang='less'>
 
</style>
