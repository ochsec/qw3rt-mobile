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
