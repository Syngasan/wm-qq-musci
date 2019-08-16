<template>
  <div class="load">
    <img src="./loading.gif">
    <p>{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "Load",
    props: {
      title: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>

<style scoped>
  .load {
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
  }

  .load img {
    width: .3rem;
    height: .3rem;
  }
</style>
