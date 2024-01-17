import { VElement } from "../../../../../framework/VElement.js";
import { vTodoList } from "./todo_container_items/todoList.js";
import { todoInput } from "./todo_container_items/todoInput.js";
import { vMarkAllComplete } from "./todo_container_items/markAllComplete.js";
import { upperSectionFooter } from "./upperSectionFooter.js";


export const insideUpperSection = [
    todoInput,
    new VElement({
        // this is where the todo stuff will be made
        tag: "section",
        attrs: { class: "main", id: "todo-container" },
        children: [
            new VElement({
                tag: "input",
                attrs: {
                class: "toggle-all",
                type: "checkbox",
                id: "toggle-all",
                },
            }),
            vMarkAllComplete,
            vTodoList,
        ],
    }),
    // have this conditionally rendered when there is more than 1 todo
    upperSectionFooter
]