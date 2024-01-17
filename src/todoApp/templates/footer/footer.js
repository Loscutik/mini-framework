import { VElement } from "../../../../framework/VElement.js"

export const footer = new VElement({
  tag: "footer",
  attrs: { class: "info" },
  content: `<p>Double-click to edit a todo</p>
      <p>Created by Hems_Chrisworth, Lauri99, Mustkass, locustik</p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>`,
});