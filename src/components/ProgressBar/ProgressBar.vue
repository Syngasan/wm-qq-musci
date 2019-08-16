<template>
  <div
    class="progress_bar"
    ref="bar"
    @touchstart.stop.prevent="touchStart"
    @touchmove.stop.prevent="touchmove"
    @touchend.stop.prevent="touchend"
  >
    <div class="top" ref="top"></div>
    <div class="bottom"></div>
    <div class="spot" ref="spot"></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ProgressBar",
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    //初始化一个touch对象
    this.touchObj = {
      initTouch: false
    };
  },
  methods: {
    touchStart(e) {
      this.touchObj.startX = e.touches[0].pageX;
      this.touchObj.startWidth = this.$refs.top.clientWidth;
      this.touchObj.initTouch = true;
    },
    touchmove(e) {
      if (!this.touchObj.initTouch) {
        return;
      }
      let moveX = e.touches[0].pageX;
      let spotWidth = this.$refs.spot.clientWidth;
      //let detal = Math.min(Math.max(0, moveX - this.touchObj.startX), this.$refs.bar.clientWidth - spotWidth)
      let detal = Math.min(
        moveX - this.touchObj.startX,
        this.$refs.bar.clientWidth
      );
      this.$refs.top.style.width = this.touchObj.startWidth + detal + "px";
      let spotX = Math.min(
        Math.max(0, this.touchObj.startWidth + detal),
        this.$refs.bar.clientWidth - spotWidth
      );
      this.$refs.spot.style.transform = `translate3d(${spotX}px,0,0)`;
    },
    touchend() {
      let newPercent =
        (this.$refs.top.clientWidth + this.$refs.spot.clientWidth) /
        this.$refs.bar.clientWidth;
      this.$emit("changePercent", newPercent);
      this.touchObj.initTouch = false;
      this.setPlaying(true);
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING"
    })
  },

  watch: {
    percent(newVal) {
      if (newVal >= 0 && !this.touchObj.initTouch) {
        let barWidth = this.$refs.bar.clientWidth;
        let moveWidth = newVal * barWidth;
        let spotWidth = this.$refs.spot.clientWidth;
        this.$refs.spot.style.transform = `translate3d(${moveWidth -
          spotWidth}px,0,0)`;
        this.$refs.top.style.width = moveWidth + "px";
      }
    }
  }
};
</script>

<style scoped>
.progress_bar {
  width: 100%;
  height: 0.2rem;
  position: relative;
}

.bottom {
  width: 100%;
  height: 0.02rem;
  position: absolute;
  top: 50%;
  margin-top: -0.01rem;
  background-color: rgba(0, 0, 0, 0.3);
}

.top {
  position: absolute;
  top: 50%;
  width: 0;
  height: 0.03rem;
  margin-top: -0.015rem;
  background-color: orange;
  z-index: 10;
}

.spot {
  position: absolute;
  top: 50%;
  z-index: 10;
  margin-top: -0.07rem;
  width: 0.14rem;
  height: 0.14rem;
  margin-top: -0.07rem;
  border-radius: 50%;
  background-color: orange;
}
</style>
