import { VElement } from "../../../framework/VElement.js";
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from "../consts.js";
import { updateActiveCount } from "../templates/main/insideUpperSection/footer_items/todoCount.js";
import { vTodoList } from "../templates/main/insideUpperSection/todo_container_items/todoList.js";
import { filters } from "./filter_model.js";

 let completed = false

class TodoElement {
  // modify all of the properties here
  constructor(todo) {
    this.currentState = todo.state;

    this.name = todo.name;
    this.vTodoName = new VElement({
      tag: "label",
      content: this.currName,
    });
    this.vTodo = new VElement({
      tag: "li",
      attrs: { class: this.state, state: this.state }, // class: "todo"
      children: [
        new VElement({
          tag: "div",
          attrs: { class: "view" },
          children: [
            new VElement({
              tag: "input",
              attrs: { type: "checkbox", class: "toggle" },
              "@click": (velem) => {
                completed = !completed
                if (completed) {
                  this.state = FILTER_COMPLETED
                } else {
                  this.state = FILTER_ACTIVE
                }
              },
            }),
            this.vTodoName, // have the name element here separately to be able to edit the name
            new VElement({
              tag: "button",
              attrs: { class: "destroy" },
              "@click": (velem) => {
                vTodoList.delChild(this.vTodo._vId);
                todoList.removeTodo(this.name);
                // function to delete current todo
              },
            }),
          ],
        }),
      ],
    });
  }
  set state(state) {
    
    this.currentState = state;
    this.vTodo.setAttr({ state: state, class: state });
    
  }
  get state() {
    return this.currentState;
  }
  get currName() {
    return this.name;
  }
  set currName(name) {
    this.name = name;
    this.vTodoName = name
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
    this.todos.push(vTodoElem);
    updateActiveCount();
  }
  /**
   * @param {string} todo
   */
  removeTodo(todo) {
    const index = this.todos.map(e => e.name).indexOf(todo);
    this.todos.splice(index, 1);
  }
  modifyTodo(vElem, newTodo) {
    const index = this.todos.map((e) => e.name).indexOf(oldTodo);
    this.todos[index].vTodoName.content = newTodo;
  }
  getByFilter() { // main method for displaying the list of todos
    if (filters.getCurrent == FILTER_ALL) {
      const todos = this.todos.map(obj => obj.vTodo)
      return todos
    } else {
      const result = []
      this.todos.forEach((todo, index) => {
        if (todo.currentState == filters.getCurrent) {
          result.push(this.todos[index].vTodo);
        }
      })
      return result
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
  return vTodo
}