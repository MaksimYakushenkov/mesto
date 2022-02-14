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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = newProfileName.value;
  profileAbout.textContent = newProfileAbout.value;
  closePopup(profilePopup);
}

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

function createCards() {
  initialCards.forEach(function (el) {
    const readyCard = createCard(el.link, el.name)
    elementSection.append(readyCard);
  });
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const readyNewCard = createCard(newImage.value, newPlace.value);
  elementSection.prepend(readyNewCard);
  newPlace.value = '';
  newImage.value = '';
  closePopup(placePopup);
}

editProfileButton.addEventListener('click', function () {
  openPopup(profilePopup);
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileAbout.setAttribute('value', profileAbout.textContent);
}); 

profileCloseButton.addEventListener('click', function () {
  closePopup(profilePopup);
});

addPlaceButton.addEventListener('click', function () {
  openPopup(placePopup);
}); 

closePlaceButton.addEventListener('click', function () {
  closePopup(placePopup);
});

closeImageButton.addEventListener('click', function () {
  closePopup(imagePopup);
});

createCards();
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);