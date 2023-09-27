export default class CartProduct {
  constructor({ data, templateSelector }, handleToggleLike, handleDeleteClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleToggleLike = handleToggleLike;
    this._handleDeleteClick = handleDeleteClick;
    this._productId = data.id;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".cart-items-list__item")
      .cloneNode(true);
  }

  handleToggleLike() {
    this._buttonPutLike.classList.toggle('like-button_active');
  }

  handleDeleteProduct() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonPutLike.addEventListener('click', () => {
      this._handleToggleLike(this);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  generateCartProduct() {
    this._element = this._getTemplate();
    this._buttonPutLike = this._element.querySelector('.cart-items-list__like-button');
    this._buttonDelete = this._element.querySelector('.cart-items-list__delete-button');
    this._element.querySelector(".cart-items-list__checkbox").id = this._data.id;
    this._element.querySelector(".cart-items-list__item-name").textContent = this._data.name;
    this._element.querySelector(".cart-items-list__item-name").setAttribute("for", this._data.id);
    this._productImg = this._element.querySelector(".cart-items-list__item-photo");
    this._productImg.src = this._data.image;
    this._productImg.alt = this._data.name;
    this._element.querySelector(".cart-items-list__warehouse").textContent = this._data.warehouse;
    this._element.querySelector(".cart-items-list__deliverer").textContent = this._data.deliverer;
    this._element.querySelector(".quantity-input__count").value = this._data.quantity;

    if (this._data.color) {
      this._element.querySelector(".cart-items-list__color").textContent = this._data.color;
    } else {
      this._element.querySelector(".cart-items-list__color-el").style.display = "none";
    }

    if (this._data.size) {
      const sizes = this._element.querySelectorAll(".cart-items-list__size");
      sizes.forEach(size => {
        size.textContent = this._data.size;
      });
    } else {
      this._element.querySelector(".cart-items-list__size-el").style.display = "none";
      this._element.querySelector(".item-size-badge_goods").style.display = "none";
    }

    if (!this._data.color && !this._data.size) {
      this._element.querySelector(".cart-items-list__description").style.display = "none";
    }

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

    this._setEventListeners();

    return this._element;
  }
}
