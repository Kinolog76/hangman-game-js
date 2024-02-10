let wordsArr = ["красный", "зеленый", "синий", "белый", "черный", "желтый", "розовый", "оранжевый", "фиолетовый", "голубой", "коричневый", "серый", "золотой", "серебряный", "бежевый"];
const wordContainer = document.getElementById("word");
const restart = document.getElementById("restart");
const body = document.body;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let randomWordNum = getRandomInt(wordsArr.length);
let randomWord = wordsArr[randomWordNum];
for (const letter of randomWord) {
  wordContainer.innerHTML += `<span><p class="false">${letter}</p></span>`;
}
console.log(randomWord);

let buttons = document.querySelectorAll(".button__wrapper button");
let word = document.querySelectorAll(".game__word span p");
let errors = 1;

buttons.forEach((buttonElement) => {
  buttonElement.addEventListener("click", function () {
    let letterCheck = buttonElement.value.toLowerCase();
    if (randomWord.includes(letterCheck)) {
      console.log(letterCheck);
      word.forEach((wordElement) => {
        if (letterCheck == wordElement.innerHTML) {
          wordElement.classList.add("true");
          wordElement.classList.remove("false");
          buttonElement.classList.add("btn-true");
        }
      });
    } else {
      body.classList.add(`er-${errors++}`);
      buttonElement.classList.add("btn-false");
    }
  });
});

restart.addEventListener("click", function(){
  location.reload();
})