import { VElement } from "../../../framework/VElement.js";
import { vTodoList } from "../reactive_objects/todoList.js";
import { upperSection } from "./main/upperSectionMain.js";

const mainDiv = new VElement({
  tag: "div",
  children: [
    upperSection,
    new VElement({
      tag: "footer",
      attrs: { class: "info" },
    }),
  ],
});

export {mainDiv}