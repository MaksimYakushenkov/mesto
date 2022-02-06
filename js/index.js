let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__info_edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = profile.querySelector('.profile__info_name');
let profileAbout = profile.querySelector('.profile__info_about');
let newName = document.querySelector('#name');
let newAbout = document.querySelector('#about');
let submitButton = popup.querySelector('.popup__container_submit');
let formElement = popup.querySelector('.popup__container_form');

function openPopup() {
  popup.classList.add('popup_opened');
  newName.setAttribute('value', profileName.textContent);
  newAbout.setAttribute('value', profileAbout.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveChahged() {
  profileName.textContent = newName.textContent;
  profileAbout.textContent = newAbout.textContent;
  popup.classList.remove('popup_opened');
  console.log(newName.value);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileAbout.textContent = newAbout.value;
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);