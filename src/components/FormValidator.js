export class FormValidator {
  constructor(validateSettings, elementForm) {
    this._inputSelector = validateSettings.inputSelector;
    this._submitButtonSelector = validateSettings.submitButtonSelector;
    this._inactiveButtonClass = validateSettings.inactiveButtonClass;
    this._inputErrorClass = validateSettings.inputErrorClass;
    this._errorClass = validateSettings.errorClass;
    this._elementForm = elementForm;
    this._inputList = Array.from(this._elementForm.querySelectorAll(`${this._inputSelector}`));
    this._submitButton = this._elementForm.querySelector(`${this._submitButtonSelector}`);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some(input => !input.validity.valid)
  }

  resetValidation() {
    this._toggleButtonState(this._inputList,this._submitButton);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${this._inactiveButtonClass}`);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled');
    } 
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }
}