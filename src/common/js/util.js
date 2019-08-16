//取两个数之间的整数
export function getInt(n,m) {
  return Math.floor(Math.random()*(m-n+1)+n)
}


//打乱数组的方法
export function upSetList(list) {
  for(var i = 0; i<list.length;i++){
      let j = getInt(0,i)
    let tem = list[j]
    list[j] = list[i]
    list[i] = tem
  }
  return list
}
