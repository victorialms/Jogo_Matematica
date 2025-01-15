document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game');
    const gameContent = document.getElementById('game-content');
    const operationElement = document.getElementById('operation');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    const playAgainButton = document.getElementById('play-again');

    let score = 0;
    let timeLeft = 60;
    let timerInterval;
    let gameInProgress = false;

    const multiplication = ['*'];
    const additionSubtraction = ['+', '-'];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateOperation() {
        let num1, num2, operation;

        if (Math.random() < 0.5) { // 50% chance de gerar uma operação de multiplicação
            num1 = getRandomNumber(1, 9); // Multiplicação com números de 1 a 9
            num2 = getRandomNumber(1, 10); // Multiplicação com números de 1 a 10
            operation = multiplication[Math.floor(Math.random() * multiplication.length)];
        } else { // 50% chance de gerar uma operação de soma ou subtração
            num1 = getRandomNumber(10, 50); // Ampliando o intervalo para soma e subtração
            num2 = getRandomNumber(1, 20); // Ampliando o intervalo para soma e subtração
            operation = additionSubtraction[Math.floor(Math.random() * additionSubtraction.length)];
        }

        let question;
        let correctAnswer;

        switch (operation) {
            case '+':
                question = `${num1} + ${num2}`;
                correctAnswer = num1 + num2;
                break;
            case '-':
                question = `${num1} - ${num2}`;
                correctAnswer = num1 - num2;
                break;
            case '*':
                question = `${num1} * ${num2}`;
                correctAnswer = num1 * num2;
                break;
        }

        operationElement.textContent = question;
        operationElement.dataset.answer = correctAnswer;
    }

    function startGame() {
        score = 0;
        timeLeft = 60;
        scoreElement.textContent = `Pontos: ${score}`;
        timerElement.textContent = `Tempo restante: ${timeLeft}s`;
        resultElement.style.display = 'none';
        playAgainButton.style.display = 'none';
        answerInput.value = '';
        answerInput.disabled = false;
        answerInput.focus();

        generateOperation();
        gameInProgress = true;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Tempo restante: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        resultElement.textContent = `Fim do jogo! Você fez ${score} pontos.`;
        resultElement.style.display = 'block';
        playAgainButton.style.display = 'block';
        answerInput.disabled = true;
        gameInProgress = false;
    }

    submitButton.addEventListener('click', () => {
        if (!gameInProgress) return; // Impede que o usuário responda quando o jogo não está em progresso

        const userAnswer = parseFloat(answerInput.value);
        const correctAnswer = parseFloat(operationElement.dataset.answer);

        if (userAnswer === correctAnswer) {
            score++;
            scoreElement.textContent = `Pontos: ${score}`;
        }

        answerInput.value = '';
        generateOperation();
    });

    playAgainButton.addEventListener('click', startGame);

    startGameButton.addEventListener('click', () => {
        startGameButton.style.display = 'none';
        gameContent.style.display = 'block';
        startGame();
    });
});
