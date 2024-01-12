import createRouter from "../../framework/router.js";
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from "./consts.js";
import { filters } from "./models/filter_model.js";

const routes = [
  {
    path: "/completed",
    callback: function () {
      filters.current = FILTER_COMPLETED
      
      // maybe have it work with templates instead?
      console.log("displaying completed now"); // modify the state here ig
      // handle completed list
    },
  },
  {
    path: "/active",
    callback: function () {

      filters.current = FILTER_ACTIVE
      console.log("displaying active now"); // modify the state here ig
      // handle active list
    },
  },
  {
    path: "/",
    callback: function () {
      filters.current = FILTER_ALL
      // maybe have it work with templates instead?
      console.log("displaying main page now"); // modify the state here ig
      // handle completed list
    },
  },
];

export const router = createRouter(routes);

