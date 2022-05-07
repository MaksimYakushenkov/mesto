import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor (popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this._deleteConfirm = this._popup.querySelector('.delete_confirm');
  }

  setEventListeners(id) {
    super.setEventListeners();
    this._deleteConfirm.addEventListener('click', () => {
      this._handleCardDelete(id);
    });
  }

  close () {
    super.close();
  }
}