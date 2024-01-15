import { VElement } from "./VElement.js";

/**
* @method useEvents - declare list of DOM events you want to use
* @method createElement - create a new virtual element and add it to the Frame as a child
* @method addVElement - add the given virtual element to the Frame as a child
* @method render - render the Frame (corresponding virtual Element) to the DOM Element
* @method mount - mount the Frame (corresponding virtual Element) to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
* @method getState - return (corresponding virtual Element) as object - TODO ? useless?
 */

export class Frame {
    constructor() {
        console.log("Frame");
        this._state = new VElement({ tag: "div", attrs: { id: "app" } });
        this._DOMevents = [];
        //TODO ?  pointless? -  this.dependencies = {}

    }

    use(dependency, dependencyName) { // pointless?
        this.dependencies[dependencyName] = dependency;
    }

   /**
     * Registers a list of DOM events to handle in a frame.
     * This function takes multiple event types and attaches them to the frame's DOM elements.
     * It sets up a listener that stops propagation, prevents default behavior, and emits
     * corresponding events for associated virtual elements.
     *
     * @param {...string} events - A list of DOM event types to handle (e.g., 'click', 'mouseover').
     *
     * Internally, it defines a _DOMeventsListener function which is invoked in the mount method.
     * This listener attaches to each element and handles event propagation and default behaviors.
     * For each triggered event, it finds the corresponding virtual element (identified by a 'vID' attribute)
     * and emits a custom event with a naming convention starting with '@'.
     *
     * Usage:
     *   frame.useEvents('click', 'hover');
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
    }

    /**
     * Creates a virtual element and adds it as a child to the Frame.
     *
     * @param {Object} options - Object containing configuration options for the VElement.
     * @param {string} options.tag - The type of HTML element ('div' for <div>).
     * @param {Object} options.attrs - An object containing element attributes ({ style: { margin: '5px' } }).
     * @param {string} options.content - A string representing the innerHTML of the element, will be added before all its children.
     * @param {VirtualElement[]} options.children - An array of virtual elements to be added as children.
     */
    createElement({ tag = "", attrs = {}, content = "", children = [] }) {
        const vElem = new VElement({ tag, attrs, content, children });
        this._state.addChild(vElem);
    }

    /* Adds a virtual element as a child to the frame. */
    addVElement(vElem) {
        this._state.addChild(vElem);
    }

    /* Renders the initial virtual DOM into a real DOM Element */
    render() {
        return this._state.render().$elem;
    }

    /* Returns the current state of the frame as an object */
    getState() {
        return { ...this._state };
    }

    /**
     * @param {Element} $elem the id of the element in the document to mount the DOM into (usually 'app')
     */
    mount($elem) {
        $elem = this._state.mount($elem).$elem;
        console.log(`frame is mounted to element`, $elem);
        this._DOMeventsListener($elem);
        return $elem;
    }
}