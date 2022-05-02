import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
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

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close () {
    super.close();
    this._formElement.reset();
  }
}