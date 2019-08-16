<template>
  <div class="wrap" @click="handleClick(data)">
    <img v-lazy="data.imgurl">
    <div class="info">
      <span class="dissname">{{data.creator.name}}</span>
      <span class="introduction">{{data.dissname}}</span>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "RecommendItem",
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    methods:{
      handleClick (data) {
        this.$router.push('/recommend/'+data.dissid)
        this.setDisc(data)
      },
      ...mapMutations({
        setDisc:'SET_DICOBJ'
      })

    }
  }
</script>

<style scoped>
  .wrap {
    display: flex;
    height: .8rem;
    padding: 0 .1rem;
  }

  .wrap img {
    width: .7rem;
    height: .7rem;
    margin-right: .2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .dissname {
    font-size: .15rem;
    padding: .1rem 0;
    color: #333;
  }

  .introduction {
    font-size: .12rem;
    color: #666;
  }
</style>
