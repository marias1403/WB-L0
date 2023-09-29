export default class ProductListItem {
  constructor({ data, templateSelector }, handleToggleLike, handleDeleteClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleToggleLike = handleToggleLike;
    this._handleDeleteClick = handleDeleteClick;
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

  setEventListeners() {
    this._buttonPutLike.addEventListener('click', () => {
      this._handleToggleLike(this);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  generateProductItem() {
    this._element = this._getTemplate();
    this._productImg = this._element.querySelector(".cart-items-list__item-photo");
    this._productImg.src = this._data.image;
    this._productImg.alt = this._data.name;
    this._element.querySelector(".cart-items-list__item-name").textContent = this._data.name;

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

    this._buttonPutLike = this._element.querySelector('.cart-items-list__like-button');
    this._buttonDelete = this._element.querySelector('.cart-items-list__delete-button');

    this.setEventListeners();

    return this._element;
  }
}
