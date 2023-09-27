export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(formElement.querySelectorAll(this._config.inputSelector));
  }

  _showInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
    error.textContent = input.validationMessage;
  };

  _hideInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  };

  _validateInput = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners = () => {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
