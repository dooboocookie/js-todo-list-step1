class ToDoTitleInput {
    #element;

    constructor(element) {
        this.#element = element;
    }

    clear() {
        this.#element.value = null;
    }

    getInputValue() {
        return this.#element.value;
    }

    addRegisterNewToDoEvent(toDoListForm) {
        addKeyEvent(this.#element, Key.ENTER, () => {
            if(this.isNotEmpty()) {
                const toDoItemForm = ToDoItemForm.init(this.getInputValue());
                toDoItemForm.addEditStartEvent();
                toDoListForm.add(toDoItemForm);
                this.clear();
            }
        })
    }

    isNotEmpty() {
        return this.#element.value !== undefined &&
            this.#element.value !== null &&
            this.#element.value !== "" &&
            this.#element.value.length > 0;
    }
}
