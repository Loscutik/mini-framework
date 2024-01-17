import { VElement } from "../../../framework/VElement.js";
import { footer } from "./footer/footer.js";
import { upperSection } from "./main/upperSectionMain.js";

const mainDiv = new VElement({
  tag: "div",
  children: [upperSection, footer],
  
});

export {mainDiv}