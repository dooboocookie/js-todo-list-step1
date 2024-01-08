const toDoTitleInput = new ToDoTitleInput(findByCssSelector("#new-todo-title"));
const toDoListUlTag = new ToDoListTemplate(findByCssSelector("#todo-list"));
// 새로운 목록 추가
toDoTitleInput.addRegisterNewToDoEvent(toDoListUlTag);
//개수 세기
toDoListUlTag.addCountObserver();
// 필터링
const filtersUl = document.querySelector(".filters");
const filterAList = filtersUl.querySelectorAll("li a");

const filterToDoList = function() {
    let currentHash = window.location.hash.replace("#", "");
    if(currentHash === "") {
        currentHash = "all";
    }

    filterAList.forEach((filterAElement) => {
        if ( filterAElement.classList.contains(currentHash)) {
            filterAElement.classList.add("selected");
        } else {
            filterAElement.classList.remove("selected");
        }
    });

    switch(currentHash) {
        case "active":
            showNodes(toDoListUlTag.element.querySelectorAll("li:not(.completed)"));
            hideNodes(toDoListUlTag.element.querySelectorAll("li.completed"));
            break;
        case "completed":
            showNodes(toDoListUlTag.element.querySelectorAll("li.completed"));
            hideNodes(toDoListUlTag.element.querySelectorAll("li:not(.completed)"));
            break;
        default:
            showNodes(toDoListUlTag.element.querySelectorAll("li"));
            break;
    }

    const counter = findByCssSelector(".count-container .todo-count strong");
    counter.innerText = toDoListUlTag.count()
}

function showNodes(nodeList) {
    nodeList.forEach((node) => {
        node.classList.remove("hidden");
    });
}

function hideNodes(nodeList) {
    nodeList.forEach((node) => {
        node.classList.add("hidden");
    });
}

// 해쉬가 바뀔 때
window.addEventListener("hashchange", (event) => {
    filterToDoList();
});

// 새로 입력될 때
const filteringObserver = new MutationObserver(filterToDoList);
filteringObserver.observe(toDoListUlTag.element, {childList: true});
