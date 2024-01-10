import "./css/style.css";
import { TodoApp } from "./TodoApp";

window.addEventListener("load", () => {
  const todoApp = new TodoApp();
  todoApp.initData();
  todoApp.run();
});
