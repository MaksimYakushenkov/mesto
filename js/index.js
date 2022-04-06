// Импортируем класс карточки
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Импортируем необходимые глобальные переменные
import {editProfileButton, profilePopup, profileName, profileAbout, newProfileName, newProfileAbout, profileForm, placePopup, addPlaceButton, placeForm, newPlace, newImage, elementSection, imagePopup, initialCards} from './utils/constants.js';

// Функция открытия модального окна и добавления обработчика
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия модального окна и удаления обработчика
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Функция сохранения введных пользователем данных в попапе "Профиль"
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = newProfileName.value;
  profileAbout.textContent = newProfileAbout.value;
  closePopup(profilePopup);
}

// Функция создания карточек секции "Места"
function createCards() {
  initialCards.forEach(function (el) {
    const card = new Card(el, '#card');
    const cardElement = card.generateCard();
    elementSection.append(cardElement);
  });
}

//Функция включения валидации всех форм
function enableValidationForm() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((elementForm) => {
    const formValid = new FormValidator({
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    }, elementForm);
    formValid.enableValidation(elementForm);
  });
}

// Функция добавления пользователем новой карточки в секцию "Места"
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: newImage.value, 
    link: newPlace.value
  };
  const creatNewCard = new Card(data, '#card');
  const readyNewCard = creatNewCard.generateCard();
  const submitPlaceButton = placeForm.querySelector('.popup__button');
  elementSection.prepend(readyNewCard);
  placeForm.reset();
  submitPlaceButton.classList.add('popup__button_disabled');
  submitPlaceButton.setAttribute('disabled', true);
  closePopup(placePopup);
}

// Слушатель кнопки "Редактировать профиль"
editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileAbout.setAttribute('value', profileAbout.textContent);
}); 

// Слушатель закрытия модального окна редактирования профила либо крестиком либо по клику по оверлею
profilePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('profile-popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(profilePopup);
  }
});

// Слушатель кнопки "Добавить Место"
addPlaceButton.addEventListener('click', function () {
  openPopup(placePopup);
}); 

// Слушатель закрытия модального окна добавления карточки места либо крестиком либо по клику по оверлею
placePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('place-popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(placePopup);
  }
});

// Слушатель закрытия модального окна просмотра изображения карточки в секции "Места" либо крестиком либо по клику по оверлею
imagePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('image-popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(imagePopup);
  }
});

// Функция закрытия попапа клавишей Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функции включения валидации форм
enableValidationForm();

// Функция создания карточек
createCards();

// Слушатели кнопок "Сохранить" под формами редактирования профиля и добавления нового места
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

export {openPopup}