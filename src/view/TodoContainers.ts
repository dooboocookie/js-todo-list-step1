import { TodoList } from "../domain/todo/TodoList";
import { ActiveTodoContainer } from "./todoitem/ActiveTodoContainer";

export class TodoContainers {
  private readonly _element: HTMLElement;

  private readonly _onClickCheckbox: (element: HTMLElement) => void;
  private readonly _onClickDestroyButton: (element: HTMLElement) => void;
  private readonly _onEnterEditInput: (
    content: string,
    element: HTMLElement,
  ) => void;
  private readonly _onEscEditInput: () => void;

  constructor(
    element: HTMLElement,
    onClickCheckbox: (element: HTMLElement) => void,
    onClickDestroyButton: (element: HTMLElement) => void,
    onEnterEditInput: (content: string, element: HTMLElement) => void,
    onEscEditInput: () => void,
  ) {
    this._element = element;
    this._onClickCheckbox = onClickCheckbox;
    this._onClickDestroyButton = onClickDestroyButton;
    this._onEnterEditInput = onEnterEditInput;
    this._onEscEditInput = onEscEditInput;
  }

  // 사실 이 객체는 이 책임이 없는거아닐까?
  public update(selectedTodoList: TodoList, todoList: TodoList) {
    this._element.innerHTML = "";

    const toDoItems = todoList.toDoItems;
    toDoItems.forEach((toDoItem) => {
      const itemTemplate = ActiveTodoContainer.init(
        toDoItem.content,
        this._onClickCheckbox,
        this._onClickDestroyButton,
        this._onEnterEditInput,
        this._onEscEditInput,
      );
      if (toDoItem.isCompleted) {
        itemTemplate.toggle();
      }
      if (selectedTodoList.toDoItems.indexOf(toDoItem) == -1) {
        itemTemplate.hide();
      }
      this._element.append(itemTemplate.element);
    });
  }

  public get element(): HTMLElement {
    return this._element;
  }
}
