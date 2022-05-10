// Импортируем классы CSS
import './index.css';

// Импортируем класс API
import Api from '../components/Api.js';

// Испортируем класс дефолтной карточки
import Card from '../components/Card.js';

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
  api.putCardLike(id)
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
  api.deleteCardLike(id)
.then((data) => {
  cardLikes.textContent = data.likes.length;
  likeButton.classList.remove('card__like_active');
})
.catch((err) => {
  console.log(err);
});
};

// Функция создания карточки секции "Места"
function createCard(item, userInfo) {
  const card = new Card(item, userInfo, cardTemplateSelector, handleCardClick, putCardLike, deleteCardLike, deletePopupClick);
  const cardElement = card.generateCard();
  return cardElement
}

// Создание секции с карточками
const cardList = new Section(elementSection);

const defaultUser = api.getUserInfo()
.then((data) => {
 return data;
});

const cardLists = api.getInitialCards()
.then((data) => {
  return data;
});

// Создание карточек из списка данных с сервера
Promise.all([defaultUser, cardLists])
  .then((results) => {
    console.log(results[1]);
      cardList.renderer({
        data: results[1],
        renderer: (item) => {
            const cardElement = createCard(item, results[0]);
            cardList.addItem(cardElement);
        }});
  })
  .catch((err) => {
    console.log(err);
  }); 

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

const getUserInfo = new UserInfo({
  profileName: '.profile__name',
  profileAbout: '.profile__about',
  profileAvatar: '.profile__avatar'
});

// Слушатель кнопки "Редактировать профиль"
editProfileButton.addEventListener('click', function () {
  formValidators['editProfile'].resetValidation();
  const userInfo = getUserInfo.getUserInfo();
  profileFormPopup.open();
  newProfileName.setAttribute('value', userInfo.name);
  newProfileAbout.setAttribute('value', userInfo.about);
});

//Функция установки актуальных данных профиля
const defaultUserInfo = () => {
  api.getUserInfo()
  .then((data) => {
    getUserInfo.setUserInfo(data);
    getUserInfo.setUserAvatar(data);
    })
  .catch((err) => {
    console.log(err);
  });
};

defaultUserInfo();

// Создание класса попапа с картинкой
const imagePopup = new PopupWithImage('.image-popup');

// Создание класса попапа удаления карточки
const deletePopup = new PopupDelete('.delete-popup', (id, deleteCardEl) => {
  api.deleteUserCard(id)
  .then(() => {
    deleteCardEl.remove(); 
    deletePopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
});

// Функция открытия попапа удаления карточки
const deletePopupClick = (idCard, deleteCardEl) => {
  deletePopup.open();
  deletePopup.setEventListeners(idCard, deleteCardEl);
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
    })
    .then(() => {
      userInfo.setUserInfo(newValues);
      profileFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileFormPopup.renderLoading(false);
    });
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
  })
  .finally(() => {
    avatarFormPopup.renderLoading(false);
  });
});

// Слушатель кнопки "Редактировать профиль"
avatarEditButton.addEventListener('click', function () {
  formValidators['newAvatar'].resetValidation();
  avatarFormPopup.open();
});

// Добавление нового места
const handleAddCardFormSubmit = (newdata) => {
  const setNewCard = api.setNewCard(newdata,  {
    authorization: 'f4ccf291-bfa6-4f7d-8768-52c052475176',
    'Content-Type': 'application/json'
  });

  Promise.all([defaultUser, setNewCard])
  .then((results) => {
    cardList.addItem(createCard(results[1], results[0])); 
    placeFormPopup.close();
    })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    placeFormPopup.renderLoading(false);
  });
};

//Создание класса попапа добавления нового места
const placeFormPopup = new PopupWithForm ('.place-popup', (newValues) => {
    const newdata = {
      name: newValues.namePlace,
      link: newValues.linkImage
    };
    handleAddCardFormSubmit(newdata);
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