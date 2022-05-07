// Импортируем классы CSS
import './index.css';

// Импортируем класс API
import Api from '../components/Api.js';

// Испортируем класс дефолтной карточки
import Card from '../components/Card.js';

// Испортируем класс карточки, добавленной пользователем
import UserCard from '../components/UserCard.js';

// Импортируем класс секции
import Section from '../components/Section.js';

// Импортируем класс, который отвечает за управление отображением информации о пользователе на странице
import UserInfo from '../components/UserInfo.js';

//Импортируем класс попапа с картинкой
import PopupWithImage from '../components/PopupWithImage.js';

//Импортируем класс попапа с формой
import PopupWithForm from '../components/PopupWithForm.js';

//Импортируем класс попапа подверждения удаления
import PopupDelete from '../components/PopupDelete.js';

// Импортируем класс валидатора
import {FormValidator} from '../components/FormValidator.js';

// Импортируем необходимые глобальные переменные
import {editProfileButton, profileName, profileAbout, profileAvatar,newProfileName, newProfileAbout, addPlaceButton, avatarEditButton, elementSection, formValidators, cardTemplateSelector, config} from '../utils/constants.js';

// Создание класса API
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-40/',
  headers: {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176'
  }
});

// Функция постановки лайка
const putCardLike = (id, cardLikes, likeButton) => {
  api.putCardLike(id, {
      authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176'
  })
  .then((data) => {
    cardLikes.textContent = data.likes.length;
    likeButton.classList.add('card__like_active');
  })
  .catch((err) => {
    console.log(err);
  });
};

// Функция снятия лайка
const deleteCardLike = (id, cardLikes, likeButton) => {
  api.deleteCardLike(id, {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176'
})
.then((data) => {
  cardLikes.textContent = data.likes.length;
  likeButton.classList.remove('card__like_active');
})
.catch((err) => {
  console.log(err);
});
};

// Функция создания дефолтной карточки секции "Места"
function createCard(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick, putCardLike, deleteCardLike);
  const cardElement = card.generateCard();
  return cardElement
}

// Функция создания пользовательской карточки секции "Места"
function createUserCard(item) {
  const userCard = new UserCard(item, cardTemplateSelector, handleCardClick, putCardLike, deleteCardLike, deletePopupClick);
  const userCardElement = userCard.generateCard();
  return userCardElement
}

// Функция создания карточек из списка данных с сервера
function createCards() {
  api.getInitialCards()
  .then((data) => {
    const cardList = new Section({
      data: data,
      renderer: (item) => {
        if(item.owner._id === "75291ceae01e84fb7e218157") {
          const cardElement = createUserCard(item);
          cardList.addItem(cardElement);
        } else {
          const cardElement = createCard(item);
          cardList.addItem(cardElement);  
        }
          
      }
    }, elementSection);
    cardList.renderer();
  })
  .catch((err) => {
    console.log(err);
  });
}

// Рендерим карточки
createCards();

//Функция установки актуальных данных профиля
const defaultUserInfo = () => {
  api.getUserInfo()
  .then((data) => {
      profileName.textContent = data.name;
      profileAbout.textContent = data.about;
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
  .catch((err) => {
    console.log(err);
  });
};
defaultUserInfo();

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

// Создание класса попапа удаления карточки
const deletePopup = new PopupDelete('.popup__delete-card', (id) => {
  api.deleteUserCard(id, {
      authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176'
  })
  .then(() => {
    createCards();
    deletePopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
});

// Функция открытия попапа удаления карточки
const deletePopupClick = (idCard) => {
  deletePopup.open();
  deletePopup.setEventListeners(idCard);
}

// Функция открытия попапа с картинкой
const handleCardClick = (data) => {
  imagePopup.open(data);
  imagePopup.setEventListeners();
};

// Создание класса инфо пользователя
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileAbout: '.profile__about'
});

//Создание класса попапа редактирования информации о профиле
const profileFormPopup = new PopupWithForm ('.profile-popup', (newValues) => {
  api.setNewUserInfo(newValues,
    {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176',
    'Content-Type': 'application/json'
    });
  userInfo.setUserInfo(newValues);
  profileFormPopup.close();
});

//Создание класса попапа редактирования аватара профиля
const avatarFormPopup = new PopupWithForm ('.avatar-popup', (newAvatarLink) => {
  api.setNewUserAvatar(newAvatarLink,
    {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176',
    'Content-Type': 'application/json'
    })
  .then(() => {
    defaultUserInfo();
    avatarFormPopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
});

// Слушатель кнопки "Редактировать профиль"
avatarEditButton.addEventListener('click', function () {
  formValidators['newAvatar'].resetValidation();
  avatarFormPopup.open();
});

// Добавление нового места
const handleAddCardFormSubmit = (newdata) => {
  api.setNewCard(newdata,  {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176',
    'Content-Type': 'application/json'
    })
  .then(() => {
    createCards();
  })
  .catch((err) => {
    console.log(err);
  });
};

//Создание класса попапа добавления нового места
const placeFormPopup = new PopupWithForm ('.place-popup', (newValues) => {
    const newdata = {
      name: newValues.namePlace,
      link: newValues.linkImage
    };
    handleAddCardFormSubmit(newdata);
    placeFormPopup.close();
});

// Слушатель кнопки "Добавить Место"
addPlaceButton.addEventListener('click', function () {
  formValidators['addPlace'].resetValidation();
  placeFormPopup.open();
});

// Включение валидации
enableValidation(config);

//Навешивание слушателей на попапы
placeFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
avatarFormPopup.setEventListeners();