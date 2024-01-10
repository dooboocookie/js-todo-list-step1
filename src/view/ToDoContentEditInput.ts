import { addKeyEvent } from "../common/utils/Event";
import Key from "../common/constants/Key";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class ToDoContentEditInput {
  private readonly _element: HTMLElement;
  private readonly _onSubmit: (content: string) => void;
  private readonly _onCancel: () => void;

  constructor(
    element: HTMLElement,
    onSubmit: (content: string) => void,
    onCancel: () => void,
  ) {
    this._element = element;
    this._onSubmit = onSubmit;
    this._onCancel = onCancel;
  }

  public static init(
    content: string,
    onSubmit: (content: string) => void,
    onCancel: () => void,
  ): ToDoContentEditInput {
    const toDoContentEditInput = ElementBuilder.init("input")
      .addClass("edit")
      .value(content)
      .build();

    return new ToDoContentEditInput(toDoContentEditInput, onSubmit, onCancel);
  }

  private addEditDoneEvent() {
    addKeyEvent(this._element, Key.ENTER, () => {
      const input = this._element as HTMLInputElement;
      this._onSubmit(input.value);
    });
  }

  private addEditCancelEvent() {
    addKeyEvent(this._element, Key.ESC, () => {
      this._onCancel();
    });
  }

  public get element() {
    return this._element;
  }
}
