console.log('Join page loaded.')

const joinUsername = document.getElementById('join-username')
const joinUsernameErrors = document.getElementById('join-username-errors')
const joinChatId = document.getElementById('join-chatid')
const joinChatIdErrors = document.getElementById('join-chatid-errors')
const joinBtn = document.getElementById('join-btn')

const joinUsernameIsValid = () => {
    if (!joinUsername.value) {
        joinUsernameErrors.textContent = 'Please choose a username'
        joinUsernameErrors.style.visibility = 'visible'
        return false
    }
    return true
}

const chatIdIsValid = () => {
    if (!joinChatId.value) {
        joinChatIdErrors.textContent = 'Please enter the chat id'
        joinChatIdErrors.style.visibility = 'visible'
        return false
    }
    return true
}

const onJoinUsernameChanged = (e) => {
    joinUsernameErrors.style.visibility = 'hidden'
}

const onChatIdChanged = (e) => {
    joinChatIdErrors.style.visibility = 'hidden'
}

const onJoinClicked = async () => {
    const uValid = joinUsernameIsValid()
    const cValid = chatIdIsValid()

    if (!uValid || !cValid) return

    fetch(API_URL + '/join', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: joinUsername.value,
            chatId: joinChatId.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            sessionStorage.setItem('username', data.username)
            sessionStorage.setItem('chatId', data.chatId)
            sessionStorage.setItem('token', data.token)
            navigator.pushPage('chat.html', { data: { chatId: data.chatId } })
        } else if (data.status === 'error') {
            joinChatIdErrors.textContent = data.message
            joinChatIdErrors.style.visibility = 'visible'
        } else {
            console.log(data)
        }
    })
    .catch(error => console.log(error))
}

joinUsername.addEventListener('input', onJoinUsernameChanged)
joinChatId.addEventListener('input', onChatIdChanged)
joinBtn.addEventListener('click', onJoinClicked)
