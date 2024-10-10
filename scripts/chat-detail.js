document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderChatDetail();
    loadChatMessages();
});

function renderNavigation() {
    const nav = document.getElementById('mainNav');
    nav.innerHTML = `
        <ul>
            <li><a href="../index.html" class="home-button">主页</a></li>
            <li><a href="chat.html">返回聊天列表</a></li>
        </ul>
    `;
}

function renderChatDetail() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="chat-container">
            <div class="chat-header">
                <img src="../images/person.png" alt="聊天对象头像" class="chat-avatar">
                <h2 id="chatName">聊天对象名称</h2>
            </div>
            <div id="messageList" class="message-list"></div>
            <div class="message-input">
                <input type="text" id="messageInput" placeholder="输入消息...">
                <button id="sendButton" class="btn-send">发送</button>
            </div>
        </div>
    `;

    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function loadChatMessages() {
    const chatId = new URLSearchParams(window.location.search).get('id');
    console.log('Loading messages for chat ID:', chatId);

    setTimeout(() => {
        try {
            const messages = [
                { id: 1, sender: 'other', content: '你好!', timestamp: '10:00' },
                { id: 2, sender: 'self', content: '你好!有什么可以帮到你的吗?', timestamp: '10:01' },
                { id: 3, sender: 'other', content: '我想问一下关于项目进度的事情。', timestamp: '10:02' },
                { id: 4, sender: 'self', content: '好的,我们目前正按计划进行,预计下周可以完成第一阶段。', timestamp: '10:03' },
            ];
            displayMessages(messages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }, 1000);
}

function displayMessages(messages) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = messages.map(message => {
        if (typeof message === 'string') {
            return message;
        }
        return `
            <div class="message ${message.sender === 'self' ? 'message-self' : 'message-other'}">
                <div class="message-content">${message.content || ''}</div>
                <div class="message-timestamp">${message.timestamp || ''}</div>
            </div>
        `;
    }).join('');
    messageList.scrollTop = messageList.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    if (content) {
        console.log('Sending message:', content);
        const newMessage = { 
            id: Date.now(), 
            sender: 'self', 
            content: content, 
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
        };
        const messageList = document.getElementById('messageList');
        const currentMessages = Array.from(messageList.children).map(child => child.outerHTML);
        displayMessages([...currentMessages, newMessage]);
        input.value = '';
    }
}