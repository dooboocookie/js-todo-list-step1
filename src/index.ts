import { findByCssSelector } from "./common/utils/querySelector";
import { ToDoListTemplate } from "./view/ToDoListTemplate";
import { ToDoTitleInput } from "./view/ToDoTitleInput";
import "./css/style.css";

const toDoTitleInput = new ToDoTitleInput(findByCssSelector("#new-todo-title"));
const toDoListTemplate = new ToDoListTemplate(findByCssSelector("#todo-list"));
// 새로운 목록 추가
toDoTitleInput.addRegisterNewToDoEvent(toDoListTemplate);
//개수 세기
toDoListTemplate.addCountObserver();
// 필터링
const filtersUl = findByCssSelector(".filters");
const filterAList = filtersUl.querySelectorAll("li a");

const filterToDoList = function () {
  let currentHash = window.location.hash.replace("#", "");
  if (currentHash === "") {
    currentHash = "all";
  }

  filterAList.forEach((filterAElement) => {
    if (filterAElement.classList.contains(currentHash)) {
      filterAElement.classList.add("selected");
    } else {
      filterAElement.classList.remove("selected");
    }
  });

  switch (currentHash) {
    case "active":
      showNodes(
        toDoListTemplate.element.querySelectorAll("li:not(.completed)"),
      );
      hideNodes(toDoListTemplate.element.querySelectorAll("li.completed"));
      break;
    case "completed":
      showNodes(toDoListTemplate.element.querySelectorAll("li.completed"));
      hideNodes(
        toDoListTemplate.element.querySelectorAll("li:not(.completed)"),
      );
      break;
    default:
      showNodes(toDoListTemplate.element.querySelectorAll("li"));
      break;
  }

  const counter = findByCssSelector(".count-container .todo-count strong");
  counter.innerText = String(toDoListTemplate.count());
};

function showNodes(nodeList: NodeListOf<Element>) {
  nodeList.forEach((node) => {
    node.classList.remove("hidden");
  });
}

function hideNodes(nodeList: NodeListOf<Element>) {
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
filteringObserver.observe(toDoListTemplate.element, { childList: true });
