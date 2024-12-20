---
title: js移动端日期选择器
date: 2023-06-01 10:10:07
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js,移动端]
draft: false
---
依赖 day.js
[day.js](https://day.js.org/zh-CN/)
[下载地址](https://www.jsdelivr.com/package/npm/dayjs)
<!--more-->

通用css
```css
#datepicker {
    width: 7.5rem;
    position: fixed;
    left:50%;
    bottom:0;
    transform: translateX(-50%);
    z-index: 9;
    background-color: #eef0f4;
    padding: 0.3rem;
    user-select: none;
}
#datepicker .date-show{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
#datepicker .btn-left,
#datepicker .btn-right {
    width: 1rem;
    height:1rem;
    background-size: 50% auto!important;
    opacity: 0.99;
}
#datepicker .btn-left {
    background: url(../images/ico-left.svg) no-repeat center center;
}
#datepicker .btn-right {
    background: url(../images/ico-right.svg) no-repeat center center;
}
#datepicker .btn-left.disabled,
#datepicker .btn-right.disabled {
    opacity: 0.5;
}
#datepicker .date-text {
    position: absolute;
    left:50%;
    top:0.2rem;
    transform: translateX(-50%);
}
#datepicker .date-text {
    font-size: 0.4rem;
    color:#999;
}
#datepicker .date-week,
#datepicker .date-week li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#datepicker .date-week li {
    justify-content: center;
    width: .9rem;
    height:.9rem;
    font-size: 0.4rem;
    color:#b8b8b8;
}
#datepicker .date-day {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
#datepicker .date-day li {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: .9rem;
    height:.9rem;
    font-size: 0.4rem;
    color:#666;
    background-color: white;
    border-radius: 0.1rem;
    margin: 0.1rem 0.1rem 0 0;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.05);
    user-select: none;
}
#datepicker .date-day li.disabled {
    color:#b8b8b8;
}
#datepicker .date-day li:not(.disabled):active {
    box-shadow: -2px -2px rgba(0, 0, 0, 0.05);
}
#datepicker .date-day li:nth-child(7n){
    margin-right: 0;
}
#datepicker .date-day li.active {
    background-color: #3875c6;
    color:white;
}
#datepicker .date-day li.active.disabled {
    color:white;
    background-color: #ccc;
}
```


# 单选多选
```html
<script>
    let obj = new datePicker({
        dateDefault:"2023-05-28",//默认日期 默认选中会覆盖默认禁用
        dateStart:"2023-03-31",//开始日期
        dateEnd:"2023-04-20",//结束日期
        disabled:["2023-04-05"],//禁用的时间
        multiple:3,//多选 1是单选
        dateDefaultMultiple:["2023-05-06","2023-04-06"],//添加多个的默认时间 单选设置了也没用 默认选中会覆盖默认禁用
        callback:function(e){
            console.log(e);
        }
    })
    function del(){
        //注销
        obj.destory()
    }
</script>
```

```js
var datePicker = function(obj){
    var obj = obj || {}
    //多选保存选中的日期
    let dateSave = []
    //引用插件
    let today;
    //多选还是单选
    let multiple = obj.multiple || 1;
    //开始时间和结束时间
    let dateStart = obj.dateStart || "1970-01-01";
    let dateEnd = obj.dateEnd || "2099-12-31";

    //禁用时间
    let disabled = obj.disabled;
    //回调函数
    let callback = obj.callback || function(){
        console.log("默认callback");
    }
    let destory = function(){
        datePickerContent.remove()
    }
    if(window.dayjs){
        //判断结束范围是否大于开始范围
        if(dayjs(dateEnd).valueOf() <= dayjs(dateStart).valueOf()){
            console.log('请输入正确的时间范围');
            dateStart = "1970-01-01";
            dateEnd = "2099-12-31";
        }
        //判断是否多选
        if(multiple > 1 && obj.dateDefaultMultiple){

            //如果默认值里面有超过范围的则不添加
            for(let v of obj.dateDefaultMultiple){
                //console.log(v);
                if(
                    dayjs(v).valueOf() > dayjs(dateStart).valueOf() &&
                    dayjs(v).valueOf() <= dayjs(dateEnd).valueOf()
                ){
                    dateSave.push(v)
                }
            }
            //console.log(dateSave);

            //第一个默认值
            if(dateSave.length > 0){
                today = dayjs(dateSave[0])
            }else{
                today = dayjs(Date())
                //如果小于开始日期则是开始日期后一天
                if(dayjs(Date()) < dayjs(dateStart).valueOf()){
                    today = dayjs(dateSave)
                }
                //如果大于结束日期则是结束日期
                if(dayjs(Date()) > dayjs(dateEnd).valueOf()){
                    today = dayjs(dateEnd)
                }
            }

        }else{
            //设置默认值
            //如果默认值超过范围 则使用范围的第一天
            if(
                dayjs(obj.dateDefault).valueOf() > dayjs(dateStart).valueOf() &&
                dayjs(obj.dateDefault).valueOf() <= dayjs(dateEnd).valueOf()
            ){
                today = dayjs(obj.dateDefault || Date());
            }else{
                today = dayjs(dateStart).add(1,'day');
            }
            
            //默认添加选中值
            dateSave.push(today.format('YYYY-MM-DD'))
        }
    }else{
        console.warn("请引用dayjs")
        return false;
    }
    //-----------默认参数------------

    //新建时间插件容器
    let datePickerContent = document.createElement('div')
        datePickerContent.setAttribute('id','datepicker')
    //创建显示日期容器
    let dateShow = document.createElement('div')
        dateShow.setAttribute('class','date-show')
    //创建周排列容器
    let dateWeek = document.createElement('ul')
        dateWeek.setAttribute('class','date-week')
    //创建日期容器
    let dateDay = document.createElement('ul')
        dateDay.setAttribute('class','date-day')

    //添加左按钮
    let leftBtn = document.createElement('div')
        leftBtn.setAttribute('class',"btn-left")
    //添加右按钮
    let rightBtn = document.createElement('div')
        rightBtn.setAttribute('class',"btn-right")
    //添加日期显示
    let dateText = document.createElement('div')
        dateText.setAttribute('class',"date-text")
    dateShow.appendChild(leftBtn)
    dateShow.appendChild(dateText)
    dateShow.appendChild(rightBtn)

    //左按键添加事件
    leftBtn.addEventListener('click',function(){
        if(!this.getAttribute('class').includes('disabled')){
            setNowDate(-1)
            callback('点击了前一个月')
        }
        
    })
    //右按键添加事件
    rightBtn.addEventListener('click',function(){
        if(!this.getAttribute('class').includes('disabled')){
            setNowDate(1)
            callback('点击了后一个月')
        }
    })
    function setNowDate(num){

        //前一个月
        if(num < 0 && today.startOf('month').valueOf() > dayjs(dateStart).startOf('month').valueOf()){
            today = today.subtract(1, 'month')
        }
        //后一个月
        if(num > 0){
            today = today.add(1, 'month')
        }

        //移除已有的标签
        function empty(){
            if(dateDay.firstChild){
                dateDay.removeChild(dateDay.firstChild)
                empty()
            }
        }
        empty()
        
        //添加显示的时间
        //如果多选则不显示日
        dateText.innerHTML = multiple == 1 ? today.format('YYYY-MM-DD') : today.format('YYYY-MM')
        //获取当前月份第一天是星期几
        let nowWeek = today.startOf('month').day()
        //console.log(nowWeek);
        nowWeek = nowWeek <= 6 ? nowWeek : 0
        //获取当前月有多少天
        let daysLen = today.daysInMonth()

        //添加前空白占位
        addDaysEle(nowWeek,false,'disabled')
        //添加日期
        addDaysEle(daysLen,true,'')
        //添加后空白占位
        addDaysEle((daysLen + nowWeek) % 7 != 0 ? (7 - (daysLen + nowWeek) % 7) : 0,false,'disabled')
        
        //翻页按钮是否可以点击
        if(today.startOf('month').valueOf() > dayjs(dateStart).add(1,'day').startOf('month').valueOf()){
            leftBtn.setAttribute('class',"btn-left")
        }else{
            leftBtn.setAttribute('class',"btn-left disabled")
        }
        if(today.startOf('month').valueOf() < dayjs(dateEnd).startOf('month').valueOf()){
            rightBtn.setAttribute('class',"btn-right")
        }else{
            rightBtn.setAttribute('class',"btn-right disabled")
        }
        if(multiple == 1){
            dateSave[0] = today.format('YYYY-MM-DD')
            callback(dayjs(dateSave[0]).valueOf() > dayjs(dateStart).valueOf() ? dateSave[0] : "")
        }else{
            callback( dateSave)
        }
    }
    setNowDate()
    
    //添加日元素
    function addDaysEle(len,showText,className){
        let eleArr = []

        //根据开始日期判断锁定的日期
        //console.log(dateStart);
        let disleft,disright;
        if(showText){
            if(dayjs(dateStart).format("YYYY-MM") == today.format('YYYY-MM')){
                disleft = dayjs(dateStart).date()
            }
            if(dayjs(dateEnd).format("YYYY-MM") == today.format('YYYY-MM')){
                disright = dayjs(dateEnd).date()
            }
        }
        
        for(let a = 1;a <= len;a++){
            //是否显示内容
            let v = showText ? addZero(a) : ""
            let ele = document.createElement('li')
            eleArr.push(ele)
            ele.innerHTML = v
            //是否添加class
            ele.setAttribute('class',className)

            //如果超过最大范围则禁用   默认禁用的禁用了
            if((disleft && v <= disleft) || (disright && v > disright) || (disabled.includes(today.date(v).format("YYYY-MM-DD")))){
                ele.setAttribute('class',"disabled")
            }
            if(multiple == 1){
                //单选默认值精确到日
                if(v == today.date()){
                    ele.setAttribute('class',"active")
                    if(dateStart.includes(today.format('YYYY-MM')) && v <= dayjs(dateStart).date()){
                        ele.setAttribute('class',"active disabled")
                    }
                }
            }else{
                //多选默认值精确到年月日
                if(dateSave.includes(`${today.format('YYYY-MM')}-${v}`)){
                    ele.setAttribute('class',"active")
                }
            }
            
            dateDay.appendChild(ele)
            ele.addEventListener('click',function(){
                //判断是否为禁用状态
                if(!ele.getAttribute("class").includes("disabled")){
                    if(multiple == 1){
                        //单选
                        //取消所有选中状态
                        for(let a of eleArr){
                            //如果本来就是锁定的继续锁定 没有锁定的为空
                            a.setAttribute('class',a.getAttribute('class').includes('disabled') ? "disabled":"")
                        }
                        //给点击的添加选中状态
                        this.setAttribute('class',"active")
                        //更改日期
                        today = today.date(v)
                        dateText.innerHTML = today.format('YYYY-MM-DD')
                        callback(dateText.innerHTML)
                    }else{
                        //多选
                        //如果当前已经被选中 那么则取消选中
                        let index = dateSave.indexOf(today.date(v).format('YYYY-MM-DD'))
                        //console.log(index);
                        if(index >= 0){
                            //删除找到的元素
                            dateSave.splice(index,1)
                            //给点击的删除选中状态
                            this.setAttribute('class',"")
                        }else{
                            //如果超过了最大值则不可点击
                            if(dateSave.length < multiple){
                               //给点击的添加选中状态
                                this.setAttribute('class',"active")
                                //更改日期
                                today = today.date(v)
                                dateText.innerHTML = today.format('YYYY-MM')
                                dateSave.push(today.format('YYYY-MM-DD'))
                            }
                            
                        }
                        callback(dateSave)
                    }
                   
                }
            })

        } 
    }
    //补0
    function addZero(num){
        let len = new Array(2 - num.toString().length)
        len.push(num)
        return len.join('0')
    }
    //创建周内容
    let week = ["日","一","二","三","四","五","六"]
    for(let a of week){
        let ele = document.createElement('li')
        ele.innerHTML = a
        dateWeek.appendChild(ele)
    }

    //添加三层容器
    datePickerContent.appendChild(dateShow)
    datePickerContent.appendChild(dateWeek)
    datePickerContent.appendChild(dateDay)
    //添加到网页内
    document.body.appendChild(datePickerContent)

    return {
        destory
    }
}

```

# 时间段选择器

```html
<script>
    let a = new datePicker({
        disabled:["2023-04-05"],//禁用的时间
        dateStart:"2023-03-31",//开始日期 不包含
        dateEnd:"2023-05-30",//结束日期
        dateDefault:{
            start:"2023-04-02",
            end:"2023-04-20"
        },//添加默认时间
        callback:function(e){
            console.log(e);
        }
    })
</script>
```
```js
var datePicker = function(obj){
    var obj = obj || {}
    //多选保存选中的日期
    let dateSave = []
    //引用插件
    let today;
    //开始时间和结束时间
    let dateStart,dateEnd;
    //默认选择的时间端
    let start,end;

    //禁用时间
    let disabled = obj.disabled;
    
    //回调函数
    let callback = obj.callback || function(){
        console.log("默认callback");
    }
    let destory = function(){
        datePickerContent.remove()
    }
    if(window.dayjs){
        //开始时间和结束时间
        dateStart = dayjs(obj.dateStart).format("YYYY-MM-DD") || "1970-01-01";
        dateEnd = dayjs(obj.dateEnd).format("YYYY-MM-DD") || "2099-12-31";
        if(obj.dateDefault){
            start = dayjs(obj.dateDefault.start || Date()).format("YYYY-MM-DD")
            end = dayjs(obj.dateDefault.end || Date()).format("YYYY-MM-DD")
        }
        console.log(dateStart,dateEnd);
        //判断结束范围是否大于开始范围
        if(dayjs(dateEnd).valueOf() <= dayjs(dateStart).valueOf()){
            console.log('请输入正确的时间范围');
            dateStart = "1970-01-01";
            dateEnd = "2099-12-31";
        }
        if(
            !((dayjs(end).valueOf() > dayjs(start).valueOf()) &&
            (dayjs(start).valueOf() > dayjs(dateStart).valueOf()) &&
            (dayjs(end).valueOf() <= dayjs(dateEnd).valueOf()))
        ){
            start = dayjs(Date()).format("YYYY-MM-DD");
            end = dayjs(Date()).add(1,"day").format("YYYY-MM-DD");
            console.log('请输入正确的默认时间');
            //只有结束没有开始 在结束位置
            if(dateEnd && !dateStart){
                start = dayjs(dateEnd).add(1,"day").format("YYYY-MM-DD")
                end = dayjs(dateEnd).add(2,"day").format("YYYY-MM-DD");
            }
            //只有开始没有结束 默认在开始位置
            if(dateStart && !dateEnd){
                start = dayjs(dateStart).add(1,"day").format("YYYY-MM-DD")
                end = dayjs(dateStart).add(2,"day").format("YYYY-MM-DD");
            }
            //有开始有结束 在中间位置
            if(dateStart && dateEnd){
                //开始到结束的中间
                let a = (dayjs(dateStart).valueOf()+dayjs(dateEnd).valueOf())/2
                start = dayjs(a).add(-1,"day").format("YYYY-MM-DD")
                end = dayjs(a).add(1,"day").format("YYYY-MM-DD");
            }
        }

        //设置默认值
        today = dayjs(Date())
        //如果默认值超过范围 则使用范围的第一天
        if(
            dayjs(start).valueOf() > dayjs(dateStart).valueOf() &&
            dayjs(end).valueOf() <= dayjs(dateEnd).valueOf()
        ){
            today = dayjs(start);
        }else{
            today = dayjs(dateStart).add(1,'day');
        }

        //默认添加选中值
        dateSave.push(start)
        dateSave.push(end)
        //console.log(dateSave);
    }else{
        console.warn("请引用dayjs")
        return false;
    }
    //-----------默认参数------------

    //新建时间插件容器
    let datePickerContent = document.createElement('div')
        datePickerContent.setAttribute('id','datepicker')
    //创建显示日期容器
    let dateShow = document.createElement('div')
        dateShow.setAttribute('class','date-show')
    //创建周排列容器
    let dateWeek = document.createElement('ul')
        dateWeek.setAttribute('class','date-week')
    //创建日期容器
    let dateDay = document.createElement('ul')
        dateDay.setAttribute('class','date-day')


    //添加左按钮
    let leftBtn = document.createElement('div')
        leftBtn.setAttribute('class',"btn-left")
    //添加右按钮
    let rightBtn = document.createElement('div')
        rightBtn.setAttribute('class',"btn-right")
    //添加日期显示
    let dateText = document.createElement('div')
        dateText.setAttribute('class',"date-text")
    dateShow.appendChild(leftBtn)
    dateShow.appendChild(dateText)
    dateShow.appendChild(rightBtn)

    //左按键添加事件
    leftBtn.addEventListener('click',function(){
        if(!this.getAttribute('class').includes('disabled')){
            setNowDate(-1)
            callback('点击了前一个月')
        }
        
    })
    //右按键添加事件
    rightBtn.addEventListener('click',function(){
        if(!this.getAttribute('class').includes('disabled')){
            setNowDate(1)
            callback('点击了后一个月')
        }
    })
    function setNowDate(num){
        //前一个月
        if(num < 0 && today.startOf('month').valueOf() > dayjs(dateStart).startOf('month').valueOf()){
            today = today.subtract(1, 'month')
        }
        //后一个月
        if(num > 0){
            today = today.add(1, 'month')
        }

        //移除已有的标签
        function empty(){
            if(dateDay.firstChild){
                dateDay.removeChild(dateDay.firstChild)
                empty()
            }
        }
        empty()
        
        //如果有一个空的那就把有值得那个放在第一位
        let nul = dateSave.indexOf("")
        if(nul != -1){
            dateSave.splice(nul,1)
            dateSave.push("")
        }


        //添加显示的时间
        //如果多选则不显示日'
        dateText.innerHTML = today.format('YYYY-MM')
        //获取当前月份第一天是星期几
        let nowWeek = today.startOf('month').day()
        //console.log(nowWeek);
        nowWeek = nowWeek <= 6 ? nowWeek : 0
        //获取当前月有多少天
        let daysLen = today.daysInMonth()

        //添加前空白占位
        addDaysEle(nowWeek,false,'disabled')
        //添加日期
        addDaysEle(daysLen,true,'')
        //添加后空白占位
        addDaysEle((daysLen + nowWeek) % 7 != 0 ? (7 - (daysLen + nowWeek) % 7) : 0,false,'disabled')
        
        //翻页按钮是否可以点击
        if(today.startOf('month').valueOf() > dayjs(dateStart).add(1,"day").startOf('month').valueOf()){
            leftBtn.setAttribute('class',"btn-left")
        }else{
            leftBtn.setAttribute('class',"btn-left disabled")
        }
        if(today.startOf('month').valueOf() < dayjs(dateEnd).startOf('month').valueOf()){
            rightBtn.setAttribute('class',"btn-right")
        }else{
            rightBtn.setAttribute('class',"btn-right disabled")
        }

        //选中时间内的禁用日期
        let dateDisabled = []
        let i = 0;
        
        function disabledFunc(n){
            if(n.valueOf() <= dayjs(dateSave[1]).valueOf()){
                i++;
                let e = dayjs(dateSave[0]).add(i,'day').format('YYYY-MM-DD')
                if(disabled.includes(e)){
                    dateDisabled.push(e)
                }
                disabledFunc(dayjs(dateSave[0]).add(i,'day').valueOf())
            }
        }
        disabledFunc(dayjs(dateSave[0]).valueOf())
        callback({"date":dateSave,disabled:dateDisabled})
    }
    setNowDate()
    

    //添加日元素
    function addDaysEle(len,showText,className){
        let eleArr = []

        //根据开始日期判断锁定的日期
        //console.log(dateStart);
        let disleft,disright;
        if(showText){
            if(dayjs(dateStart).format("YYYY-MM") == today.format('YYYY-MM')){
                disleft = dayjs(dateStart).date()
            }
            if(dayjs(dateEnd).format("YYYY-MM") == today.format('YYYY-MM')){
                disright = dayjs(dateEnd).date()
            }
        }
        
        for(let a = 1;a <= len;a++){
            //是否显示内容
            let v = showText ? addZero(a) : ""
            let ele = document.createElement('li')
            eleArr.push(ele)
            ele.innerHTML = v
            //是否添加class
            ele.setAttribute('class',className)

            //如果超过最大范围则禁用   默认禁用的禁用了
            if(
                (disleft && v <= disleft) || 
                (disright && v > disright) || 
                (disabled.includes(today.date(v).format("YYYY-MM-DD")))
            ){
                ele.setAttribute('class',"disabled")
            }
           
            //多选默认值精确到年月日
            if(dateSave.includes(`${today.format('YYYY-MM')}-${v}`)){
                ele.setAttribute('class',"active")
            }
            
            //大于开始时间小于结束时间的日期默认选中
            //如果开始和结束有一个值为空则不添加
            if(
                today.date(v).valueOf() > dayjs(dateSave[0]).valueOf() && 
                today.date(v).valueOf() < dayjs(dateSave[1]).valueOf()
            ){
                if(!ele.getAttribute("class").includes("disabled")){
                    //给点击的添加选中状态
                    ele.setAttribute('class',"range")
                }
            }

            dateDay.appendChild(ele)
            ele.addEventListener('click',function(){
                //判断是否为禁用状态
                if(!ele.getAttribute("class").includes("disabled")){
                    let clickDate = today.date(v).format('YYYY-MM-DD')
                    let clickDateTimeStamp = today.date(v).valueOf()
                    //如果点击的已经被存储了 那就删除
                    let index = dateSave.indexOf(clickDate)
                    if(index != -1){
                        dateSave.splice(index,1)
                        dateSave.push("")
                    }else{
                        //如果现在只有一个选中值 那么久把有值的变成第一个
                        if(dateSave.includes("")){
                            if(clickDateTimeStamp < dayjs(dateSave[0]).valueOf()){
                                dateSave[1] = dateSave[0]
                                dateSave[0] = clickDate
                            }else{
                                dateSave[1] = clickDate
                            }
                        }
                        //被点的小于开始
                        if(clickDateTimeStamp <  dayjs(dateSave[0]).valueOf()){
                            dateSave[0] = clickDate
                        }
                        //被点的大于结束
                        if(clickDateTimeStamp >  dayjs(dateSave[1]).valueOf()){
                            dateSave[1] = clickDate
                        }
                    }
                    setNowDate(0)
                    return false
                }
            })
        } 
    }
    //补0
    function addZero(num){
        let len = new Array(2 - num.toString().length)
        len.push(num)
        return len.join('0')
    }
    //创建周内容
    let week = ["日","一","二","三","四","五","六"]
    for(let a of week){
        let ele = document.createElement('li')
        ele.innerHTML = a
        dateWeek.appendChild(ele)
    }

    //添加三层容器
    datePickerContent.appendChild(dateShow)
    datePickerContent.appendChild(dateWeek)
    datePickerContent.appendChild(dateDay)
    //添加到网页内
    document.body.appendChild(datePickerContent)

    return {
        destory
    }
}

```