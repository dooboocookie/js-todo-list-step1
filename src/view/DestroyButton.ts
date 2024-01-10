import { addClickEvent } from "../common/utils/Event";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class DestroyButton {
  private readonly _element: HTMLElement;
  private readonly _onClick: (element: HTMLElement) => void;

  private constructor(
    element: HTMLElement,
    onClick: (element: HTMLElement) => void,
  ) {
    this._element = element;
    this.addRemoveEvent();
    this._onClick = onClick;
  }

  public static init(onClick: (element: HTMLElement) => void) {
    const destroyButton = ElementBuilder.init("button")
      .addClass("destroy")
      .build();

    return new DestroyButton(destroyButton, onClick);
  }

  public get element() {
    return this._element;
  }

  private addRemoveEvent() {
    addClickEvent(this._element, () => {
      this._onClick(this._element);
    });
  }
}
