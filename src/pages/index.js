import ProductListItem from "../components/ProductListItem";
import ProductList from "../components/ProductList";
import CartProductListItem from "../components/CartProductListItem";
import FormValidator from "../components/FormValidator";
import { cartProductsData } from "../utils/cartProductsData";
import { missingProductData } from "../utils/missingProductsData";
import { validationConfig } from "../utils/validationConfig";
import { emptyFieldErrorMessages } from "../utils/emptyFieldErrorMessages";
import { invalidEmailErrorMessages } from "../utils/invalidEmailErrorMessages";
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

const dropdownButton1 = document.getElementById("dropdownButton1");
const dropdownContent1 = document.getElementById("dropdownContent1");
const selectAllCheckbox = document.getElementById("selectAllCheckbox");
const dropdownTitle1 = document.getElementById("dropdownTitle1");
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
