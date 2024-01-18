
import { diffAttrs, diffChildren, updateReactives } from './functions.js';
import { throttleFunction } from './helpers.js';

/** virtualElements that represents DOM elements
 *@class VElements creates virtual Elements that represent DOM elements
 * 
 * @property {string} vId -  uuid of the element (read only), this vId is set as an argument vid for the corresponding real DOM Element
 * @property {object} state -  objece representing html state
 * @property {string} state.tag -  html tag
 * @property {object} state.attrs -  html attrs
 * @property {string} state.content -  html content
 * @property {Map.<vElement.vId, vElement>} state.children -  Map of virtual Elements children
 * @property {object} events -  (read only) object's key is the event name (starting with '@'), value is callback function that will be called when the event is emitted
 * @method render - render the virtual element to the DOM Element
 * @method mount - mount the virtual element to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
 * @method getChild - get child recursively by its vId
 * @method setAttr - add/replace(with the same names) virtual element's attributes 
 * @method delAttr  - remove attribute with given name
 * @method addClass - adds className to the class attribute of this vElement
 * @method addChild - add new child to the virtual element
 * @method delChild - remove a child with given vId from the virtual element's children Map
 * @method on - add listener (callback) to an event
 * @method emit - fire an event 
*/
export class VElement {
    /**create an element with the tag, attributes,  possible children, and events at once.
     * 
     * If the argument is string it will create virtual Element representing pure string , 
     * to change this string use vElem.content="new string", any other changes will be ignored.
     * If the argument is an object, next properties will beare allowd (any others will be ignored):
     *   tag - the tag name
     *   attrs - the attributes
     *   children - array of VElements
     *   content - the text to be inserted into the DOM Element
     *   parameters with name starting with `@` and  a function as the value - those will be considered as events, their values as handlers, 
     *   for example '@click': (velm) => { velm.setAttr({ style: "color: green;" })}
     * Events 'name (if there is any) must start with `@` 
     *@constructor
     *
     * 
     * @param {object|string}  [vElemObj={ tag: "div", attrs: {}, content: "", children: [] }] - object representing the element, defaul is { tag: "div", attrs: {}, content: "", children: [] } 
     * @param {string} [vElem.tag='div']  - ex. 'div', 'span' etc, default value is 'div'
     * @param {{}=} vElem.attrs - ex. `{id: 'container'}` , attribute vID is reserved for internal use only (keep id of the corresponding vElement)
     * @param {string= } vElem.content  - plain text or html
     * @param {VElement[]|undefined} vElem.children  can add children recursively by making new Elements in the children Map
     */
    constructor(vElemObj = { tag: "div", attrs: {}, content: "", children: [] }) {
        this._vId = crypto.randomUUID();

        // for non string elements attributes and children are not null to prevent checking them in all methods and functions 
        if (typeof vElemObj === "object") {
            if (vElemObj.attrs == null) {
                vElemObj.attrs = {};
            }
            if (vElemObj.children == null) {
                vElemObj.children = {};
            }
        }

        if (typeof vElemObj === "string") {
            vElemObj = { tag: undefined, attrs: undefined, content: vElemObj, children: undefined }
        }


        const preparedChildren = prepareChildren(vElemObj.children)

        this.state = new Proxy(
            {
                tag: vElemObj.tag,
                attrs: vElemObj.attrs,
                content: vElemObj.content, // need this to keep string vElement, becaose can't create Proxy of string
                children: preparedChildren ? new Map(preparedChildren) : undefined,
            },
            {
                get: (stateObj, key) => {
                    throttleFunction(updateReactives(), 1000)
                    
                    return stateObj[key]
                },
                /** allows to set properties tag, arggs, content, children. Any other will be ignored. value for children property is VElement[], which will be converted to Map
                 * 
                 */
                set: (stateObj, key, value) => {
                    if (value === undefined ||
                        value === null ||
                        key === undefined ||
                        key === null) {
                        return
                    }

                    if (key === 'tag') {
                        
                        stateObj.tag = value;
                        if (this.$elem instanceof Element) {
                            const $oldElm = this.$elem //neeed to keep the old $elem because after render (in the next row) it will be renewed
                            this.render().mount($oldElm); // this is VElement, stateObj is this.state (keep forgotting)
                        }
                    }

                    if (key === 'content') {
                        stateObj.content = value;
                        if (this.$elem instanceof Element) {
                            this.$elem.innerHTML = value;
                        } else if (this.$elem instanceof Text) {
                            stateObj.tag = ''; // just in case 
                            const $oldElm = this.$elem
                            this.render().mount($oldElm);
                        }
                    }
                    // works if we assighn a new object as attrs
                    if (key === 'attrs') {
                        const oldAttrs = stateObj.attrs;
                        stateObj.attrs = value;
                        if (this.$elem instanceof Element) {
                            const patch = diffAttrs(oldAttrs, stateObj.attrs);
                            this.$elem = patch(this.$elem)
                        }
                    }

                    // works if we assign a Map or undefined as children
                    if (key === 'children') {
                        
                        const oldChildren = stateObj.children;
                        if (value == null || (value instanceof Map && stateObj.tag)) {
                            stateObj.children = value;
                            if (this.$elem instanceof Element) {
                                const patch = diffChildren(oldChildren, stateObj.children);
                                this.$elem = patch(this.$elem);
                            }
                        }

                    }
                    
                    return stateObj[key]
                },
            }
        );

        this._events = new Proxy({},
            {
                set: (target, eventType, callback) => {
                    if (!eventType.startsWith("@") || !(typeof callback === 'function')) {
                        throw new Error("events set error: wrong event type: " + eventType)
                    }
                    if (!target[eventType]) {
                        target[eventType] = [];
                    }
                    target[eventType].push(callback);

                    return target[eventType];
                },
            });

        for (const prop in vElemObj) {
            if (prop.startsWith('@')) {
                try {
                    this._events[prop] = vElemObj[prop];
                } catch (e) {
                    console.error("cant add listener for event " + prop + ", err " + e)
                }
            }
        }
    }

    get vId() {
        return this._vId;
    }

    get tag() {
        return this.state.tag;
    }
    get attrs() {
        return this.state.attrs;
    }
    get content() {
        return this.state.content;
    }
    get children() {
        if (this.state.children == null) return this.state.children;
        return this.state.children.values(); // remember the children property is Map
    }
    get events() {
        return Object.entries(this._events)
    }

    set tag(value) {
        return this.state.tag = value;
    }
    set attrs(value) {
        return this.state.attrs = value;
    }
    set content(value) {
        return this.state.content = value;
    }
    set children(value) {
        switch (true) {
            case value instanceof Array:
                const preparedChildren = prepareChildren(value)
                this.state.children = new Map(preparedChildren);
                break;
            case value instanceof Map:
                this.state.children = value;
                break;
            default:
                console.error("can't assign the children property other than Array or Map");
                break;
        }

        return this.state.children;
    }
    /**
     * 
     * @param {VElement} newVElem 
     */
    replaceElement(newVElem) {
        this.$elem = newVElem
    }

    /** get child by its vId
     * 
     * @param {string} vId - VElement.vId
     * @returns 
     */
    getChild(vId) {
        const children = this.state.children
        let searchChild
        if (children) {
            searchChild = children.get(vId);
            if (!searchChild) {
                for (const [key, child] of children) {
                    searchChild = child.getChild(vId);
                    if (searchChild) return searchChild
                }
            }
        }
        return searchChild;
    }

    /** render the virtual element to the DOM Element
     * 
     * @returns  
     */
    render() {
        //console.log(`start render: `, this);
        if (this.state.tag == null || this.state.tag == '') {
            const $elem = document.createTextNode(this.state.content);
            this.$elem = $elem;
            return this;
        }

        const $elem = document.createElement(this.state.tag);
        this.$elem = $elem;

        for (const [k, v] of Object.entries(this.state.attrs)) {
            $elem.setAttribute(k, v);
        }

        if (this.state.content !== undefined && this.state.content !== '') {
            $elem.innerHTML = this.state.content;
        }

        if (this.state.children) {
          this.state.children.forEach((child) => {
            $elem.appendChild(child.render().$elem);
          }); 
        }

        this.$elem.setAttribute('vId', this.vId);
        return this;
    }

    /** mount - mount the virtual element to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
     * 
     * @param {Element} $elem 
     * @returns 
     */

    mount($elem) {
        $elem.replaceWith(this.render().$elem);
        return this;
    }

    /** adds/replaces(with the same names) virtual element's attributes 
     * 
     * @param {object.<string, string>} attrs - attributes of the element
     * @returns 
     */
    setAttr(attrs = {}) {
        if (this.state.tag) {
            Object.assign(this.state.attrs, attrs)
            if (this.$elem instanceof Element) {
                for (const [k, v] of Object.entries(attrs)) {
                    this.$elem.setAttribute(k, v);
                }
            }
        }
        return this;
    }

    /** a   
     * 
     * @param {string} className 
     * @returns 
     */
    addClass(className) {
        if (this.state.attrs.class) {
            this.state.attrs.class += ` ${className}`;
        } else {
            this.state.attrs.class = className;
        }
        return this;
    }

    /** adds a virtual element as a child  of this virtual element.
     * If this element is mounted, it will render the virtual child and mount as a child of real DOM element
     * 
     * @param {VElement|string} vNode - new virtual element
     * @returns 
    */
    addChild(vNode) {
        if (typeof vNode === 'string') {
            vNode = new VElement({ content: vNode })
        }

        // checks for null and undefined
        if (this.state.children == null) {
            this.state.children = new Map();
        }

        if (vNode instanceof VElement) {
            this.state.children.set(vNode.vId, vNode);
            if (this.$elem instanceof Element) {
                const $node = vNode.render().$elem
                this.$elem.appendChild($node);
            }
        }

        return this
    }

    /** creates virtual Element as a child of this vElement.
     * 
     * @param {object} obj - object representing virtual Element, default is empty div element (like <div></div>)
     * @returns 
     */
    createElement(obj = { tag: "div", attrs: {}, content: "", children: [] }) {
        const vElem = new VElement(obj);
        this.addChild(vElem);

        return this;
    }

    /** removes a child with given vId from the virtual element's children Map
     * 
     * @param {string} vId  - VElement.vId
     * @returns 
     */
    delChild(vId) {
        const oldElm = this.getChild(vId);
        this.state.children.delete(vId);
        if (oldElm.$elem instanceof Element) {
            oldElm.$elem.remove();
        }


        return this;
    }

    /** remove attribute with given name
     * 
     * @param {string} key - name of the attribute
     * @returns
     */
    delAttr(key) {
        this.state.attrs.delete(key);
        if (this.$elem){
            this.$elem.removeAttribute(key);
        }
        return this;
    }

    /** adds listener (callback) to an event
     * 
     * @param {string} eventType 
     * @param {function} callback 
     * @returns 
     */
    on(eventType, callback) {
        // _events' setter do all checking and setting 
        try {
            this._events[eventType] = callback;
        } catch (e) {
            console.error("cant add listener for event " + eventType + ", err " + e)
        }
        return this;
    }

    /** fire an event 
     * 
     * @param {string} eventType 
     * @returns 
     */
    emit(eventType, $event) {
        this._events[eventType]?.forEach((callback) => callback(this, $event));
        return this;
    }
}

/** helper - creates the array from which Map of children will be created 
 * 
 * @param {VElement[]=} children - list of virtual elements
 * @returns {Array.<string,VElement>| undefined} 
 */
function prepareChildren(children) {
    let preparedChildren = undefined;
    if (isIterable(children)) {
        preparedChildren = [];
        for (const child of children) {
            if (child instanceof VElement) {
                preparedChildren.push([child.vId, child]);
            } else {
                const newElm = new VElement(child);
                preparedChildren.push([newElm.vId, newElm]);
            }
        }
    }
    return preparedChildren;
}

/** helper - returns true if the obj is iterable
 * 
 * @param {*} obj 
 * @returns 
 */
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}