import { addClickEvent } from "../common/utils/Event";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class DestroyButton {
  private readonly _element: HTMLElement;

  private constructor(element: HTMLElement) {
    this._element = element;
  }

  public get element() {
    return this._element;
  }

  public static init() {
    const destroyButton = ElementBuilder.init("button")
      .addClass("destroy")
      .build();

    return new DestroyButton(destroyButton);
  }

  public addRemoveEvent() {
    addClickEvent(this._element, () => {
      const parentLi = this._element.closest("li");
      if (confirm("삭제하시겠습니까?")) {
        if (parentLi !== null) {
          parentLi.remove();
        }
      }
    });
  }
}
