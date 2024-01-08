export class ElementBuilder {
  //todo undefined 이거 맞아?
  private _tag: string | undefined;
  private _type: string | undefined;
  private _id: string | undefined;
  private _classList: string[] = [];
  private _value: string | undefined;
  private _innerText: string | undefined;
  private _innerHtml: string | undefined;

  private constructor() {}

  static init(tag: string): ElementBuilder {
    const elementBuilder = new ElementBuilder();
    elementBuilder._tag = tag;
    return elementBuilder;
  }

  type(type: string) {
    this._type = type;
    return this;
  }

  id(id: string) {
    this._id = id;
    return this;
  }

  addClass(className: string) {
    this._classList.push(className);
    return this;
  }

  value(value: string) {
    this._value = value;
    return this;
  }

  innerText(innerText: string) {
    this._innerText = innerText;
    return this;
  }

  innerHtml(innerHtml: string) {
    this._innerHtml = innerHtml;
    return this;
  }

  build() {
    if (this._tag === undefined) {
      throw "태그가 없으면 요소를 생성할 수 없습니다";
    }
    const element = document.createElement(this._tag);
    if (this._type !== undefined) {
      element.setAttribute("type", this._type);
    }
    if (this._id !== undefined) {
      element.id = this._id;
    }
    if (this._classList.length !== 0) {
      this._classList.forEach((className) => {
        element.classList.add(className);
      });
    }
    if (this._value !== undefined) {
      const input = element as HTMLInputElement;
      input.value = this._value;
    }
    if (this._innerText !== undefined) {
      element.innerText = this._innerText;
    }
    if (this._innerHtml !== undefined) {
      element.innerHTML = this._innerHtml;
    }
    return element;
  }
}
