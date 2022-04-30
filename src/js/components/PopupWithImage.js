import Popup from './Popup.js';
import {subtitleImagePopup, pictureImagePopup} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor (data, popupSelector) {
    super(popupSelector);
    this._subtitleImagePopupTextContent = data.name;
    this._pictureImagePopupSrc = data.link;
  }
  
  open() {
    super.open();
    subtitleImagePopup.textContent = this._subtitleImagePopupTextContent;
    pictureImagePopup.alt = this._subtitleImagePopupTextContent;
    pictureImagePopup.src = this._pictureImagePopupSrc;
  }
}