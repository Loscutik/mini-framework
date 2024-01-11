import { ChrisFramework } from "./framework/classes.js"
import { launchPage } from "./todoApp/main.js";
import { router } from "./todoApp/routes.js";

export let vApp = new ChrisFramework()

launchPage();

vApp.use(router, "router")

vApp.mount("app")


// have it listen for events and on an event, compare new dom to old, replace changed elements and replace old app with new app