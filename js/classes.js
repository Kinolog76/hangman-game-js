export class Modal {
  //* Конструктор класса
  constructor(openButton, closeButton, modalClass) {
    //* Элементы попапа
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.modalClass = modalClass;
    this.body = document.body;

    //* Клик на кнопку открытия попапа
    this.openButton.addEventListener("click", this.openModal.bind(this));
    //* Клик на кнопку закрытия попапа
    this.closeButton.addEventListener("click", this.closeModal.bind(this));
  }

  //* Функция открытия попапа
  openModal() {
    this.body.classList.add(this.modalClass + "_active");
  }
  //* Функция закрытия попапа
  closeModal() {
    this.body.classList.remove(this.modalClass + "_active");
  }
}
