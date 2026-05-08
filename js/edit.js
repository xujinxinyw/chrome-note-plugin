// 编辑便签
let noteInput;
let saveButton;
let cancelButton;

window.onload = () => {
    noteInput = document.getElementById('noteInput');
    saveButton = document.getElementById('saveButton');
    cancelButton = document.getElementById('cancelButton');

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

// 加载已保存的内容
function loadContent() {
    chrome.storage.local.get(['userContent'], (result) => {
        if (chrome.runtime.lastError) {
            console.error('加载失败：', chrome.runtime.lastError);
        } else if (result.userContent) {
            noteInput.value = result.userContent;
        }
    });
}

// 保存内容到 Chrome 存储
function saveContent() {
    const content = noteInput.value;
    // 使用 chrome.storage.local 保存数据
    chrome.storage.local.set({'userContent': content}, () => {
        // 回到首页
        navigateToHome()
    });
}

// 跳转回到首页
function navigateToHome() {
    const popupWidth = 550;
    const popupHeight = 500;

    // 获取当前窗口的尺寸和位置（可选）
    chrome.windows.getCurrent((currentWin) => {
            // 创建新窗口
            chrome.windows.create({
                url: chrome.runtime.getURL('../page/index.html'),
                type: 'popup',
                width: popupWidth,
                height: popupHeight,
                left: currentWin.left,
                top: currentWin.top
            }, function (newWindow) {
                // 新窗口创建成功后，关闭当前窗口
                if (currentWin && currentWin.id) {
                    chrome.windows.remove(currentWin.id);
                }
            });
        }
    );
}






