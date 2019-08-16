<template>
  <div class="tab_bar">
    <router-link tag="div" class="recommend item" to="/recommend" active-class="active"><span>推荐</span></router-link>
    <router-link tag="div" class="singer item" to="/singer" active-class="active"><span>歌手</span></router-link>
    <router-link tag="div" class="ranking item" to="/ranking" active-class="active"><span>排行</span></router-link>
    <router-link tag="div" class="search item" to="/search" active-class="active"><span>搜索</span></router-link>
  </div>
</template>

<script>
  export default {
    name: "Tab"
  }
</script>

<style scoped>
  .tab_bar {
    width: 100%;
    height: .4rem;
    display: flex;
    align-items: center;

  }

  .tab_bar .item {
    width: 25%;
    height: 100%;
    text-align: center;
    line-height: .4rem;
  }

  .tab_bar .item span {
    padding: .05rem;
  }

  .active span{
    color: #31c27c;
    border-bottom: 1px solid #31c27c;
  }

</style>
