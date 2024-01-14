import { VElement } from "./VElement";
class Frame {
    constructor() {
        this._state = new VElement({ tag: "div", attrs: { id: "app" } });
        this._DOMevents = [];
        //TODO ?  pointless? -  this.dependencies = {}

    }

    use(dependency, dependencyName) { // pointless?
        this.dependencies[dependencyName] = dependency;
    }
    /** list of events fired on the DOM elements that the frame will be able to handle
     * @param {string[]} events - list of events
     * 
      */
    useEvents(events){
        this._DOMevents=events
    }


    /**creates virtual Element as a child of the frame.
     * tag is for the type of element, for example tag='div' === <div>
     *
     * attrs are for attributes, like style: { margin: 5px }
     * content is a string that will be inserted as innerHTML before all its children.
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