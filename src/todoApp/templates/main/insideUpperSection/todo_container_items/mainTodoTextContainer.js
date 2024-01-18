import { VElement } from "../../../../../../framework/VElement.js"
import { vMarkAllComplete } from "./markAllComplete.js"
import { vTodoList } from "./todoList.js"

export const mainTodoTextContainer = new VElement({
    // this is where the todo stuff will be made
    tag: "section",
    attrs: { class: "main", id: "todo-container" },
    children: [
      new VElement({
        tag: "input",
        attrs: {
          class: "toggle-all",
          type: "checkbox",
          id: "toggle-all",
        },
      }),
      vMarkAllComplete,
      vTodoList,
    ],
  })