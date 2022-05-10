export default class Section {
  constructor(containerSelector) {
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer({ data, renderer }) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
