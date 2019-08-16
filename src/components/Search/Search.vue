<template>
  <div>
    <!-- 搜索框 -->
    <search-box @query="getQuery" :placeholder="placeholder" ref="search_box"></search-box>
    <!-- 热门和搜索历史 -->
    <div class="hot_history" v-show="!query">
      <div class="hot_search">
        <h3>热门搜索</h3>
        <ul class="list">
          <li
            @click="addQuery(item.k)"
            class="item"
            v-for="(item,ind) in hotKeyList"
            :key="ind"
          >{{item.k}}</li>
        </ul>
      </div>
    </div>

    <!-- 搜索建议 -->
    <suggest v-show="query" :query='query'></suggest>
  </div>
</template>

<script>
import SearchBox from "components/SearchBox/SearchBox";
import { getHotKey } from "api/search";
import Suggest from "components/Suggest/Suggest";

export default {
  name: "Search",
  data() {
    return {
      placeholder: "搜索歌单,歌曲,专辑",
      hotKeyList: [],
      query:''
    };
  },
  created() {
    this._getHotKey();
  },

  methods: {
    addQuery(query) {
      this.$refs.search_box.setQuery(query);
    },
    getQuery(query) {
      console.log(query);
      this.query = query
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === 0) {
          this.hotKeyList = res.data.hotkey.slice(0, 10);
        }
      });
    }
  },

  components: {
    SearchBox,
    Suggest
  }
};
</script>

<style scoped>
.hot_search {
  width: 90%;
  margin: 0 auto;
}
.list {
  width: 100%;
  height: 1.8rem;
  margin-top: 0.1rem;
}
.item {
  display: inline-block;
  height: 0.2rem;
  line-height: 0.2rem;
  border-radius: 0.04rem;
  padding: 0.05rem 0.1rem;
  background-color: #eee;
  color: #666;
  text-align: center;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}
</style>
