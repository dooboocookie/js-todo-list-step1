class ToDoItem {
    #content
    #isCompleted

    constructor(content, isCompleted) {
        if(isCompleted === null) {
            isCompleted = false
        }
        this.#content = content;
        this.#isCompleted = isCompleted;
    }

    get content() {
        return this.#content;
    }

    get isCompleted() {
        return this.#isCompleted;
    }
}
