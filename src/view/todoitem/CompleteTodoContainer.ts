import { TodoContainer } from "./TodoContainer";
import { ActiveTodoContainer } from "./ActiveTodoContainer";

export class CompleteTodoContainer extends TodoContainer {
  public constructor(
    element: HTMLElement,
    onClickCheckbox: (element: HTMLElement) => void,
    onClickDestroyButton: (element: HTMLElement) => void,
    onEnterEditInput: (content: string, element: HTMLElement) => void,
    onEscEditInput: () => void,
  ) {
    super(
      element,
      onClickCheckbox,
      onClickDestroyButton,
      onEnterEditInput,
      onEscEditInput,
    );
    super.element.classList.add("completed");
  }

  public override toggle(): TodoContainer {
    return new ActiveTodoContainer(
      this.element,
      this._onClickDestroyButton,
      this._onClickDestroyButton,
      this._onEnterEditInput,
      this._onEscEditInput,
    );
  }
}
