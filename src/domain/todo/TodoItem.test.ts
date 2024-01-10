import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  it("내용과 완료 여부를 입력 받아 생성한다", () => {
    //given
    const inputContent = "내용입니다";
    const inputCompleted = false;
    //when
    const actual = new TodoItem(inputContent, inputCompleted);
    //then
    expect(actual.content).toBe(inputContent);
  });

  it("내용이 없으면 예외를 발생한다", () => {
    //given
    const inputContent = "";
    const inputCompleted = false;
    //when & then
    expect(() => {
      new TodoItem(inputContent, inputCompleted);
    }).toThrow(new Error("값이 존재하지 않습니다."));
  });

  it("완료 상태를 변경한다", () => {
    //given
    const inputContent = "내용입니다";
    const inputCompleted = false;
    const toDoItem = new TodoItem(inputContent, inputCompleted);
    //when
    toDoItem.switchCompleted();
    const actual = toDoItem.isCompleted;
    //then
    expect(actual).toBe(true);
  });

  it("내용을 변경한다", () => {
    //given
    const inputContent = "내용입니다";
    const inputCompleted = false;
    const toDoItem = new TodoItem(inputContent, inputCompleted);
    const expected = "변경된 내용입니다";
    //when
    toDoItem.edit(expected);
    const actual = toDoItem.content;
    //then
    expect(actual).toBe(expected);
  });

  it("없는 값으로는 내용 변경이 불가합니다.", () => {
    //given
    const inputContent = "내용입니다";
    const inputCompleted = false;
    const toDoItem = new TodoItem(inputContent, inputCompleted);
    const empty = "";
    //when & then
    expect(() => {
      toDoItem.edit(empty);
    }).toThrow(new Error("값이 존재하지 않습니다."));
  });
});
