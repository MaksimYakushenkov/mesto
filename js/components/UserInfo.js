import {newProfileName, newProfileAbout} from '../utils/constants.js'

export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.profileName);
    this._profileAbout = document.querySelector(selectors.profileAbout);
  }

  getUserInfo() {
   const userInfoObj = {name: this._profileName.textContent, about:  this._profileAbout.textContent};
   return userInfoObj
  }

  setUserInfo() {

    this._profileName.textContent = newProfileName.value;
    this._profileAbout.textContent = newProfileAbout.value;
    console.log('все ок 1');

  }
}
