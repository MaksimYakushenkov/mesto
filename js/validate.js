const showInputError = (formElement, inputElement, errorMessage, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${validSettings.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validSettings.errorClass}`);
};

const hideInputError = (formElement, inputElement, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${validSettings.inputErrorClass}`);
  errorElement.classList.remove(`${validSettings.errorClass}`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validSettings);
  } else {
    hideInputError(formElement, inputElement, validSettings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

const toggleButtonState = (inputList, buttonElement, validSettings) => {
if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(`${validSettings.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(`${validSettings.inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
} 
}; 

const setEventListeners = (formElement, validSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(`${validSettings.inputSelector}`));
  const buttonElement = formElement.querySelector(`${validSettings.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, validSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validSettings);
      toggleButtonState(inputList, buttonElement, validSettings);
    });
  });
};

const enableValidation = (validSettings) => {
  const formList = Array.from(document.querySelectorAll(`${validSettings.formSelector}`));
  formList.forEach((formElement) => {
      setEventListeners(formElement, validSettings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});