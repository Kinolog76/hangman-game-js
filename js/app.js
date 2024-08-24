//* Импорты классов, функций
import { Modal } from "./classes.js";
import {
  getRandomInt,
  updateRecord,
  reloadPage,
  changeDifficulty,
  buttonsKlick,
  reloadPageOnEnd,
} from "./functions.js";

//* Переменные
let buttons = document.querySelectorAll(".button__wrapper button");
const body = document.body;
let errors = 1;
let trueLetters = 0;
const wordContainer = document.getElementById("word");
const restart = document.querySelectorAll(".btn-restart");
const record = document.getElementById("record");
const questionBtnOpen = document.querySelector(".panel_btn-info");
const questionBtnClose = document.querySelector(".question-pop_close");
const formBtnOpen = document.querySelector(".panel_btn-form");
const formBtnClose = document.querySelector(".form-pop_close");
const formInput = document.querySelectorAll(".form-pop_item input");
const resetBtn = document.querySelector(".panel_btn-restart");

//* Проверка наличия сложности в localStorage
if (localStorage.getItem("difficulty") == null) {
  body.classList.add("form-pop_active");
}

fetch("./data/database.json")
  .then((response) => response.json())
  .then((data) => {
    formInput.forEach((input) => {
      input.addEventListener("click", () => {
        resetGame(data);
      });
    });
    resetBtn.addEventListener("click", () => resetGame(data));
    setupButtonListeners(data);
    resetGame(data);
  })
  .catch((error) => console.error("Ошибка при загрузке JSON:", error));

//* Выбор слова в зависимости от сложности
function selectWordBasedOnDifficulty(data) {
  let randomWordNum, randomWordFromArray, selectedWord;
  do {
    randomWordNum = getRandomInt(data.length);
    randomWordFromArray = getRandomInt(data[randomWordNum].gameWord.length);
    selectedWord = data[randomWordNum].gameWord[randomWordFromArray];
  } while (
    (localStorage.getItem("difficulty") == "easy" && selectedWord.length > 5) ||
    (localStorage.getItem("difficulty") == "medium" && selectedWord.length > 8) ||
    (localStorage.getItem("difficulty") == "hard" && selectedWord.length < 8)
  );
  return { selectedWord, theme: data[randomWordNum].gameTheme };
}

//* Обновление контейнера слова
function updateWordContainer(selectedWord, theme) {
  document.querySelector(".theme__name").innerHTML = theme;
  wordContainer.innerHTML = selectedWord
    .split("")
    .map((letter) => `<span><p class="false">${letter}</p></span>`)
    .join("");
}

//* Сброс игры
window.resetGame = function (data) {
  errors = 1;
  trueLetters = 0;
  body.className = "";
  const { selectedWord, theme } = selectWordBasedOnDifficulty(data);
  buttons.forEach((buttonElement) => {
    buttonElement.className = "";
    buttonElement.removeAttribute("disabled");
  });
  updateWordContainer(selectedWord, theme);
};

//* Функционал отображения слова
function setupButtonListeners() {
  buttons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", function () {
      const letterCheck = buttonElement.value.toLowerCase();
      const wordElements = document.querySelectorAll(".game__word span p");
      let found = false;

      //* Проверка наличие нажатой буквы в слове
      wordElements.forEach((wordElement) => {
        if (letterCheck === wordElement.innerHTML) {
          wordElement.classList.replace("false", "true");
          buttonElement.classList.add("btn-true");
          trueLetters++;
          found = true;
        }
      });

      //* Если выбраной буквы нет в слове
      if (!found) {
        body.classList.add(`er-${errors++}`);
        buttonElement.classList.add("btn-false");
        //* Если слово не отгадано
        if (errors === 8) {
          localStorage.setItem("record", 0);
          wordElements.forEach((wordElement) => {
            wordElement.classList.add("true");
          });
        }
        //* Если слово отгадано
      } else if (trueLetters === wordElements.length) {
        body.classList.add("winner");
        updateRecord();
        record.innerHTML = localStorage.getItem("record");
      }
    });
  });
}

//* Перезагрузка страницы при окончании игры
reloadPageOnEnd(buttons);

//* Изменение сложности
changeDifficulty(formInput);

//* Нажитие кнопок
buttonsKlick(buttons);

//* Перезагрузка странички
reloadPage(restart);

//* Создаем экземпляры класса для попапов
const questionModal = new Modal(questionBtnOpen, questionBtnClose, "question-pop");
const formModal = new Modal(formBtnOpen, formBtnClose, "form-pop");
