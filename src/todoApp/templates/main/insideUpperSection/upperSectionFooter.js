import { VElement } from "../../../../../framework/VElement.js"
import { filtersSection } from "./footer_items/filters.js"
import { todoCount } from "./footer_items/todoCount.js";



export const upperSectionFooter = new VElement({
  tag: "footer",
  attrs: { class: "footer" },
  children: [
    todoCount,
    filtersSection,
  ],
});


