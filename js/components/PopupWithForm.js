import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, callBackForm) {
    super(popupSelector);
    this._submitBtn = callBackForm;
  }
  
  _getInputValues() {
    this._gottenValues = {};
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
        this._gottenValues[input.name] = input.value;
    })
    console.log(this._gottenValues);
    return this._newValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn();
  }

  close () {
    super.close();
    const popupForm = this._popup.querySelector('.popup__form');
    popupForm.reset();
  }
}