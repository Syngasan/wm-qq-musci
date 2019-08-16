<template>
  <div class="search_inp_wrap">
    <span class="iconfont iconsousuo1 icon_search"></span>
    <input class="inp_box" type="text" :placeholder="placeholder" v-model="query" />
    <span class="iconfont iconcancel icon_cancle1" v-show="query" @click="clearQuery"></span>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: ""
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    clearQuery() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    }
  },
  watch: {
    query(newVal) {
      this.$emit("query", newVal);
    }
  }
};
</script>

<style scoped>
.search_inp_wrap {
  width: 80%;
  height: 0.3rem;
  padding: 0.1rem 0.3rem;
  background-color: #eee;
  margin: 0.1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.08rem;
}
.inp_box {
  width: 100%;
  height: 100%;
  border: none;
  text-indent: 1em;
}
.icon_search {
  margin-left: -0.2rem;
}
.icon_cancle1 {
  margin-right: -0.2rem;
}
</style>