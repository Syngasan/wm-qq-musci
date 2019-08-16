<template>
  <div class="suggest_wrap">
    <ul class="list">
      <li class="item" v-for="(item,ind) in suggestList" :key="ind">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { search } from "api/search";
export default {
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      page:1,
      suggestList:[]
    }
  },
  methods:{
    search () {
      search(this.query,this.page,this.showSinger).then(res=>{
        if(res.code === 0) {
          console.log(res)
        }
      })
    }
  },


  watch:{
    query () {
      this.search()
    }
  }
};
</script>

<style scoped>
.suggest_wrap {
  width: 90%;
  margin: 0 auto;
}
</style>