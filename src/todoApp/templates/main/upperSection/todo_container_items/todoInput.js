import { VElement } from "../../../../../../framework/VElement.js"
import { parseKeyInput } from "../../../helpers/keyEventHandler.js"
import { addTodo, vTodoList } from "./todoList.js"


let input = ""
// add the input to vTodoList

function updateValue(velm, event) {
    if (event.key == "Enter") {
        vTodoList.addChild(addTodo(input))
        input = ""
    } else {
        input = parseKeyInput(event.key, input);
    }
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
        value: "",
    },
    '@keydown': (velm, event) => {
        // change value of input
        updateValue(velm, event)
    }
    })],
})