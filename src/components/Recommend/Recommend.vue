<template>
  <div class="recommend_wrap" ref="recommendWrap">
    <div>
    <!-- 轮播图-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,ind) in sliderArr" :key="ind">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!--热门歌单-->
    <div v-show="songsList.length>0" class="hotSongList" ref="hotSongList">
      <h2 class="title">热门歌单推荐</h2>
      <div class="songs_wrap">
        <recommend-item v-for="(item,ind) in songsList" :key="ind" :data="item"></recommend-item>
      </div>
    </div>
    <load v-show="songsList.length===0"></load>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from "../../api/recommend";
import RecommendItem from "components/RecommendItem/RecommendItem";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import BScroll from "better-scroll";
import Load from "components/Load/Load";

export default {
  name: "Recommend",
  data() {
    return {
      sliderArr: [],
      songsList: []
    };
  },
  created() {
    //获取数据
    this._getRecommend();
    this._getDiscList();
  },
  mounted() {
    this._initBScroll();
    this.$nextTick(() => {
      //初始化swiper实例
      this._initSwiper();
    });
  },
  methods: {
    fun() {
      console.log(11);
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === 0) {
          this.sliderArr = res.data.slider;
        }
      });
    },
    _initSwiper() {
      //初始化swiper
      this.swiper = new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 1000
        },
        observer: true,
        observeParents: true,
      
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        this.songsList = res.data.list;
      });
    },
    _initBScroll() {
      this.scroll = new BScroll(this.$refs.recommendWrap, {
        probeType: 3,
        click: true
      });
    }
  },
  components: {
    RecommendItem,
    Load
  }
};
</script>

<style scoped>
.recommend_wrap {
  background-color: #eee;
}

.recommend_wrap {
  width: 100%;
  height: 5.87rem;
  overflow: hidden;
}

.swiper-container {
  width: 100%;
  height: 1.5rem;
}

/*更改小圆点的颜色*/
.recommend_wrap >>> .swiper-pagination-bullet-active {
  background-color: #31c27c;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  color: yellowgreen;
  font-size: 0.16rem;
  font-weight: 600;
}
</style>
