const { ipcRenderer, clipboard } = require('electron')
const readline = require('linebyline')

// listen main button for add XML files
document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('.convert-button')
    convertButton.addEventListener('click', () => {
        convertButton.classList.add('click01')
        ipcRenderer.send('convert-files')
        setTimeout(() => { convertButton.classList.remove('click01') }, 100)
    })
})

// function for render save button
function saveFile() {
    const textarea = document.querySelector('textarea[name="json"]').value
    const saveButton = document.querySelector('.save-button')
    saveButton.classList.add('click01')
    setTimeout(() => { saveButton.classList.remove('click01') }, 100)
    ipcRenderer.send('save-file', textarea)
}

// function for render cope button
function copyData() {
    const copyButton = document.querySelector('.copy-button')
    copyButton.classList.add('click01')
    setTimeout(() => { copyButton.classList.remove('click01') }, 100)
    const textareaContent = document.querySelector('textarea[name="json"]').value
    clipboard.writeText(textareaContent)
}

// function for aemorozov link
function goToAemorozovCom(url) {
    window.open(url, '_blank', 'width=1200,height=600')
}

// function for fetch license key
ipcRenderer.on('what-about-keys', () => {

    const key = document.querySelector('input[type="password"]').value
    const url = 'https://demo-server-for-the-xml-to-json-convert.vercel.app/api/keys'

    ipcRenderer.send('save-key', key) // save key to the app store

    if (key === undefined) {
        key = 'xxx'
    } else {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': key
            }
        })
            .then(response => response.json())
            .then(isKeyValid => {
                if (!isKeyValid || isKeyValid.error) {
                    const inputError = document.querySelector('textarea[name="json"]')
                    inputError.value = 'Wrong license key'
                } else {
                    ipcRenderer.send('key-is-active')
                }
            })
            .catch(error => { error })
    }
})

// if we have a key in store - add it to the input
ipcRenderer.on('stored-key', (event, storedKey) => {
    if (storedKey) {
        const key = document.querySelector('.password-input')
        key.value = storedKey
    }
})

// main app logic
ipcRenderer.on('process-files', async (event, filePaths) => {

    const keyInput = document.querySelector('.password-input')
    const key = keyInput.value.trim();
    const textarea = document.querySelector('textarea[name="json"]')

    filePaths = filePaths.sort() // when we add two files, we should sort them by first letter

    let linesFA = '' // we use it for add all strings by file

    linesFA = await covertFaIsta(filePaths[0]) // start function

    const base64 = Buffer.from(linesFA).toString('base64') // start convert to base64

    // add result to textarea
    async function convertAndSetTextAreaContent() {
        textarea.value = '{"result": "' + base64 + '"}'
    }

    async function covertFaIsta(path) {
        return new Promise((resolve) => {
            const rl = readline(path)
            rl.on('line', function (line, lineCount, byteCount) {
                // in the demo app we only add new string
                linesFA = linesFA + ' ' + line
            })
                // add result to the global scope
                .on('end', () => {
                    resolve(linesFA)
                })
                .on('error', function (err) {
                    console.log(err)
                })
        })
    }

    convertAndSetTextAreaContent()
})