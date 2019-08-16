<template>
  <scroll class="ranking_wrap" :data="topList">
    <div v-show="topList.length>0">
      <div @click="goSongList(item,ind)" class="ranking_item" v-for="(item,ind) in topList" :key="ind">
        <div class="left_img">
          <img v-lazy="item.picUrl">
        </div>
        <div class="right_info">
          <p class="song_info" v-for="(val,index) in item.songList" :key="index">{{index+1}} {{
            val.songname}}-{{val.singername}}</p>
        </div>
      </div>
    </div>
    <load v-show="topList.length===0"></load>
    <router-view :title="title" :bgUrl="bgUrl"></router-view>
  </scroll>

</template>

<script>
  import {getTopList} from 'api/ranking'
  import Scroll from 'components/Scroll/Scroll'
  import Load from 'components/Load/Load'
  import {mapMutations , mapGetters} from 'vuex'

  export default {
    name: "Ranking",
    data() {
      return {
        topList: []
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      goSongList(item, ind) {
        this.$router.push('/ranking/'+item.id)
        console.log(item);
        this.setTopObj(item)
      },
      _getTopList() {
        getTopList().then(res => {
          console.log(res);
          if (res.code === 0) {
            this.topList = res.data.topList
          }
        })
      },
      ...mapMutations({
        setTopObj: 'SET_TOP_OBJ'
      })
    },
    components: {Scroll, Load},
    computed: {
      title() {
        return this.topObj.topTitle
      },
      bgUrl() {
        return this.topObj.picUrl
      },
      ...mapGetters([
        'topObj'
      ])



    }
  }

</script>

<style scoped>
  .ranking_wrap {
    background-color: #333333;
    padding: .2rem .2rem;
    position: fixed;
    top: .8rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

  }

  .ranking_item {
    width: 100%;
    display: flex;
    background-color: #666;
    margin: .1rem 0;
  }

  .left_img {
    width: 25%;
  }

  .left_img img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .right_info {
    width: 60%;
    display: flex;
    margin-left: .4rem;
    flex-direction: column;
    justify-content: space-evenly;
    color: #fff;
  }

  .song_info {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


</style>
