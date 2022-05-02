import Popup from './Popup.js';
import {imagePopup} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._subtitleImagePopup = imagePopup.querySelector('.popup__subtitle');
    this._pictureImagePopup = imagePopup.querySelector('.popup__image');
  }
  
  open(data) {
    super.open();
    this._subtitleImagePopup.textContent = data.name;
    this._pictureImagePopup.alt = data.name;
    this._pictureImagePopup.src = data.link;
  }
}