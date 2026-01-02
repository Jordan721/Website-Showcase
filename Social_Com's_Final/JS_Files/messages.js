// Messages Page - Interactive Chat Functionality

// Sample conversations data
const conversations = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar: "fas fa-user-circle",
        lastMessage: "That sounds great! Let's catch up soon.",
        time: "5m ago",
        online: true,
        unread: 2,
        messages: [
            { sender: "received", text: "Hey! How are you doing?", time: "10:30 AM" },
            { sender: "sent", text: "I'm doing great! How about you?", time: "10:32 AM" },
            { sender: "received", text: "Pretty good! Want to catch up this weekend?", time: "10:35 AM" },
            { sender: "sent", text: "That sounds great! Let's catch up soon.", time: "10:36 AM" }
        ]
    },
    {
        id: 2,
        name: "Mike Chen",
        avatar: "fas fa-user-circle",
        lastMessage: "Thanks for your help!",
        time: "1h ago",
        online: true,
        unread: 0,
        messages: [
            { sender: "received", text: "Can you help me with the project?", time: "Yesterday" },
            { sender: "sent", text: "Of course! What do you need?", time: "Yesterday" },
            { sender: "received", text: "I'm stuck on the design part", time: "Yesterday" },
            { sender: "sent", text: "Let me send you some resources", time: "Yesterday" },
            { sender: "received", text: "Thanks for your help!", time: "1h ago" }
        ]
    },
    {
        id: 3,
        name: "Alex Rivera",
        avatar: "fas fa-user-circle",
        lastMessage: "See you tomorrow!",
        time: "3h ago",
        online: false,
        unread: 0,
        messages: [
            { sender: "received", text: "Are you coming to the meeting tomorrow?", time: "3h ago" },
            { sender: "sent", text: "Yes, I'll be there at 2 PM", time: "3h ago" },
            { sender: "received", text: "Perfect! See you tomorrow!", time: "3h ago" }
        ]
    },
    {
        id: 4,
        name: "Jordan Smith",
        avatar: "fas fa-user-circle",
        lastMessage: "That's awesome news!",
        time: "Yesterday",
        online: false,
        unread: 0,
        messages: [
            { sender: "sent", text: "I got the promotion!", time: "Yesterday" },
            { sender: "received", text: "That's awesome news! Congratulations!", time: "Yesterday" }
        ]
    },
    {
        id: 5,
        name: "Taylor Brown",
        avatar: "fas fa-user-circle",
        lastMessage: "Let me know when you're free",
        time: "2 days ago",
        online: true,
        unread: 1,
        messages: [
            { sender: "received", text: "Want to grab coffee sometime?", time: "2 days ago" },
            { sender: "received", text: "Let me know when you're free", time: "2 days ago" }
        ]
    }
];

let currentConversation = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderConversations();
    setupEventListeners();
});

// Render conversations list
function renderConversations(filter = '') {
    const conversationsList = document.getElementById('conversationsList');
    conversationsList.innerHTML = '';

    const filtered = conversations.filter(conv =>
        conv.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(conversation => {
        const convElement = document.createElement('div');
        convElement.className = 'conversation-item';
        convElement.dataset.id = conversation.id;

        convElement.innerHTML = `
            <div class="conversation-avatar">
                <i class="${conversation.avatar}"></i>
                ${conversation.online ? '<div class="online-indicator"></div>' : ''}
            </div>
            <div class="conversation-info">
                <div class="conversation-header">
                    <span class="conversation-name">${conversation.name}</span>
                    <span class="conversation-time">${conversation.time}</span>
                </div>
                <div class="conversation-preview">${conversation.lastMessage}</div>
            </div>
            ${conversation.unread > 0 ? `<span class="unread-badge">${conversation.unread}</span>` : ''}
        `;

        convElement.addEventListener('click', () => openConversation(conversation.id));
        conversationsList.appendChild(convElement);
    });
}

// Open a conversation
function openConversation(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    currentConversation = conversation;

    // Mark conversation as read
    conversation.unread = 0;

    // Update UI
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-id="${conversationId}"]`).classList.add('active');

    // Show chat container, hide empty state
    document.querySelector('.empty-state').style.display = 'none';
    document.querySelector('.chat-container').style.display = 'flex';

    // Update chat header
    document.getElementById('chatUserName').textContent = conversation.name;
    document.getElementById('chatUserStatus').textContent = conversation.online ? 'Online' : 'Offline';

    // Render messages
    renderMessages();

    // Re-render conversations to update unread badges
    renderConversations();
}

// Render messages for current conversation
function renderMessages() {
    if (!currentConversation) return;

    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    currentConversation.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;

        messageElement.innerHTML = `
            ${message.sender === 'received' ? `
                <div class="message-avatar">
                    <i class="${currentConversation.avatar}"></i>
                </div>
            ` : ''}
            <div class="message-content">
                <div class="message-bubble">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
            ${message.sender === 'sent' ? `
                <div class="message-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
            ` : ''}
        `;

        chatMessages.appendChild(messageElement);
    });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
function sendMessage() {
    if (!currentConversation) return;

    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText) return;

    // Add message to conversation
    const newMessage = {
        sender: 'sent',
        text: messageText,
        time: 'Just now'
    };

    currentConversation.messages.push(newMessage);
    currentConversation.lastMessage = messageText;
    currentConversation.time = 'Just now';

    // Clear input
    messageInput.value = '';

    // Re-render
    renderMessages();
    renderConversations();

    // Simulate response (for demo purposes)
    setTimeout(() => {
        simulateResponse();
    }, 2000);
}

// Simulate receiving a response
function simulateResponse() {
    if (!currentConversation) return;

    const responses = [
        "Thanks for your message!",
        "That's interesting!",
        "I agree!",
        "Tell me more about that",
        "Sounds good to me!",
        "I'll get back to you on that"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const responseMessage = {
        sender: 'received',
        text: randomResponse,
        time: 'Just now'
    };

    currentConversation.messages.push(responseMessage);
    currentConversation.lastMessage = randomResponse;

    renderMessages();
    renderConversations();

    // Show notification
    showNotification(`New message from ${currentConversation.name}`);
}

// Setup event listeners
function setupEventListeners() {
    // Send message button
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    // Message input enter key
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Search conversations
    const searchInput = document.getElementById('searchConversations');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderConversations(e.target.value);
        });
    }

    // New message button
    const newMessageBtn = document.querySelector('.new-message-btn');
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', () => {
            showNotification('New message feature - Coming soon! 💬');
        });
    }

    // Chat action buttons
    document.querySelectorAll('.chat-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-phone')) {
                showNotification('Voice call feature - Coming soon! 📞');
            } else if (icon.classList.contains('fa-video')) {
                showNotification('Video call feature - Coming soon! 📹');
            } else {
                showNotification('More options - Coming soon!');
            }
        });
    });

    // Attach and emoji buttons
    document.querySelector('.attach-btn')?.addEventListener('click', () => {
        showNotification('Attach files feature - Coming soon! 📎');
    });

    document.querySelector('.emoji-btn')?.addEventListener('click', () => {
        showNotification('Emoji picker - Coming soon! 😊');
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #6366f1;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
