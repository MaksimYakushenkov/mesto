import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._subtitleImagePopup = this._popup.querySelector('.popup__subtitle');
    this._pictureImagePopup = this._popup.querySelector('.popup__image');
  }
  
  open(data) {
    super.open();
    this._subtitleImagePopup.textContent = data.name;
    this._pictureImagePopup.alt = data.name;
    this._pictureImagePopup.src = data.link;
  }
}