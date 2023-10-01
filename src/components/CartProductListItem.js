import ProductListItem from "./ProductListItem";

export default class CartProductListItem extends ProductListItem {
  constructor({ data, templateSelector }, handleToggleLike, handleDeleteClick) {
    super({ data, templateSelector }, handleToggleLike, handleDeleteClick);
  }

  _setPrice(quantity) {
    const totalPrice = (this._data.price - Math.floor((this._data.price * (this._data.discount + this._data.userDiscount)/100))) * quantity;
    this._prices.forEach((price) => {
      price.textContent = totalPrice.toLocaleString('ru-RU');

      if (totalPrice >= 1000000) {
        price.classList.add('cart-items-list__price_bigger-price');
      } else {
        price.classList.remove('cart-items-list__price_bigger-price');
      }
    })
  }

  _setDiscountPrice(quantity) {
    const totalPrice = this._data.price * quantity;
    this._discountPrices.forEach((price) => {
      price.textContent = totalPrice.toLocaleString('ru-RU');
    })
  }

  _setDiscountSum(quantity) {
    this._discountSum.textContent = Math.floor(this._data.price * this._data.discount/100 * quantity);
  }

  _setUserDiscountSum(quantity) {
    this._userDiscountSum.textContent = Math.floor(this._data.price * this._data.userDiscount/100 * quantity);
  }

  _handleBtnIncreaseQuantity() {
    if (this._quantityInput.value < this._data.remainingGoods) {
      this._quantityInput.value = parseInt(this._quantityInput.value) + 1;
      this._btnDecreaseQuantity.disabled = false;
      this._setPrice(this._quantityInput.value);
      this._setDiscountPrice(this._quantityInput.value);
      this._setDiscountSum(this._quantityInput.value);
      this._setUserDiscountSum(this._quantityInput.value);
    }
    this._btnIncreaseQuantity.disabled = parseInt(this._quantityInput.value) >= this._data.remainingGoods;
  }

  _handleBtnDecreaseQuantity() {
    if (this._quantityInput.value > 1) {
      this._quantityInput.value = parseInt(this._quantityInput.value) - 1;
      this._btnIncreaseQuantity.disabled = false;
      this._setPrice(this._quantityInput.value);
      this._setDiscountPrice(this._quantityInput.value);
      this._setDiscountSum(this._quantityInput.value);
      this._setUserDiscountSum(this._quantityInput.value);
    }
    this._btnDecreaseQuantity.disabled = parseInt(this._quantityInput.value) <= 1;
  }

  setTooltipListeners() {
    this._delivererInfoIcon.addEventListener("mouseover", () => {
      this._delivererTooltip.style.display = "flex";
    });

    this._delivererInfoIcon.addEventListener("mouseout", () => {
      this._delivererTooltip.style.display = "none";
    });

    this._discountPrice.addEventListener("mouseover", () => {
      this._discountTooltip.style.display = "flex";
    });

    this._discountPrice.addEventListener("mouseout", () => {
      this._discountTooltip.style.display = "none";
    });

    this._btnIncreaseQuantity.addEventListener("click", () => {
      this._handleBtnIncreaseQuantity();
    });

    this._btnDecreaseQuantity.addEventListener("click", () => {
      this._handleBtnDecreaseQuantity();
    });
  }

  generateProductItem() {
    this._element = super.generateProductItem();
    this._element.querySelector(".cart-items-list__checkbox").id = this._data.id;
    this._element.querySelector(".cart-items-list__item-name").setAttribute("for", this._data.id);
    this._element.querySelector(".cart-items-list__warehouse").textContent = this._data.warehouse;
    this._element.querySelector(".cart-items-list__deliverer").textContent = this._data.deliverer;
    this._element.querySelector(".cart-items-list__deliverer-name").textContent = this._data.deliverer;
    this._element.querySelector(".cart-items-list__deliverer-ogrn").textContent = this._data.delivererNumber;
    this._element.querySelector(".cart-items-list__deliverer-address").textContent = this._data.delivererAddress;
    this._element.querySelector(".cart-items-list__discount").textContent = this._data.discount;
    this._element.querySelector(".cart-items-list__user-discount").textContent = this._data.userDiscount;

    this._discountSum = this._element.querySelector(".cart-items-list__discount-sum");
    this._setDiscountSum(this._data.quantity);

    this._userDiscountSum = this._element.querySelector(".cart-items-list__user-discount-sum");
    this._setUserDiscountSum(this._data.quantity);

    this._quantityInput = this._element.querySelector(".quantity-input__count");
    this._quantityInput.value = this._data.quantity;
    this._btnIncreaseQuantity = this._element.querySelector('[data-action="add"]');
    this._btnDecreaseQuantity = this._element.querySelector('[data-action="minus"]');

    if (parseInt(this._quantityInput.value) <= 1) {
      this._btnDecreaseQuantity.disabled = true;
    }

    if (parseInt(this._quantityInput.value) >= this._data.remainingGoods) {
      this._btnIncreaseQuantity.disabled = true;
    }

    this._prices = this._element.querySelectorAll(".cart-items-list__price");
    this._setPrice(this._data.quantity);

    this._discountPrices = this._element.querySelectorAll(".cart-items-list__old-price");
    this._setDiscountPrice(this._data.quantity);

    if (this._data.remainingGoods < 3) {
      this._element.querySelector(".cart-items-list__remaining").textContent = this._data.remainingGoods;
    } else {
      this._element.querySelector(".cart-items-list__remaining-el").style.display = "none";
    }

    this._delivererInfoIcon = this._element.querySelector(".cart-items-list__info-icon");
    this._delivererTooltip = this._element.querySelector(".info-tooltip_deliverer");

    this._discountPrice = this._element.querySelector(".info-tooltip__text");
    this._discountTooltip = this._element.querySelector(".info-tooltip_discount");

    this.setTooltipListeners();

    return this._element;
  }
}
