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
        messages.push(data)
        appendMessageList(data)
    }
}

document.getElementById('chat-toolbar-text').innerText = `Chat: ${chatId}`
const messageList = document.getElementById('message-list')

function createMessageElement(msg) {
    const postDateTime = new Date(msg.createdAt)
    const localDateTime = postDateTime.toLocaleDateString()
    const listItem = ons.createElement(
        `
            <ons-list-item>
                <ons-card class="message-card">
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
    messageList.appendChild(listItem)
}
