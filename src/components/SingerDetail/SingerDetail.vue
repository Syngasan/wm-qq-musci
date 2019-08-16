<template>
  <transition appear>
    <div class="singer_detail_wrap">
      <song-list :songsList="songsList" :title="title" :bgUrl="bgUrl"></song-list>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import SongList from 'components/SingerDetail/SongList/SongList'
  import {getSingerDetail} from 'api/singer'
  import {createSong, isValidMusic, processSongsUrl} from 'common/js/song'

  export default {
    name: "SingerDetail",
    data() {
      return {
        songsList: []
      }
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === 0) {
            //this.songsList = this._handleSongsList(res.data.list)
            processSongsUrl(this._handleSongsList(res.data.list)).then((songs) => {
              this.songsList = songs
            })

          }
        })
      },
      _handleSongsList(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },

    computed: {
      title () {
        return this.singer.name
      },
      bgUrl () {
        return this.singer.avatar
      },
      ...mapGetters([
        "singer"
      ]),
    },
    components: {SongList}
  }
</script>

<style scoped>
  .singer_detail_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #333;
  }

  .v-enter-active, .v-leave-active {
    transition: all .4s;
  }

  .v-enter, .v-leave-to{
    transform: translate3d(100%,0,0);
  }

</style>
