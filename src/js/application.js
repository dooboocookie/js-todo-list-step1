const toDoTitleInput = document.querySelector("#new-todo-title")
const toDoListUlTag = document.querySelector("#todo-list")

// 새로운 목록 추가
toDoTitleInput.addEventListener("keyup", (event) => {
    if(event.keyCode === 13) {
        //todo 이부분 수정 필요 https://velog.io/@seunghwan/JavaScript
        if(toDoTitleInput.value !== "") {
            let li = new ElementBuilder("li").build();
            let viewDiv = new ElementBuilder("div").addClass("view").build();
            let toggleInput = new ElementBuilder("input").addClass("toggle").type("checkbox").build();
            let label = new ElementBuilder("label").innerText(toDoTitleInput.value).build();
            let destroyButton = new ElementBuilder("button").addClass("destroy").build();
            let editInput = new ElementBuilder("input").addClass("edit").value(toDoTitleInput.value).build();

            viewDiv.append(toggleInput)

            viewDiv.append(label)
            viewDiv.append(destroyButton)
            li.append(viewDiv)

            li.append(editInput)
            toDoListUlTag.append(li)

            // 체크박스 체크하기
            toggleInput.addEventListener("click", (event) => {
                if(toggleInput.checked) {
                    li.classList.add("completed")
                } else {
                    li.classList.remove("completed")
                }
            })

            // 삭제하기
            destroyButton.addEventListener("click", (event) => {
                if(confirm("삭제하시겠습니까?")) {
                    li.remove()
                }
            })

            // 수정하기
            li.addEventListener("dblclick", (event) => {
                // todo 부정문 수정
                if (!li.classList.contains("editing")) {
                    li.classList.add("editing")
                }
            })

            editInput.addEventListener("keyup", (event) => {
                if(event.keyCode === 13) {
                    li.classList.remove("editing")
                    label.innerText = editInput.value
                }
                if(event.keyCode === 27) {
                    li.classList.remove("editing")
                    editInput.value = label.innerText
                }
            })

            // 체크 박스 체크될 때
            toggleInput.addEventListener("click", (event) => {
                filterToDoList();
            })

            toDoTitleInput.value = null
        }
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
