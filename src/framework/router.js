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
   * @param {[{route: string, callback: function}]} routes 
   */
  addRoutes(routes) {
    for (const route in routes) {
      console.log(route)
      this.addRoute(route.route, route.callback)
    }
  }
}

const router = new Router()

export default router