import { FILTER_ALL } from "../consts";
import { filters } from "./filter_model";

export default class TodoList {
  // the todos should be objects with properties
  todos = []; // TODO: render this in the virtual DOM somehow
  /**
   * @param {string} todo
   */
  set newTodo(todo) {
    const todoWithState = {
      name: todo,
      state: "active"
    }
    this.todos.push(todoWithState);
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


const todoList = new TodoList();