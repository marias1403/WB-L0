import Popup from "./Popup";

export default class DeliveryPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._btnPickupAddr = document.getElementById("btnPickupAddr");
    this._btnCourierAddr = document.getElementById("btnCourierAddr");
    this._pickupAddressesForm = document.getElementById("pickupAddressesForm");
    this._courierAddressesForm = document.getElementById("courierAddressesForm");
    this._deleteButtons = document.querySelectorAll(".delete-button_delivery-popup");
  }

  _selectPickupAddr() {
    this._btnPickupAddr.classList.add("popup__toggle-button_active");
    this._btnCourierAddr.classList.remove("popup__toggle-button_active");
    this._pickupAddressesForm.style.display = "flex";
    this._courierAddressesForm.style.display = "none";
  }

  _selectCourierAddr() {
    this._btnCourierAddr.classList.add("popup__toggle-button_active");
    this._btnPickupAddr.classList.remove("popup__toggle-button_active");
    this._courierAddressesForm.style.display = "flex";
    this._pickupAddressesForm.style.display = "none";
  }

  _handleDeleteAddress(e) {
    const formRow = e.target.closest(".popup__form-row");
    if (formRow) {
      formRow.remove();
    }
  }

  open() {
    super.open();
    this._selectPickupAddr();
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnPickupAddr.addEventListener("click", () => {
      this._selectPickupAddr();
    });

    this._btnCourierAddr.addEventListener("click", () => {
      this._selectCourierAddr();
    });

    this._pickupAddressesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedOption = document.querySelector('input[name="pickupAddresses"]:checked');
      if (selectedOption) {
        const choiceValue = selectedOption.value;
        console.log('Выбран вариант:', choiceValue);
      }
      super.close();
    });

    this._courierAddressesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedOption = document.querySelector('input[name="courierAddresses"]:checked');
      if (selectedOption) {
        const choiceValue = selectedOption.value;
        console.log('Выбран вариант:', choiceValue);
      }
      super.close();
    });

    this._deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        this._handleDeleteAddress(e);
      });
    });
  }
}
