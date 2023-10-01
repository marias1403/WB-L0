import Popup from "./Popup";

export default class PaymentPopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._paymentMethodForm = document.getElementById("paymentMethodForm");
  }

  setEventListeners() {
    super.setEventListeners();
    this._paymentMethodForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
      super.close();
    });
  }
}
