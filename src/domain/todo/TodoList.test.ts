import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  it("TodoItem 배열을 입력 받아 생성한다", () => {
    //given
    const todoItems: TodoItem[] = [
      new TodoItem("1번", false),
      new TodoItem("2번", false),
      new TodoItem("3번", true),
    ];
    //when
    const actual = new TodoList(todoItems);
    //then
    expect(actual.toDoItems[0].content).toBe("1번");
  });

  it("TodoItem을 가장 마지막 목록으로 추가한다", () => {
    //given
    const toDoItems: TodoItem[] = [
      new TodoItem("1번", false),
      new TodoItem("2번", false),
      new TodoItem("3번", true),
    ];
    const toDoList = new TodoList(toDoItems);
    const expected = new TodoItem("추가", false);
    //when
    toDoList.addItem(expected);
    //then
    expect(toDoList.toDoItems[3]).toBe(expected);
  });

  it("index에 해당하는 요소를 삭제한다", () => {
    //given
    const toDoItems: TodoItem[] = [
      new TodoItem("1번", false),
      new TodoItem("2번", false),
      new TodoItem("3번", true),
    ];
    const expected = toDoItems.length - 1;
    const toDoList = new TodoList(toDoItems);
    //when
    toDoList.removeItem(2);
    //then
    expect(toDoList.toDoItems.length).toBe(expected);
  });

  it("index에 해당하는 요소의 내용을 수정한다", () => {
    //given
    const toDoItems: TodoItem[] = [
      new TodoItem("1번", false),
      new TodoItem("2번", false),
      new TodoItem("3번", true),
    ];
    const expected = "수정";
    const index = 2;
    const toDoList = new TodoList(toDoItems);
    //when
    toDoList.editItem(index, expected);
    //then
    expect(toDoList.toDoItems[index].content).toBe(expected);
  });

  it("완료 여부로 필터링 된 결과만 보여준다", () => {
    //given
    const toDoItem1 = new TodoItem("1번", false);
    const toDoItem2 = new TodoItem("2번", false);
    const toDoItem3 = new TodoItem("3번", true);
    const toDoItems: TodoItem[] = [toDoItem1, toDoItem2, toDoItem3];
    const toDoList = new TodoList(toDoItems);
    const expected: TodoItem[] = [toDoItem1, toDoItem2];
    //when
    const actual = toDoList.filterByCompleted(false);
    //then
    expect(actual).toEqual(expected);
  });

  it("index로 n번째 항목을 완료상태를 스위치한다", () => {
    //given
    const toDoItem1 = new TodoItem("1번", false);
    const toDoItem2 = new TodoItem("2번", false);
    const toDoItem3 = new TodoItem("3번", true);
    const toDoItems: TodoItem[] = [toDoItem1, toDoItem2, toDoItem3];
    const toDoList = new TodoList(toDoItems);
    //when
    toDoList.completeItem(2);
    const notCompletedItems = toDoList.filterByCompleted(false);
    const actual = notCompletedItems.length;
    const expected = 3;
    //then
    expect(actual).toEqual(expected);
  });
});
