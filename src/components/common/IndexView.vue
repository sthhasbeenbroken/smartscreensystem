<template>

  <div id="index">
    <header1 class="topbar"></header1>
    <section class="container">
      <div class="left_side">
        <mainLeft></mainLeft>
      </div>
      <div class="main_wrapper">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import header from '@/components/common/HeaderView'
import mainLeft from '@/components/common/MainLeft'

export default {
  components:{
    header1: header,
    mainLeft: mainLeft,

  },
  data() {
    return {
      username: 'gy'
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>

.topbar{
  color: white;
}
.container {
  display: flex;
  // background-color: #fff;
  color: white;
}
.main_wrapper {
  overflow: hidden;
  padding: 24px;
  flex: 1;
  background-color:	#232738;
  height: 649px;
}
</style>