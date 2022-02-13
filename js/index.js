const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const newName = document.querySelector('#name');
const newAbout = document.querySelector('#about');
const formElement = popup.querySelector('.popup__form');
const popupAddMesto = document.querySelector('.popup_add-mesto');
const addMestoButton = document.querySelector('.profile__add-button');
const closeMestoButton = document.querySelector('#closeMesto');
const saveMestoButton = document.querySelector('#addMesto');
const newMesto = document.querySelector('#nameMesto');
const newImage = document.querySelector('#linkImage');

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

function openAddMesto() {
  popupAddMesto.classList.add('popup_opened');
}

function closeMesto() {
  popupAddMesto.classList.remove('popup_opened');
}

function createCards() {
  initialCards.forEach(function (el) {
    const templateCard = document.querySelector('#card').content;
    const elementsCard = templateCard.querySelector('.card').cloneNode(true);
    const elementSection = document.querySelector('.elements');
    elementsCard.querySelector('.card__image').src = el.link;
    elementsCard.querySelector('.card__image').alt = el.alt;
    elementsCard.querySelector('.card__popup_image').src = el.link;
    elementsCard.querySelector('.card__title').textContent = el.name;
    elementsCard.querySelector('.card__popup_title').textContent = el.name;
    elementsCard.querySelector('.card__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like_active');
    });
    elementsCard.querySelector('.card__trash').addEventListener('click', function (evt) {
      evt.target.closest('.card').remove();
    });
    elementsCard.querySelector('.card__image').addEventListener('click', function () {
      elementsCard.querySelector('.card__popup').classList.add('popup_opened');
    });
    elementsCard.querySelector('.card_popup_close').addEventListener('click', function () {
      elementsCard.querySelector('.card__popup').classList.remove('popup_opened');
    });
    elementSection.append(elementsCard);
  });
}

function addMesto(evt) {
  evt.preventDefault();
  const templateCard = document.querySelector('#card').content;
  const elementsCard = templateCard.querySelector('.card').cloneNode(true);
  const elementSection = document.querySelector('.elements');
  elementsCard.querySelector('.card__image').src = newImage.value;
  elementsCard.querySelector('.card__popup_image').src = newImage.value;
  elementsCard.querySelector('.card__title').textContent = newMesto.value;
  elementsCard.querySelector('.card__popup_title').textContent = newMesto.value;
  elementsCard.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  elementsCard.querySelector('.card__trash').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  elementsCard.querySelector('.card__image').addEventListener('click', function () {
    elementsCard.querySelector('.card__popup').classList.add('popup_opened');
  });
  elementsCard.querySelector('.card_popup_close').addEventListener('click', function () {
    elementsCard.querySelector('.card__popup').classList.remove('popup_opened');
  });
  elementSection.prepend(elementsCard);
  closeMesto ();
}

createCards();
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
addMestoButton.addEventListener('click', openAddMesto);
closeMestoButton.addEventListener('click', closeMesto);
saveMestoButton.addEventListener('click', addMesto);

