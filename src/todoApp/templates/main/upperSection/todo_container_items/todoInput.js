import { VElement } from "../../../../../../framework/VElement.js"
import { createNewTodo, todoList } from "../../../../models/todo_model.js"
import { vTodoList } from "./todoList.js"


let input = ""
// add the input to vTodoList
function updateValue(velm, event) {
    input = event.target.value
    console.log(event.target.value);
    if (event.key == "Enter" && input != "") {
        todoList.newTodo(input)
        /* const newTodo = createNewTodo(input)
        let count = 0
        vTodoList.addChild(newTodo) */
        vTodoList.children = todoList.todos
        input = ""
    }
    console.log(vTodoList.state.children.size);
    velm.setAttr({ value: input });
}

export const todoInput = new VElement({
    tag: "header",
    attrs: { class: "header" },
    children: [new VElement({
    tag: "h1",
    content: "todos"
    }), 
    new VElement({
    tag: "input",
    attrs: {
        class: "new-todo",
        placeholder:"What needs to be done?",
        value: input
    },
    '@keydown': (velm, event) => {
        updateValue(velm, event)
    }
    })],
})