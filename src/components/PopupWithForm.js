import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__button');
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
  }
  
  _getInputValues() {
    this._gottenValues = {};
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
        this._gottenValues[input.id] = input.value;
    });
    return this._gottenValues;
  }

  _renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close () {
    this._renderLoading(false);
    super.close();
    this._formElement.reset();
  }
}