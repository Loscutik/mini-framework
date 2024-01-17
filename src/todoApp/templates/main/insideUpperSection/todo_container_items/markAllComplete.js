import { VElement } from "../../../../../../framework/VElement.js";
import { FILTER_ACTIVE, FILTER_COMPLETED } from "../../../../consts.js";
import { todoList } from "../../../../models/todo_model.js";

let allFinished = false

export const vMarkAllComplete = new VElement({
                tag: "label",
                attrs: {
                for: "toggle-all",
                },
                content: "Mark all as complete",
                '@click': (velm) =>{
                    allFinished = !allFinished
                    if (allFinished) {
                        todoList.todos.forEach((todo) => {
                          todo.state = FILTER_COMPLETED;
                        });
                    } else {
                        todoList.todos.forEach((todo) => {
                          todo.state = FILTER_ACTIVE;
                        });
                    }
                }
            })