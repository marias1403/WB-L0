import CartProduct from "../components/CartProduct";
import CartProductList from "../components/CartProductList";
import { data } from "../utils/cartProducts";
import "./index.css";

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
  const cartProduct = new CartProduct({ data, templateSelector }, handleToggleLike, handleDeleteClick);
  return cartProduct.generateCartProduct();
}

const cartProductList = new CartProductList({
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

cartProductList.renderItems(data);
