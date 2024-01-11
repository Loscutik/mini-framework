import { vApp } from "../app.js"
import { vElement } from "../../framework/classes.js"
import { appInnerHTML } from "./consts.js"

export function launchPage() {
    const body = document.createElement("div")
    body.innerHTML = appInnerHTML
    const vNewElem = new vElement("div", {}, appInnerHTML)
    vApp.state.addChildNode(vNewElem)
    vApp.mount("app", vApp.state)
}