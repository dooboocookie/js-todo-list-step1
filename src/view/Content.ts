import { ElementBuilder } from "../common/utils/ElementBuilder";

export class Content {
  private readonly _element: HTMLElement;

  private constructor(element: HTMLElement) {
    this._element = element;
  }

  public get element() {
    return this._element;
  }

  public static init(content: string) {
    const toDoContent = ElementBuilder.init("label").innerText(content).build();
    return new Content(toDoContent);
  }
}
