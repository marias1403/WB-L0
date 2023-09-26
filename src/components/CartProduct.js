export default class CartProduct {
  constructor({ data, templateSelector }) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('')
      .cloneNode(true);
  }
}
