class CompleteItemTemplate extends ToDoItemTemplate {

    constructor(element) {
        super(element);
        super.element.classList.add("completed");
    }

    toggle() {
        return new ActiveItemTemplate(this.element);
    }
}
