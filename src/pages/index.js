import ProductListItem from "../components/ProductListItem";
import ProductList from "../components/ProductList";
import CartProductListItem from "../components/CartProductListItem";
import FormValidator from "../components/FormValidator";
import DeliveryPopup from "../components/DeliveryPopup";
import PaymentPopup from "../components/PaymentPopup";
import { cartProductsData } from "../utils/cartProductsData";
import { missingProductData } from "../utils/missingProductsData";
import { validationConfig } from "../utils/validationConfig";
import { emptyFieldErrorMessages } from "../utils/emptyFieldErrorMessages";
import { invalidEmailErrorMessages } from "../utils/invalidEmailErrorMessages";
import {
  editPaymentButton,
  editDeliveryButton,
  dropdownButton1,
  dropdownContent1,
  selectAllCheckbox,
  dropdownTitle1,
  dropdownButton2,
  dropdownContent2,
  dividerLine2
} from "../utils/constants";
import "./index.css";

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
    dropdownButton1.classList.add("dropdown__button_closed");
  } else {
    dropdownContent1.style.display = "flex";
    selectAllCheckbox.style.display = "flex";
    dropdownTitle1.classList.remove("cart-contents__title_block");
    dropdownButton1.classList.remove("dropdown__button_closed");
  }
}
dropdownButton1.addEventListener("click", toggleDropdown1);

function toggleDropdown2() {
  if (dropdownContent2.style.display === "flex") {
    dropdownContent2.style.display = "none";
    dividerLine2.style.display = "none";
    dropdownButton2.classList.add("dropdown__button_closed");
  } else {
    dropdownContent2.style.display = "flex";
    dividerLine2.style.display = "block";
    dropdownButton2.classList.remove("dropdown__button_closed");
  }
}
dropdownButton2.addEventListener("click", toggleDropdown2);

const paymentPopup = new PaymentPopup(".popup_type_payment-method");
paymentPopup.setEventListeners();
const deliveryPopup = new DeliveryPopup(".popup_type_delivery-method");
deliveryPopup.setEventListeners();
editPaymentButton.addEventListener("click", () => {
  paymentPopup.open();
});
editDeliveryButton.addEventListener("click", () => {
  deliveryPopup.open();
});

function handleToggleLike(productElement) {
  productElement.handleToggleLike();
}
function handleDeleteClick(productElement) {
  productElement.handleDeleteProduct();
}

function createCartProduct({ data, templateSelector }, handleToggleLike, handleDeleteClick) {
  const cartProduct = new CartProductListItem({ data, templateSelector }, handleToggleLike, handleDeleteClick);
  return cartProduct.generateProductItem();
}

const cartProductList = new ProductList({
  renderer: (productData) => {
    const cartProductElement = createCartProduct({
      data: {
        id: productData.id,
        name: productData.name,
        image: productData.image,
        color: productData.color,
        size: productData.size,
        warehouse: productData.warehouse,
        deliverer: productData.deliverer,
        price: productData.price,
        oldPrice: productData.oldPrice,
        remainingGoods: productData.remainingGoods,
        quantity: productData.quantity
      },
      templateSelector: ".template"
    }, handleToggleLike, handleDeleteClick);
    cartProductList.addItem(cartProductElement);
  }
}, ".cart-items-list");

cartProductList.renderItems(cartProductsData);

function createMissingProduct({ data, templateSelector }, handleToggleLike, handleDeleteClick) {
  const missingProduct = new ProductListItem({ data, templateSelector }, handleToggleLike, handleDeleteClick);
  return missingProduct.generateProductItem();
}

const missingProductList = new ProductList({
  renderer: (productData) => {
    const missingProductElement = createMissingProduct({
      data: {
        id: productData.id,
        name: productData.name,
        image: productData.image,
        color: productData.color,
        size: productData.size,
      },
      templateSelector: ".template-missing-item"
    }, handleToggleLike, handleDeleteClick);
    missingProductList.addItem(missingProductElement);
  }
}, ".cart-items-list_missing-goods");

missingProductList.renderItems(missingProductData);
