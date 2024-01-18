import { VElement } from "../../../../../../framework/VElement.js"
import { todoList } from "../../../../models/todo_model.js"
import { vTodoList } from "./todoList.js"


let input = ""
// add the input to vTodoList
function updateValue(velm, event) {
    input = event.target.value
    if (event.key == "Enter" && input != "") {
        submitTodo(input)
        input = "";
        velm.setAttr({ value: input });
        event.target.value = ""
    }
    //velm.setAttr({ value: input });
}

function submitTodo(input) {
    todoList.newTodo(input);
    vTodoList.children = todoList.getByFilter();
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