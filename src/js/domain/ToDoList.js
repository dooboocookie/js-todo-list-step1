class ToDoList {
    #toDoItems = [];

    constructor(toDoItems) {
        this.#toDoItems = toDoItems;
    }

    addItem(toDoItem) {
        this.#toDoItems.push(toDoItem)
    }

    //todo js의 컬렉션은 없는것인가?
    removeItem(toDoItem) {
        this.#toDoItems.filter(item => item !== toDoItem)
    }

    get toDoItems() {
        return this.#toDoItems;
    }
}
