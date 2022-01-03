console.log('Chat page loaded.')

const sock = new SockJS(API_URL + '/chat')

sock.onopen = () => {
    console.log('Websocket connection opened')
    const urlFrags = sock._transport.url.split('/')
    socketId = urlFrags[urlFrags.length - 2]
    const sendData = {
        event: 'session',
        username,
        chatId,
        message: 'Inform socket session id',
        token,
        socketId
    }

    sock.send(JSON.stringify(sendData))
}
sock.onclose = () => console.log('Websocket connection closed')

sock.onmessage = (e) => {
    const data = JSON.parse(e.data)
    
    if (data.event === 'broadcast') {
        messages.unshift(data)
        appendMessageList(data)
    }
}

// document.getElementById('chat-toolbar-text').innerText = `Chat: ${chatId}`
const chatToolbar = document.getElementById('chat-toolbar-container')
const messageList = document.getElementById('message-list')
const messageInput = document.getElementById('message-input')
const sendMessageBtn = document.getElementById('send-message-btn')
const chatToolBarElements = ons.createElement(
    `
        <span>Chat ID: ${chatId}
            <ons-icon icon="fa-file"></ons-icon>
        </span>
    `
)
chatToolbar.appendChild(chatToolBarElements)

function createMessageElement(msg) {
    const postDateTime = new Date(msg.createdAt)
    const localDateTime = postDateTime.toLocaleDateString()
    const listItem = ons.createElement(
        `
            <ons-list-item>
                <ons-card class="message-card" style="width: 100%;">
                    <div class="title">
                        <span style="font-size: 12px;">${msg.username}</span>
                        <span style="font-size: 12px; float: right;">${localDateTime}</span>
                    </div>
                    <div class="content">
                        ${msg.content}
                    </div>
                </ons-card>
            </ons-list-item>
        `
    )
    return listItem
}

function appendMessageList(msg) {
    const msgElement = createMessageElement(msg)
    messageList.insertBefore(msgElement, messageList.firstChild)
}

function onSendClicked() {
    if (messageInput.value === '' || messageInput.value.length === 0) return

    const sendData = {
        event: 'message',
        username,
        chatId,
        content: messageInput.value,
        token,
        socketId
    }

    sock.send(JSON.stringify(sendData))

    messageInput.value = ''
}

function onCopyIdClicked() {
    cordova.plugins.clipboard.copy(chatId)
    ons.notification.toast('Chat ID Copied', { timeout: 1000, animation: 'default' })
}

sendMessageBtn.addEventListener('click', onSendClicked)
chatToolbar.addEventListener('click', onCopyIdClicked)
