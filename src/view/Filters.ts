import { findChildrenByCssSelector } from "../common/utils/querySelector";
import { addClickEvent } from "../common/utils/Event";

export class Filters {
  private readonly _element: HTMLElement;
  private readonly _onClick: () => void;

  public constructor(element: HTMLElement, onClick: () => void) {
    this._element = element;
    this.addClickEvent();
    this._onClick = onClick;
  }

  private addClickEvent() {
    const filters = findChildrenByCssSelector(this._element, "li a");
    filters.forEach((targetFilter) => {
      addClickEvent(targetFilter, () => {
        // event.preventDefault();
        // window.location.href = targetFilter.getAttribute("href") ?? "#";
        this.activeFilter(filters, targetFilter);
        this._onClick();
      });
    });
  }

  private activeFilter(filters: HTMLElement[], targetFilter: HTMLElement) {
    filters.forEach((filter) => {
      if (filter === targetFilter) {
        filter.classList.add("selected");
      } else {
        filter.classList.remove("selected");
      }
    });
  }
}
