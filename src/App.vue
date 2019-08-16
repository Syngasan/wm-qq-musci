<template>
  <div id="app">
    <Head/>
    <tab/>
    <!--keep-alive数据缓存在内存中,切换路由不会重新请求数据-->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import Head from 'components/Head/Head'
  import Tab from 'components/Tab/Tab'
  import Player from 'components/Player/Player'

  export default {
    name: 'App',
    components: {Head, Tab, Player}
  }
</script>

<style>

</style>
