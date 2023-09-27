export default class FormValidator {
  constructor(config, formElement, emptyFieldErrorMessages, invalidEmailErrorMessages) {
    this._config = config;
    this._formElement = formElement;
    this._buttonSubmit = document.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    this._emptyFieldErrorMessages = emptyFieldErrorMessages;
    this._invalidEmailErrorMessages = invalidEmailErrorMessages;
  }

  _showInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    const errorMessage = input.validity.valueMissing
      ? this._emptyFieldErrorMessages[input.id]
      : this._invalidEmailErrorMessages[input.id] || input.validationMessage;
    error.classList.add(this._config.errorClass);
    error.textContent = errorMessage;
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

  _hasInvalidInputs = () => {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    })
  };

  disableButton = () => {
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  };

  _enableButton = () => {
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  formatPhoneNumber(input) {
    const cleanedValue = input.value.replace(/\D/g, '');
    input.value = cleanedValue.replace(/(\d{1,2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
    this._validateInput(input);
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInputs()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.id === 'recipientPhoneNumber') {
          this.formatPhoneNumber(input);
        } else {
          this._validateInput(input);
        }
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
