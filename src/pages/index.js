// Импортируем классы CSS
import './index.css';

// Импортируем класс карточки
import {Card} from '../components/Card.js';

// Импортируем класс секции
import Section from '../components/Section.js';

// Импортируем класс, который отвечает за управление отображением информации о пользователе на странице
import UserInfo from '../components/UserInfo.js';

//Импортируем класс попапа с картинкой
import PopupWithImage from '../components/PopupWithImage.js';

//Импортируем класс попапа с формой
import PopupWithForm from '../components/PopupWithForm.js';

// Импортируем класс валидатора
import {FormValidator} from '../components/FormValidator.js';

// Импортируем необходимые глобальные переменные
import {editProfileButton, newProfileName, newProfileAbout, addPlaceButton, elementSection, formValidators, cardTemplateSelector, config, initialCards} from '../utils/constants.js';

// Функция создания карточки секции "Места"
function createCard(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// Функция создания карточек из списка данных
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card (item, cardTemplateSelector, handleCardClick);
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

// Слушатель кнопки "Редактировать профиль"
editProfileButton.addEventListener('click', function () {
  formValidators['editProfile'].resetValidation();
  const getUserInfo = new UserInfo({profileName: '.profile__name', profileAbout: '.profile__about'});
  const userInfo = getUserInfo.getUserInfo();
  profileFormPopup.open();
  newProfileName.setAttribute('value', userInfo.name);
  newProfileAbout.setAttribute('value', userInfo.about);
});

// Создание класса попапа с картинкой
const imagePopup = new PopupWithImage('.image-popup');

// Функция открытия попапа с картинкой
const handleCardClick = (data) => {
  imagePopup.open(data);
  imagePopup.setEventListeners();
}

// Создание класса инфо пользователя
const userInfo = new UserInfo({
  profileName: '.profile__name', 
  profileAbout: '.profile__about'
});

//Создание класса попапа редактирования информации о профиле
const profileFormPopup = new PopupWithForm ('.profile-popup', (newValues) => {
  userInfo.setUserInfo(newValues);
  profileFormPopup.close();
});

//Создание класса попапа добавления нового места
const placeFormPopup = new PopupWithForm ('.place-popup', (newValues) => {
    const newdata = [{
      name: newValues.namePlace,
      link: newValues.linkImage
    }];
    const readyNewCard = new Section ({
      data: newdata,
      renderer: (item) => {
        const newcardElement = createCard(item);
        readyNewCard.addItem(newcardElement);
      }
    }, elementSection);
    readyNewCard.renderer();
    placeFormPopup.close();
});

// Слушатель кнопки "Добавить Место"
addPlaceButton.addEventListener('click', function () {
  formValidators['addPlace'].resetValidation();
  placeFormPopup.open();
});

// Включение валидации
enableValidation(config);

placeFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
cardList.renderer();