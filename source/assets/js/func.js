function gotoHeader(firstName, tagName){
    // 移除可能的结尾斜杠并转为小写
    const cleanTagName = decodeURIComponent(tagName).replace(/\/$/, '').toLowerCase();
    const targetElement = document.getElementById(firstName+'-' + cleanTagName);
    if (targetElement) {
        // 等待一小段时间确保页面完全加载
        setTimeout(() => {
            // 获取目标元素的位置
            const targetPosition = targetElement.offsetTop;
            // 获取header高度（如果有固定header的话）
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            // 平滑滚动到目标位置，并留出header的高度
            // console.log(targetPosition);
            document.querySelector('.main').scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
        }, 100);
    }
}

