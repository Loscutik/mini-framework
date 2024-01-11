class Router {
  constructor() {
    this.routes = {};
  }

  //#Abstracting the DOM Routing System

  routeTo(path, queries) {
    const params = "";
    if (queries != undefined) {
      params += "/";
      if (typeof queries == "object") {
        for (const [key, val] of Object.entries(queries)) {
          params += `${key}=${val}&`;
        }
      } else if (typeof queries == "string") {
        params += queries;
      }
    }
    window.history.pushState({}, "", `/${path}${params}`);
    //window.location.href = `/${path}${params}`;
  }

  addRoute(route, callback) {
    this.routes[route] = callback;
  }
  /**
   *
   * @param {[{path: string, callback: function}]} routes
   */
  addRoutes(routes) {
    for (const route of routes) {
      this.addRoute(route.path, route.callback);
    }
  }
  // Give the correspondent route (template) or fail
  resolveRoute = (route) => {
    try {
      return this.routes[route];
    } catch (error) {
      return new Error("The route is not defined");
    }
  };
  router = (event) => {
    const url = window.location.hash.slice(1) || "/";

    const routeResolved = this.resolveRoute(url);
    if (routeResolved) {
      routeResolved();
    } else {
      alert("Route not defined!")
    }
  };
}

/**
   * 
   * @param {[{path: string, callback: function}]} routes 
   */
function createRouter(routes) {
  const router = new Router()
  
  window.addEventListener("load", router.router);
  window.addEventListener("hashchange", router.router);

  router.addRoutes(routes)
  return router
}


export default createRouter




// materials to work through
