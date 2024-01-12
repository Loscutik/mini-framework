export default class TodoList {
  // the todos should be a simple array of strings
  todos = [];
  /**
   * @param {string} todo
   */
  set newTodo(todo) {
    this.todos.push(todo);
  }
  /**
   * @param {string} todo
   */
  removeTodo(todo) {
    const i = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
  modifyTodo(oldTodo, newTodo) {
    const i = this.todos.indexOf(oldTodo);
    this.todos[i] = newTodo
  }
}