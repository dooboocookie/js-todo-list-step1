import { findByCssSelector } from "./common/utils/querySelector";
import { ToDoListTemplate } from "./view/ToDoListTemplate";
import { ToDoTitleInput } from "./view/ToDoTitleInput";
import { FilterButton } from "./view/FilterButton";
import "./css/style.css";

const toDoTitleInput = new ToDoTitleInput(findByCssSelector("#new-todo-title"));
const toDoListTemplate = new ToDoListTemplate(findByCssSelector("#todo-list"));
// 새로운 목록 추가
toDoTitleInput.addRegisterNewToDoEvent(toDoListTemplate);
//개수 세기
toDoListTemplate.addCountObserver();
// 필터링

const filtersUl = findByCssSelector(".filters");

const filterButton = new FilterButton(filtersUl);
filterButton.addActiveEvent(toDoListTemplate);
toDoListTemplate.addFilterObserver(toDoListTemplate);

// 해쉬가 바뀔 때
window.addEventListener("hashchange", (event) => {
  let currentHash = window.location.hash.replace("#", "");
  if (currentHash === "") {
    currentHash = "all";
  }
  toDoListTemplate.filter(currentHash);
});

// 새로 입력될 때
const filteringObserver = new MutationObserver(() => {
  let currentHash = window.location.hash.replace("#", "");
  if (currentHash === "") {
    currentHash = "all";
  }
  toDoListTemplate.filter(currentHash);
});
filteringObserver.observe(toDoListTemplate.element, { childList: true });
