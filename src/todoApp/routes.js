import createRouter from "../framework/router.js";

const routes = [
  {
    path: "/completed",
    callback: function () {
      // maybe have it work with templates instead?
      console.log("displaying completed now"); // modify the state here ig
      // handle completed list
    },
  },
  {
    path: "/active",
    callback: function () {
      console.log("displaying active now"); // modify the state here ig
      // handle active list
    },
  },
  {
    path: "/",
    callback: function () {
      // maybe have it work with templates instead?
      console.log("displaying main page now"); // modify the state here ig
      // handle completed list
    },
  },
];

export const router = createRouter(routes);

