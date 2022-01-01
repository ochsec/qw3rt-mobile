console.log('Create page loaded.')
const createUsername = document.getElementById('create-username')
const createUsernameErrors = document.getElementById('create-username-errors')
const createBtn = document.getElementById('create-btn')

const createUsernameIsValid = () => {
    if (!createUsername.value) {
        createUsernameErrors.textContent = 'Please choose a username'
        createUsernameErrors.style.visibility = 'visible'
        return false
    }
    return true
}

const onCreateUsernameChanged = (e) => {
    createUsernameErrors.style.visibility = 'hidden'
}

const onCreateClicked = async () => {
    if (!createUsernameIsValid()) return

    fetch(API_URL + '/create', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: createUsername.value
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
            createUsernameErrors.textContent = data.message
            createUsernameErrors.style.visibility = 'visible'
        } else {
            console.log(data)
        }
    }) 
    .catch(error => console.log(error))
}

createUsername.addEventListener('input', onCreateUsernameChanged)
createBtn.addEventListener('click', onCreateClicked)