import { VElement } from "./VElement.js";

/** creates virtual Application instance
* 
* @method useEvents - declare list of DOM events you want to use
* @method createElement - create a new virtual element and add it to the Frame as a child
* @method addVElement - add the given virtual element to the Frame as a child
* @method render - render the Frame (corresponding virtual Element) to the DOM Element
* @method mount - mount the Frame (corresponding virtual Element) to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
* @method getState - return (corresponding virtual Element) as object - TODO ? useless?
* @protected @property _state - the virtual Element representing the Frame
*
*
 */
export class Frame {
    constructor() {
        console.log("Frame");
        /**@protected*/ this._state = new VElement({ tag: "div", attrs: { id: "app" } });
        this._DOMevents = [];
        //TODO ?  pointless? -  this.dependencies = {}

    }

    use(dependency, dependencyName) { // pointless?
        this.dependencies[dependencyName] = dependency;
    }
    /** declares list of events fired on the DOM elements that the frame will be able to handle
     * @param {string} events - list of events
     * @returns
      */
    useEvents(...events) {
        this._DOMevents = events;

        this._DOMeventsListener = ($elem) => { // this func is called in the mount method
            this._DOMevents.forEach((DOMevent) => {
                $elem.addEventListener(DOMevent, ($event) => { // native listener will stop propagation and default behavior, and emit the corresponding event for the corresponding virtual Element
                    $event.stopPropagation();
                    $event.preventDefault();
                    vElemUuid = $event.target.getAttribute('vID');
                    this._state.getChild(vElemUuid)?.emit(`@${DOMevent}`); // suppose all event in virtual elements have names started with @
                });

            }
            );
        }

        return this
    }

    /** creates virtual Element as a child of the frame.
     * 
     * @param {object} param0 - object representing virtual Element
     * @returns 
     */
    createElement({ tag = "", attrs = {}, content = "", children = [] }) {
        const vElem = new VElement({ tag, attrs, content, children });
        this._state.addChild(vElem);

        return this;
    }

    /** addes given virtual Element as a child to the frame.
     * 
     * @param {VElement} vElem - virtual Element
     * @returns 
     */
    addVElement(vElem) {
        this._state.addChild(vElem);
     
        return this;
    }

    /**renders the initial virtual DOM into an actual DOM Element
     * 
     * @returns {Element}
     */
    render() {
        return this._state.render().$elem; //TODO return this instead and create a property $elem
    }


    /**return (corresponding virtual Element) as object - TODO ? useless?
     * 
     * @returns 
     */
    getState() {
        return { ...this._state };
    }
    /** mount the Frame (corresponding virtual Element) to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
     *
     * @param {Element} $elem the id of the element in the document to mount the DOM into (usually 'app')
     * @returns
     */
    mount($elem) {
        $elem = this._state.mount($elem).$elem;
        console.log(`frame is mounted to element`, $elem);
        this._DOMeventsListener($elem);
        return $elem;
    }
}