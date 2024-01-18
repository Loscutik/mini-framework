import { VElement } from "../../../../../../framework/VElement.js";
import { todoList } from "../../../../models/todo_model.js";

export const vTodoList = new VElement({
  tag: "ul",
  attrs: { id: "todoList", class: "todo-list" },
  children: [...todoList.getByFilter()],
});
