<template>
  <div class="top_bar">
    <span class="iconfont iconren icon_music">土狗音乐</span>
    <div class="mine iconfont iconren1"></div>
  </div>
</template>

<script>
  export default {
    name: "Head"
  }
</script>

<style scoped>

  .top_bar {
    width: 100%;
    height: .4rem;
    background-color: #31c27c;
    text-align: center;
    line-height: .4rem;
    color: #fff;
    position: relative;
  }

  .icon_music {
    font-size: .18rem;
    color: yellow;
  }

  .mine {
    position: absolute;
    padding:0 .1rem;
    right: .1rem;
    top:0;
    font-size: .18rem;
  }
</style>
