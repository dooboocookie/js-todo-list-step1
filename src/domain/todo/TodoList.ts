import { TodoItem } from "./TodoItem";

export class TodoList {
  private readonly _toDoItems: TodoItem[];

  public constructor(toDoItems: TodoItem[]) {
    this._toDoItems = toDoItems;
  }

  public static init(): TodoList {
    const empty: TodoItem[] = [];
    return new TodoList(empty);
  }

  public addItem(toDoItem: TodoItem) {
    this._toDoItems.push(toDoItem);
  }

  public removeItem(index: number) {
    this._toDoItems.splice(index, 1);
  }

  public editItem(index: number, editContent: string) {
    this._toDoItems[index].edit(editContent);
  }

  public completeItem(index: number) {
    this._toDoItems[index].switchCompleted();
  }

  public filterByCompleted(isCompleted: boolean): TodoItem[] {
    return this._toDoItems.filter((toDoItem) => {
      return toDoItem.isCompleted === isCompleted;
    });
  }

  public get toDoItems() {
    return this._toDoItems;
  }
}
