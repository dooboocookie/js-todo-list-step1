import "./css/style.css";
import { TodoApp } from "./TodoApp";

window.addEventListener("load", () => {
  new TodoApp();
});

//   const todoApp = TodoApp();
//
//   todoApp.toDoTitleInput.getInputValue();
// });
//
// const toDoTitleInput = new Input(
//   findByCssSelector("#new-todo-title"),
//   (value) => {
//     const activeItemTemplate = ActiveItemTemplate.init(value);
//     activeItemTemplate.addEditStartEvent();
//     toDoListTemplate.add(activeItemTemplate);
//   },
// );
//
// const toDoListTemplate = new ToDoListTemplate(findByCssSelector("#todo-list"));
//
// //개수 세기
// toDoListTemplate.addCountObserver();
// // 필터링
//
// const filtersUl = findByCssSelector(".filters");
//
// const filterButton = new FilterButton(filtersUl);
// filterButton.addActiveEvent(toDoListTemplate);
// toDoListTemplate.addFilterObserver(toDoListTemplate);
//
// // 해쉬가 바뀔 때
// window.addEventListener("hashchange", (event) => {
//   let currentHash = window.location.hash.replace("#", "");
//   if (currentHash === "") {
//     currentHash = "all";
//   }
//   toDoListTemplate.filter(currentHash);
// });
//
// // 새로 입력될 때
// const filteringObserver = new MutationObserver(() => {
//   let currentHash = window.location.hash.replace("#", "");
//   if (currentHash === "") {
//     currentHash = "all";
//   }
//   toDoListTemplate.filter(currentHash);
// });
// filteringObserver.observe(toDoListTemplate.element, { childList: true });
