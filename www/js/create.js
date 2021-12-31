console.log('Create page loaded.')
const navigator = document.getElementById('qw3rtNav')
const createUsername = document.getElementById('create-username')
const createUsernameErrors = document.getElementById('create-username-errors')
const createBtn = document.getElementById('create-btn')

const API_URL = 'https://qw3rt.ochsec1.repl.co'

const createUsernameIsValid = () => {
    if (!createUsername.value) {
        createUsernameErrors.textContent = 'Please choose a username'
        createUsernameErrors.style.visibility = 'visible'
        return false
    }
    return true
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
            navigator.pushPage('chat.html')
        } else if (data.status === 'error') {
            createUsernameErrors.textContent = data.message
            createUsernameErrors.style.visibility = 'visible'
        } else {
            console.log(data)
        }
    }) 
    .catch(error => console.log(error))
}

createBtn.addEventListener('click', onCreateClicked)