import { Modal } from "/js/classes.js";
import { getRandomInt, updateRecord, reloadPage, changeDifficulty, buttonsKlick, reloadPageOnEnd } from "/js/functions.js";

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

//* Проверка наличия сложности в localStorage
if (localStorage.getItem("difficulty") == null) {
  body.classList.add("form-pop_active");
}

fetch("./data/database.json")
  .then((response) => response.json())
  .then((data) => {
    //* Рандомный выбор темы
    let randomWordNum = getRandomInt(data.length);

    //* Рандомное слово с массива
    let randomWordFromArray;

    //* Функция выбора слова
    function randomWordArray() {
      return data[randomWordNum].gameWord[randomWordFromArray];
    }

    //* Функция выбора слова по сложности
    function selectWordBasedOnDifficulty() {
      //* Выбор слова по сложности
      do {
        randomWordFromArray = getRandomInt(data[randomWordNum].gameWord.length);
        //* Проверка сложности и длины слова
      } while (
        (localStorage.getItem("difficulty") == "easy" && randomWordArray().length > 5) ||
        (localStorage.getItem("difficulty") == "medium" && randomWordArray().length > 8) ||
        (localStorage.getItem("difficulty") == "hard" && randomWordArray().length < 8)
      );
    }

    selectWordBasedOnDifficulty();

    console.log(randomWordArray());
    //* Взятие и вывод темы игры
    let gameTheme = document.querySelector(".theme__name");
    gameTheme.innerHTML = data[randomWordNum].gameTheme;
    //* Вывод букв
    for (const letter of randomWordArray()) {
      wordContainer.innerHTML += `<span><p class="false">${letter}</p></span>`;
    }

    let word = document.querySelectorAll(".game__word span p");
    //* Функционал кнопок и появления букв слова
    buttons.forEach((buttonElement) => {
      buttonElement.addEventListener("click", function () {
        let letterCheck = buttonElement.value.toLowerCase();
        //* Если угадал букву
        if (randomWordArray().includes(letterCheck)) {
          word.forEach((wordElement) => {
            if (letterCheck == wordElement.innerHTML) {
              wordElement.classList.add("true");
              wordElement.classList.remove("false");
              buttonElement.classList.add("btn-true");
              trueLetters++;
              if (trueLetters == randomWordArray().length) {
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

//* Перезагрузка страницы при окончании игры
reloadPageOnEnd(buttons);

//* Нажитие кнопок
buttonsKlick(buttons);

//* Изменение сложности
changeDifficulty(formInput);

//* Перезагрузка странички
reloadPage(restart);

//* Создаем экземпляры класса для попапов
const questionModal = new Modal(questionBtnOpen, questionBtnClose, "question-pop");
const formModal = new Modal(formBtnOpen, formBtnClose, "form-pop");
