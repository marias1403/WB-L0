import Popup from "./Popup";

export default class PaymentPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._paymentMethodForm = document.getElementById("paymentMethodForm");
  }

  setEventListeners() {
    super.setEventListeners();

    this._paymentMethodForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selectedOption = document.querySelector('input[name="creditCard"]:checked');
      if (selectedOption) {
        const choiceValue = selectedOption.value;
        console.log("Выбран вариант:", choiceValue);
      }
      super.close();
    });
  }
}
