import { VElement } from "../../../../../framework/VElement.js";
import { vTodoList } from "./todo_container_items/todoList.js";
import { filtersSection } from "./todo_container_items/filters.js";
import { todoInput } from "./todo_container_items/todoInput.js";
import { todoList } from "../../../models/todo_model.js";
import { FILTER_ACTIVE, FILTER_COMPLETED } from "../../../consts.js";
import { vMarkAllComplete } from "./todo_container_items/markAllComplete.js";

let allFinished = false

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