// 点击图标自动打开便签首页

chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: chrome.runtime.getURL('page/index.html'),
        type: 'popup',
        width: 550,
        height: 500,
        left: 200,
        top: 100,
        focused: true
    }, (window) => {
        if (chrome.runtime.lastError) {
            console.error('Open Window Failed :', chrome.runtime.lastError);
        } else {}
    });
});

