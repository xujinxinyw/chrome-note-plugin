// 点击图标自动打开便签首页

// init.js
chrome.action.onClicked.addListener(() => {
    // 窗口尺寸
    const popupWidth = 550;
    const popupHeight = 500;

    chrome.windows.create({
        url: chrome.runtime.getURL('page/index.html'),
        type: 'popup',
        width: popupWidth,
        height: popupHeight,
        focused: true
    });
});
