// 获取当前主题
const theme = sessionStorage.getItem('theme');
if(theme){
    document.body.className = theme;
}else{
    // 当前时间
    const now = new Date();
    const hours = now.getHours();
    document.body.className = (hours > 18 || hours < 6) ? 'night' : 'light';
    sessionStorage.setItem('theme', document.body.className);
}
// 监听点击事件
document.querySelector('.fa-sun').addEventListener('click', function() {
    document.body.className = 'night';
    sessionStorage.setItem('theme', 'night');
});
document.querySelector('.fa-moon').addEventListener('click', function() {
    document.body.className = 'light';
    sessionStorage.setItem('theme', 'light');
});

window.onload = function() {
    
    // 导航栏点击事件
    // 搜索按钮点击事件
    document.querySelector('.fa-search').addEventListener('click',function(){
        // 重置表单
        document.querySelector('.search-page-form').reset();
        document.getElementById('search-result').innerHTML = '';
        const searchPage = document.querySelector('.search-page');
        searchPage.style.display = 'block';
        searchPage.classList.add('fadeIn');
        searchPage.addEventListener('animationend', () => {
            searchPage.style.display = 'block';
            searchPage.classList.remove('fadeIn');
            // 聚焦输入框
            document.querySelector('[name="keyword"]').focus();
        });
    })
    document.querySelector('.search-page-bg').addEventListener('click',function(){
        const searchPage = document.querySelector('.search-page');
        searchPage.classList.add('fadeOut');
        searchPage.addEventListener('animationend', () => {
            searchPage.style.display = 'none';
            searchPage.classList.remove('fadeOut');
        });
    })
}
// 返回顶部
document.getElementById('gotopage').addEventListener('click',function() {
    document.querySelector('.main').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
},false)
document.querySelector('.main').addEventListener('scroll',function() {
    if(document.querySelector('.main').scrollTop > 300) {
        document.getElementById('gotopage').classList.add('show')
    }else{
        document.getElementById('gotopage').classList.remove('show')
    }
})

