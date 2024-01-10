import { TodoContainer } from "./TodoContainer";
import { CheckBox } from "../CheckBox";
import { Content } from "../Content";
import { DestroyButton } from "../DestroyButton";
import { EditInput } from "../EditInput";
import { ElementBuilder } from "../../common/utils/ElementBuilder";
import { CompleteTodoContainer } from "./CompleteTodoContainer";

//todo 상속하려니까 접근제어자가 이상해진다. 조합으로 바꾸자 => 조금만 나중에
export class ActiveTodoContainer extends TodoContainer {
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
    this._element.classList.remove("completed");
  }

  public static init(
    content: string,
    onClickCheckbox: (element: HTMLElement) => void,
    onClickDestroyButton: (element: HTMLElement) => void,
    onEnterEditInput: (content: string, element: HTMLElement) => void,
    onEscEditInput: () => void,
  ): ActiveTodoContainer {
    const todoItem = ElementBuilder.init("li").build();
    const viewDiv = ElementBuilder.init("div").addClass("view").build();
    const checkBox = CheckBox.init(onClickCheckbox);
    const toDoContent = Content.init(content);
    const destroyButton = DestroyButton.init(onClickDestroyButton);
    const editInput = EditInput.init(content, onEnterEditInput, onEscEditInput);

    todoItem.append(viewDiv);
    viewDiv.append(checkBox.element);
    viewDiv.append(toDoContent.element);
    viewDiv.append(destroyButton.element);
    todoItem.append(editInput.element);

    return new ActiveTodoContainer(
      todoItem,
      onClickCheckbox,
      onClickDestroyButton,
      onEnterEditInput,
      onEscEditInput,
    );
  }

  public override toggle(): TodoContainer {
    return new CompleteTodoContainer(
      this.element,
      this._onClickDestroyButton,
      this._onClickDestroyButton,
      this._onEnterEditInput,
      this._onEscEditInput,
    );
  }
}
