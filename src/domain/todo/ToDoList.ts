import { ToDoItem } from "./TodoItem";

export class ToDoList {
  private readonly _toDoItems: ToDoItem[] = [];

  public constructor(toDoItems: ToDoItem[]) {
    this._toDoItems = toDoItems;
  }

  public addItem(toDoItem: ToDoItem) {
    this._toDoItems.push(toDoItem);
  }

  public removeItem(toDoItem: ToDoItem) {
    this._toDoItems.filter((item) => item !== toDoItem);
  }

  public filter(isCompleted: boolean): ToDoList {
    const toDoItems = this._toDoItems.filter((toDoItem) => {
      return toDoItem.isCompleted === isCompleted;
    });
    return new ToDoList(toDoItems);
  }
  public get toDoItems() {
    return this._toDoItems;
  }
}
