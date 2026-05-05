// 编辑便签
let noteInput ;
let saveButton ;
let cancelButton ;
let statusDiv ;

window.onload = () => {
    noteInput = document.getElementById('noteInput');
    saveButton = document.getElementById('saveButton');
    cancelButton = document.getElementById('cancelButton');
    statusDiv = document.getElementById('status');

    // 保存事件
    saveButton.addEventListener('click', saveContent);
    // 取消事件
    cancelButton.addEventListener('click', navigateToHome);

    // 可选：按 Ctrl+Enter 保存
    noteInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            saveContent();
        }
    });
    // 页面加载时自动加载已保存的内容
    loadContent();
}

// 显示状态消息
function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.style.color = isError ? '#c62828' : '#2e7d32';

    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 2000);
}

// 保存内容到 Chrome 存储
function saveContent() {
    const content = noteInput.value;
    // 使用 chrome.storage.local 保存数据
    chrome.storage.local.set({ 'userContent': content }, () => {
        // 回到首页
        navigateToHome()
    });
}

// 加载已保存的内容
function loadContent() {
    chrome.storage.local.get(['userContent'], (result) => {
        if (chrome.runtime.lastError) {
            console.error('加载失败：', chrome.runtime.lastError);
        } else if (result.userContent) {
            noteInput.value = result.userContent;
            showStatus('已加载上次保存的内容！');
        }
    });
}

// 跳转回到首页
function  navigateToHome(){
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
                url: chrome.runtime.getURL('../page/index.html'),
                type: 'popup',
                width: popupWidth,
                height: popupHeight,
                left: Math.max(0, Math.floor(left)),  // 确保不为负数
                top: Math.max(0, Math.floor(top))                // 距离屏幕顶部的距离
            }, function (newWindow) {
                // 新窗口创建成功后，关闭当前窗口
                if (currentWin && currentWin.id) {
                    chrome.windows.remove(currentWin.id);
                }
            });
        }
    );
}






