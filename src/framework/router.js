class Router {
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
}

const router = new Router()

export default router