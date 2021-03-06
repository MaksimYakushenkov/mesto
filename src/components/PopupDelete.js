import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor (popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this._deleteConfirm = this._popup.querySelector('.popup__confirm-delete');
  }

  setEventListeners(idCard, deleteCardEl) {
    super.setEventListeners();
    this._deleteConfirm.addEventListener('click', () => {
      this._handleCardDelete(idCard, deleteCardEl);
    });
  }
}