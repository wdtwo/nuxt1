---
title: 移动端设置等比缩放
published: 2023-05-10 10:45:20
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 前端
tags:  [js,移动端]
draft: false
---
移动端设置等比缩放
<!--more-->
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta name="author" content="GaryWang">
	<meta name='renderer' content='webkit'>
	<meta http-equiv='X-UA-Compatible' content='IE=Edge,chrome=1' >
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="email=no">
	<title></title>
	<script>
        function autoScale(){
            var winW = document.documentElement.clientWidth;
            return Math.min (1,Math.min(winW / 750));
        }
        document.documentElement.style.cssText = 'font-size:'+(100 * autoScale())+'px';
        //1rem = 100px
	</script>
	<style></style>
</head>
<body>
	<div class="wrap">
		
	</div>
</body>
</html>
```


```css
/*mobile css clear default*/
@charset "utf-8";
/*clear-default start*/
*,blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend,ul,ol,li,p,pre,th,td,textarea{margin: 0;padding: 0;}
html,input,button,select,textarea{font-size: 24rem;color:#232323;font-family: "PingFang SC", "DroidSans","microsoft yahei", "微软雅黑", Tahoma, Helvetica, Arial, sans-serif;outline: none;}
address,cite,dfn,em,var,i,b,u{font-style:normal;}
input,button,select,textarea{border-radius: 0;}
a,a:active,a:link,a:visited,a:focus,a:hover{-webkit-tap-highlight-color: rgba(0,0,0,0);text-decoration: none;-webkit-user-select: none;user-select: none;}
a{color:inherit;}
input[type=button],input[type=submit],button{-webkit-appearance: none;appearance: none;}
input,button {
    font-size: .28rem;
    outline: none;
}
img,a img{border:none;-webkit-user-select: none;user-select: none;}
hr{border:none;border-bottom:1px solid #666;}
ul,ol,dl,li{list-style: none;}
table{font-size: inherit;border-collapse: collapse;border-spacing: 0;}
textarea{display: block;resize: none;}
.f100{font-size:1rem!important;}
.f98{font-size:.98rem!important;}
.f96{font-size:.96rem!important;}
.f94{font-size:.94rem!important;}
.f92{font-size:.92rem!important;}
.f90{font-size:.90rem!important;}
.f88{font-size:.88rem!important;}
.f86{font-size:.86rem!important;}
.f84{font-size:.84rem!important;}
.f82{font-size:.82rem!important;}
.f80{font-size:.80rem!important;}
.f78{font-size:.78rem!important;}
.f76{font-size:.76rem!important;}
.f74{font-size:.74rem!important;}
.f72{font-size:.72rem!important;}
.f70{font-size:.70rem!important;}
.f68{font-size:.68rem!important;}
.f66{font-size:.66rem!important;}
.f64{font-size:.64rem!important;}
.f62{font-size:.62rem!important;}
.f60{font-size:.60rem!important;}
.f58{font-size:.58rem!important;}
.f56{font-size:.56rem!important;}
.f54{font-size:.54rem!important;}
.f52{font-size:.52rem!important;}
.f50{font-size:.50rem!important;}
.f48{font-size:.48rem!important;}
.f46{font-size:.46rem!important;}
.f44{font-size:.44rem!important;}
.f42{font-size:.42rem!important;}
.f40{font-size:.40rem!important;}
.f38{font-size:.38rem!important;}
.f36{font-size:.36rem!important;}
.f34{font-size:.34rem!important;}
.f32{font-size:.32rem!important;}
.f30{font-size:.30rem!important;}
.f28{font-size:.28rem!important;}
.f26{font-size:.26rem!important;}
.f24{font-size:.24rem!important;}
.f22{font-size:.22rem!important;}
.f20{font-size:.20rem!important;}
.f18{font-size:.18rem!important;}
.f16{font-size:.16rem!important;}
.f14{font-size:.14rem!important;}
.f12{font-size:.12rem!important;}
.f10{font-size:.12rem!important;}
.f-w-b {font-weight: bold!important;}
.f-w-n {font-weight: normal!important;}
.fl{float: left!important;}
.fr{float: right!important;}
.clearfix:after{content: "";display: block;visibility: hidden;clear: both;font-size: 0;height: 0;line-height: 0;}
.clearfix{*zoom: 1;}
.re{position: relative!important;}
.ab{position: absolute!important;}
.fixed{position: fixed!important;}
.none{display: none!important;}
.block{display: block!important;}
.show {display: block!important;}
.hide {display: none!important;}
.inline{display: inline!important;}
.inlb{display: inline-block !important;;}
.m-c{margin:0 auto!important;}
.t-c{text-align:center!important;}
.t-l{text-align:left!important;}
.t-r{text-align:right!important;}
.t-j{text-align: justify!important;}

.no-m { margin:0 !important;}
.no-m-t { margin-top:0 !important;}
.no-m-r { margin-right:0 !important;}
.no-m-b { margin-bottom:0 !important;}
.no-m-l { margin-left:0 !important;}
.no-p { padding:0 !important;}
.no-p-t { padding-top:0 !important;}
.no-p-r { padding-right:0 !important;}
.no-p-b { padding-bottom:0 !important;}
.no-p-l { padding-left:0 !important;}
.no-b { border: none !important;}
.no-b-t { border-top:0 !important;}
.no-b-r { border-right:0 !important;}
.no-b-b { border-bottom:0 !important;}
.no-b-l { border-left:0 !important;}

.flex {display: flex;flex-direction: row;justify-content: center;align-items: center;}
.flex-column {flex-direction: column!important;}
.flex-jus-start {justify-content: flex-start!important;;}
.flex-jus-end {justify-content: flex-end!important;;}
.flex-jus-between {justify-content: space-between!important;;}
.flex-jus-around {justify-content: space-around!important;;}
.flex-item-start {align-items: flex-start!important;;}
.flex-item-end {align-items: flex-end!important;;}
.flex-item-between {align-items: space-between!important;;}
.flex-item-around {align-items: space-around!important;}
.flex-wrap {flex-wrap: wrap!important;}
.flex-nowrap {flex-wrap: nowrap!important;}

.no-p{padding:0 !important;}
.no-p-t{padding-top:0 !important;}
.no-p-r{padding-right:0 !important;}
.no-p-b{padding-bottom:0 !important;}
.no-p-l{padding-left:0 !important;}
.no-m{margin:0 !important;}
.no-m-t{margin-top:0 !important;}
.no-m-r{margin-right:0 !important;}
.no-m-b{margin-bottom:0 !important;}
.no-m-l{margin-left:0 !important;}
.no-b{border: none !important;}
.no-b-t{border-top:0 !important;}
.no-b-r{border-right:0 !important;}
.no-b-b{border-bottom:0 !important;}
.no-b-l{border-left:0 !important;}
.m-0-5{margin:0 .05rem!important}
.m-0-10{margin:0 .1rem!important}
.m-0-15{margin:0 .15rem!important}
.m-0-20{margin:0 .2rem!important}
.m-0-25{margin:0 .25rem!important}
.m-0-30{margin:0 .3rem!important}
.m-0-35{margin:0 .35rem!important}
.m-0-40{margin:0 .4rem!important}
.m-0-45{margin:0 .45rem!important}
.m-0-50{margin:0 .5rem!important}
.m-0-55{margin:0 .55rem!important}
.m-0-60{margin:0 .6rem!important}
.m-0-65{margin:0 .65rem!important}
.m-0-70{margin:0 .7rem!important}
.m-0-75{margin:0 .75rem!important}
.m-0-80{margin:0 .8rem!important}
.m-0-85{margin:0 .85rem!important}
.m-0-90{margin:0 .9rem!important}
.m-0-95{margin:0 .95rem!important}
.m-0-100{margin:0 1rem!important}
.m-0-105{margin:0 1.05rem!important}
.m-0-110{margin:0 1.1rem!important}
.m-0-115{margin:0 1.15rem!important}
.m-0-120{margin:0 1.20rem!important}
.m-0-125{margin:0 1.25rem!important}
.m-0-130{margin:0 1.3rem!important}
.m-0-135{margin:0 1.35rem!important}
.m-0-140{margin:0 1.4rem!important}
.m-0-145{margin:0 1.45rem!important}
.m-0-150{margin:0 1.5rem!important}

.m-5-0 {margin:.05rem 0!important}
.m-10-0 {margin:.1rem 0!important}
.m-15-0 {margin:.15rem 0!important}
.m-20-0 {margin:.2rem 0!important}
.m-25-0 {margin:.25rem 0!important}
.m-30-0 {margin:.3rem 0!important}
.m-35-0 {margin:.35rem 0!important}
.m-40-0 {margin:.4rem 0!important}
.m-45-0 {margin:.45rem 0!important}
.m-50-0 {margin:.5rem 0!important}
.m-55-0 {margin:.55rem 0!important}
.m-60-0 {margin:.6rem 0!important}
.m-65-0 {margin:.65rem 0!important}
.m-70-0 {margin:.7rem 0!important}
.m-75-0 {margin:.75rem 0!important}
.m-80-0 {margin:.8rem 0!important}
.m-85-0 {margin:.85rem 0!important}
.m-90-0 {margin:.9rem 0!important}
.m-95-0 {margin:.95rem 0!important}
.m-100-0 {margin:1rem 0!important}
.m-105-0 {margin:1.05rem 0!important}
.m-110-0 {margin:1.1rem 0!important}
.m-115-0 {margin:1.15rem 0!important}
.m-120-0 {margin:1.20rem 0!important}
.m-125-0 {margin:1.25rem 0!important}
.m-130-0 {margin:1.3rem 0!important}
.m-135-0 {margin:1.35rem 0!important}
.m-140-0 {margin:1.4rem 0!important}
.m-145-0 {margin:1.45rem 0!important}
.m-150-0 {margin:1.5rem 0!important}

.m-t-5 {margin-top:.05rem!important}
.m-t-10 {margin-top:.1rem!important}
.m-t-15 {margin-top:.15rem!important}
.m-t-20 {margin-top:.2rem!important}
.m-t-25 {margin-top:.25rem!important}
.m-t-30 {margin-top:.3rem!important}
.m-t-35 {margin-top:.35rem!important}
.m-t-40 {margin-top:.4rem!important}
.m-t-45 {margin-top:.45rem!important}
.m-t-50 {margin-top:.5rem!important}
.m-t-55 {margin-top:.55rem!important}
.m-t-60 {margin-top:.6rem!important}
.m-t-65 {margin-top:.65rem!important}
.m-t-70 {margin-top:.7rem!important}
.m-t-75 {margin-top:.75rem!important}
.m-t-80 {margin-top:.8rem!important}
.m-t-85 {margin-top:.85rem!important}
.m-t-90 {margin-top:.9rem!important}
.m-t-95 {margin-top:.95rem!important}
.m-t-100 {margin-top:1rem!important}
.m-t-105 {margin-top:1.05rem!important}
.m-t-110 {margin-top:1.1rem!important}
.m-t-115 {margin-top:1.15rem!important}
.m-t-120 {margin-top:1.20rem!important}
.m-t-125 {margin-top:1.25rem!important}
.m-t-130 {margin-top:1.3rem!important}
.m-t-135 {margin-top:1.35rem!important}
.m-t-140 {margin-top:1.4rem!important}
.m-t-145 {margin-top:1.45rem!important}
.m-t-150 {margin-top:1.5rem!important}

.m-b-5 {margin-bottom:.05rem!important}
.m-b-10 {margin-bottom:.1rem!important}
.m-b-15 {margin-bottom:.15rem!important}
.m-b-20 {margin-bottom:.2rem!important}
.m-b-25 {margin-bottom:.25rem!important}
.m-b-30 {margin-bottom:.3rem!important}
.m-b-35 {margin-bottom:.35rem!important}
.m-b-40 {margin-bottom:.4rem!important}
.m-b-45 {margin-bottom:.45rem!important}
.m-b-50 {margin-bottom:.5rem!important}
.m-b-55 {margin-bottom:.55rem!important}
.m-b-60 {margin-bottom:.6rem!important}
.m-b-65 {margin-bottom:.65rem!important}
.m-b-70 {margin-bottom:.7rem!important}
.m-b-75 {margin-bottom:.75rem!important}
.m-b-80 {margin-bottom:.8rem!important}
.m-b-85 {margin-bottom:.85rem!important}
.m-b-90 {margin-bottom:.9rem!important}
.m-b-95 {margin-bottom:.95rem!important}
.m-b-100 {margin-bottom:1rem!important}
.m-b-105 {margin-bottom:1.05rem!important}
.m-b-110 {margin-bottom:1.1rem!important}
.m-b-115 {margin-bottom:1.15rem!important}
.m-b-120 {margin-bottom:1.20rem!important}
.m-b-125 {margin-bottom:1.25rem!important}
.m-b-130 {margin-bottom:1.3rem!important}
.m-b-135 {margin-bottom:1.35rem!important}
.m-b-140 {margin-bottom:1.4rem!important}
.m-b-145 {margin-bottom:1.45rem!important}
.m-b-150 {margin-bottom:1.5rem!important}

.m-l-5 {margin-left:.05rem!important}
.m-l-10 {margin-left:.1rem!important}
.m-l-15 {margin-left:.15rem!important}
.m-l-20 {margin-left:.2rem!important}
.m-l-25 {margin-left:.25rem!important}
.m-l-30 {margin-left:.3rem!important}
.m-l-35 {margin-left:.35rem!important}
.m-l-40 {margin-left:.4rem!important}
.m-l-45 {margin-left:.45rem!important}
.m-l-50 {margin-left:.5rem!important}
.m-l-55 {margin-left:.55rem!important}
.m-l-60 {margin-left:.6rem!important}
.m-l-65 {margin-left:.65rem!important}
.m-l-70 {margin-left:.7rem!important}
.m-l-75 {margin-left:.75rem!important}
.m-l-80 {margin-left:.8rem!important}
.m-l-85 {margin-left:.85rem!important}
.m-l-90 {margin-left:.9rem!important}
.m-l-95 {margin-left:.95rem!important}
.m-l-100 {margin-left:1rem!important}
.m-l-105 {margin-left:1.05rem!important}
.m-l-110 {margin-left:1.1rem!important}
.m-l-115 {margin-left:1.15rem!important}
.m-l-120 {margin-left:1.20rem!important}
.m-l-125 {margin-left:1.25rem!important}
.m-l-130 {margin-left:1.3rem!important}
.m-l-135 {margin-left:1.35rem!important}
.m-l-140 {margin-left:1.4rem!important}
.m-l-145 {margin-left:1.45rem!important}
.m-l-150 {margin-left:1.5rem!important}

.m-r-5 {margin-right:.05rem!important}
.m-r-10 {margin-right:.1rem!important}
.m-r-15 {margin-right:.15rem!important}
.m-r-20 {margin-right:.2rem!important}
.m-r-25 {margin-right:.25rem!important}
.m-r-30 {margin-right:.3rem!important}
.m-r-35 {margin-right:.35rem!important}
.m-r-40 {margin-right:.4rem!important}
.m-r-45 {margin-right:.45rem!important}
.m-r-50 {margin-right:.5rem!important}
.m-r-55 {margin-right:.55rem!important}
.m-r-60 {margin-right:.6rem!important}
.m-r-65 {margin-right:.65rem!important}
.m-r-70 {margin-right:.7rem!important}
.m-r-75 {margin-right:.75rem!important}
.m-r-80 {margin-right:.8rem!important}
.m-r-85 {margin-right:.85rem!important}
.m-r-90 {margin-right:.9rem!important}
.m-r-95 {margin-right:.95rem!important}
.m-r-100 {margin-right:1rem!important}
.m-r-105 {margin-right:1.05rem!important}
.m-r-110 {margin-right:1.1rem!important}
.m-r-115 {margin-right:1.15rem!important}
.m-r-120 {margin-right:1.20rem!important}
.m-r-125 {margin-right:1.25rem!important}
.m-r-130 {margin-right:1.3rem!important}
.m-r-135 {margin-right:1.35rem!important}
.m-r-140 {margin-right:1.4rem!important}
.m-r-145 {margin-right:1.45rem!important}
.m-r-150 {margin-right:1.5rem!important}

.p-0-5{padding:0 .05rem!important}
.p-0-10{padding:0 .1rem!important}
.p-0-15{padding:0 .15rem!important}
.p-0-20{padding:0 .2rem!important}
.p-0-25{padding:0 .25rem!important}
.p-0-30{padding:0 .3rem!important}
.p-0-35{padding:0 .35rem!important}
.p-0-40{padding:0 .4rem!important}
.p-0-45{padding:0 .45rem!important}
.p-0-50{padding:0 .5rem!important}
.p-0-55{padding:0 .55rem!important}
.p-0-60{padding:0 .6rem!important}
.p-0-65{padding:0 .65rem!important}
.p-0-70{padding:0 .7rem!important}
.p-0-75{padding:0 .75rem!important}
.p-0-80{padding:0 .8rem!important}
.p-0-85{padding:0 .85rem!important}
.p-0-90{padding:0 .9rem!important}
.p-0-95{padding:0 .95rem!important}
.p-0-100{padding:0 1rem!important}
.p-0-105{padding:0 1.05rem!important}
.p-0-110{padding:0 1.1rem!important}
.p-0-115{padding:0 1.15rem!important}
.p-0-120{padding:0 1.20rem!important}
.p-0-125{padding:0 1.25rem!important}
.p-0-130{padding:0 1.3rem!important}
.p-0-135{padding:0 1.35rem!important}
.p-0-140{padding:0 1.4rem!important}
.p-0-145{padding:0 1.45rem!important}
.p-0-150{padding:0 1.5rem!important}

.p-5-0 {padding:.05rem 0!important}
.p-10-0 {padding:.1rem 0!important}
.p-15-0 {padding:.15rem 0!important}
.p-20-0 {padding:.2rem 0!important}
.p-25-0 {padding:.25rem 0!important}
.p-30-0 {padding:.3rem 0!important}
.p-35-0 {padding:.35rem 0!important}
.p-40-0 {padding:.4rem 0!important}
.p-45-0 {padding:.45rem 0!important}
.p-50-0 {padding:.5rem 0!important}
.p-55-0 {padding:.55rem 0!important}
.p-60-0 {padding:.6rem 0!important}
.p-65-0 {padding:.65rem 0!important}
.p-70-0 {padding:.7rem 0!important}
.p-75-0 {padding:.75rem 0!important}
.p-80-0 {padding:.8rem 0!important}
.p-85-0 {padding:.85rem 0!important}
.p-90-0 {padding:.9rem 0!important}
.p-95-0 {padding:.95rem 0!important}
.p-100-0 {padding:1rem 0!important}
.p-105-0 {padding:1.05rem 0!important}
.p-110-0 {padding:1.1rem 0!important}
.p-115-0 {padding:1.15rem 0!important}
.p-120-0 {padding:1.20rem 0!important}
.p-125-0 {padding:1.25rem 0!important}
.p-130-0 {padding:1.3rem 0!important}
.p-135-0 {padding:1.35rem 0!important}
.p-140-0 {padding:1.4rem 0!important}
.p-145-0 {padding:1.45rem 0!important}
.p-150-0 {padding:1.5rem 0!important}

.p-t-5 {padding-top:.05rem!important}
.p-t-10 {padding-top:.1rem!important}
.p-t-15 {padding-top:.15rem!important}
.p-t-20 {padding-top:.2rem!important}
.p-t-25 {padding-top:.25rem!important}
.p-t-30 {padding-top:.3rem!important}
.p-t-35 {padding-top:.35rem!important}
.p-t-40 {padding-top:.4rem!important}
.p-t-45 {padding-top:.45rem!important}
.p-t-50 {padding-top:.5rem!important}
.p-t-55 {padding-top:.55rem!important}
.p-t-60 {padding-top:.6rem!important}
.p-t-65 {padding-top:.65rem!important}
.p-t-70 {padding-top:.7rem!important}
.p-t-75 {padding-top:.75rem!important}
.p-t-80 {padding-top:.8rem!important}
.p-t-85 {padding-top:.85rem!important}
.p-t-90 {padding-top:.9rem!important}
.p-t-95 {padding-top:.95rem!important}
.p-t-100 {padding-top:1rem!important}
.p-t-105 {padding-top:1.05rem!important}
.p-t-110 {padding-top:1.1rem!important}
.p-t-115 {padding-top:1.15rem!important}
.p-t-120 {padding-top:1.20rem!important}
.p-t-125 {padding-top:1.25rem!important}
.p-t-130 {padding-top:1.3rem!important}
.p-t-135 {padding-top:1.35rem!important}
.p-t-140 {padding-top:1.4rem!important}
.p-t-145 {padding-top:1.45rem!important}
.p-t-150 {padding-top:1.5rem!important}

.p-b-5 {padding-bottom:.05rem!important}
.p-b-10 {padding-bottom:.1rem!important}
.p-b-15 {padding-bottom:.15rem!important}
.p-b-20 {padding-bottom:.2rem!important}
.p-b-25 {padding-bottom:.25rem!important}
.p-b-30 {padding-bottom:.3rem!important}
.p-b-35 {padding-bottom:.35rem!important}
.p-b-40 {padding-bottom:.4rem!important}
.p-b-45 {padding-bottom:.45rem!important}
.p-b-50 {padding-bottom:.5rem!important}
.p-b-55 {padding-bottom:.55rem!important}
.p-b-60 {padding-bottom:.6rem!important}
.p-b-65 {padding-bottom:.65rem!important}
.p-b-70 {padding-bottom:.7rem!important}
.p-b-75 {padding-bottom:.75rem!important}
.p-b-80 {padding-bottom:.8rem!important}
.p-b-85 {padding-bottom:.85rem!important}
.p-b-90 {padding-bottom:.9rem!important}
.p-b-95 {padding-bottom:.95rem!important}
.p-b-100 {padding-bottom:1rem!important}
.p-b-105 {padding-bottom:1.05rem!important}
.p-b-110 {padding-bottom:1.1rem!important}
.p-b-115 {padding-bottom:1.15rem!important}
.p-b-120 {padding-bottom:1.20rem!important}
.p-b-125 {padding-bottom:1.25rem!important}
.p-b-130 {padding-bottom:1.3rem!important}
.p-b-135 {padding-bottom:1.35rem!important}
.p-b-140 {padding-bottom:1.4rem!important}
.p-b-145 {padding-bottom:1.45rem!important}
.p-b-150 {padding-bottom:1.5rem!important}

.p-l-5 {padding-left:.05rem!important}
.p-l-10 {padding-left:.1rem!important}
.p-l-15 {padding-left:.15rem!important}
.p-l-20 {padding-left:.2rem!important}
.p-l-25 {padding-left:.25rem!important}
.p-l-30 {padding-left:.3rem!important}
.p-l-35 {padding-left:.35rem!important}
.p-l-40 {padding-left:.4rem!important}
.p-l-45 {padding-left:.45rem!important}
.p-l-50 {padding-left:.5rem!important}
.p-l-55 {padding-left:.55rem!important}
.p-l-60 {padding-left:.6rem!important}
.p-l-65 {padding-left:.65rem!important}
.p-l-70 {padding-left:.7rem!important}
.p-l-75 {padding-left:.75rem!important}
.p-l-80 {padding-left:.8rem!important}
.p-l-85 {padding-left:.85rem!important}
.p-l-90 {padding-left:.9rem!important}
.p-l-95 {padding-left:.95rem!important}
.p-l-100 {padding-left:1rem!important}
.p-l-105 {padding-left:1.05rem!important}
.p-l-110 {padding-left:1.1rem!important}
.p-l-115 {padding-left:1.15rem!important}
.p-l-120 {padding-left:1.20rem!important}
.p-l-125 {padding-left:1.25rem!important}
.p-l-130 {padding-left:1.3rem!important}
.p-l-135 {padding-left:1.35rem!important}
.p-l-140 {padding-left:1.4rem!important}
.p-l-145 {padding-left:1.45rem!important}
.p-l-150 {padding-left:1.5rem!important}

.p-r-5 {padding-right:.05rem!important}
.p-r-10 {padding-right:.1rem!important}
.p-r-15 {padding-right:.15rem!important}
.p-r-20 {padding-right:.2rem!important}
.p-r-25 {padding-right:.25rem!important}
.p-r-30 {padding-right:.3rem!important}
.p-r-35 {padding-right:.35rem!important}
.p-r-40 {padding-right:.4rem!important}
.p-r-45 {padding-right:.45rem!important}
.p-r-50 {padding-right:.5rem!important}
.p-r-55 {padding-right:.55rem!important}
.p-r-60 {padding-right:.6rem!important}
.p-r-65 {padding-right:.65rem!important}
.p-r-70 {padding-right:.7rem!important}
.p-r-75 {padding-right:.75rem!important}
.p-r-80 {padding-right:.8rem!important}
.p-r-85 {padding-right:.85rem!important}
.p-r-90 {padding-right:.9rem!important}
.p-r-95 {padding-right:.95rem!important}
.p-r-100 {padding-right:1rem!important}
.p-r-105 {padding-right:1.05rem!important}
.p-r-110 {padding-right:1.1rem!important}
.p-r-115 {padding-right:1.15rem!important}
.p-r-120 {padding-right:1.20rem!important}
.p-r-125 {padding-right:1.25rem!important}
.p-r-130 {padding-right:1.3rem!important}
.p-r-135 {padding-right:1.35rem!important}
.p-r-140 {padding-right:1.4rem!important}
.p-r-145 {padding-right:1.45rem!important}
.p-r-150 {padding-right:1.5rem!important}

.c-white {color:white !important;}
.c-black {color:black !important;}
.c-111 {color: #111!important;}
.c-222 {color: #222!important;}
.c-333 {color: #333!important;}
.c-444 {color: #444!important;}
.c-555 {color: #555!important;}
.c-666 {color: #666!important;}
.c-777 {color: #777!important;}
.c-888 {color: #888!important;}
.c-999 {color: #999!important;}
.c-aaa {color: #aaa!important;}
.c-bbb {color: #bbb!important;}
.c-ccc {color: #ccc!important;}
.c-ddd {color: #ddd!important;}
.c-eee {color: #eee!important;}

.o0 {opacity: 0!important;}
.o1 {opacity: .1!important;}
.o2 {opacity: .2!important;}
.o3 {opacity: .3!important;}
.o4 {opacity: .4!important;}
.o5 {opacity: .5!important;}
.o6 {opacity: .6!important;}
.o7 {opacity: .7!important;}
.o8 {opacity: .8!important;}
.o9 {opacity: .9!important;}
.o10 {opacity: 1!important;}

.w5p {width: 5%!important;}
.w10p {width: 10%!important;}
.w15p {width: 15%!important;}
.w20p {width: 20%!important;}
.w25p {width: 25%!important;}
.w30p {width: 30%!important;}
.w35p {width: 35%!important;}
.w40p {width: 40%!important;}
.w45p {width: 45%!important;}
.w50p {width: 50%!important;}
.w55p {width: 55%!important;}
.w60p {width: 60%!important;}
.w65p {width: 65%!important;}
.w70p {width: 70%!important;}
.w75p {width: 75%!important;}
.w80p {width: 80%!important;}
.w85p {width: 85%!important;}
.w90p {width: 90%!important;}
.w95p {width: 95%!important;}
.w100p {width: 100%!important;}

.transition500{transition:all ease 500ms;}
.transition1000{transition:all ease 1000ms;}
.transition1500{transition:all ease 1500ms;}
.transition2000{transition:all ease 2000ms;}
.transition2500{transition:all ease 2500ms;}
.transition3000{transition:all ease 3000ms;}
.transition3500{transition:all ease 3500ms;}
.transition4000{transition:all ease 4000ms;}
.transition4500{transition:all ease 4500ms;}
.transition5000{transition:all ease 5000ms;}
.lh10{line-height:1;}
.lh11{line-height:1.1;}
.lh12{line-height:1.2;}
.lh13{line-height:1.3;}
.lh14{line-height:1.4;}
.lh15{line-height:1.5;}
.lh16{line-height:1.6;}
.lh17{line-height:1.7;}
.lh18{line-height:1.8;}
.lh19{line-height:1.9;}
.lh20{line-height:2;}
.lh21{line-height:2.1;}
.lh22{line-height:2.2;}
.lh23{line-height:2.3;}
.lh24{line-height:2.4;}
.lh25{line-height:2.5;}
.lh26{line-height:2.6;}
.lh27{line-height:2.7;}
.lh28{line-height:2.8;}
.lh29{line-height:2.9;}
.lh30{line-height:3;}


* {box-sizing: border-box;}
body {font-size:0.28rem;}
/*clear-default end*/
.wrap {
    width:7.5rem;
    /* min-height:10rem; */
    background: #eee;
    margin:0 auto;
}

```