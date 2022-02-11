let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let newName = document.querySelector('#name');
let newAbout = document.querySelector('#about');
let formElement = popup.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
  newName.setAttribute('value', profileName.textContent);
  newAbout.setAttribute('value', profileAbout.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileAbout.textContent = newAbout.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);