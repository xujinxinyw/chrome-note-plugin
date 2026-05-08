// 首页内容
window.onload = function () {
    // 初始化窗口位置
    initWindowPosition();
    // 内容页面绑定双击事件
    bindContentDoubleClickEvent();
    // 加载并显示笔记
    loadContent();
}

// 初始化窗口位置
function initWindowPosition() {
}

// 内容页面绑定双击事件
function bindContentDoubleClickEvent() {
    document.getElementById('noteContent').addEventListener('dblclick', () => {
        openAndNavigateToEditPage();
    });
}

// 打开跳转到编辑页
function openAndNavigateToEditPage() {
    // 窗口尺寸
    const popupWidth = 550;
    const popupHeight = 500;

    // 获取当前窗口的尺寸和位置（可选）
    chrome.windows.getCurrent((currentWin) => {
            // 创建新窗口
            chrome.windows.create({
                url: chrome.runtime.getURL('../page/edit.html'),
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

// 加载并显示笔记
function loadContent() {
    const noteContentDiv = document.getElementById('noteContent');

    chrome.storage.local.get(['userContent'], (result) => {
        if (chrome.runtime.lastError) {
            noteContentDiv.innerHTML = '加载失败：' + chrome.runtime.lastError.message;
            return;
        }

        const content = result.userContent;

        const hasContent = content && content.trim() !== '';

        if (hasContent) {
            noteContentDiv.innerText = content;
        } else {
            noteContentDiv.innerHTML = '<div class="empty">✏️ 双击记录...<br></div>';
        }

        // 初始化trips消失动画
        initTripsFadeOutAnimation(hasContent);
    });
}

// 初始化trips消失动画
function initTripsFadeOutAnimation(hasContent) {
    const tip = document.getElementById('trips');
    if (tip) {
        if (hasContent) {
            setTimeout(() => {
                tip.classList.add('fade-out');
                tip.addEventListener('transitionend', () => {
                    tip.style.display = 'none';
                }, {once: true});
            }, 2000);
        } else {
            // 无内容时直接删除提示（无淡出动画）
            tip.style.display = 'none';
        }
    }
}
