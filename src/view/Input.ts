import { addKeyEvent } from "../common/utils/Event";
import Key from "../common/constants/Key";

export class Input {
  private readonly _element: HTMLElement;
  private readonly onEnter!: (value: string) => void;

  public constructor(element: HTMLElement, onEnter: (value: string) => void) {
    this._element = element;

    addKeyEvent(this._element, Key.ENTER, () => {
      if (this.isNotEmpty()) {
        const inputValue = this.getInputValue() ?? "";

        this.onEnter(inputValue);
        this.clear();
      }
    });

    // add event
    this.onEnter = onEnter;
  }

  public getInputValue() {
    const input = this._element as HTMLInputElement;
    return input.value;
  }

  private clear() {
    const input = this._element as HTMLInputElement;
    input.value = "";
  }

  private isNotEmpty() {
    const element = <HTMLInputElement>this._element;
    const attribute = element.value;
    return (
      attribute !== undefined &&
      attribute !== null &&
      attribute !== "" &&
      attribute.length > 0
    );
  }
}
