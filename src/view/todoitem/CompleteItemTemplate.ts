import { ToDoItemTemplate } from "./ToDoItemTemplate";
import { ActiveItemTemplate } from "./ActiveItemTemplate";

export class CompleteItemTemplate extends ToDoItemTemplate {
  constructor(element: HTMLElement) {
    super(element);
    super.element.classList.add("completed");
  }

  override toggle(): ToDoItemTemplate {
    return new ActiveItemTemplate(this.element);
  }
}
