const triviaNumber = 100
const triviaQuestions = 20
const triviaMaxScore = 20
const triviaAnswerButtons = 7
const triviaDev = true

const questionNode = document.querySelector('#question-node')
const variantsNode = document.querySelector('#variants-node')
const scoreNode = document.querySelector('#score-node')

let triviaScore = 0
let currentTriviaAnswer = 0
let currentTriviaText = ''

let triviaNumbers = getRandomTriviaNumbers(triviaQuestions)


makeGame()


function makeGame() {
    let number = triviaNumbers.pop()
    getTriviaAnswer(number)
}

function getRandomTriviaNumbers(number = 20) {
    let numbers = new Set()
    while (numbers.size < number) {
        numbers.add(getNumber(triviaNumber))
    }
    return Array.from(numbers).sort(() => Math.random() - 0.5)
}

function getNumber(amount) {
    return Math.floor(Math.random() * amount + 1)
}

function getTriviaAnswer(number) {
    fetch(`http://numbersapi.com/${number}`)
        .then(res => res.text())
        .then(data => processTriviaText(data))
        .catch(err => console.log(err))
}

function processTriviaText(answer) {
    currentTriviaAnswer = parseInt(answer)
    if (triviaDev) console.log(currentTriviaAnswer);
    questionNode.innerHTML = `What${answer.substring(('' + currentTriviaAnswer).length).replace('.', '')}?`
    renderTriviaButtons(currentTriviaAnswer)
}

function renderTriviaButtons(num) {
    let buttons = new Set()
    buttons.add(renderTriviaVariant(num))
    while(buttons.size < triviaAnswerButtons) {
        let u = getNumber(num * 2)
        buttons.add(renderTriviaVariant(u))
    }
    buttons = Array.from(buttons).sort(() => Math.random() - 0.5)
    variantsNode.innerHTML = renderAllTriviaVariants(buttons)
}

function makeAnswer(num) {
    if(currentTriviaAnswer == num) {
        if(++triviaScore < triviaMaxScore){
            scoreNode.innerHTML = `Questions answered: ${triviaScore}`
            makeGame()
        } else {
            scoreNode.innerHTML = `You won! You answered ${triviaScore} questions. <button onclick="resetGame()">Restart</button>`
        }
    } else {
        scoreNode.innerHTML = `Game over, the answer was ${currentTriviaAnswer}, you replied ${triviaScore} questions. <button onclick="resetGame()">Restart</button>`
    }
}

function resetGame() {
    if (triviaDev) console.clear()
    triviaScore = 0
    triviaNumbers = getRandomTriviaNumbers(triviaQuestions)
    scoreNode.innerHTML = ''
    makeGame()
}

function renderTriviaVariant(u) {
    return `<button class="trivia-button" onclick="makeAnswer(${u})">${u}</button>`
}

function renderAllTriviaVariants(buttons) {
    return buttons.join('')
}
