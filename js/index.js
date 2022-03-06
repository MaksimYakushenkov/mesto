// Объявляем необходимые глобальные перемены
const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const newProfileName = document.querySelector('#name');
const newProfileAbout = document.querySelector('#about');
const profileForm = profilePopup.querySelector('.popup__form');
const placePopup = document.querySelector('.place-popup');
const addPlaceButton = profile.querySelector('.profile__add-button');
const closePlaceButton = placePopup.querySelector('.popup__close-button');
const placeForm = placePopup.querySelector('.popup__form');
const newPlace = document.querySelector('#namePlace');
const newImage = document.querySelector('#linkImage');
const templateCard = document.querySelector('#card').content;
const elementSection = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const closeImageButton = imagePopup.querySelector('.popup__close-button');
const subtitleImagePopup = imagePopup.querySelector('.popup__subtitle');;
const pictureImagePopup = imagePopup.querySelector('.popup__image');;

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
function createCard(link, name) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__trash').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
    subtitleImagePopup.textContent = name;
    pictureImagePopup.alt = name;
    pictureImagePopup.src = link;
    openPopup(imagePopup);
  });
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  return cardElement
}

// Функция создания карточек секции "Места"
function createCards() {
  initialCards.forEach(function (el) {
    const readyCard = createCard(el.link, el.name)
    elementSection.append(readyCard);
  });
}

// Функция добавления пользователем новой карточки в секцию "Места"
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const readyNewCard = createCard(newImage.value, newPlace.value);
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

// Функция создания карточек
createCards();
// Слушатели кнопок "Сохранить" под формами редактирования профиля и добавления нового места
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);