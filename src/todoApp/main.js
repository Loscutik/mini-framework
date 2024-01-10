import { appInnerHTML } from "./consts.js"

export function launchPage() {
    const body = document.createElement("div")
    body.innerHTML = appInnerHTML
}