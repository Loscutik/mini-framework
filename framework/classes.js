export class ChrisFramework {
  constructor() {
    this.state = this.new();
    this.dependencies = {}
  }
  use(dependency, dependencyName) { // pointless?
    this.dependencies[dependencyName] = dependency;
  }
  

  /** tag is for the type of element, for example tag='div' === <div>
   *
   * attrs are for attributes, like style: { margin: 5px }
   *
   * uu
   */
  createElement(tag, attrs, children) {
    //
    return new vElement(tag, attrs, children);
  }
  on(event, callback) {}

  

  new() {
    return new vElement("div", { id: "app" }, []);
  }
  /**renders the initial virtual DOM into an actual DOM Element
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
  /** takes a virtual DOM element along with it's attributes and children/innerHTML and converts it to a HTMLElement
   *
   * @param {vElement} node
   */
  renderNode(node) {
    const elem = document.createElement(node.tag);
      for (const [key, val] of Object.entries(node.attrs)) {
        elem.setAttribute(key, val);
      }
      if (typeof node.children == "string") { // if the child is innerHTML text
        elem.innerHTML = node.children
      } else {
        for (const child of node.children) {
          const $child = this.renderNode(child);
          elem.appendChild($child);
        }
      }
    
    return elem;
  }

  getState() {
    return { ...this.state };
  }
  /**
   *
   * @param {vElement} vDOMElement  the mountable DOM object
   * @param {string} targetString the id of the element in the document to mount the DOM into (usually 'app')
   */
  mount(targetString, vDOMElement) {
    let app
    if (!vDOMElement) {
      app = this.render();
    } else {
      app = this.renderNode(vDOMElement);
    }
    
    const target = document.getElementById(targetString);
    target.replaceWith(app);
  }

  //#State Management
  /* compares the current DOM virtual state with the actual state
   */

  //#Event Handling
}



// add router functionality with window.pushState()

