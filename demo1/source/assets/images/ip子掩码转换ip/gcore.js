var list = [
    "93.123.11.0/26",
    "92.223.108.0/27",
    "92.223.92.16/28",
    "92.46.108.104/30",
    "194.152.37.176/28"
  ]

  
  let arr1 = []
  for(let i = 0;i < list.length;i++){
    arr1 = arr1.concat(init(list[i]))
  }
  console.log(arr1);
  console.log(arr1.length);


  function init(ipmask){

    //分割掩码ip
    let [ip,yanma] = ipmask.split('/')
    //console.log(ip,yanma);

    let morenyanma = ['11111111','11111111','11111111','00000000']

    //设置借用了几位主机码
    morenyanma[3] = "1".repeat(yanma - 24) + "0".repeat(32 - yanma)

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
    //console.log(arr2);
    let output = []
    //console.log(Math.pow(2,32 - yanma));//网络号向主机号借几位, 可用主机号个数需要减2
    for(let i = 0;i < Math.pow(2,32 - yanma)-2;i++){
      arr2 = arr2.concat()
      arr2[3] = arr2[3]*1+1
      output.push(arr2)
    }
    return output
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

















//   let netmask = "194.152.37.176"
//   var netmask2CIDR = (netmask) => {
//     return (netmask.split('.').map(Number).map(part => (part >>> 0).toString(2)).join('')).split('1').length -1
//   }
//     // 24 转 255.255.255.0
//   var CDIR2netmask = (bitCount) => {
//       var mask=[];
//       for(var i=0;i<4;i++) {
//         var n = Math.min(bitCount, 8);
//         mask.push(256 - Math.pow(2, 8-n));
//         bitCount -= n;
//       }
//     return mask.join('.');
//   }
  
// console.log(netmask2CIDR(netmask));



