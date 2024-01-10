import { addClickEvent } from "../common/utils/Event";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class CheckBox {
  private readonly _element: HTMLElement;
  private readonly _onClick: (element: HTMLElement) => void;

  private constructor(
    element: HTMLElement,
    onClick: (element: HTMLElement) => void,
  ) {
    this._element = element;
    this.addToggleEvent();
    this._onClick = onClick;
  }

  public static init(onClick: (element: HTMLElement) => void) {
    const checkBox = ElementBuilder.init("input")
      .addClass("toggle")
      .type("checkbox")
      .build();

    return new CheckBox(checkBox, onClick);
  }

  private addToggleEvent() {
    addClickEvent(this._element, () => {
      this._onClick(this._element);
    });
  }

  public get element() {
    return this._element;
  }
}
