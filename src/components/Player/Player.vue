<template>
  <div class="player" v-show="playList.length>0">
    <!--    大播放器-->
    <transition name="play">
      <div class="normal" v-show="fullScreen">
        <div class="bg_img">
          <img :src="currentSong.image">
        </div>
        <!--播放页面-->
        <div class="play_page">
          <div @click="fullScreenFn" class="btn">
            <span class="iconfont iconup"></span>
          </div>
          <div class="head">
            <p class="song_name">{{currentSong.name}}</p>
            <p class="song_album">{{currentSong.album}}</p>
          </div>
          <div class="middle">
            <div class="middle_l">

              <div class="cd_wrap" :class="rotate">
                <img :src="currentSong.image">
              </div>

              <div class="playing_lyr_wrap">歌词</div>
            </div>
            <div class="middle_r"></div>
          </div>
          <!-- 分页圆点-->
          <div class="spot"></div>
          <!--进度条-->
          <div class="progress_wrap">
            <div class="times">{{this._getTime(currentTime)}}</div>
            <div class="time_bar">
              <progress-bar @changePercent="onPercentChange" :percent="percent"></progress-bar>
            </div>
            <div class="total_time">{{this._getTime(currentSong.duration)}}</div>
          </div>
          <!--控制器-->
          <div class="control_wrap">
            <span :class="model" @click="selectMode"></span>
            <span>
                <img src="./img/prve.png" @click="prev">
              </span>
            <span :class="play" @click="toggle"></span>
            <span>
                <img src="./img/next.png" @click="next">
              </span>
            <span class="collection">

              </span>
          </div>

        </div>
      </div>
    </transition>

    <!--    小播放器-->
    <transition name="playMini">
      <div class="mini" v-show="!fullScreen" @click="showFullScreen">
        <div class="little_avatar" :class="rotate">
          <img :src="currentSong.image">
        </div>
        <div class="info">
          <h3>{{currentSong.name}}</h3>
          <span class="singer_album">{{currentSong.singer}}-{{currentSong.album}}</span>
        </div>
        <span :class="play" @click.stop="toggle" class="little_playbtn"></span>
        <span class="song_list_btn">
          <img src="./img/playList.png">
        </span>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeUpDate" @ended="end"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ProgressBar from 'components/Progressbar/Progressbar'
  import {upSetList} from 'common/js/util'

  export default {
    name: "Player",
    data() {
      return {
        currentTime: 0.00,
        newPercent:0
      }
    },
    methods: {
      onPercentChange (newVal) {
        this.newPercent= newVal
        this.$refs.audio.currentTime = newVal*this.currentSong.duration
        this.currentTime=newVal*this.currentSong.duration
      },
      _getTime(time) {
        time = time | 0
        let m = time / 60 | 0
        let s = time % 60
        if (s <= 9) {
          s = `0${s}`
        }
        return `${m}:${s}`
      },

      timeUpDate(e) {
        this.currentTime = e.target.currentTime
      },
      prev() {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
      },
      next() {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
      },
      end() {
        if (this.mode === 0) {
          this.loop()
          return
        }
        this.next()
      },
      selectMode() {
        // let n = this.mode
        // n++
        // if (n > 2) {
        //   n = 0
        // }
        let n = (this.mode + 1) % 3
        this.setMode(n)
        let list = null
        if (this.mode === 1) {
          //随机模式
          list=upSetList(this.sequenceList)
        }else {
          list = this.sequenceList
        }
        this.setPlayList(list)



      },
      fullScreenFn() {
        this.setFullScreen(false)
      },
      showFullScreen() {
        this.setFullScreen(true)
      },
      toggle() {
        this.setPlaying(!this.playing)
      },
      loop() {
        this.$refs.audio.currentTime=0
        this.$refs.audio.play()
      },

      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlaying: 'SET_PLAYING',
        setMode: 'SET_MODE',
        setCurrentIndex: 'SET_CURRENTINDEX',
        setSequenceList:'SET_SEQURNCELIST',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    computed: {
      //百分比
      percent() {
        return  this.currentTime / this.currentSong.duration
      },


      //收藏
      collection() {

      },
      //控制播放按钮状态
      play() {
        return this.playing ? 'play_btn' : 'play_btn_pause'
      },
      //控制播放模式
      model() {
        if (this.mode === 0) {
          return 'play_mode_one'
        } else if (this.mode === 1) {
          return 'play_mode_random'
        } else if (this.mode === 2) {
          return 'play_mode_sequence'
        }
      },
      //旋转
      rotate() {
        return this.playing ? "rotateClass" : "pausedClass"
      },

      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'mode',
        'currentIndex',
        'sequenceList'
      ]),
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play()
          this.setPlaying(true)
        })
      },
      playing(newVal) {
        if (newVal) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      },
    },
    components: {ProgressBar}

  }
</script>

<style scoped>
  .play-enter-active,
  .play-leave-active {
    transition: all .4s
  }

  .play-enter,
  .play-leave-to {
    transform: translate3d(0, -100%, 0);
  }

  .playMini-enter-active,
  .playMini-leave-active {
    transition: all .4s
  }

  .playMini-enter,
  .playMini-leave-to {
    transform: translate3d(0, 100%, 0);
  }


  .normal {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #999;
  }

  .bg_img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: 1;
    opacity: .7;
  }

  .bg_img img {
    width: 100%;
    height: 100%;
  }

  .play_page {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .btn {
    position: fixed;
    font-size: .2rem;
    color: #fff;
    padding: .1rem;
  }

  .head {
    width: 100%;
    margin-bottom: .2rem;
  }

  .song_name,
  .song_album {
    width: 100%;
    text-align: center;
    padding: .1rem 0;
    color: #fff;
    font-size: .16rem;
  }

  .song_album {
    padding: 0;
    font-size: .12rem;
  }

  .middle {
    position: fixed;
    top: .73rem;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    /*background-color: #31c27c;*/
  }

  .middle_l {
    width: 100%;
    height: 0;
    padding-top: 80%;
    position: relative;
  }

  .cd_wrap {
    width: 80%;
    height: 100%;
    /*background-color: yellow;*/
    position: absolute;
    top: 0;
    margin-left: 10%;
  }

  .cd_wrap img {
    width: 100%;
    height: 100%;
    border-radius: 50%;

  }

  .playing_lyr_wrap {
    width: 100%;
    text-align: center;
    margin-top: .2rem;
    background-color: #31c27c;
  }

  .progress_wrap {
    width: 100%;
    height: .2rem;
    position: absolute;
    bottom: 1.5rem;
    display: flex;
    justify-content: space-evenly;
    color: #fff;
    align-items: center;
  }

  .time_bar {
    width: 60%;
    height: .2rem;
  }

  .total_time, .times {
    width: 10%;
    height: .2rem;
  }

  .control_wrap {
    width: 100%;
    height: .5rem;
    /*background-color: red;*/
    position: absolute;
    bottom: .5rem;
    display: flex;
    justify-content: space-around;

  }

  .control_wrap span {
    display: inline-block;
    width: .4rem;
    height: .4rem;
  }

  .collection {
    background: url("./img/collect.png") center center no-repeat;
    background-size: cover;
  }

  .play_btn {
    background: url("./img/playButton.png") center center no-repeat;
    background-size: cover;
  }

  .play_btn_pause {
    background: url("./img/playStrop.png") center center no-repeat;
    background-size: cover;
  }

  .play_mode_one {
    background: url("./img/loop.png") center center no-repeat;
    background-size: cover;
  }

  .play_mode_random {
    background: url("./img/random.png") center center no-repeat;
    background-size: cover;
  }

  .play_mode_sequence {
    background: url("./img/sequence.png") center center no-repeat;
    background-size: cover;
  }


  .mini {
    position: fixed;
    width: 100%;
    height: .5rem;
    bottom: 0;
    right: 0;
    background-color: #31c27c;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .info {
    color: #fff;
    width: 50%;
  }

  .singer_album {
    display: inline-block;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .little_avatar {
    width: .4rem;
    height: .4rem;


  }

  .little_avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .little_playbtn {
    width: .4rem;
    height: .4rem;
  }

  .song_list_btn {
    width: .4rem;
    height: .4rem;
  }

  .song_list_btn img {
    width: 100%;
    height: 100%;
  }


  .rotateClass {
    animation: rotate 20s linear infinite;
  }

  .pausedClass {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
  }

  /*  关键帧动画*/


  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }

  }
</style>
