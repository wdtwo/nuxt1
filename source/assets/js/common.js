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
// 主题切换
document.querySelector('.fa-sun').addEventListener('click', function() {
    if(document.querySelector('body').classList.value.includes('mobile')){
        document.body.className = 'night mobile';
    }else{
        document.body.className = 'night';
    }
    sessionStorage.setItem('theme', 'night');
});
document.querySelector('.fa-moon').addEventListener('click', function() {
    if(document.querySelector('body').classList.value.includes('mobile')){
        document.body.className = 'light mobile';
    }else{
        document.body.className = 'light';
    }
    sessionStorage.setItem('theme', 'light');
});

// 判断是否为移动端
window.onresize = function() {
    judgeMobile()
}
judgeMobile()
function judgeMobile() {
    if(window.innerWidth > 850) {
        document.body.classList.remove('mobile');
    }else{
        document.body.classList.add('mobile');
    }
}
// 显示搜索弹窗
function showSearchPage() {
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
}
// 隐藏搜索弹窗
function hideSearchPage() {
    const searchPage = document.querySelector('.search-page');
    searchPage.classList.add('fadeOut');
    searchPage.addEventListener('animationend', () => {
        searchPage.style.display = 'none';
        searchPage.classList.remove('fadeOut');
    });
}

// 显示移动端菜单
function showMobileMenu() {
    console.log('showMobileMenu');
    const menuList = document.querySelector('.menu-list');
    menuList.style.display = 'flex';
    menuList.classList.add('fadeIn');
    menuList.addEventListener('animationend', () => {
        menuList.classList.remove('fadeIn');
        menuList.style.display = 'flex';
    });
}
// 隐藏移动端菜单
function hideMobileMenu() {
    console.log('hideMobileMenu');
    const menuList = document.querySelector('.menu-list');
    menuList.classList.add('fadeOut');
    menuList.addEventListener('animationend', () => {
        menuList.classList.remove('fadeOut');
        menuList.style.display = 'none';
    });
}


