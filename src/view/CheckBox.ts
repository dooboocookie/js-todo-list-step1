import { ToDoItemTemplate } from "./todoitem/ToDoItemTemplate";
import { addClickEvent } from "../common/utils/Event";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class CheckBox {
  private readonly _element: HTMLElement;

  private constructor(element: HTMLElement) {
    this._element = element;
  }

  public get element() {
    return this._element;
  }

  public static init() {
    const checkBox = ElementBuilder.init("input")
      .addClass("toggle")
      .type("checkbox")
      .build();

    return new CheckBox(checkBox);
  }

  public addToggleEvent(toDoItemTemplate: ToDoItemTemplate) {
    console.log(toDoItemTemplate);
    addClickEvent(this._element, () => {
      //todo 파라미터로 넘겨준 변수 재할당하거나 상태를 변화시키는 것은 so bad...
      toDoItemTemplate = toDoItemTemplate.toggle();
    });

    addClickEvent(this._element, () => {
      //filterToDoList();
    });
  }
}
