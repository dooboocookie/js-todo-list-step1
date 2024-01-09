import { ToDoItem } from "./TodoItem";

export class ToDoList {
  private readonly _toDoItems: ToDoItem[] = [];

  public constructor(toDoItems: ToDoItem[]) {
    this._toDoItems = toDoItems;
  }

  public addItem(toDoItem: ToDoItem) {
    this._toDoItems.push(toDoItem);
  }

  public removeItem(index: number) {
    this._toDoItems.splice(index, 1);
  }

  public editItem(index: number, editContent: string) {
    this._toDoItems[index].edit(editContent);
  }

  public filterByCompleted(isCompleted: boolean): ToDoItem[] {
    return this._toDoItems.filter((toDoItem) => {
      return toDoItem.isCompleted === isCompleted;
    });
  }

  public get toDoItems() {
    return this._toDoItems;
  }
}
