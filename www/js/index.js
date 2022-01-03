/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

const API_URL = 'https://qw3rt.ochsec1.repl.co'
const navigator = document.getElementById('qw3rtNav')
let messages = []
let username, chatId, token, socketId

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

// ons.ready(function() {
//     console.log(window.device)
// })

document.addEventListener('init', function(event) {   
    if (ons.platform.isIPhoneX()) { // Utility function
        // Add empty attribute to the <html> element
        document.documentElement.setAttribute('onsflag-iphonex-portrait', '')
        document.querySelector('#home-toolbar').setAttribute('class', 'iphone-x-toolbar')
        document.querySelector('#chat-toolbar').setAttribute('class', 'iphone-x-toolbar')
    }

    if (ons.platform.isIPhoneX()) { // Utility function
        // Add empty attribute to the <html> element
        document.documentElement.setAttribute('onsflag-iphonex-landscape', '')
    }

    // Hide errors
    document.querySelectorAll('.username-errors')
        .forEach((el) => el.style.visibility = 'hidden')
    document.querySelectorAll('.chatid-errors')
        .forEach((el) => el.style.visibility = 'hidden')

    var page = event.target

    if (page.matches('#page-chat')) {
        const chatIdFromRedirect = navigator.topPage.data.chatId
        username = sessionStorage.getItem('username')
        chatId = sessionStorage.getItem('chatId')
        token = sessionStorage.getItem('token')

        if (!username || !token) {
            navigator.pushPage('index.html')
        }

        if (!chatId || (chatId !== chatIdFromRedirect)) {
            navgiator.pushPage('index.html')
        }

        fetch(API_URL + '/' + chatId, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username,
                    chatId,
                    token
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'error') {
                    navigator.pushPage('index.html')
                } else {
                    messages = data.content
                    console.log('verified')
                    const msgElements = messages.map(msg => createMessageElement(msg))
                    msgElements.forEach(el => messageList.appendChild(el))
                }
            })
        }
    })
