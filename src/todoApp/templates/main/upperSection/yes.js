import { VElement } from "../../../../../framework/VElement.js";
import { vTodoList } from "../../../reactive_objects/todoList.js";
import { filtersSection } from "./filters.js";
import { todoInput } from "./todoInput.js";


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
                onClick: function() {
                        return console.log("clickijng jees");
                    },
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