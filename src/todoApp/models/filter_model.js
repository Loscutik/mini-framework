export default class Filter {
  constructor() {
    this.filter = "";
  }
  
  get getCurrent() {
    return this.filter;
  }
  set setCurrent(filter) {
    this.filter = filter;
  }
}

export const filters = new Filter() // turn into reactive object?