import { ChrisFramework } from "./framework/classes.js"
import { launchPage } from "./todoApp/main.js";

export const vApp = new ChrisFramework()

//vApp.use(router) // creater a router function

const app = vApp.render();

vApp.mount(app, "app")

launchPage()