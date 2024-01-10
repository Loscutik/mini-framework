import { ChrisFramework } from "./framework/classes.js"
import { launchPage } from "./todoApp/main.js";

export let vApp = new ChrisFramework()

vApp.mount("app")

launchPage()

// have it listen for events and on an event, compare new dom to old, replace changed elements and replace old app with new app