import * as XLSX from 'xlsx'
import { PDFDocument, rgb } from 'pdf-lib'
import QRCode from 'qrcode'

const howManyQRCodes = document.querySelector('.how-many-qr-codes')
const QRCodeLength = document.querySelector('.qr-code-length')
const startValue = document.querySelector('.start-value')
const prefix = document.querySelector('.prefix')
const suffix = document.querySelector('.suffix')
const selectPaperSize = document.querySelector('.selectPaperSize')
const dataFromInputs = []
const XLSdata = []
const moreSettingsButton = document.querySelector('.more_settings_button')
const createXLSButton = document.querySelector('.create_XLS_button')
const createQRButton = document.querySelector('.create_button')
createQRButton.disabled = true

moreSettingsButton.addEventListener('click', () => {
    getMoreSettings()
})

createXLSButton.addEventListener('click', () => {
    createData()
    createQRButton.disabled = false
})

createQRButton.addEventListener('click', () => {
    clickButton()
    createQRButton.disabled = true
})

function createData() {
    dataFromInputs.splice(0, dataFromInputs.length)
    clickXLSButton()
    dataFromInputs.push(
        howManyQRCodes.value,
        QRCodeLength.value,
        startValue.value,
        prefix.value,
        suffix.value,
        selectPaperSize.value)

    const data = createDataArray(dataFromInputs)

    if (data) {
        setTimeout(exportToExcel(data), 1000)
    }

    dataFromInputs.splice(0, dataFromInputs.length);
}

function exportToExcel(data) {
    // закладываем каждый элемент в массив для обработки
    const dataArray = data.map(el => [el])
    // создаём новую книгу
    const workbook = XLSX.utils.book_new();
    // закладываем туда значения из нашего массива
    const worksheet = XLSX.utils.aoa_to_sheet(dataArray);
    // добавляем эту книгу в файл
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    // создаём файл через ссылку и blob
    const buffer = XLSX.write(workbook, { type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const saveBlob = function (blob, fileName) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    };
    saveBlob(blob, 'data.xlsx');
}

function createDataArray(dataFromInputs) {
    // стираем стили, если они были после ошибки
    QRCodeLength.classList.remove('error-value')
    howManyQRCodes.classList.remove('error-value')
    startValue.classList.remove('error-value')
    // очищаем результат, если там что-то было
    XLSdata.splice(0, XLSdata.length)
    // проверяем поле с количеством QR
    const howManyQRCodesString = dataFromInputs[0] == '' ? 10 : dataFromInputs[0]
    // проверяем поле с указанием длины
    const QRCodeLengthString = dataFromInputs[1] == '' ? 14 : dataFromInputs[1]
    // проверяем поле со стартовым номером
    const startValueString = dataFromInputs[2] == '' ? 0 : dataFromInputs[2]
    // проверяем префикс
    const prefixString = dataFromInputs[3] == '' ? '' : dataFromInputs[3]
    // проверяем суффикс
    const suffixString = dataFromInputs[4] == '' ? '' : dataFromInputs[4]

    // глобальный цикл для создания каждой строчки в массиве со значениями для QR
    for (let i = 0; i < howManyQRCodesString; i++) {
        XLSdata.push(`${i + Number(startValueString) + suffixString}`)
        XLSdata[i] = XLSdata[i].split('')

        // подстановка нулей впереди значения в зависимости от длины
        if (XLSdata[i].length < QRCodeLengthString) {
            for (let y = XLSdata[i].length; y < QRCodeLengthString - prefixString.length; y++) {
                XLSdata[i].unshift('0')
            }
        }
        // добавляем префикс
        XLSdata[i].unshift(prefixString)
        // склейка в строку
        XLSdata[i] = XLSdata[i].join('')

        // проверка на длину строки
        if (XLSdata[i].length > QRCodeLengthString) {
            QRCodeLength.classList.add('error-value')
            return
        }
    }

    console.log(XLSdata)
    return XLSdata
}

function getMoreSettings() {
    const settingsBlock = document.querySelector('.settings_block')
    settingsBlock.classList.contains('height280')
        ? settingsBlock.classList.remove('height280')
        : settingsBlock.classList.add('height280')
}

function clickButton() {
    createQRButton.classList.add('click01')
    setTimeout(() => { createQRButton.classList.remove('click01') }, 100)
    setTimeout(() => {
        if (XLSdata.length > 0) {
            createPDFWithQRCodes(XLSdata)
        } else {
            alert(`To the first create 'data.xlsx'`)
        }
    }, 500)
}

function clickXLSButton() {
    createXLSButton.classList.add('click01')
    setTimeout(() => { createXLSButton.classList.remove('click01') }, 100)
}

async function createQRCode(value) {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(value);
        return qrCodeDataURL;
    } catch (error) {
        console.error('Ошибка при создании QR-кода:', error);
    }
}

async function createPDFWithQRCodes(values) {
    const pdfDoc = await PDFDocument.create();

    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 5;
    // const textHeight = fontSize;

    // Определение начальной позиции для текста и QR-кода
    let y = height - 134;
    let x = 8;

    // Добавление QR-кодов и значений в PDF
    for (const value of values) {

        if (y < 0) {
            page = pdfDoc.addPage()
            y = height - 134;
            x = 8;
        }

        const qrCodeData = await createQRCode(value)

        // Добавление QR-кода
        const qrCodeImage = await pdfDoc.embedPng(qrCodeData);
        page.drawImage(qrCodeImage, {
            x: x,
            y: y,
            width: 120,
            height: 120,
        });

        let lastSymbols = value

        if (value.length > 34) {
            lastSymbols = "~ " + value.split('').splice(value.length - 32, value.length).join('')
        }

        // Добавление значения
        page.drawText(lastSymbols, {
            x: x + 60 - lastSymbols.split('').length * 1.38, // Добавление отступа между QR-кодом и значением
            y: y + 7, // Корректировка координаты y для близкого расположения QR-кодов
            size: fontSize,
            color: rgb(0, 0, 0),
        });

        // Изменение координаты y для следующего элемента
        if ((x + 235) >= width) {
            y -= 115
            x = 8
        } else {
            x += 115;
        }

    }

    // Сохранение PDF в виде ArrayBuffer
    const pdfBytes = await pdfDoc.save();

    // Создание Blob из ArrayBuffer
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Открытие диалогового окна для сохранения файла
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QRs.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // window.URL.revokeObjectURL(url);
}