import { ToDoListTemplate } from "./ToDoListTemplate";
import { findChildrenByCssSelector } from "../common/utils/querySelector";
import { addClickEvent } from "../common/utils/Event";

export class FilterButton {
  private readonly _element: HTMLElement;

  constructor(element: HTMLElement) {
    this._element = element;
  }

  addActiveEvent(toDoListTemplate: ToDoListTemplate) {
    const elements = findChildrenByCssSelector(this._element, "li a");
    elements.forEach((element) => {
      addClickEvent(element, () => {
        elements.forEach((targetElement) => {
          if (targetElement === element) {
            targetElement.classList.add("selected");
          } else {
            targetElement.classList.remove("selected");
          }
        });
        let currentHash = window.location.hash.replace("#", "");
        if (currentHash === "") {
          currentHash = "all";
        }
        toDoListTemplate.filter(currentHash);
      });
    });
  }
}
