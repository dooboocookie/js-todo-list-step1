class ActiveItemTemplate extends ToDoItemTemplate {

    constructor(element) {
        super(element);
        this.element.classList.remove("completed");
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

        destroyButton.addRemoveEvent();
        const editInput = ToDoContentEditInput.init(content);
        todoItem.append(editInput.element);

        const activeItemTemplate = new ActiveItemTemplate(todoItem);
        checkBox.addToggleEvent(activeItemTemplate);
        editInput.addEditDoneEvent(activeItemTemplate, toDoContent);

        return activeItemTemplate;
    }

    toggle() {
        return new CompleteItemTemplate(this.element);
    }
}
