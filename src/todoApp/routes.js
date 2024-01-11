import createRouter from "../framework/router.js";

const routes = [
  {
    route: "completed",
    callback: function () {
      // handle completed list
    },
  },
  {
    route: "active",
    callback: function () {
      // handle active list
    },
  },
];

export const router = createRouter(routes);

