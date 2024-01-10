import { ToDoItemTemplate } from "./ToDoItemTemplate";
import { CheckBox } from "../CheckBox";
import { ToDoContent } from "../ToDoContent";
import { DestroyButton } from "../DestroyButton";
import { ToDoContentEditInput } from "../ToDoContentEditInput";
import { ElementBuilder } from "../../common/utils/ElementBuilder";
import { CompleteItemTemplate } from "./CompleteItemTemplate";

//todo 상속하려니까 접근제어자가 이상해진다. 조합으로 바꾸자 => 조금만 나중에
export class ActiveItemTemplate extends ToDoItemTemplate {
  constructor(
    element: HTMLElement,
    onClickCheckbox: (element: HTMLElement) => void,
    onClickDestroyButton: (element: HTMLElement) => void,
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
    this._element.classList.remove("completed");
  }

  public static init(
    content: string,
    onClickCheckbox: (element: HTMLElement) => void,
    onClickDestroyButton: (element: HTMLElement) => void,
    onEnterEditInput: (content: string) => void,
    onEscEditInput: () => void,
  ): ActiveItemTemplate {
    const todoItem = ElementBuilder.init("li").build();
    const viewDiv = ElementBuilder.init("div").addClass("view").build();
    const checkBox = CheckBox.init(onClickCheckbox);
    const toDoContent = ToDoContent.init(content);
    const destroyButton = DestroyButton.init(onClickDestroyButton);
    const editInput = ToDoContentEditInput.init(
      content,
      onEnterEditInput,
      onEscEditInput,
    );

    todoItem.append(viewDiv);
    viewDiv.append(checkBox.element);
    viewDiv.append(toDoContent.element);
    viewDiv.append(destroyButton.element);
    todoItem.append(editInput.element);

    return new ActiveItemTemplate(
      todoItem,
      onClickCheckbox,
      onClickDestroyButton,
      onEnterEditInput,
      onEscEditInput,
    );
  }

  public override toggle(): ToDoItemTemplate {
    return new CompleteItemTemplate(
      this.element,
      this._onClickDestroyButton,
      this._onClickDestroyButton,
      this._onEnterEditInput,
      this._onEscEditInput,
    );
  }
}
