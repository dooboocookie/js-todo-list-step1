class ToDoItemForm {
    #element;

    constructor(element) {
        this.#element = element;
    }

    static init(content) {
        const todoItem = new ElementBuilder("li").build();
        const viewDiv = new ElementBuilder("div").addClass("view").build();
        todoItem.append(viewDiv);

        const checkBox = CheckBox.init();
        viewDiv.append(checkBox.element);

        const toDoContent = ToDoContent.init(content);
        viewDiv.append(toDoContent.element);

        const destroyButton = DestroyButton.init();
        viewDiv.append(destroyButton.element);

        checkBox.addToggleEvent();
        destroyButton.addRemoveEvent();

        const editInput = ToDoContentEditInput.init(content);
        todoItem.append(editInput.element);
        editInput.addEditDoneEvent();

        return new ToDoItemForm(todoItem);
    }

    addEditStartEvent() {
        this.#element.addEventListener("dblclick", (event) => {
            if (!this.#element.classList.contains("editing")) {
                this.#element.classList.add("editing")
            }
        })
    }


    get element() {
        return this.#element;
    }
}
