import "./index.css";
import ProductList from "../components/ProductList";
import CartProductListItem from "../components/CartProductListItem";
import MissingProductListItem from "../components/MissingProductListItem";
import FormValidator from "../components/FormValidator";
import DeliveryPopup from "../components/DeliveryPopup";
import PaymentPopup from "../components/PaymentPopup";
import { cartProductsData } from "../utils/cartProductsData";
import { missingProductData } from "../utils/missingProductsData";
import { validationConfig } from "../utils/validationConfig";
import { emptyFieldErrorMessages } from "../utils/emptyFieldErrorMessages";
import { invalidEmailErrorMessages } from "../utils/invalidEmailErrorMessages";
import { paymentMethodOptions } from "../utils/paymentMethodOptions";
import { pickupPointsOptions, courierAddressesOptions } from "../utils/deliveryMethodOptions";
import {
  btnEditPaymentText,
  btnEditPaymentIcon,
  btnEditDeliveryText,
  btnEditDeliveryIcon,
  btnDropdown1,
  dropdownContent1,
  selectAllCheckbox,
  dropdownTitle1,
  btnDropdown2,
  dropdownContent2,
  dividerLine2,
  textsTooltipFreeReturn,
  freeReturnTooltipTemplate,
  immediatePaymentCheckbox,
  immediatePaymentSpan,
  paymentMethodSpan,
  mainSubmitButton
} from "../utils/constants";

const formValidators = {};

const enableValidation = (config, customEmptyErrorMessages, customErrorMessages) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement, customEmptyErrorMessages, customErrorMessages);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig, emptyFieldErrorMessages, invalidEmailErrorMessages);

function toggleDropdown1() {
  if (dropdownContent1.style.display === "flex") {
    dropdownContent1.style.display = "none";
    selectAllCheckbox.style.display = "none";
    dropdownTitle1.classList.add("cart-contents__title_block");
    btnDropdown1.classList.add("dropdown__button_closed");
  } else {
    dropdownContent1.style.display = "flex";
    selectAllCheckbox.style.display = "flex";
    dropdownTitle1.classList.remove("cart-contents__title_block");
    btnDropdown1.classList.remove("dropdown__button_closed");
  }
}
btnDropdown1.addEventListener("click", toggleDropdown1);

function toggleDropdown2() {
  if (dropdownContent2.style.display === "flex") {
    dropdownContent2.style.display = "none";
    dividerLine2.style.display = "none";
    btnDropdown2.classList.add("dropdown__button_closed");
  } else {
    dropdownContent2.style.display = "flex";
    dividerLine2.style.display = "block";
    btnDropdown2.classList.remove("dropdown__button_closed");
  }
}
btnDropdown2.addEventListener("click", toggleDropdown2);

immediatePaymentCheckbox.addEventListener("change", () => {
  if (immediatePaymentCheckbox.checked) {
    immediatePaymentSpan.style.display = "none";
    paymentMethodSpan.style.display = "none";
    document.querySelector(".order-summary__checkbox-wrapper").style.marginBottom = "0";
    mainSubmitButton.textContent = "Оплатить 1 016 сом";
  } else {
    immediatePaymentSpan.style.display = "block";
    paymentMethodSpan.style.display = "block";
    document.querySelector(".order-summary__checkbox-wrapper").style.marginBottom = "8px";
    mainSubmitButton.textContent = "Заказать";
  }
});

function handlePaymentMethodFormSubmit() {
  const selectedOption = document.querySelector('input[name="creditCard"]:checked');
  if (selectedOption) {
    const choiceValue = selectedOption.value;
    const data = paymentMethodOptions[choiceValue];
    const cardNumberResults = document.querySelectorAll(".card-number-result");
    cardNumberResults.forEach((result) => {
      result.textContent = data.number;
    });
    document.querySelector(".card-validity-result").textContent = data.validity;
    const cardImageResults = document.querySelectorAll(".card-image-result");
    cardImageResults.forEach((result) => {
      result.alt = data.alt;
      result.src = data.icon;
      result.className = data.cssClass;
    });
  }
}

const paymentPopup = new PaymentPopup(".popup_type_payment-method", handlePaymentMethodFormSubmit);
paymentPopup.setEventListeners();
btnEditPaymentText.addEventListener("click", () => {
  paymentPopup.open();
});
btnEditPaymentIcon.addEventListener("click", () => {
  paymentPopup.open();
});

function handlePickupMethodFormSubmit() {
  const selectedOption = document.querySelector('input[name="pickupAddresses"]:checked');
  if (selectedOption) {
    document.querySelector(".delivery-method__address-work-hours").style.display = "flex";
    const choiceValue = selectedOption.value;
    const data = pickupPointsOptions[choiceValue];
    const deliveryAddressResults = document.querySelectorAll(".delivery-address-result");
    deliveryAddressResults.forEach((result) => {
      result.textContent = data.address;
    });
    document.querySelector(".delivery-rating-result").textContent = data.rating;
    document.querySelector(".delivery-method-result").textContent = data.deliveryMethod;
    document.querySelector(".delivery-title-result").textContent = data.title;
  }
}

function handleCourierMethodFormSubmit() {
  const selectedOption = document.querySelector('input[name="courierAddresses"]:checked');
  if (selectedOption) {
    document.querySelector(".delivery-method__address-work-hours").style.display = "none";
    const choiceValue = selectedOption.value;
    const data = courierAddressesOptions[choiceValue];
    const deliveryAddressResults = document.querySelectorAll(".delivery-address-result");
    deliveryAddressResults.forEach((result) => {
      result.textContent = data.address;
    });
    document.querySelector(".delivery-method-result").textContent = data.deliveryMethod;
    document.querySelector(".delivery-title-result").textContent = data.title;
  }
}

const deliveryPopup = new DeliveryPopup(".popup_type_delivery-method", handlePickupMethodFormSubmit, handleCourierMethodFormSubmit);
deliveryPopup.setEventListeners();
btnEditDeliveryText.addEventListener("click", () => {
  deliveryPopup.open();
});
btnEditDeliveryIcon.addEventListener("click", () => {
  deliveryPopup.open();
});

textsTooltipFreeReturn.forEach(text => {
  text.addEventListener("mouseover", (e) => {
    const tooltip = freeReturnTooltipTemplate.content.firstElementChild.cloneNode(true);
    const parentNode = e.target;
    parentNode.appendChild(tooltip);
    parentNode.style.position = 'relative';
    tooltip.style.display = "flex";
    tooltip.style.top = parentNode.offsetHeight + 'px';
    tooltip.style.left = (- (tooltip.offsetWidth - parentNode.offsetWidth) / 2) + 'px';
  });

  text.addEventListener("mouseout", (e) => {
    const tooltip = document.querySelector(".info-tooltip_free-return");
    tooltip.style.display = "none";
    const parentNode = e.target;
    if (tooltip) {
      tooltip.style.display = "none";
      parentNode.removeChild(tooltip);
    }
  });
});

const pluralizeGoods = function(count) {
  if (count === 0) {
    return 'товаров';
  } else if (count === 1) {
    return 'товар';
  } else if (count >= 2 && count <= 4) {
    return 'товара';
  } else {
    return 'товаров';
  }
}

function updateCartSummary() {
  const productList = document.querySelector(".cart-contents__list");
  const listItems = productList.getElementsByTagName('li');
  let totalPrice = 0;
  let totalPriceNoDiscount = 0;
  let totalDiscount = 0;
  let totalQuantity = 0;
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const price = item.getElementsByClassName('cart-items-list__price')[0].textContent.replace(/\s/g, '');
    const priceNoDiscount = item.getElementsByClassName('cart-items-list__old-price')[0].textContent.replace(/\s/g, '');
    const discount = price - priceNoDiscount;
    const quantity = item.getElementsByClassName('quantity-input__count')[0].value;
    totalPrice += +price;
    totalPriceNoDiscount += +priceNoDiscount;
    totalDiscount += +discount;
    totalQuantity += +quantity;
  }
  const totalPriceHTMLElement = document.getElementById("totalPrice");
  totalPriceHTMLElement.textContent = totalPrice.toLocaleString('ru-RU');
  const totalNoDiscountHTMLElement = document.getElementById("totalPriceNoDiscount");
  totalNoDiscountHTMLElement.textContent = totalPriceNoDiscount.toLocaleString('ru-RU');
  const totalDiscountHTMLElement = document.getElementById("totalDiscount");
  totalDiscountHTMLElement.textContent = totalDiscount.toLocaleString('ru-RU');
  const totalQuantityHTMLElement = document.getElementById("totalQuantity");
  totalQuantityHTMLElement.textContent = totalQuantity.toLocaleString('ru-RU');
  const totalPriceInDropdown = document.getElementById("dropdownTotalPrice");
  totalPriceInDropdown.textContent = totalPrice.toLocaleString('ru-RU');
  const totalQuantityInDropdown = document.getElementById("dropdownTotalQuantity");
  totalQuantityInDropdown.textContent = totalQuantity.toLocaleString('ru-RU');
}

function handleToggleLike(productElement) {
  productElement.handleToggleLike();
}
function handleDeleteClick(productElement) {
  productElement.handleDeleteProduct();
}

function createCartProduct({ data, templateSelector }, handleToggleLike, handleDeleteClick, updateCartSummary) {
  const cartProduct = new CartProductListItem({ data, templateSelector }, handleToggleLike, handleDeleteClick, updateCartSummary);
  return cartProduct.generateProductItem();
}

const cartProductList = new ProductList({
  renderer: (data) => {
    const cartProductElement = createCartProduct({
      data,
      templateSelector: ".template"
    }, handleToggleLike, handleDeleteClick, updateCartSummary);

    cartProductList.addItem(cartProductElement);
  }
}, ".cart-items-list");

cartProductList.renderItems(cartProductsData);
updateCartSummary();

function updateMissingGoodsQuantity() {
  const productList = document.querySelector(".cart-items-list_missing-goods");
  const listItems = productList.getElementsByTagName('li');
  const missingGoodsQuantity = listItems.length;
  const missingGoodsHTMLElement = document.getElementById("dropdownMissingGoods");
  missingGoodsHTMLElement.textContent = missingGoodsQuantity.toString();
  const missingGoodsHeadingHTMLElement = document.getElementById("dropdownMissingHeading");
  missingGoodsHeadingHTMLElement.textContent = pluralizeGoods(missingGoodsQuantity);
}

function createMissingProduct({ data, templateSelector }, handleToggleLike, handleDeleteClick, updateMissingGoodsQuantity) {
  const missingProduct = new MissingProductListItem({ data, templateSelector }, handleToggleLike, handleDeleteClick, updateMissingGoodsQuantity);
  return missingProduct.generateProductItem();
}

const missingProductList = new ProductList({
  renderer: (data) => {
    const missingProductElement = createMissingProduct({
      data,
      templateSelector: ".template-missing-item"
    }, handleToggleLike, handleDeleteClick, updateMissingGoodsQuantity);
    missingProductList.addItem(missingProductElement);
  }
}, ".cart-items-list_missing-goods");

missingProductList.renderItems(missingProductData);
updateMissingGoodsQuantity();
