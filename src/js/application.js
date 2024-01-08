const toDoTitleInput = findByCssSelector("#new-todo-title")
const toDoListUlTag = findByCssSelector("#todo-list")

// 새로운 목록 추가
addKeyEvent("Enter", toDoTitleInput, () => {
    //todo 이부분 수정 필요 https://velog.io/@seunghwan/JavaScript
    if(toDoTitleInput.value !== "") {
        const toDoItemForm = ToDoItemForm.init(toDoTitleInput.value);
        toDoItemForm.addEditStartEvent();
        const element = toDoItemForm.element;
        toDoListUlTag.append(element);
        toDoTitleInput.value = null
    }
})

//갯수 다시 세기
const recount = (mutationList, observer) => {
    const count = toDoListUlTag.querySelectorAll("li:not(.hidden)").length
    const countContent = document.querySelector(".count-container .todo-count strong");
    countContent.innerText = count
}

const mutationObserver = new MutationObserver(recount)

mutationObserver.observe(toDoListUlTag, {childList: true})

// 프래그먼트 식별자에 따라 보여지기
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
            showNodes(toDoListUlTag.querySelectorAll("li:not(.completed)"));
            hideNodes(toDoListUlTag.querySelectorAll("li.completed"));
            break;
        case "completed":
            showNodes(toDoListUlTag.querySelectorAll("li.completed"));
            hideNodes(toDoListUlTag.querySelectorAll("li:not(.completed)"));
            break;
        default:
            showNodes(toDoListUlTag.querySelectorAll("li"));
            break;
    }
    recount()
}

function showNodes(nodeList) {
    nodeList.forEach((node) => {
        node.classList.remove("hidden");
    });
}

const hideNodes = function(nodeList) {
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
filteringObserver.observe(toDoListUlTag, {childList: true});
