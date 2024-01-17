import { VElement } from "../../../../../../framework/VElement.js";
import { todoList } from "../../../../models/todo_model.js";

let activeCount 
export function updateActiveCount() {
  activeCount = todoList.todos.length;
  console.log(activeCount)
}

export const todoCount = new VElement({
  tag: "span",
  attrs: {
    class: "todo-count",
  },
  content: `${activeCount } items left`,
});
