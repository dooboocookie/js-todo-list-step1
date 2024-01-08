import { ElementBuilder } from "../common/utils/ElementBuilder";

export class ToDoContent {
  private readonly _element: HTMLElement;

  private constructor(element: HTMLElement) {
    this._element = element;
  }

  public get element() {
    return this._element;
  }

  public static init(content: string) {
    const toDoContent = ElementBuilder.init("label").innerText(content).build();

    return new ToDoContent(toDoContent);
  }

  public edit(value: string) {
    console.log(value);
    this._element.innerText = value;
  }

  public getValue() {
    return this._element.innerText;
  }
}
