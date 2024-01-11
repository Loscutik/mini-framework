import { ChrisFramework } from "./framework/classes.js"
import router from "./framework/router.js";
import { launchPage } from "./todoApp/main.js";

export let vApp = new ChrisFramework()


//launchPage();

vApp.use(router, "router")

vApp.mount("app")


console.log(vApp.dependencies)



// have it listen for events and on an event, compare new dom to old, replace changed elements and replace old app with new app