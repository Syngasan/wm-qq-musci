<template>
  <div class="wrap">
    <div ref="bg_img" class="bg_img" :style="{'backgroundImage':'url('+bgUrl+')'}">
      <div class="cover"></div>
      <span class="iconfont iconfanhui icon" @click="$router.back(-1)"></span>
      <p class="music_name">{{title}}</p>
    </div>
    <div class="layer" ref="layer"></div>
    <scroll v-show="songsList.length>0" @scroll="scrollFn" :listenScroll="listenScroll" :probeType="probeType"
            class="song_list" ref="song_list"
            :data="songsList">
      <ul>
        <li class="song_item" v-for="(item,ind) in songsList" :key="ind" @click="selectItem(item,ind)">
          <span class="song_name">{{item.name}}</span>
          <span class="singer_name">{{item.singer}}-{{item.album}}</span>
        </li>
      </ul>
    </scroll>
    <load class="load" v-show="songsList.length === 0"></load>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'components/Scroll/Scroll'
  import {mapMutations} from 'vuex'
  import Load from 'components/Load/Load'

  const H = 40
  export default {
    name: "SongList",
    props: {
      songsList: {
        type: Array,
        default: []
      },
      title:String,
      bgUrl:String
    },
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        scrollY: 0
      }
    },

    mounted() {
      this.$refs.song_list.$el.style.top = this.$refs.bg_img.clientHeight + 'px'
      this.$refs.layer.style.top = this.$refs.bg_img.clientHeight + 'px'
      this.imgHeight = this.$refs.bg_img.clientHeight

    },
    updated() {
      if (this.playList.length > 0) {
        this.$refs.song_list.$el.style.bottom = `.5rem`
      }
    },
    methods: {
      scrollFn(pos) {
        this.scrollY = pos.y
      },
      selectItem(song, ind) {
        //设置全屏显示
        this.setFullScreen(true)
        //把歌单加入全局的playList中
        this.setPlayList(this.songsList)
        this.setSequenceList(this.songsList)
        //设置当前小标
        this.setCurrentIndex(ind)
      },

      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlayList: 'SET_PLAYLIST',
        setCurrentIndex: 'SET_CURRENTINDEX',
        setSequenceList: 'SET_SEQURNCELIST'
      })
    },

    watch: {
      scrollY(newY) {
        let scale = 1
        let percent = Math.abs(newY / this.imgHeight)
        let maxScroll = Math.max((-this.$refs.bg_img.clientHeight + H), newY)
        this.$refs.layer.style['transform'] = `translate3d(0,${maxScroll}px,0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0,${maxScroll}px,0)`
        if (newY < (-this.imgHeight + H)) {
          this.$refs.bg_img.style['z-index'] = 10
          this.$refs.bg_img.style.height = H + 'px'
          this.$refs.bg_img.style.paddingTop = 0
        } else {
          this.$refs.bg_img.style['z-index'] = 0
          this.$refs.bg_img.style.height = 0
          this.$refs.bg_img.style.paddingTop = '70%'
        }
        if (newY > 0) {
          scale = 1 + percent
          this.$refs.bg_img.style['transform'] = `scale(${scale})`
        }
      }
    },
    computed: {
      ...mapGetters([
        'singer',
        'playList'
      ])
    },
    components: {Scroll, Load}
  }
</script>

<style scoped>
  .bg_img {
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    position: relative;
    transform-origin: top;
  }

  .cover {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
  }

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: .1rem;
    font-size: .18rem;
    z-index: 1;
    font-weight: 600;
  }

  .music_name {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: .1rem 0;
    font-size: .18rem;
  }

  .song_list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #333333;
  }

  .load {
    position: fixed;
    z-index: 10;
    color: #fff;
  }


  .layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #333333;
  }

  .song_item {
    padding: .1rem .2rem;
    display: flex;
    flex-direction: column;
  }

  .song_name {
    font-size: .18rem;
    color: #fff;
    padding: .05rem 0;
  }

  .singer_name {
    font-size: .13rem;
    color: #999;
  }


</style>
