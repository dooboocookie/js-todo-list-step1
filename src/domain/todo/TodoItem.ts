export class ToDoItem {
  private readonly _content;
  private readonly _isCompleted;

  public constructor(content: string, isCompleted: boolean) {
    if (isCompleted === null) {
      isCompleted = false;
    }
    this._content = content;
    this._isCompleted = isCompleted;
  }

  public get content() {
    return this._content;
  }

  public get isCompleted() {
    return this._isCompleted;
  }
}
