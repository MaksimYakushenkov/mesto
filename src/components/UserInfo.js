export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.profileName);
    this._profileAbout = document.querySelector(selectors.profileAbout);
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
}
