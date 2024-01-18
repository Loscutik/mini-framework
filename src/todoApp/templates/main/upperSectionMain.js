import { VElement } from "../../../../framework/VElement.js";
import { FILTER_ALL } from "../../consts.js";
import { todoList } from "../../models/todo_model.js";
import { mainTodoTextContainer } from "./insideUpperSection/todo_container_items/mainTodoTextContainer.js";
import { todoInput } from "./insideUpperSection/todo_container_items/todoInput.js";
import { upperSectionFooter } from "./insideUpperSection/upperSectionFooter.js";

/* export function updateFooterDisplaycompletedCount() {
  let completedCount = todoList.getByDefinedFilter(FILTER_COMPLETED).length;
  if (completedCount > 0 && !added) {
    added = true;
    filtersSection.addChild(vClearAllCompleted);
  } else if (completedCount <= 0 && added) {
    added = false;
    filtersSection.delChild(vClearAllCompleted._vId);
  }
} */

let added = false;

export function updateFooterActiveCount() {
  const activeCount = todoList.getByDefinedFilter(FILTER_ALL).length;
  if (activeCount > 0 && !added) {
    added = true
    upperSection.addChild(upperSectionFooter); 
  } else if (activeCount == 0 && added) {
    added = false
    upperSection.delChild(upperSectionFooter._vId)
  }
}

export const upperSection = new VElement({
  tag: "section",
  attrs: { class: "todoapp" },
  children: [
    todoInput,
    mainTodoTextContainer,
    // have this conditionally rendered when there is more than 1 todo
  ],
});