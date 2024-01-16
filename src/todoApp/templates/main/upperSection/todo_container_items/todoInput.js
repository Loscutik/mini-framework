import { VElement } from "../../../../../../framework/VElement.js"


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
        }
        })],
    })