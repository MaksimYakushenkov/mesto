import '../../pages/index.css';

// Импортируем класс карточки
import {Card} from '../components/Card.js';

// Импортируем класс секции
import Section from '../components/Section.js';

// Импортируем класс, который отвечает за управление отображением информации о пользователе на странице
import UserInfo from '../components/UserInfo.js';

//Импортируем класс попапа
import Popup from '../components/Popup.js';

//Импортируем класс попапа с картинкой
import PopupWithImage from '../components/PopupWithImage.js';

//Импортируем класс попапа с формой
import PopupWithForm from '../components/PopupWithForm.js';

// Импортируем класс валидатора
import {FormValidator} from '../components/FormValidator.js';

// Импортируем необходимые глобальные переменные
import {editProfileButton, profilePopup, profileName, profileAbout, newProfileName, newProfileAbout, profileForm, placePopup, addPlaceButton, placeForm, newPlace, newImage, elementSection, imagePopup, subtitleImagePopup, pictureImagePopup, popups, formValidators, config, initialCards} from '../utils/constants.js';

const profilePopupAdd = new Popup('.profile-popup');
profilePopupAdd.setEventListeners();
const placePopupAdd = new Popup('.place-popup');
placePopupAdd.setEventListeners();

// Функция создания карточки секции "Места"
function createCard(item) {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// Функция создания карточек из списка данных
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card (item, '#card', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementSection);

//Функция включения валидации всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Включение валидации
enableValidation(config);

// Слушатель кнопки "Редактировать профиль"
editProfileButton.addEventListener('click', function () {
  formValidators['editProfile'].resetValidation();
  const getUserInfo = new UserInfo({profileName: '.profile__name', profileAbout: '.profile__about'});
  const userInfo = getUserInfo.getUserInfo();
  profilePopupAdd.open();
  newProfileName.setAttribute('value', userInfo.name);
  newProfileAbout.setAttribute('value', userInfo.about);
}); 

// Функция открытия попапа с картинкой
function handleCardClick(name, link) {
  const imagePopup = new PopupWithImage({name: name, link: link},'.image-popup');
  imagePopup.open();
  imagePopup.setEventListeners();
}

// Слушатель кнопки "Добавить Место"
addPlaceButton.addEventListener('click', function () {
    formValidators['addPlace'].resetValidation();
    placePopupAdd.open();
}); 


const profileFormPopup = new PopupWithForm ('.profile-popup', () => {
  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const getUserInfo = new UserInfo({profileName: '.profile__name', profileAbout: '.profile__about'});
    getUserInfo.setUserInfo();
    profileFormPopup.close();
  });
} );

const placeFormPopup = new PopupWithForm ('.place-popup', () => {
  placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = {
      name: newPlace.value, 
      link: newImage.value
    };
    const readyNewCard = createCard(data);
    elementSection.prepend(readyNewCard);
    placeFormPopup.close();
  });
} );

placeFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
cardList.renderer();