import styles from './styles.css'
import snake_styles from './snake/snake_styles.css'
import snake from './snake/snake.js'
import telegram_bot from './telegram_bot/index.js'
import chat from './chat/chat.js'

const body = document.querySelector('body')
const menuBar = document.querySelector('.menu-bar')

const container = document.querySelector('.container')
const READMEContainer = document.querySelector('.readme-container')
const SNAKEContainer = document.querySelector('.snake-container')
const formToTelegramContainer = document.querySelector('.form-to-telegram-container')
const chatGPT = document.querySelector('.chat-global')

const slideDownContainerButton = document.querySelector('.slide-down-container')
const slideDownReadmeButton = document.querySelector('.slide-down-readme')
const slideDownSnakeButton = document.querySelector('.slide-down-snake')
const slideDownFormToTelegramButton = document.querySelector('.slide-down-form-to-telegram')
const slideDownGPT = document.querySelector('.slide-down-gpt')

const iconDownContainerButton = document.querySelector('.generator-icon')
const iconDownReadmeButton = document.querySelector('.readme-icon')
const iconDownSnakeButton = document.querySelector('.snake-icon')
const iconDownFormToTelegramButton = document.querySelector('.form-to-telegram-icon')

const iconImgContainerButton = document.querySelector('.icon-img-qr')
const iconImgDownReadmeButton = document.querySelector('.icon-img-readme')
const iconImgDownSnakeButton = document.querySelector('.icon-img-snake')
const iconImgDownFormToTelegramButton = document.querySelector('.icon-img-form-to-telegram')
const iconImgGPT = document.querySelector('.icon-img-gpt')


let zIndexActual = 0

function zIndex() {
    return ++zIndexActual
}


READMEContainer.addEventListener('click', () => {
    READMEContainer.style.zIndex = zIndex()
})

slideDownReadmeButton.addEventListener('click', () => {
    READMEContainer.classList.contains('opacity1') ? '' : iconImgDownReadmeButton.classList.toggle('opacity1')
    READMEContainer.classList.toggle('pointer-events-none')
    READMEContainer.classList.toggle('translateY-for-readme')
})

iconDownReadmeButton.addEventListener('click', () => {
    if (zIndexActual != READMEContainer.style.zIndex && !READMEContainer.classList.contains('pointer-events-none')) {
        READMEContainer.style.zIndex = zIndex()
    } else {
        READMEContainer.style.zIndex = zIndex()
        READMEContainer.classList.toggle('pointer-events-none')
        READMEContainer.classList.toggle('translateY-for-readme')
        iconImgDownReadmeButton.classList.toggle('opacity1')
    }
})




container.addEventListener('click', () => {
    container.style.zIndex = zIndex()
})

slideDownContainerButton.addEventListener('click', () => {
    container.classList.contains('opacity1') ? '' : iconImgContainerButton.classList.toggle('opacity1')
    container.classList.toggle('pointer-events-none')
    container.classList.toggle('translateY')
})

iconDownContainerButton.addEventListener('click', () => {
    if (zIndexActual != container.style.zIndex && !container.classList.contains('pointer-events-none')) {
        container.style.zIndex = zIndex()
    } else {
        container.style.zIndex = zIndex()
        container.classList.toggle('pointer-events-none')
        container.classList.toggle('translateY')
        iconImgContainerButton.classList.toggle('opacity1')
    }
})



SNAKEContainer.addEventListener('click', () => {
    SNAKEContainer.style.zIndex = zIndex()
})

slideDownSnakeButton.addEventListener('click', () => {
    SNAKEContainer.classList.contains('opacity1') ? '' : iconImgDownSnakeButton.classList.toggle('opacity1')
    SNAKEContainer.classList.toggle('pointer-events-none')
    SNAKEContainer.classList.toggle('translateY-for-snake')
    iconDownSnakeButton.classList.toggle('opacity1')
})

iconDownSnakeButton.addEventListener('click', () => {
    if (zIndexActual != SNAKEContainer.style.zIndex && !SNAKEContainer.classList.contains('pointer-events-none')) {
        SNAKEContainer.style.zIndex = zIndex()
    } else {
        SNAKEContainer.style.zIndex = zIndex()
        SNAKEContainer.classList.toggle('pointer-events-none')
        SNAKEContainer.classList.toggle('translateY-for-snake')
        iconImgDownSnakeButton.classList.toggle('opacity1')
    }
})





formToTelegramContainer.addEventListener('click', () => {
    formToTelegramContainer.style.zIndex = zIndex()
})

slideDownFormToTelegramButton.addEventListener('click', () => {
    formToTelegramContainer.classList.contains('opacity1') ? '' : iconImgDownFormToTelegramButton.classList.toggle('opacity1')
    formToTelegramContainer.classList.toggle('pointer-events-none')
    formToTelegramContainer.classList.toggle('translateY-for-form-to-telegram')
    iconDownFormToTelegramButton.classList.toggle('opacity1')
})

iconDownFormToTelegramButton.addEventListener('click', () => {
    if (zIndexActual != formToTelegramContainer.style.zIndex && !formToTelegramContainer.classList.contains('pointer-events-none')) {
        formToTelegramContainer.style.zIndex = zIndex()
    } else {
        formToTelegramContainer.style.zIndex = zIndex()
        formToTelegramContainer.classList.toggle('pointer-events-none')
        formToTelegramContainer.classList.toggle('translateY-for-form-to-telegram')
        iconImgDownFormToTelegramButton.classList.toggle('opacity1')
    }
})





chatGPT.addEventListener('click', () => {
    chatGPT.style.zIndex = zIndex()
})

iconImgGPT.addEventListener('click', () => {
    chatGPT.style.zIndex = zIndex()
    if (chatGPT.classList.contains('translateY-for-chat-container') && chatGPT.style.zIndex == zIndexActual) {
        chatGPT.classList.remove('translateY-for-chat-container')
        iconImgGPT.classList.remove('opacity1')
    } else {
        if (chatGPT.classList.contains('translateY-for-chat-container') && chatGPT.style.zIndex != zIndexActual) {
            chatGPT.style.zIndex = zIndex()
        } else {
            chatGPT.classList.add('translateY-for-chat-container')
            iconImgGPT.classList.add('opacity1')
        }
    }
})

slideDownGPT.addEventListener('click', () => {
    chatGPT.classList.remove('translateY-for-chat-container')
    iconImgGPT.classList.remove('opacity1')
})






setTimeout(() => {
    body.classList.add('opacity1')
}, 100)

setTimeout(() => {
    menuBar.classList.add('menu-bar-animation')
}, 350)

setTimeout(() => {
    // formToTelegramContainer.classList.add('translateY-for-form-to-telegram')
    // iconImgDownFormToTelegramButton.classList.add('opacity1')
    // formToTelegramContainer.style.zIndex = zIndex()
    // chatGPT.classList.add('translateY-for-chat-container')
    // chatGPT.style.zIndex = zIndex()
}, 1100)

