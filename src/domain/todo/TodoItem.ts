export class TodoItem {
  private _content: string;
  private _isCompleted: boolean;

  public constructor(content: string, isCompleted: boolean) {
    if (isCompleted === null) {
      isCompleted = false;
    }
    this.validateNotEmpty(content);
    this._content = content;
    this._isCompleted = isCompleted;
  }

  private validateNotEmpty(content: string) {
    if (content === "" || content === undefined || content === null) {
      throw new Error("값이 존재하지 않습니다.");
    }
  }

  public switchCompleted() {
    this._isCompleted = !this._isCompleted;
  }

  public edit(content: string) {
    this.validateNotEmpty(content);
    this._content = content;
  }

  public get content(): string {
    return this._content;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }
}
