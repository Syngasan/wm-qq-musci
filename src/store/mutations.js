import * as types from './mutations-types'

const mutations = {
  //把singer对象存入state中
  [types.SET_SINGER](state,singer){
    state.singer = singer
  },

  //设置播放暂停
  [types.SET_PLAYING](state,flag){
    state.playing = flag
  },

  //设置小屏大屏
  [types.SET_FULLSCREEN](state,flag){
    state.fullScreen= flag
  },

  //设置播放列表
  [types.SET_PLAYLIST](state,list){
    state.playList=list
  },

  //设置顺序播放列表
  [types.SET_SEQURNCELIST](state,list){
    state.sequenceList= list
  },

  //设置播放模式
  [types.SET_MODE](state,mode){
    state.mode = mode
  },

  //设置当前下标
  [types.SET_CURRENTINDEX](state,index){
    state.currentIndex = index
  },

  //设置Dic
  [types.SET_DICOBJ](state,obj){
    state.dicObj=obj
  },

  //设置topObj
  [types.SET_TOP_OBJ](state,obj){
    state.topObj=obj
  }





}
export default mutations
