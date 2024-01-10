export class ChrisFramework {
  constructor() {
    this.state = this.new();
  }
  /** tag is for the type of element, for example tag='div' === <div>
   *
   * attrs are for attributes, like style: { margin: 5px }
   *
   * uu
   */
  createElement(tag, attrs, children) {
    //
    return new Element(tag, attrs, children);
  }
  on(event, callback) {}

  //#Abstracting the DOM Routing System

  new() {
    return new Element("div", { id: "app" }, [
      new Element("span", { id: "hithear" }),
    ]);
  }
  /**renders the virtual DOM into the actual DOM
   */
  render() {
    const elem = document.createElement(this.state.tag);
    for (const [key, val] of Object.entries(this.state.attrs)) {
      elem.setAttribute(key, val);
    }
    for (const child of this.state.children) {
      const $child = this.renderNode(child);
      elem.appendChild($child);
    }
    return elem;
  }
  /**
   *
   * @param {Element} node
   */
  renderNode(node) {
    const elem = document.createElement(node.tag);
    for (const [key, val] of Object.entries(node.attrs)) {
      elem.setAttribute(key, val);
    }
    for (const child of node.children) {
      const $child = this.renderNode(child);
      elem.appendChild($child);
    }
    return elem;
  }

  /** queries is a string of any type of query after the path, such as 'q=URLUtils.searchParams&topic=api'
   *
   * can also pass as an object:  {q: 'URLUtils.searchParams', topic: 'api'}
   *
   * @param {string|object=} queries
   * @param {string} path
   */
  
  getState() {
    const elem = document.getElementsByTagName("body")[0];
    return elem;
  }
  /**
   *
   * @param {Element} DOMElement  the mountable DOM object
   * @param {string} targetString the id of the element in the document to mount the DOM into (usually 'app')
   */
  mount(DOMElement, targetString) {
    const target = document.getElementById(targetString);
    target.replaceWith(DOMElement);
  }

  //#State Management
  /* compares the current DOM virtual state with the actual state
   */

  //#Event Handling
}

class Element {
  /**create an element with the tag, attributes and possible children at once
   *
   *
   *
   * @param {string} tag ex. 'div', 'span' etc
   * @param {{}=} attrs ex. {id='container'}
   * @param {[Element]=} children  can add children recursively by making new Elements in the children
   */
  constructor(tag, attrs, children) {
    this.tag = tag;
    this.attrs = attrs ? attrs : {}; // if not defined, will return empty obj
    this.children = children ? children : []; // if not defined, will return empty arr
    this.event;
  }
  addChildNode(node) {
    this.children.push(node);
  }
  createEvent(name) {
    return new Event(name);
  }
  listen(name, condition, callback) {
    let previousValue = condition(null);
    this.addEventListener(name, (e) => {
      const currentValue = condition(e);
      if (previousValue !== currentValue) {
        previousValue = currentValue;
        callback(e);
      }
    });
  }
}

// add router functionality with window.pushState()

