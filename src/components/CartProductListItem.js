import ProductListItem from "./ProductListItem";

export default class CartProductListItem extends ProductListItem {
  constructor({ data, templateSelector }, handleToggleLike, handleDeleteClick) {
    super({ data, templateSelector }, handleToggleLike, handleDeleteClick);
  }

  generateProductItem() {
    this._element = super.generateProductItem();
    this._element.querySelector(".cart-items-list__checkbox").id = this._data.id;
    this._element.querySelector(".cart-items-list__item-name").setAttribute("for", this._data.id);
    this._element.querySelector(".cart-items-list__warehouse").textContent = this._data.warehouse;
    this._element.querySelector(".cart-items-list__deliverer").textContent = this._data.deliverer;
    this._element.querySelector(".quantity-input__count").value = this._data.quantity;

    const prices = this._element.querySelectorAll(".cart-items-list__price");
    prices.forEach(price => {
      const totalPrice = this._data.price * this._data.quantity;
      price.textContent = totalPrice.toLocaleString('ru-RU');

      if (totalPrice >= 1000) {
        price.classList.add('cart-items-list__price_bigger-price');
      } else {
        price.classList.remove('cart-items-list__price_bigger-price');
      }
    });

    const oldPrices = this._element.querySelectorAll(".cart-items-list__old-price");
    oldPrices.forEach(oldPrice => {
      oldPrice.textContent = this._data.oldPrice;
    });

    if (this._data.remainingGoods < 3) {
      this._element.querySelector(".cart-items-list__remaining").textContent = this._data.remainingGoods;
    } else {
      this._element.querySelector(".cart-items-list__remaining-el").style.display = "none";
    }

    return this._element;
  }
}
