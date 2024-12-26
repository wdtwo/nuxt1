var list = [
  "162.158.0.0/15",
  "103.21.244.0/22",
  "173.245.48.0/20",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "104.16.0.0/12",
  "172.64.0.0/13",
  "131.0.72.0/22"
]

  
  let arr1 = []
  for(let i = 0;i < list.length;i++){
    arr1 = arr1.concat(init(list[i]))
  }
  // arr1.map(v=>{
  //   console.log(v)
  // })
  console.log(arr1);
  //console.log(arr1.length);


  function init(ipmask){

    //分割掩码ip
    let [ip,yanma] = ipmask.split('/')
    //console.log(ip,yanma);
    let yanmaArr = []
    for(let i = 0;i < 32;i++){
      yanmaArr.push(i < yanma ? "1" :"0")
    }
    yanmaArr.splice(24,0,',')
    yanmaArr.splice(16,0,',')
    yanmaArr.splice(8,0,',')
    let morenyanma = yanmaArr.join('').split(',')

    ip = ip.split('.')
    ip.map((v,w)=>{
      ip[w] = numToHex(v)
    })
    //console.log(ip);
    //console.log(morenyanma);
    let arr2 = []
    for(let i = 0;i < ip.length;i ++){
      arr2.push( parseInt(yu(ip[i],morenyanma[i]),2) )
    }
    //console.log('arr2',arr2);
    let output = []
    //console.log(Math.pow(2,32 - yanma));//网络号向主机号借几位, 可用主机号个数需要减2
    //console.log(yanma);
    //console.log(Math.pow(2,32 - yanma) - 2);
    for(let i = 0;i < Math.pow(2,32 - yanma) - 2;i++){
      let arr = digui(arr2.concat(),3)
      //console.log(arr);
      output.push(arr)
      arr2 = arr
    }

    return output
  }
  function digui(arr,n){
    var arr = arr.concat()
    if(n < 1){
      return arr;
    }
    arr[n] += 1
    if(arr[n] >= 255){
      arr = digui(arr,n-1)
      //arr[n - 1] += 1
      arr[n] = 0
    }
    return arr;
  }

  //与运算
  function yu(a='11111111',b='00000000'){
    var arr1 = []
    for(let i = 0 ;i < a.length;i++){
      arr1.push((a[i] == b[i]) ? a[i] : 0)
    }
    return arr1.join('')
  }
  
  //数字转换成二进制
  function numToHex(num){
    //ip转换成2进制
    let num1 = (num >>> 0).toString(2)
    let len = num1.length
    return len < 8 ? `${"0".repeat(8-len)}${num1}` : num1
  }


