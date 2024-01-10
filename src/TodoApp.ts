import { Input } from "./view/Input";
import {
  findByCssSelector,
  findChildrenByCssSelector,
  findParentByCssSelector,
} from "./common/utils/querySelector";
import { TodoList } from "./domain/todo/TodoList";
import { TodoItem } from "./domain/todo/TodoItem";
import { ToDoListTemplate } from "./view/ToDoListTemplate";
import { ActiveItemTemplate } from "./view/todoitem/ActiveItemTemplate";

export let TODO_APP: TodoApp;

export class TodoApp {
  //todo: 얘네가 TodoApp의 상태야? => 그렇다는것은 이 TodoApp 객체의 생명주기는 유저가 페이지에 머무르는 동안이구나!
  private _todoList: TodoList;
  private _todoInput: Input;
  private _todoListContainer: ToDoListTemplate;

  constructor() {
    this._todoList = TodoList.init();
    this._todoListContainer = this.findTodoListContainer();
    this._todoInput = this.initTodoInput();
    TODO_APP = this;
  }

  private findTodoListContainer(): ToDoListTemplate {
    const toDoListTemplate = new ToDoListTemplate(
      findByCssSelector("#todo-list"),
    );
    console.log(toDoListTemplate, 22222);
    return toDoListTemplate;
  }

  private initTodoInput() {
    const inputElement = findByCssSelector("#new-todo-title");
    return new Input(inputElement, (value: string) => {
      const todoItem = new TodoItem(value, false);
      this._todoList.addItem(todoItem);
      /**
       * todo) 여기가 매끄럽지 않음 -> 저장 후 조회인데, 저장한걸 조회하는게 아니라 / 저장과 저장할걸 적용 -> 이게 좀 어색...
       * todo) 그렇다면, 도메인을 뷰에 넘겨줘서 뷰가 렌더링하는 기능을 만들던가, 도메인을 뷰로 렌더링해주는 역할을 하는 애가 필요한가?
       */
      const activeItemTemplate = ActiveItemTemplate.init(
        value,
        this.switchTodo,
        this.removeTodo,
        this.editTodo,
        this.cancelToEditTodo,
      );
      this._todoListContainer.add(activeItemTemplate);
    });
  }

  // todo 와............. 이거 this 왜 안돼;;;;
  private switchTodo(element: HTMLElement) {
    const parent = findParentByCssSelector(element, "ul");
    const checkBoxes = findChildrenByCssSelector(parent, ".toggle");
    const index = checkBoxes.indexOf(element);
    TODO_APP._todoList.completeItem(index);
    // todo 여기가 끊기는 부분
    TODO_APP._todoListContainer.toggleItem(index);
  }

  private removeTodo() {}

  private editTodo(content: string) {}

  private cancelToEditTodo() {}
}
