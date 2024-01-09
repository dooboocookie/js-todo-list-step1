export class ToDoItem {
  private readonly _content: string;
  private readonly _isCompleted: boolean;

  public constructor(content: string, isCompleted: boolean) {
    if (isCompleted === null) {
      isCompleted = false;
    }
    this._content = content;
    this._isCompleted = isCompleted;
  }

  public get content(): string {
    return this._content;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }
}
