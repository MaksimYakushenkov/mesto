// Импортируем класс карточки
import {Card} from './Card.js';

// Импортируем класс валидатора
import {FormValidator} from './FormValidator.js';

// Импортируем необходимые глобальные переменные
import {editProfileButton, profilePopup, profileName, profileAbout, newProfileName, newProfileAbout, profileForm, placePopup, addPlaceButton, placeForm, newPlace, newImage, elementSection, imagePopup, subtitleImagePopup, pictureImagePopup, popups, initialCards} from './utils/constants.js';

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

// Функция создания карточки секции "Места"
function createCard(item) {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// Функция создания карточек из списка данных
initialCards.forEach(function (el) {
  const cardElement = createCard(el)
  elementSection.append(cardElement);
});

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
    name: newPlace.value, 
    link: newImage.value
  };
  const readyNewCard = createCard(data);
  elementSection.prepend(readyNewCard);
  placeForm.reset();
  enableValidationForm();
  closePopup(placePopup);
}

// Слушатель кнопки "Редактировать профиль"
editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileAbout.setAttribute('value', profileAbout.textContent);
}); 

// Функция открытия попапа с картинкой
function handleCardClick(name, link) {
  subtitleImagePopup.textContent = name;
  pictureImagePopup.alt = name;
  pictureImagePopup.src = link;
  openPopup(imagePopup);
}

// Слушатель кнопки "Добавить Место"
addPlaceButton.addEventListener('click', function () {
  openPopup(placePopup);
}); 


// Слушатели закрытия всех попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

// Функция закрытия попапа клавишей Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функции включения валидации форм
enableValidationForm();

// Слушатели кнопок "Сохранить" под формами редактирования профиля и добавления нового места
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

export {openPopup}