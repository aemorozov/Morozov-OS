import snakeStyles from './snake_styles.css'

const startButton = document.querySelector('#startButton') // получаем кнопку start для использования при нажатии
let level = Array.prototype.slice.call(document.querySelectorAll('.level'), 0) // создаём массив из вариантов размера поля
let speedSelect = Array.prototype.slice.call(document.querySelectorAll('.level'), 0) // создаём массив из вариантов скорости
const restartButton = document.querySelector('#restart_button') // кнопка рестарта
const colors = ['#ADFF2F', '#20B2AA', '#FF69B4', '#FFFF00', '#FF0000'] // создаём массив цветов
let lines = 0 // выбираем стороны квадрата 10, 15 или 20
let board = document.querySelector('#board') // получаем поле "доска" из HTML
let sSquares = [] // создаём пустой массив для будущих квадратов
let motion = 0 // переменная для будущего движения
let snake = [0] // массив нашей змеи
let i = 1 // главная переменная для расчёта цветных квадратов
let e = 0 // переменная для конечного значения змейки, что бы квадрат стал серым
let speed = 0 // скорость в ms
let k = 39 // переменная для предотвращения "обратного" движения
let xmas = [0] // переменная для клонирования нашей змейки, нужна для функции столкновения змейки самой с собой
let score = 0 // очки
let scoreToWin = 0 // очки для победы
let event = null // для создания нашего поля
let speedChange = 0 // изменение скорости (НЕ в зависимости от уровня)
let GRC = 0 // get random color
let GRN = 0 // get random number
let SSquares_NUMBER = 0
let square = 0

// console.log(board)

level.forEach(function (lvl, x) { // сокращенный вариант выбора размера поля и скорости
    lvl.addEventListener('click', event => {
        for (let i = 0, length = level.length; i < length; i++) {
            level[i].style.color = '#fffffffd';
        }
        level[x].style.color = '#56c5f8'
        lines = parseInt(level[x].getAttribute('id')) // выбираем размер поля
        speed = parseInt(speedSelect[x].getAttribute('speed')) // указываем скорость
        speedChange = speed / 100 * 2
    });
});

startButton.addEventListener('click', event => { // кнопка старт
    if (lines === 0) {
    } else {
        document.getElementById('start_game').style.display = 'none'
        document.getElementById('startButton').style.display = 'none'
        document.getElementById('board').style.display = 'flex'
        game()
    }
})

restartButton.addEventListener('click', event => { // кнопка рестарт
    document.getElementById('game_over').style.display = 'none'
    document.getElementById('score').style.display = `none`
    document.getElementById('restart_button').style.display = 'none'
    document.getElementById('start_game').style.display = 'block'
    document.getElementById('startButton').style.display = 'block'
    level = Array.prototype.slice.call(document.querySelectorAll('.level'), 0) // создаём массив из вариантов размера поля
    speedSelect = Array.prototype.slice.call(document.querySelectorAll('.level'), 0) // создаём массив из вариантов скорости
    lines = 0 // выбираем стороны квадрата 10, 15 или 20
    board = 0
    board = document.querySelector('#board') // получаем поле "доска" из HTML
    sSquares = [] // создаём пустой массив для будущих квадратов
    motion = 0 // переменная для будущего движения
    snake = [0] // массив нашей змеи
    i = 1 // главная переменная для расчёта цветных квадратов
    e = 0 // переменная для конечного значения змейки, что бы квадрат стал серым
    speed = 0 // скорость в ms
    k = 39 // переменная для предотвращения "обратного" движения
    xmas = [0] // переменная для клонирования нашей змейки, нужна для функции столкновения змейки самой с собой
    score = 0 // очки
    scoreToWin = 0 // очки для победы
    event = null // для создания нашего поля
    speedChange = 0 // изменение скорости (НЕ в зависимости от уровня)
    GRC = 0 // get random color
    GRN = 0 // get random number
    SSquares_NUMBER = 0
    square = ''
    board.innerHTML = ''

    for (let i = 0; i < level.length; i++) {
        level[i].style.color = '#fffffd'
    }

})

function game() {
    SSquares_NUMBER = 0
    SSquares_NUMBER = lines ** 2 // создаем максимальное значение квадратов
    if (SSquares_NUMBER === 100) { // создаём таблицу квадратиков соответствующую размеру экрана и максимальному количеству квадратов
        board.style.maxWidth = '190px'
    } else if (SSquares_NUMBER === 225) {
        board.style.maxWidth = '280px'
    } else if (SSquares_NUMBER === 400) {
        board.style.maxWidth = '360px'
    }

    for (let i = 0; i < SSquares_NUMBER; i++) { // создаём div'ы со стилями для каждого квадратика и выводим на экран 
        square = document.createElement('div')
        square.classList.add('square')
        sSquares.push(square)
        board.append(square)
    }

    motion = setInterval(plusOneSquareRight, speed) // создаём стартовое движение змейки

    createRandomSquare() // создаём нашу первую цель

    window.addEventListener('keydown', (key) => {     // создаём управление с клавиатуры
        if (key.keyCode === 39 && k != 37) { // змейка "назад" пойти не может, "только вперёд"!
            motion = clearInterval(motion) // и выполняем эти функции для движения
            motion = setInterval(plusOneSquareRight, speed)
        } else if (key.keyCode === 40 && k != 38) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareDown, speed)
        } else if (key.keyCode === 37 && k != 39) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareLeft, speed)
        } else if (key.keyCode === 38 && k != 40) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareUp, speed)
        }
    })

    window.addEventListener("touchstart", function (e) { // создаём управление с тачскрина
        event = e;
    });
    window.addEventListener("touchmove", function (e) {
        let moveDeltaY = e.touches[0].pageY - event.touches[0].pageY
        let moveDeltaX = e.touches[0].pageX - event.touches[0].pageX
        if (moveDeltaY > 40 && k != 38) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareDown, speed)
        }
        else if (moveDeltaY < -40 && k != 40) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareUp, speed)
        }
        else if (moveDeltaX < 0 && k != 39) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareLeft, speed)
        }
        else if (moveDeltaX > 0 && k != 37) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareRight, speed)
        }
    });
    window.addEventListener("touched", function (e) {
        event = null;
    });

    function plusOneSquareRight() { // реализуем условие для движения вправо
        k = 39 // значение k для проверки направления движения функциями изменения направления движения
        collision() // сперва проверим не столкнулись ли мы с хвостом змейки
        e = snake[snake.length - 1] // переменная для обозначения окончания змейки
        if (sSquares[i] === sSquares[GRN - 1] && (i + 1) / lines != Math.floor((i + 1) / lines)) { // чтобы новый квадратик "прилипал спереди"
            snake.unshift(i + 1)
            i++
            forIAndESquares()
            createRandomSquare()
            speed = speed - speedChange
        }
        if ((i + 1) / lines === Math.floor((i + 1) / lines)) { // создаём поведение на правой границе
            if (sSquares[(i - lines + 1)] === sSquares[GRN]) { // а тут совсем редкое поведение на правой границе, когда мы ловим цель на левой границе
                snake.unshift(i) // добавляем в змейку новое значение
                i = i - lines + 1 // что бы квадратик приклеился спереди нашей змейки
                GRC = getRandomColor()
                forIAndESquares()
                createRandomSquare()
                speed = speed - speedChange
            } else {
                i = i - lines + 1
            }
        } else {
            i = i + 1
        }
        snake.unshift(i) // добавляем в змейку новое значение
        snake.pop() // отбрасываем ненужное
        forIAndESquares()
        // console.log(speed)
    }

    function plusOneSquareLeft() { // реализуем движение влево, всё аналогично предыдущей функции движения вправо
        k = 37
        collision()
        e = snake[snake.length - 1]
        if (sSquares[i] === sSquares[GRN + 1] && i / lines != Math.floor(i / lines)) {
            snake.unshift(i - 1)
            i--
            forIAndESquares()
            createRandomSquare()
            speed = speed - speedChange
        }
        if (i / lines === Math.floor(i / lines)) {
            if (sSquares[i + lines - 1] === sSquares[GRN]) {
                snake.unshift(i)
                i = i + lines - 1
                forIAndESquares()
                createRandomSquare()
                speed = speed - speedChange
            } else {
                i = i + lines - 1
            }
        } else {
            i = i - 1
        }
        snake.unshift(i) // добавляем в змейку новое значение
        snake.pop() // отбрасываем ненужное 
        forIAndESquares()
        // console.log(speed)
    }

    function plusOneSquareUp() { // реализуем движение вверх
        k = 38
        collision()
        e = snake[snake.length - 1]
        if (sSquares[i] === sSquares[GRN + lines] && sSquares[i] != sSquares[GRN - lines ** 2 + lines]) {
            snake.unshift(i - lines)
            i = i - lines
            forIAndESquares()
            createRandomSquare()
            speed = speed - speedChange
        }
        if (i < lines) {
            if (sSquares[i + lines ** 2 - lines] === sSquares[GRN]) {
                snake.unshift(i)
                i = i + lines ** 2 - lines
                forIAndESquares()
                createRandomSquare()
                speed = speed - speedChange
            } else {
                i = i + lines ** 2 - lines
            }
        } else {
            i = i - lines
        }
        snake.unshift(i)
        snake.pop()
        forIAndESquares()
        // console.log(speed)
    }

    function plusOneSquareDown() { // реализуем движение вниз
        k = 40
        collision()
        e = snake[snake.length - 1]
        if (sSquares[i] === sSquares[GRN - lines] && sSquares[i] != sSquares[GRN + lines ** 2 - lines]) {
            snake.unshift(i + lines)
            i = i + lines
            forIAndESquares()
            createRandomSquare()
            speed = speed - speedChange
        }
        if (i >= lines ** 2 - lines) {
            if (sSquares[i - lines ** 2 + lines] === sSquares[GRN]) {
                snake.unshift(i)
                i = i - lines ** 2 + lines
                forIAndESquares()
                createRandomSquare()
                speed = speed - speedChange
            } else {
                i = i - lines ** 2 + lines
            }
        } else {
            i = i + lines
        }
        snake.unshift(i)
        snake.pop()
        forIAndESquares()
        // console.log(speed)
    }

    function forIAndESquares() { // вынес в функцию повторяющийся код для окрашивания каждого будущего квадратика в змейке и закрашивания серым последнего
        GRC = getRandomColor()
        if (sSquares != []) {
            sSquares[i].style.backgroundColor = GRC
            sSquares[i].style.boxShadow = `0 0 2px ${GRC}, 0 0 10px ${GRC}`
            sSquares[e].style.backgroundColor = '#393939'
            sSquares[e].style.boxShadow = `0 0 2px #000`
        }
    }

    function getRandomColor() { // реализуем рандомный цвет активного квадрата из массива цветов
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    function createRandomSquare() { // делаем один из квадратов массива доски цветным (цель для змейки)
        GRC = getRandomColor()
        GRN = getRandomNumber(1, lines ** 2 - 1)
        sSquares[GRN].style.backgroundColor = GRC
        sSquares[GRN].style.boxShadow = `0 0 2px ${GRC}, 0 0 10px ${GRC}`
    }

    function getRandomNumber(min, max) { // эту функцию используем для выбора случайного квадрата под цель для змейки
        GRN = Math.round(Math.random() * (max - min) + 1)
        for (var i = 0; i < snake.length; i++) {
            if (snake[i] === GRN || e === GRN || snake[i] + lines === GRN || snake[i] - lines === GRN || snake[i] + 1 === GRN || snake[i] - 1 === GRN) {
                getRandomNumber(1, lines ** 2 - 1)
            }
        }
        return GRN
    }

    function collision() { // универсальная функция столкновения с хвостом змейки
        xmas = snake.slice() // каждый шаг клонируем массив нашей змейки
        xmas.shift() // удаляем из него значение первого элемента
        if (xmas.includes(snake[0]) || i === e) { // проверяем есть ли наша "голова" в значениях хвоста змейки
            gameOver() // если есть, то выполняем Game Over
        }
    }
}

function gameOver() { // функция для появления текста и счёта после столкновения
    score = snake.length - 1
    motion = clearInterval(motion)
    board.style.display = 'none'
    document.getElementById('game_over').style.display = 'block'
    document.getElementById('score').innerHTML = `${score}`
    document.getElementById('score').style.display = `inline`
    document.getElementById('restart_button').style.display = 'block'
}

function win() { // а тут будет функция для определения количества набранных очков, и в змейке можно будет даже победить!
    scoreToWin = snake.length - 1
    motion = clearInterval(motion)
    board.remove()
    document.getElementById('text').innerHTML = `Поздравляю! Вы поймали ${score} целей!</p>`
}