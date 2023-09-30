export default class FormValidator {
  constructor(config, formElement, emptyFieldErrorMessages, invalidEmailErrorMessages) {
    this._config = config;
    this._formElement = formElement;
    this._buttonSubmit = document.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    this._inputSpan = document.querySelector(this._config.spanClass);
    this._emptyFieldErrorMessages = emptyFieldErrorMessages;
    this._invalidEmailErrorMessages = invalidEmailErrorMessages;
  }

  _showInputError = (input) => {
    if (input.id === "recipientINN") {
      this._inputSpan.style.display = "none";
    }
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
    error.textContent = this._invalidEmailErrorMessages[input.id];
  }

  _showEmptyInputError = (input) => {
    if (input.id === "recipientINN") {
      this._inputSpan.style.display = "none";
    }
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
    error.textContent = this._emptyFieldErrorMessages[input.id];
  }

  _hideInputError = (input) => {
    if (input.id === "recipientINN") {
      this._inputSpan.style.display = "block";
    }
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  }

  _validateInput = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  formatPhoneNumber(input) {
    const cleanedValue = input.value.replace(/\D/g, "");
    input.value = cleanedValue.replace(/(\d{1,2})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
    this._validateInput(input);
  }

  _setEventListeners = () => {
    this._inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.id === "recipientPhoneNumber") {
          this.formatPhoneNumber(input);
        } else {
          this._validateInput(input);
        }
      });
    });

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (input.value.trim() !== "") {
          label.style.opacity = "1";
        } else {
          label.style.opacity = "0";
        }
      });
    });
  }

  enableValidation = () => {
    this._buttonSubmit.addEventListener("click", () => {
      this._inputs.forEach((input) => {
        if (input.value.trim() === "") {
          this._showEmptyInputError(input);
        }
      });
    });
    this._setEventListeners();
  };
}
