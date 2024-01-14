import { VElement } from "./VElement";
class Frame {
    constructor() {
        this._state = new VElement({ tag: "div", attrs: { id: "app" } });
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
    createElement({ tag = "", attrs = {}, content = "", children = [] }) {
        vElem = new VElement({ tag, attrs, content, children });
        this._state.addChild(vElem);
        
    }

    


    /**renders the initial virtual DOM into an actual DOM Element
     */
    render() {
        return this._state.render().$elem;
    }

    getState() {
        return { ...this._state };
    }
    /**
     *
     * @param {Element} $elem the id of the element in the document to mount the DOM into (usually 'app')
     */
    mount($elem) {
        return this._state.mount($elem).$elem
    }
}