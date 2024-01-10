import {
  findByCssSelector,
  findChildrenByCssSelector,
} from "../common/utils/querySelector";
import { ToDoItemTemplate } from "./todoitem/ToDoItemTemplate";

export class ToDoListTemplate {
  private readonly _element: HTMLElement;
  private readonly todoItemContainers: ToDoItemTemplate[];

  public constructor(element: HTMLElement) {
    this._element = element;
    this.todoItemContainers = [];
  }

  public toggleItem(index: number) {
    const target = findChildrenByCssSelector(this.element, "li");
    this.todoItemContainers[index] = this.todoItemContainers[index].toggle();
  }

  public add(toDoItemTemplate: ToDoItemTemplate) {
    this._element.append(toDoItemTemplate.element);
    this.todoItemContainers.push(toDoItemTemplate);
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
