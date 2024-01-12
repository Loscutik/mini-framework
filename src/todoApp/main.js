import { vApp } from "../app.js"
import { vElement } from "../../framework/classes.js"
import { mainPageInnerHTML } from "./templates/mainPage.js"

export function launchPage() {
    const body = document.createElement("div")
    body.innerHTML = mainPageInnerHTML
    const vNewElem = new vElement("div", {}, mainPageInnerHTML)
    vApp.state.addChildNode(vNewElem)
    vApp.mount("app", vApp.state)
}