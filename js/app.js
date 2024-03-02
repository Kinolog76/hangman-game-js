
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const wordContainer = document.getElementById("word");
const restart = document.querySelectorAll(".btn-restart");

fetch("./js/database.json")
  .then((response) => response.json())
  .then((data) => {
    let randomWordNum = getRandomInt(data.length);
    let randomWordArray = data[randomWordNum].gameWord[getRandomInt(data[randomWordNum].gameWord.length)]
    let randomWordLenght = randomWordArray.length
    let buttons = document.querySelectorAll(".button__wrapper button");
    const body = document.body;
    let errors = 1;
    let trueLetters = 0;

    let gameTheme = document.querySelector('.theme__name')
    gameTheme.innerHTML = data[randomWordNum].gameTheme;

    for (const letter of randomWordArray) {
      wordContainer.innerHTML += `<span><p class="false">${letter}</p></span>`;
    }

    let word = document.querySelectorAll(".game__word span p");

    buttons.forEach((buttonElement) => {
      buttonElement.addEventListener("click", function () {
        let letterCheck = buttonElement.value.toLowerCase();
        if (randomWordArray.includes(letterCheck)) {
          word.forEach((wordElement) => {
            if (letterCheck == wordElement.innerHTML) {
              wordElement.classList.add("true");
              wordElement.classList.remove("false");
              buttonElement.classList.add("btn-true");
              trueLetters++
              if (trueLetters == randomWordLenght) {
                body.classList.add("winner");
              }
            }
          });
        } else {
          body.classList.add(`er-${errors++}`);
          buttonElement.classList.add("btn-false");
        }
      });
    });
  })
  .catch((error) => console.error("Ошибка при загрузке JSON:", error));

restart.forEach((btnRestart) => {
  btnRestart.addEventListener("click", function () {
    location.reload();
  });
});
