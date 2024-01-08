class ToDoListForm {
    #element;

    constructor(element) {
        this.#element = element;
    }

    add(toDoItemForm) {
        this.#element.append(toDoItemForm.element);
    }

    get element() {
        return this.#element;
    }
}
