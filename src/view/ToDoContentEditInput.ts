import { ToDoItemTemplate } from "./todoitem/ToDoItemTemplate";
import { ToDoContent } from "./ToDoContent";
import { addKeyEvent } from "../common/utils/Event";
import Key from "../common/constants/Key";
import { ElementBuilder } from "../common/utils/ElementBuilder";

export class ToDoContentEditInput {
  private readonly _element: HTMLElement;

  private constructor(element: HTMLElement) {
    this._element = element;
  }

  public get element() {
    return this._element;
  }

  public static init(content: string): ToDoContentEditInput {
    const toDoContentEditInput = ElementBuilder.init("input")
      .addClass("edit")
      .value(content)
      .build();

    return new ToDoContentEditInput(toDoContentEditInput);
  }

  public addEditDoneEvent(
    toDoItemTemplate: ToDoItemTemplate,
    toDoContent: ToDoContent,
  ) {
    addKeyEvent(this._element, Key.ENTER, () => {
      //todo 여기서도 파라미터로 받은 내용에 대한 상태변경은 좋지 않음
      toDoItemTemplate.endEdit();
      const input = this._element as HTMLInputElement;
      toDoContent.edit(input.value);
    });
    addKeyEvent(this._element, Key.ESC, () => {
      toDoItemTemplate.endEdit();
      const input = this._element as HTMLInputElement;
      input.value = toDoContent.getValue();
    });
  }
}
