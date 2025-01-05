// You need chatId and token from telegram. Create token.js and add its.
import { chatId, token } from './token';

const button = document.querySelector('.send_button')

const nameInput = document.querySelector('.name')
const contact = document.querySelector('.contact')
const text = document.querySelector('.text')

nameInput.addEventListener('keyup', checkInputs)
contact.addEventListener('keyup', checkInputs)
text.addEventListener('keyup', checkInputs)

function validateContact(contact) {
    contact = contact.trim()
    const telegram = /^@\w+$/;
    const whatsapp = /^\+?\d+$/;
    return (telegram.test(contact) && contact.length > 5) || (whatsapp.test(contact) && contact.length > 11)
}

function validateName(nameInput) {
    nameInput = nameInput.trim()
    const nameSymbols = /^[A-Za-zА-Яа-яЁё\-\s]+$/;
    return (nameSymbols.test(nameInput) && nameInput.length > 2)
}

function checkInputs() {
    if (validateName(nameInput.value)
        && validateContact(contact.value)
        && text.value.length > 2) {
        button.hasAttribute('disabled') ? button.removeAttribute('disabled') : ''
    } else {
        button.hasAttribute('disabled') ? '' : button.setAttribute('disabled', '')
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault()

    button.classList.add('click01')
    setTimeout(() => {
        button.classList.remove('click01')
    }, 100)

    let message = "Name: " + nameInput.value + "\n" + "Contact: " + contact.value + "\n" + "Message: " + text.value
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    console.log(message)

    message = ''
    nameInput.value = ''
    contact.value = ''
    text.value = ''
    button.setAttribute('disabled', '')

    const messageSended = document.querySelector('.message-sended')
    messageSended.classList.add('message-sended-active')

    setTimeout(() => {
        [...messageSended.classList].includes('message-sended-active') ? messageSended.classList.remove('message-sended-active') : ''
    }, 2000)

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ', error);
            }
            return response.json();
        })
        .then(data => {
            // document.getElementById('commentText').value = '';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
)
