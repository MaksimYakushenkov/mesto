// Импортируем необходимые глобальные переменные и функции
import {openPopup} from './index.js';
import {imagePopup, subtitleImagePopup, pictureImagePopup} from './utils/constants.js';

// Класс создания карточки секции "Места"
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeButtonClick();
    });

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._trahButtonClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  _likeButtonClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _trahButtonClick() {
    this._element.closest('.card').remove();
  }

  _openImagePopup() {
    subtitleImagePopup.textContent = this._name;
    pictureImagePopup.alt = this._name;
    pictureImagePopup.src = this._link;
    openPopup(imagePopup);
  }

}