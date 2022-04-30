const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const newProfileName = document.querySelector('#name');
const newProfileAbout = document.querySelector('#about');
const profileForm = profilePopup.querySelector('.popup__form');
const placePopup = document.querySelector('.place-popup');
const addPlaceButton = profile.querySelector('.profile__add-button');
const placeForm = placePopup.querySelector('.popup__form');
const newPlace = document.querySelector('#namePlace');
const newImage = document.querySelector('#linkImage');
const elementSection = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const subtitleImagePopup = imagePopup.querySelector('.popup__subtitle');
const pictureImagePopup = imagePopup.querySelector('.popup__image');
const popups = document.querySelectorAll('.popup');
const formValidators = {};
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
const initialCards = [
  {
    name: 'Мурманская область',
    link: './images/Murmansk-Oblast.jpg',
  },
  {
    name: 'Мачу-Пикчу',
    link: './images/Machu-Picchu.jpg',
  },
  {
    name: 'Джакарта',
    link: './images/Jakarta-Utara.jpg',
  },
  {
    name: 'Исландия',
    link: './images/Iceland.jpg',
  },
  {
    name: 'Единбург',
    link: './images/Edinburgh.jpg',
  },
  {
    name: 'Амстердам',
    link: './images/Amsterdam.jpg',
  }
];

export {editProfileButton, profilePopup, profileName, profileAbout, newProfileName, newProfileAbout, profileForm, placePopup, addPlaceButton, placeForm, newPlace, newImage, elementSection, imagePopup, subtitleImagePopup, pictureImagePopup, popups, formValidators, config, initialCards}