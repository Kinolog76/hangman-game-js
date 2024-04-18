//* Рандомное число
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//* Обновление рекорда
export function updateRecord() {
  let record = localStorage.getItem("record") || 0;
  record = parseInt(record, 10);
  record++;
  localStorage.setItem("record", record.toString());
}

//* Перезагрузка страницы
export function reloadPage(button) {
  button.forEach((btnRestart) => {
    btnRestart.addEventListener("click", function () {
      location.reload();
    });
  });
}

//* Перезагрузка страницы при окончании игры
export function reloadPageOnEnd(buttons) {
  document.addEventListener("keydown", function (event) {
    if (document.body.classList.contains("er-7") || document.body.classList.contains("winner")) {
      buttons.forEach((button) => {
        button.setAttribute("disabled", "");
      });
    }
    if ((document.body.classList.contains("er-7") || document.body.classList.contains("winner")) && event.key === "Enter") {
      location.reload();
    }
  });
}

//* Изменение сложности
export function changeDifficulty(button) {
  button.forEach((input) => {
    if (input.id == localStorage.getItem("difficulty")) {
      input.checked = true;
    }
    input.addEventListener("change", () => {
      localStorage.setItem("difficulty", input.id);
      resetGame();
    });
  });
}

//* Нажитие кнопок
export function buttonsKlick(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.setAttribute("disabled", "");
    });
  });

  window.addEventListener("keydown", function (event) {
    const buttonToClick = [...buttons].find((button) => button.innerHTML.toLowerCase() === event.key.toLocaleLowerCase());
    if (buttonToClick) {
      buttonToClick.click();
    }
  });
}
