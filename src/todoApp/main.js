import { vApp } from "../app.js"
import { VElement } from "../../framework/VElement.js"
import { mainPageInnerHTML } from "./templates/mainPage.js"

export function launchPage() {
    const body = document.createElement("div")
    body.innerHTML = mainPageInnerHTML
    const vNewElem = new VElement("div", {}, mainPageInnerHTML)
    vApp.state.addChildNode(vNewElem)
    vApp.mount("app", vApp.state)
}