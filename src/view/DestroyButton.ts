import { addClickEvent } from "../common/utils/Event";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class DestroyButton {
  private readonly _element: HTMLElement;
  private readonly _onClick: () => void;

  private constructor(element: HTMLElement, onClick: () => void) {
    this._element = element;
    this.addRemoveEvent();
    this._onClick = onClick;
  }

  public static init(onClick: () => void) {
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
      this._onClick();
    });
  }
}
// const parentLi = this._element.closest("li");
// if (confirm("삭제하시겠습니까?")) {
//   if (parentLi !== null) {
//     parentLi.remove();
//   }
// }
