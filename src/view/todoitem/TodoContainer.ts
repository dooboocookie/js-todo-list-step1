import { addDoubleClickEvent } from "../../common/utils/Event";

export class TodoContainer {
  //todo 상속하려니까 접근제어자가 이상해진다. 조합으로 바꾸자
  protected _element: HTMLElement;
  protected readonly _onClickCheckbox: (element: HTMLElement) => void;
  protected readonly _onClickDestroyButton: (element: HTMLElement) => void;
  protected readonly _onEnterEditInput: (
    content: string,
    element: HTMLElement,
  ) => void;
  protected readonly _onEscEditInput: () => void;

  protected constructor(
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
    this.addEditStartEvent();
  }

  private addEditStartEvent() {
    addDoubleClickEvent(this._element, () => {
      if (!this._element.classList.contains("editing")) {
        this._element.classList.add("editing");
      }
    });
  }

  public toggle(): TodoContainer {
    throw "사용할 수 없는 함수입니다.";
  }

  public hide() {
    this.element.classList.add("hidden");
  }

  public get element() {
    return this._element;
  }
}
