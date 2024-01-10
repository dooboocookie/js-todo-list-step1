import { ToDoItemTemplate } from "./ToDoItemTemplate";
import { ActiveItemTemplate } from "./ActiveItemTemplate";

export class CompleteItemTemplate extends ToDoItemTemplate {
  constructor(
    element: HTMLElement,
    onClickCheckbox: () => void,
    onClickDestroyButton: () => void,
    onEnterEditInput: (content: string) => void,
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

  override toggle(): ToDoItemTemplate {
    return new ActiveItemTemplate(
      this.element,
      this._onClickDestroyButton,
      this._onClickDestroyButton,
      this._onEnterEditInput,
      this._onEscEditInput,
    );
  }
}
