import { ToDoItemTemplate } from "./ToDoItemTemplate";
import { CompleteItemTemplate } from "./CompleteItemTemplate";
import { CheckBox } from "../CheckBox";
import { ToDoContent } from "../ToDoContent";
import { DestroyButton } from "../DestroyButton";
import { ToDoContentEditInput } from "../ToDoContentEditInput";
import { ElementBuilder } from "../../common/utils/ElementBuilder";

export class ActiveItemTemplate extends ToDoItemTemplate {
  public constructor(element: HTMLElement) {
    super(element);
    this._element.classList.remove("completed");
  }

  public static init(content: string) {
    const todoItem = ElementBuilder.init("li").build();
    const viewDiv = ElementBuilder.init("div").addClass("view").build();
    todoItem.append(viewDiv);

    const checkBox = CheckBox.init();
    viewDiv.append(checkBox.element);

    const toDoContent = ToDoContent.init(content);
    viewDiv.append(toDoContent.element);

    const destroyButton = DestroyButton.init();
    viewDiv.append(destroyButton.element);

    destroyButton.addRemoveEvent();
    const editInput = ToDoContentEditInput.init(content);
    todoItem.append(editInput.element);

    const activeItemTemplate = new ActiveItemTemplate(todoItem);
    checkBox.addToggleEvent(activeItemTemplate);
    editInput.addEditDoneEvent(activeItemTemplate, toDoContent);

    return activeItemTemplate;
  }

  public override toggle(): ToDoItemTemplate {
    return new CompleteItemTemplate(this.element);
  }
}
