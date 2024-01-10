import {
  findByCssSelector,
  findChildrenByCssSelector,
} from "../common/utils/querySelector";
import { ToDoItemTemplate } from "./todoitem/ToDoItemTemplate";
import { TodoList } from "../domain/todo/TodoList";
import { CompleteItemTemplate } from "./todoitem/CompleteItemTemplate";
import { ActiveItemTemplate } from "./todoitem/ActiveItemTemplate";

export class ToDoListTemplate {
  private readonly _element: HTMLElement;
  private readonly todoItemContainers: ToDoItemTemplate[];
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
    this.todoItemContainers = [];
    this._onClickCheckbox = onClickCheckbox;
    this._onClickDestroyButton = onClickDestroyButton;
    this._onEnterEditInput = onEnterEditInput;
    this._onEscEditInput = onEscEditInput;
  }

  // todo 최대한 불변으로 만들어야되나?
  public update(todoList: TodoList) {
    this._element.innerHTML = "";
    this.todoItemContainers.splice(0, this.todoItemContainers.length);

    const toDoItems = todoList.toDoItems;
    toDoItems.forEach((toDoItem) => {
      const itemTemplate = ActiveItemTemplate.init(
        toDoItem.content,
        this._onClickCheckbox,
        this._onClickDestroyButton,
        this._onEnterEditInput,
        this._onEscEditInput,
      );
      if (toDoItem.isCompleted) {
        itemTemplate.toggle();
      }
      this._element.append(itemTemplate.element);
      this.todoItemContainers.push(itemTemplate);
    });
  }

  public add(toDoItemTemplate: ToDoItemTemplate) {
    this._element.append(toDoItemTemplate.element);
    this.todoItemContainers.push(toDoItemTemplate);
  }

  public toggleItem(index: number) {
    this.todoItemContainers[index] = this.todoItemContainers[index].toggle();
  }

  public removeItem(index: number) {
    const children = findChildrenByCssSelector(this._element, "li");
    children[index].remove();

    this.todoItemContainers.splice(index);
  }

  public addCountObserver() {
    const recount = () => {
      const counter = findByCssSelector(".count-container .todo-count strong");
      counter.innerText = String(this.count());
    };

    const mutationObserver = new MutationObserver(recount);
    mutationObserver.observe(this._element, { childList: true });
  }

  public count(): number {
    return this._element.querySelectorAll("li:not(.hidden)").length;
  }

  public addFilterObserver(toDoListTemplate: ToDoListTemplate) {}

  public filter(filterKeyword: string): void {
    switch (filterKeyword) {
      case "active":
        this.showNodes(
          findChildrenByCssSelector(this._element, "li:not(.completed)"),
        );
        this.hideNodes(
          findChildrenByCssSelector(this._element, "li.completed"),
        );
        break;
      case "completed":
        this.showNodes(
          findChildrenByCssSelector(this._element, "li.completed"),
        );
        this.hideNodes(
          findChildrenByCssSelector(this._element, "li:not(.completed)"),
        );
        break;
      default:
        this.showNodes(findChildrenByCssSelector(this._element, "li"));
        break;
    }
  }

  private showNodes(elements: HTMLElement[]) {
    elements.forEach((element) => {
      element.classList.remove("hidden");
    });
  }

  private hideNodes(elements: HTMLElement[]) {
    elements.forEach((element) => {
      element.classList.add("hidden");
    });
  }

  public get element(): HTMLElement {
    return this._element;
  }
}
