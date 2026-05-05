// 编辑便签
let noteInput ;
let saveButton ;
let clearButton ;
let statusDiv ;

// 显示状态消息
function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.style.color = isError ? '#c62828' : '#2e7d32';

    // setTimeout(() => {
    //     statusDiv.style.display = 'none';
    // }, 2000);
}

// 保存内容到 Chrome 存储
function saveContent() {
    const content = noteInput.value;

    // 使用 chrome.storage.local 保存
    chrome.storage.local.set({ 'userContent': content }, () => {
        if (chrome.runtime.lastError) {
            showStatus('保存失败：' + chrome.runtime.lastError.message, true);
        } else {
            showStatus('已保存 ' + content.split('\n').length + ' 行内容！');
        }
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

// 清空内容
function clearContent() {
    noteInput.value = '';
    showStatus('已清空输入框！');
}

window.onload = () => {

     noteInput = document.getElementById('noteInput');
     saveButton = document.getElementById('saveButton');
     clearButton = document.getElementById('clearButton');
     statusDiv = document.getElementById('status');

    // 绑定事件
    saveButton.addEventListener('click', saveContent);
    clearButton.addEventListener('click', clearContent);

    // 可选：按 Ctrl+Enter 保存
    noteInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            saveContent();
        }
    });

    // 页面加载时自动加载已保存的内容
    loadContent();
}




