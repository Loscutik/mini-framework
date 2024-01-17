import { VElement } from "../../../../../../framework/VElement.js";
import { FILTER_ACTIVE } from "../../../../consts.js";
import { todoList } from "../../../../models/todo_model.js";

let activeCount = 0
export function updateActiveCount() {
  activeCount = todoList.getByDefinedFilter(FILTER_ACTIVE).length
  todoCount.content = `${activeCount} items left`;
}

export const todoCount = new VElement({
  tag: "span",
  attrs: {
    class: "todo-count",
  },
  content: `${activeCount } items left`,
});
