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

  // теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const murmanskImage = new URL('../../images/Murmansk-Oblast.jpg', import.meta.url);
const machuPikchuImage = new URL('../../images/Machu-Picchu.jpg', import.meta.url);
const jacartaImage = new URL('../../images/Jakarta-Utara.jpg', import.meta.url);
const islandImage = new URL('../../images/Iceland.jpg', import.meta.url);
const edinburgImage = new URL('../../images/Edinburgh.jpg', import.meta.url);
const amsterdamImage = new URL('../../images/Amsterdam.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Мурманская область',
    link: murmanskImage,
  },
  {
    name: 'Мачу-Пикчу',
    link: machuPikchuImage,
  },
  {
    name: 'Джакарта',
    link: jacartaImage,
  },
  {
    name: 'Исландия',
    link: islandImage,
  },
  {
    name: 'Единбург',
    link: edinburgImage,
  },
  {
    name: 'Амстердам',
    link: amsterdamImage,
  }
];

export {editProfileButton, profilePopup, profileName, profileAbout, newProfileName, newProfileAbout, profileForm, placePopup, addPlaceButton, placeForm, newPlace, newImage, elementSection, imagePopup, subtitleImagePopup, pictureImagePopup, popups, formValidators, config, initialCards}