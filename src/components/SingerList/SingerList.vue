<template>
  <div class="singer_wrap" ref="singer_wrap">
    <ul>
      <li v-for="(item,ind) in data" ref="list_group" :key="ind">
        <h2 class="title">{{item.title}}</h2>
        <ul>
          <li class="item" v-for="(val,index) in item.items" @click="selectSinger(val)" :key="index">
            <img v-lazy="val.avatar">
            <span>{{val.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="right_bar" @touchstart="touchstart" @touchmove.stop.prevent="touchmove">
      <ul>
        <li v-for="(val,ind) in rightArr" :key="ind" :data-index="ind" :class="{'currentClass':currentIndex==ind}">
          {{val}}
        </li>
      </ul>
    </div>
    <div class="fixed_wrap" v-show="scrollY>=0">
      <h2 class="fixed_title">{{fixedTitle}}</h2>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  //给一个按钮的高度
  const H = 22.41

  export default {
    name: "SingerList",
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scrollY: 0,
        currentIndex: 0
      }
    },
    created() {
      //初始化一个对象来存放每次快速入口的偏移量
      this.yObj = {}
    },
    mounted() {
      this._initBScroll()
      this.scroll.on('scroll', (pos) => {
        this.scrollY = -pos.y//向上是负值
      })
    },
    updated() {
      this.tops = []
      let height = 0
      this.tops.push(height)
      this.$refs.list_group.map(val => {
        height += val.clientHeight
        this.tops.push(height)
      })
    },
    methods: {
      _initBScroll() {
        this.scroll = new BScroll(this.$refs.singer_wrap, {
          probeType: 3,
          click: true
        })
      },
      //触摸切换
      touchstart(e) {
        let index = e.target.dataset.index
        this.currentIndex = index
        this.scroll.scrollToElement(this.$refs.list_group[index], 0)
        //第一次的偏移量
        let y1 = e.touches[0].pageY
        this.yObj.index1 = index
        this.yObj.y1 = y1
      },
      //滑动
      touchmove(e) {
        let y2 = e.touches[0].pageY
        this.yObj.y2 = y2
        let delta = (this.yObj.y2 - this.yObj.y1) / H | 0 //相当于Math.floor()
        let currentInd = this.yObj.index1 * 1 + delta
        if (currentInd <= 22 && currentInd >= 0) {
          this.currentIndex = currentInd
        }
        this.scroll.scrollToElement(this.$refs.list_group[currentInd], 0)
        this.scrollY = this.$refs.list_group[currentInd]
      },
      selectSinger (singer) {
       this.$emit('select',singer)
      }
    },
    components: {},
    computed: {
      rightArr() {
        return this.data.map(val => {
          return val.title.substring(0, 1)
        })
      },
      fixedTitle() {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      scrollY(newY) {
        for (let i = 0; i < this.tops.length - 1; i++) {
          if (newY >= this.tops[i] && newY < this.tops[i + 1]) {
            this.currentIndex = i
            return
          }
        }
      }
    }
  }
</script>

<style scoped>
  .singer_wrap {
    /*width: 100%;*/
    overflow: hidden;
    height: 5.87rem;
    background-color: #fff;
    position: relative;
  }

  .title {
    width: 100%;
    height: .2rem;
    line-height: .2rem;
    padding: 0 .2rem;
    background-color: #ccc;
    font-size: .14rem;
    box-sizing: border-box;
  }

  .fixed_wrap {
    width: 100%;
    height: .2rem;
    line-height: .2rem;
    padding: 0 .2rem;
    background-color: #ccc;
    font-size: .14rem;
    box-sizing: border-box;
    position: fixed;
    top: .8rem;
    left: 0;
  }

  .fixed_title {
    font-size: .14rem;
  }

  .item {
    display: flex;
    padding: .1rem 0;
    align-items: center;
  }

  .item img {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    padding: 0 .4rem;
  }

  .item span {
    font-size: .16rem;
  }

  .right_bar {
    position: absolute;
    top: .4rem;
    right: 0;
    /*border:1px solid ;*/
    background: rgba(0, 0, 0, .1);
    border-radius: .4rem;
  }

  .right_bar li {
    /*width: .3rem;*/
    text-align: center;
    padding: .02rem;
  }

  .currentClass {
    color: red;
  }
</style>
