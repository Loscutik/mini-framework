import { VElement } from "../../../../../../framework/VElement.js";
import { todoList } from "../../../../models/todo_model.js";

export const vTodoList = new VElement({
  tag: "ul",
  attrs: { id: "todoList", class: "todo-list"},
  content: "",
});

export function addTodo(todo) {
  return new VElement({
    tag: "li",
    attrs: { class: "todo" },
    children: [
      new VElement({
        tag: "div",
        attrs: { class: "view" },
        children: [new VElement({
          tag: "input",
          attrs: {type: "checkbox", class:"toggle"},
          '@click': (velem) => {} // handle the toggle function here
        }), new VElement({
          tag: "label",
          content: todo
        }), new VElement({
          tag:"button",
          attrs: {class: "destroy"}
        })],
      }),
    ],
  });
}