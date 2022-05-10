// Класс создания карточки секции "Места"
export default class Card {
  constructor(data, userInfo, templateSelector, handleCardClick, putCardLike, deleteCardLike, deletePopupClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._idCard = data._id;
    this._ownerCardId = data.owner._id;
    this._userId = userInfo._id;
    this._numCardLikes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._putCardLike = putCardLike;
    this._deleteCardLike = deleteCardLike;
    this._deletePopupClick = deletePopupClick;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
    this._toggleCardLike();
    this._cardLikes = this._element.querySelector('.card__likes-num');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardLikes.textContent = this._numCardLikes;
    this._isOwner();
    return this._element;
  }

  _isOwner() {
    if(this._ownerCardId === this._userId) {
    this._trashButton = document.createElement('button');
    this._trashButton.classList.add('card__trash');
    this._element.append(this._trashButton);
    this._trashButton.addEventListener('click', () => {
      const deleteCardEl = this._element.closest('.card');
      this._deletePopupClick(this._idCard, deleteCardEl);
    });
    }
  }

  _toggleCardLike() {
    this._likes.forEach(el => {
      if(el._id === this._userId) {
        this._likeButton.classList.add('card__like_active');
      }      
    });
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if(!this._likeButton.classList.contains('card__like_active')) {
        this._putCardLike(this._idCard, this._cardLikes, this._likeButton);
      } else {
        this._deleteCardLike(this._idCard, this._cardLikes, this._likeButton);
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }
}