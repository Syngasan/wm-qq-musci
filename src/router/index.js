import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "../components/Recommend/Recommend";
import Singer from "../components/Singer/Singer";
import Ranking from "../components/Ranking/Ranking";
import Search from "../components/Search/Search";
import SingerDetail from "../components/SingerDetail/SingerDetail";
import Disc from "../components/Disc/Disc";
import TopList from "../components/TopList/TopList";

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/dist/',
  routes: [
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: '/ranking',
      component: Ranking,
      children: [
        {
          path: ":id",
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/',
      redirect: '/recommend'
    }
  ]
})
