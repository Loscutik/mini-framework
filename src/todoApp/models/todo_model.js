import { VElement } from "../../../framework/VElement.js";
import { FILTER_ALL } from "../consts.js";
import { vTodoList } from "../templates/main/upperSection/todo_container_items/todoList.js";
import { filters } from "./filter_model.js";



class TodoElement {
  constructor(todo) {
    this.vTodo = new VElement({
      tag: "li",
      attrs: { class: "todo", state: todo.state },
      children: [
        new VElement({
          tag: "div",
          attrs: { class: "view" },
          children: [
            new VElement({
              tag: "input",
              attrs: { type: "checkbox", class: "toggle" },
              "@click": (velem) => {}, // handle the toggle/select function here
            }),
            new VElement({
              tag: "label",
              content: todo.name,
            }),
            new VElement({
              tag: "button",
              attrs: { class: "destroy" },
              '@click': (velem) => {
                vTodoList.delChild(this.vTodo._vId);
                // function to delete current todo
              }
            }),
          ],
        }),
      ],
    });
  }
}


class TodoList {
  // the todos should be objects with properties

  todos = []; // TODO: render this in the virtual DOM somehow
  /**
   * @param {string} todo
   */
  newTodo(todo) {
    const todoWithState = {
      name: todo,
      state: "active"
    }
    const vTodoElem = new TodoElement(todoWithState)
    this.todos.push(vTodoElem.vTodo);
  }
  /**
   * @param {string} todo
   */
  removeTodo(todo) {
    const index = this.todos.map(e => e.name).indexOf(todo);
    this.todos.splice(index, 1);
  }
  modifyTodo(oldTodo, newTodo) {
    const index = this.todos.map((e) => e.name).indexOf(oldTodo);
    this.todos[index].name = newTodo;
  }
  setState(state, todo) {
    const index = this.todos.map((e) => e.name).indexOf(todo);
    this.todos[index].state = state;
  }
  getByFilter() { // main method for displaying the list of todos
    if (filters.getCurrent == FILTER_ALL) {
      return this.todos
    } else {
      const result = this.todos.filter((todo) => todo.state == filters.getCurrent);
      return result;
    }
  }
}


export const todoList = new TodoList();


export function createNewTodo(todo) {
  const todoWithState = {
    name: todo,
    state: "active",
  };
  
  const vTodo = new TodoElement(todoWithState)
  return vTodo.vTodo
}