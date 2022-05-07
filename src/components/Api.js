export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setNewCard(newdata, headers) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: newdata.name,
        link: newdata.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  deleteUserCard(idCard, headers) {
    return fetch(`${this._baseUrl}cards/${idCard}`, {
      method: 'DELETE',
      headers: headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCardLike(idCard, headers) {
    return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  putCardLike(idCard, headers) {
    return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
      method: 'PUT',
      headers: headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getUserInfo() {
   return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  setNewUserAvatar(newAvatarLink, headers) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        avatar: newAvatarLink.linkAvatarImage})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setNewUserInfo(newValues, headers) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        name: newValues.name,
        about: newValues.about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}