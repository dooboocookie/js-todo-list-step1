import {
  findByCssSelector,
  findChildrenByCssSelector,
} from "../common/utils/querySelector";
import { ToDoItemTemplate } from "./todoitem/ToDoItemTemplate";

export class ToDoListTemplate {
  private readonly _element: HTMLElement;

  public constructor(element: HTMLElement) {
    this._element = element;
  }

  public add(toDoItemTemplate: ToDoItemTemplate) {
    this._element.append(toDoItemTemplate.element);
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

  public get element(): HTMLElement {
    return this._element;
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
}
