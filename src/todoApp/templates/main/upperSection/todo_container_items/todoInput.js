import { VElement } from "../../../../../../framework/VElement.js"



let yes = ""

function updateValue() {
    todoInput.children[1].attrs.value = "yeeee"
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
            value: "y",
            onClick: updateValue
        }
        })],
    })