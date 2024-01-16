import { VElement } from "../../../../../framework/VElement.js";
import { vTodoList } from "./todo_container_items/todoList.js";
import { filtersSection } from "./todo_container_items/filters.js";
import { todoInput } from "./todo_container_items/todoInput.js";

function clickToggle() {
    console.log("clicking toggle-all");
}

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
                onClick: clickToggle
                },
            }),
            new VElement({
                tag: "label",
                attrs: {
                for: "toggle-all",
                },
                content: "Mark all as complete",
            }),
            vTodoList,
        ],
    }),
    new VElement({
        tag: "footer",
        attrs: { class: "footer" },
        children: [
            new VElement({
                tag: "span",
                attrs: {
                class: "todo-count",
                },
            }),
            filtersSection
        ],
    }),
    ]