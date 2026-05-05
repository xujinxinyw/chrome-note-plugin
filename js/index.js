// 首页内容
window.onload = function(){
    // 获取当前窗口并居中
    chrome.windows.getCurrent((win) => {
        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        const newLeft = (screenWidth - win.width) / 2;
        const newTop = (screenHeight - win.height) / 2;

        chrome.windows.update(win.id, {
            left: Math.max(0, newLeft),
            top: Math.max(0, newTop)
        });
    });

    document.getElementById('editButton').addEventListener('click', () => {
        // 获取屏幕尺寸
        const screenWidth = window.screen.availWidth;  // 可用屏幕宽度
        const screenHeight = window.screen.availHeight; // 可用屏幕高度

        // 窗口尺寸
        const popupWidth = 550;
        const popupHeight = 500;

        // 计算居中位置
        const left = (screenWidth - popupWidth) / 2;
        const top = (screenHeight - popupHeight) / 2;

        // 获取当前窗口的尺寸和位置（可选）
        chrome.windows.getCurrent((currentWin) => {
            // 创建新窗口
            chrome.windows.create({
                url: chrome.runtime.getURL('../page/edit.html'),
                type: 'popup',
                width: popupWidth,
                height: popupHeight,
                left: Math.max(0, Math.floor(left)),  // 确保不为负数
                top: Math.max(0, Math.floor(top))                // 距离屏幕顶部的距离
            },function(newWindow) {
                // 新窗口创建成功后，关闭当前窗口
                if (currentWin && currentWin.id) {
                    chrome.windows.remove(currentWin.id);
                }
            });
        }
        );
    });

    loadContent();
}

function loadContent() {
    const noteContentDiv = document.getElementById('noteContent');
    // 加载并显示笔记
    chrome.storage.local.get(['userContent'], (result) => {
        if (chrome.runtime.lastError) {
            noteContentDiv.innerHTML = '加载失败：' + chrome.runtime.lastError.message;
            return;
        }

        const content = result.userContent;

        if (content && content.trim() !== '') {
            noteContentDiv.innerText = content;
        } else {
            noteContentDiv.innerHTML = '<div class="empty">无记录<br></div>';
        }
    });
}
