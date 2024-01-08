import { addDoubleClickEvent } from "../../common/utils/Event";

export class ToDoItemTemplate {
  protected constructor(element: HTMLElement) {
    this._element = element;
  }

  //todo 상속하려니까 접근제어자가 이상해진다. 조합으로 바꾸자
  protected _element: HTMLElement;

  get element() {
    return this._element;
  }

  public addEditStartEvent() {
    addDoubleClickEvent(this._element, () => {
      if (!this._element.classList.contains("editing")) {
        this._element.classList.add("editing");
      }
    });
  }

  endEdit() {
    this._element.classList.remove("editing");
  }

  toggle(): ToDoItemTemplate {
    throw "사용할 수 없는 함수입니다.";
  }
}
