import { addKeyEvent } from "../common/utils/Event";
import { ActiveItemTemplate } from "./todoitem/ActiveItemTemplate";
import Key from "../common/constants/Key";
import { ToDoListTemplate } from "./ToDoListTemplate";

export class ToDoTitleInput {
  private readonly _element: HTMLElement;

  public constructor(element: HTMLElement) {
    this._element = element;
  }

  public clear() {
    const input = this._element as HTMLInputElement;
    input.value = "";
  }

  public getInputValue() {
    const input = this._element as HTMLInputElement;
    return input.value;
  }

  public addRegisterNewToDoEvent(toDoListTemplate: ToDoListTemplate) {
    addKeyEvent(this._element, Key.ENTER, () => {
      console.log("dd");
      if (this.isNotEmpty()) {
        const inputValue = this.getInputValue() ?? "";
        const activeItemTemplate = ActiveItemTemplate.init(inputValue);
        activeItemTemplate.addEditStartEvent();
        toDoListTemplate.add(activeItemTemplate);
        this.clear();
      }
    });
  }

  public isNotEmpty() {
    const element = <HTMLInputElement>this._element;
    const attribute = element.value;
    return (
      attribute !== undefined &&
      attribute !== null &&
      attribute !== "" &&
      attribute.length > 0
    );
  }
}
