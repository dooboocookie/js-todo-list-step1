import { Input } from "./view/Input";
import {
  findByCssSelector,
  findChildrenByCssSelector,
} from "./common/utils/querySelector";
import { TodoList } from "./domain/todo/TodoList";
import { TodoItem } from "./domain/todo/TodoItem";
import { ToDoListTemplate } from "./view/ToDoListTemplate";
import { ActiveItemTemplate } from "./view/todoitem/ActiveItemTemplate";
import { ToDoItemTemplate } from "./view/todoitem/ToDoItemTemplate";

export let TODO_APP: TodoApp;

export class TodoApp {
  // todo) 얘네가 TodoApp의 상태야?
  // todo) => 그렇다는것은 이 TodoApp 객체의 생명주기는 유저가 페이지에 머무르는 동안이여야하는것 아니야?
  // todo) 알아봐야할 것 index.ts가 실행, 로드 되는 시점 => 아마 매번 페이지 로드할떄마다?
  private _todoList: TodoList;
  private _todoListContainer: ToDoListTemplate;

  constructor() {
    this._todoList = TodoList.init();
    this._todoListContainer = this.findTodoListContainer();

    this.initTodoInput();

    TODO_APP = this;
  }

  private findTodoListContainer(): ToDoListTemplate {
    const element = findByCssSelector("#todo-list");
    return new ToDoListTemplate(
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

  // todo 이건 this 왜 돼????????????? => 여기서 this가 Input이 안되는 이유를 찾자.
  // todo 라고 생각했는데, private 함수로 분리하니까 또 안되네,
  private enterInput(content: string) {
    const todoItem = new TodoItem(content, false);
    TODO_APP._todoList.addItem(todoItem);

    TODO_APP._todoListContainer.update(TODO_APP._todoList);
  }

  // todo 와............. 이거 this 왜 안돼;;;;
  private switchTodo(element: HTMLElement) {
    const parent = TODO_APP._todoListContainer.element;
    const checkBoxes = findChildrenByCssSelector(parent, ".toggle");
    const index = checkBoxes.indexOf(element);
    TODO_APP._todoList.completeItem(index);

    TODO_APP._todoListContainer.update(TODO_APP._todoList);
  }

  private removeTodo(element: HTMLElement) {
    if (confirm("삭제하시겠습니까?")) {
      const parent = TODO_APP._todoListContainer.element;
      const destroyButtons = findChildrenByCssSelector(parent, ".destroy");
      const index = destroyButtons.indexOf(element);
      TODO_APP._todoList.removeItem(index);

      TODO_APP._todoListContainer.update(TODO_APP._todoList);
    }
  }

  private editTodo(content: string, element: HTMLElement) {
    const parent = TODO_APP._todoListContainer.element;
    const editInputs = findChildrenByCssSelector(parent, ".edit");
    const index = editInputs.indexOf(element);
    TODO_APP._todoList.editItem(index, content);

    TODO_APP._todoListContainer.update(TODO_APP._todoList);
  }

  private cancelToEditTodo() {
    TODO_APP._todoListContainer.update(TODO_APP._todoList);
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
