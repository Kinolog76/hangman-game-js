function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const wordContainer = document.getElementById("word");
const restart = document.querySelectorAll(".btn-restart");
const record = document.getElementById("record");

//* Функция обновления рекорда
function updateRecord() {
  let record = localStorage.getItem("record") || 0;
  record = parseInt(record, 10);
  record++;
  localStorage.setItem("record", record.toString());
}

fetch("./data/database.json")
  .then((response) => response.json())
  .then((data) => {
    //* Рандомный выбор темы
    let randomWordNum = getRandomInt(data.length);

    //* Рандомное слово с масива
    let randomWordFromArray = getRandomInt(data[randomWordNum].gameWord.length);
    let randomWordArray = data[randomWordNum].gameWord[randomWordFromArray];

    //* Переменные
    let buttons = document.querySelectorAll(".button__wrapper button");
    const body = document.body;
    let errors = 1;
    let trueLetters = 0;

    //* Взятие и вывод темы игры
    let gameTheme = document.querySelector(".theme__name");
    gameTheme.innerHTML = data[randomWordNum].gameTheme;
    console.log(randomWordArray);
    //* Вовод букв
    for (const letter of randomWordArray) {
      wordContainer.innerHTML += `<span><p class="false">${letter}</p></span>`;
    }

    let word = document.querySelectorAll(".game__word span p");
    //* Функционал кнопок и появления букв слова
    buttons.forEach((buttonElement) => {
      buttonElement.addEventListener("click", function () {
        let letterCheck = buttonElement.value.toLowerCase();
        //* Если угадал букву
        if (randomWordArray.includes(letterCheck)) {
          word.forEach((wordElement) => {
            if (letterCheck == wordElement.innerHTML) {
              wordElement.classList.add("true");
              wordElement.classList.remove("false");
              buttonElement.classList.add("btn-true");
              trueLetters++;
              if (trueLetters == randomWordArray.length) {
                body.classList.add("winner");
                //* Обновление рекорда
                updateRecord();
                //* Вывод рекорда на странице
                record.innerHTML = localStorage.getItem("record");
              }
            }
          });
          //* Если не угадал букву
        } else {
          body.classList.add(`er-${errors++}`);
          buttonElement.classList.add("btn-false");
          //* Если ошибки достигнуты, то обнуляем счетчик ошибок и записываем в локальное хранилище 0
          if (errors == 8) {
            localStorage.setItem("record", 0);
          }
        }
      });
    });
  })
  .catch((error) => console.error("Ошибка при загрузке JSON:", error));

//* Перезагрузка странички
restart.forEach((btnRestart) => {
  btnRestart.addEventListener("click", function () {
    location.reload();
  });
});
