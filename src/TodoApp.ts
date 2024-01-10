import { Input } from "./view/Input";
import {
  findByCssSelector,
  findChildrenByCssSelector,
} from "./common/utils/querySelector";
import { TodoList } from "./domain/todo/TodoList";
import { TodoItem } from "./domain/todo/TodoItem";
import { TodoContainers } from "./view/TodoContainers";
import { Filters } from "./view/Filters";
import Counter from "./view/Counter";

export let TODO_APP: TodoApp;

// todo) 얘네가 TodoApp의 상태야?
// todo) => 그렇다는것은 이 TodoApp 객체의 생명주기는 유저가 페이지에 머무르는 동안이여야하는것 아니야?
// todo) 알아봐야할 것 index.ts가 실행, 로드 되는 시점 => 아마 매번 페이지 로드할떄마다?
export class TodoApp {
  private readonly _todoList: TodoList;
  private readonly _todoListContainer: TodoContainers;
  private readonly _todoInput: Input;
  private readonly _todoFilters: Filters;
  private readonly _todoCounter: Counter;

  constructor() {
    TODO_APP = this;
    this._todoList = TodoList.init();
    this._todoListContainer = this.initToDoListContainer();
    this._todoInput = this.initTodoInput();
    this._todoFilters = this.initFilters();
    this._todoCounter = this.initCounter();
  }

  public initData() {
    //todo TODO_APP._todoList 에 데이터 세팅하는 과정
  }

  public run() {
    TODO_APP.showFilteredTodo();
  }

  private initToDoListContainer(): TodoContainers {
    const element = findByCssSelector("#todo-list");
    return new TodoContainers(
      element,
      this.switchTodo,
      this.removeTodo,
      this.editTodo,
      this.cancelToEditTodo,
    );
  }

  private initTodoInput() {
    const inputElement = findByCssSelector("#new-todo-title");
    return new Input(inputElement, this.enterInput);
  }

  private initFilters() {
    const filtersElement = findByCssSelector(".filters");
    return new Filters(filtersElement, this.selectFilter);
  }

  private initCounter() {
    return new Counter();
  }

  private enterInput(content: string) {
    const todoItem = new TodoItem(content, false);
    TODO_APP._todoList.addItem(todoItem);

    TODO_APP.showFilteredTodo();
  }

  private switchTodo(element: HTMLElement) {
    const parent = TODO_APP._todoListContainer.element;
    const checkBoxes = findChildrenByCssSelector(parent, ".toggle");
    const index = checkBoxes.indexOf(element);
    TODO_APP._todoList.completeItem(index);

    TODO_APP.showFilteredTodo();
  }

  private removeTodo(element: HTMLElement) {
    const confirmAnswer = confirm("삭제하시겠습니까?");
    if (!confirmAnswer) {
      return;
    }
    const parent = TODO_APP._todoListContainer.element;
    const destroyButtons = findChildrenByCssSelector(parent, ".destroy");
    const index = destroyButtons.indexOf(element);
    TODO_APP._todoList.removeItem(index);

    TODO_APP.showFilteredTodo();
  }

  private editTodo(content: string, element: HTMLElement) {
    const parent = TODO_APP._todoListContainer.element;
    const editInputs = findChildrenByCssSelector(parent, ".edit");
    const index = editInputs.indexOf(element);
    TODO_APP._todoList.editItem(index, content);

    TODO_APP.showFilteredTodo();
  }

  private cancelToEditTodo() {
    TODO_APP.showFilteredTodo();
  }

  private selectFilter() {
    TODO_APP.showFilteredTodo();
  }

  private showFilteredTodo() {
    const filteredItems = TODO_APP.filterItems();
    //todo GC 잘 작동하려나?
    const filteredTodoList = new TodoList(filteredItems);
    TODO_APP._todoListContainer.update(filteredTodoList, this._todoList);
  }

  private filterItems() {
    const filterKeyword = window.location.hash.replace("#", "");
    if (filterKeyword === "active") {
      return TODO_APP._todoList.filterByCompleted(false);
    }
    if (filterKeyword === "completed") {
      return TODO_APP._todoList.filterByCompleted(true);
    }
    return TODO_APP._todoList.toDoItems;
  }
}

/**
 * todo) [끊김] 여기가 매끄럽지 않음 -> 저장 후 조회인데, 저장한걸 조회하는게 아니라 / 저장과 저장할걸 적용 -> 이게 좀 어색...
 * todo) 그렇다면, 도메인을 뷰에 넘겨줘서 뷰가 렌더링하는 기능을 만들던가, 도메인을 뷰로 렌더링해주는 역할을 하는 애가 필요한가?
 * todo) 성능상으로는 이게 조금 더 이득일 것 같긴한데...
 * todo) 근데 결국 도메인을 이용해서 새로 쓰지 않으면, 도메인을 만든 이유가 없는데
 */
// private enterInput2222(content: string) {
//   const todoItem = new TodoItem(content, false);
//   const itemTemplate = TODO_APP.initItemTemplate(content);
//   TODO_APP._todoList.addItem(todoItem);
//   // todo [끊김]
//   TODO_APP._todoListContainer.add(itemTemplate);
// }
