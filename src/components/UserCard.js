import Card from './Card.js';

export default class UserCard extends Card{
  constructor(data, templateSelector, handleCardClick, putCardLike,deleteCardLike, deletePopupClick) {
    super (data, templateSelector, handleCardClick, putCardLike,deleteCardLike);
    this._deletePopupClick = deletePopupClick;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
    this._trashButton = document.createElement('button');
    this._trashButton.classList.add('card__trash');
    this._element.append(this._trashButton);
    if(this._toggleCardLike() === 0) {
      this._likeButton.classList.remove('card__like_active');
    } else {
      this._likeButton.classList.add('card__like_active');
    }
    this._cardLikes = this._element.querySelector('.card__likes-num');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardLikes.textContent = this._numCardLikes;
    return this._element;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._trashButton.addEventListener('click', () => {
      this._deletePopupClick(this._idCard);
    });
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _handletrashButtonClick() {
    this._element.closest('.card').remove();
  }
}