import { VElement } from "../../../../framework/VElement.js";
import { insideUpperSection } from "./upperSection/todoListContainer.js";





export const upperSection = new VElement({
    tag: "section",
    attrs: { class: "todoapp" },
    children: insideUpperSection
})