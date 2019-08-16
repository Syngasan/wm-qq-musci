const state = {
  singer:{},
  playing:false,
  fullScreen:false,
  playList:[],
  sequenceList:[],//顺序
  mode:1,//播放模式 0单曲 ; 1随机 ; 2顺序
  currentIndex:-1,
  dicObj:{},
  topObj:{},//排行版的每个对象

}
export default state
