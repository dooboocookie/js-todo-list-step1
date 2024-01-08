class ToDoListTemplate {
    #element;

    constructor(element) {
        this.#element = element;
    }

    add(toDoItemForm) {
        this.#element.append(toDoItemForm.element);
    }

    count() {
        return this.#element
            .querySelectorAll("li:not(.hidden)")
            .length
    }

    hideActive() {

    }

    hideCompleted() {

    }

    showAll() {

    }

    addCountObserver() {
        const recount = (entries, observer) => {
            const counter = findByCssSelector(".count-container .todo-count strong");
            counter.innerText = this.count()
        }

        const mutationObserver = new MutationObserver(recount)
        mutationObserver.observe(toDoListUlTag.element, {childList: true})
    }

    get element() {
        return this.#element;
    }
}
