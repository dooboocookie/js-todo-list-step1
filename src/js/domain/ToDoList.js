class ToDoList {
    #toDoItems = [];

    constructor(toDoItems) {
        this.#toDoItems = toDoItems;
    }

    public addItem(toDoItem) {
        this.#toDoItems.push(toDoItem)
    }

    //todo js의 컬렉션은 없는것인가?
    public removeItem(toDoItem) {
        this.#toDoItems.filter(item => item !== toDoItem)
    }

    public get toDoItems() {
        return this.#toDoItems;
    }
}
