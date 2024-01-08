import { ToDoItem } from "./TodoItem";

export class ToDoList {
  private readonly _toDoItems: ToDoItem[] = [];

  public constructor(toDoItems: ToDoItem[]) {
    this._toDoItems = toDoItems;
  }

  public addItem(toDoItem: ToDoItem) {
    this._toDoItems.push(toDoItem);
  }

  //todo js의 컬렉션은 없는것인가?
  public removeItem(toDoItem: ToDoItem) {
    this._toDoItems.filter((item) => item !== toDoItem);
  }

  public get toDoItems() {
    return this._toDoItems;
  }
}
