class ToDoListTemplate {
    #element;

    constructor(element) {
        this.#element = element;
    }

    add(toDoItemForm) {
        this.#element.append(toDoItemForm.element);
    }

    countActive() {

    }

    countAll() {

    }

    hideActive() {

    }

    hideCompleted() {

    }

    showAll() {

    }

    get element() {
        return this.#element;
    }
}
