import { VElement } from "../../../../../../framework/VElement.js";
import { TodoElement, todoList } from "../../../../models/todo_model.js";
import { vTodoList } from "./todoList.js";


/**
 * 
 * @param {string} oldTodo 
 * @param {TodoElement} todoElementClass 
 * @returns 
 */
export function createModifyTodoBox(oldTodo, todoElementClass) {
    const vModifyTodoBox = new VElement({
      tag: "input",
      attrs: { value: oldTodo, class: "edit" },
      "@keydown": (velem, event) => {
        if (event.key == "Enter") {
            todoElementClass.state = "active"
            todoElementClass.currName = event.target.value;
            console.log(todoElementClass.currName)
            vTodoList.delChild(vModifyTodoBox._vId)
        }
      },
    });
    return vModifyTodoBox
}

