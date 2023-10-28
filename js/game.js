function startGame() {
    var secretNumber = Math.floor(Math.random() * 1000) + 1;
    var attempts = 0;

    function guessNumber() {
        var userInput = prompt("Введите число:");

        if (userInput === null || userInput === "") {
            alert("Введите число!");
            guessNumber();
            return;
        }

        var userGuess = parseInt(userInput);

        if (isNaN(userGuess)) {
            alert("Введите число!");
            guessNumber();
            return;
        }

        attempts++;

        if (userGuess < secretNumber) {
            alert("Искомое число больше!");
            guessNumber();
        } else if (userGuess > secretNumber) {
            alert("Искомое число меньше!");
            guessNumber();
        } else {
            var playAgain = confirm("Вы угадали! Количество попыток: " + attempts + ". Начать заново?");
            if (playAgain) {
                startGame();
            } else {
                alert("Спасибо за игру!");
            }
        }
    }

    guessNumber();
}
