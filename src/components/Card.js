// Класс создания карточки секции "Места"
export default class Card {
  constructor(data, templateSelector, handleCardClick, putCardLike, deleteCardLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._idCard = data._id;
    this._numCardLikes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._putCardLike = putCardLike;
    this._deleteCardLike = deleteCardLike;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardTemplate;
  }
  
  _toggleCardLike() {
    let a = 0;
    this._likes.forEach(el => {
      if(el._id === "75291ceae01e84fb7e218157") {
        a = 1;
      }
    });
    return a
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
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