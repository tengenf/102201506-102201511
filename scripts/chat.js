document.addEventListener('DOMContentLoaded', () => {
    loadChatList();
    renderNavigation(); 
    setupMessageForm();
});

function loadChatList() {
    // 这里应该从后端API获取聊天列表
    const chats = [
        { id: 1, name: '项目A讨论组' },
        { id: 2, name: '团队X' },
        // 更多聊天...
    ];
    
    const chatList = document.getElementById('chatList');
    chatList.innerHTML = '';
    
    chats.forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = 'chat-item';
        chatElement.innerHTML = `
            <h3>${chat.name}</h3>
            <button onclick="openChat(${chat.id})">打开聊天</button>
        `;
        chatList.appendChild(chatElement);
    });
}

function openChat(chatId) {
    window.location.href = `chat-detail.html?id=${chatId}`;
}

function setupMessageForm() {
    const messageForm = document.getElementById('messageForm');
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = '';
        }
    });
}

function sendMessage(message) {
    // 发送消息到后端
    console.log('发送消息:', message);
    // 这里应该将消息发送到后端,然后更新UI
}