import { VElement } from "../../../../../../framework/VElement.js"
import { router } from "../../../../app.js";
import { FILTER_COMPLETED } from "../../../../consts.js";
import { todoList } from "../../../../models/todo_model.js";
import { vTodoList } from "../todo_container_items/todoList.js";

export const filtersSection = new VElement({
  tag: "ul",
  attrs: {
    class: "filters",
  },
  children: [
    new VElement({
      tag: "li",
      children: [
        new VElement({
          tag: "a",
          attrs: {
            class: "selected",
            href: "#/",
          },
          content: "All",
        }),
      ],
    }),
    new VElement({
      tag: "li",
      children: [
        new VElement({
          tag: "a",
          attrs: {
            class: "selected", // set attribute selected when the route is according to the button
            href: "#/active",
          },
          content: "Active",
        }),
      ],
    }),
    new VElement({
      tag: "li",
      children: [
        new VElement({
          tag: "a",
          attrs: {
            class: "selected",
            href: "#/completed",
          },
          content: "Completed",
        }),
      ],
    }),
    new VElement({
      tag: "button",
      attrs: {
        class: "clear-completed",
      },
      content: "Clear completed",
      '@click': (velm) => {
        clearCompletedTodos()
      }
    }),
  ],
});

function clearCompletedTodos() {
  todoList.todos = todoList.todos.filter(
    (todo) => todo.state !== FILTER_COMPLETED
  );
  vTodoList.children = todoList.getByFilter();
}