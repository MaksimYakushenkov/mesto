export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.profileName);
    this._profileAbout = document.querySelector(selectors.profileAbout);
    this._profileAvatar = document.querySelector(selectors.profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent, 
      about:  this._profileAbout.textContent
    }
  }

  setUserInfo(newValues) {
    this._profileName.textContent = newValues.name;
    this._profileAbout.textContent = newValues.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  }
}
