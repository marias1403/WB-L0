import "./index.css";
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
  freeReturnTooltipTemplate
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

const paymentPopup = new PaymentPopup(".popup_type_payment-method");
paymentPopup.setEventListeners();
const deliveryPopup = new DeliveryPopup(".popup_type_delivery-method");
deliveryPopup.setEventListeners();
btnEditPaymentText.addEventListener("click", () => {
  paymentPopup.open();
});
btnEditPaymentIcon.addEventListener("click", () => {
  paymentPopup.open();
});
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
        delivererNumber: productData.delivererNumber,
        delivererAddress: productData.delivererAddress,
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
