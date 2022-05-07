export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  _cleanContainer() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer() {
    this._cleanContainer();
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
