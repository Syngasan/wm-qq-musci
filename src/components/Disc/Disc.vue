<template>
  <transition appear>
    <div class="singer_detail_wrap">
      <song-list :songsList="songsList" :title="title" :bgUrl="bgUrl"></song-list>
    </div>
  </transition>
</template>

<script>

  import SongList from 'components/SingerDetail/SongList/SongList'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'


  export default {
    name: "SingerDetail",
    data() {
      return {
        songsList: []
      }
    },
    mounted() {

      this._getSongList()


    },
    methods: {
      _getSongList () {
        getSongList (this.dicObj.dissid).then(res=>{
          
        })
      }
    },
    computed: {
      title() {
        return this.dicObj.dissname
      },
      bgUrl() {
        return this.dicObj.imgurl
      },
      ...mapGetters([
        'dicObj'
      ])
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
    z-index: 100;
  }

  .v-enter-active, .v-leave-active {
    transition: all .4s;
  }

  .v-enter, .v-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>
