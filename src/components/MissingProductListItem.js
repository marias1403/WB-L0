import ProductListItem from "./ProductListItem";

export default class MissingProductListItem extends ProductListItem {
  constructor({ data, templateSelector }, handleToggleLike, handleDeleteClick, updateMissingGoodsQuantity) {
    super({ data, templateSelector }, handleToggleLike, handleDeleteClick);
    this._updateMissingGoodsQuantity = updateMissingGoodsQuantity;
  }

  handleDeleteProduct() {
    super.handleDeleteProduct();
    this._updateMissingGoodsQuantity();
  }
}
