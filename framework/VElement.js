import { diffAttrs, diffChildren } from './functions.js';

/** virtualElements that represents DOM elements
 *@class VElements creates virtual Elements that represent DOM elements
 * 
 * @property {string} vId -  uuid of the element (read only)
 * @property {object} state -  objece representing html state
 * @property {string} state.tag -  html tag
 * @property {object} state.attrs -  html attrs
 * @property {string} state.content -  html content
 * @property {Map.<vElement.vId, vElement>} state.children -  Map of virtual Elements children
 * @property {object} events -  object's key is the event name (starting with '@'), value is callback function that will be called when the event is emitted
 * @method render - render the virtual element to the DOM Element
 * @method mount - mount the virtual element to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
 * @method getChild - get child by its vId
 * @method setAttr - add/replace virtual element's attributes 
 * @method delAttribute  - remove attribute with given name
 * @method addClass//TODO
 * @method addChild - add new child to the virtual element
 * @method delChild - remove a child with given vId from the virtual element's children Map
 * @method on - add listener (callback) to an event
 * @method emit - fire an event 
*/
export class VElement {
    /**create an element with the tag, attributes and possible children at once
     *@constructor
     *
     * 
     * @param {Object} options  
     * @param {string=} options.tag  - ex. 'div', 'span' etc
     * @param {{}=} options.attrs - ex. `{id: 'container'}` , attribute vID is reserved for internal use only (keep id of the corresponding vElement)
     * @param {string= } options.content  - plain text or html
     * @param {VElement[]?} options.children  can add children recursively by making new Elements in the children Map
     */
    constructor({ tag = "", attrs = {}, content = "", children = [] }) {
        this._vId = crypto.randomUUID();

        const preparedChildren = children.reduce((acc, child) => {
            acc.push([child._vId, child])
        }, []);
        console.log(`vID: ${this._vId} tag: ${tag}, content: ${content}`)
        this.state = new Proxy(
            {
                tag: tag,
                attrs: attrs,
                content: content,
                children: new Map(preparedChildren),
            },
            {
                get: (stateObj, key) => { return stateObj[key] },
                set: (stateObj, key, value) => {
                    if (value === undefined) { return }

                    if (key === 'tag') {
                        stateObj.tag = value;
                        $oldElm = this.$elem;
                        this.render().mount($oldElm);
                    }

                    if (key === 'content') {
                        stateObj.content = value;
                        this.$elem.innerHTML = value;
                    }
                    // works if we assighn a new object as attrs
                    if (key === 'attrs') {
                        const oldAttrs = stateObj.attrs;
                        stateObj.attrs = value;
                        patch = diffAttrs(oldAttrs, stateObj.attrs);
                        this.$elem = patch(this.$elem)
                    }

                    // works if we assighn a new array as children
                    if (key === 'children') {
                        const oldChildren = stateObj.children;
                        const preparedChildren = children.reduce((acc, child) => {
                            acc.push([child._vId, child])
                        }, []);
                        stateObj.children = new Map(preparedChildren);
                        patch = diffChildren(oldChildren, stateObj.children);
                        this.$elem = patch(this.$elem);
                    }


                }
            }
        );
        this.events = new Proxy({},
            {
                set: (target, eventType, callback) => {
                    if (!eventType.startsWith("@")) {
                        return
                    }
                    if (!target[eventType]) {
                        target[eventType] = [];
                    }
                    target[eventType].push(callback);
                }
            });
    }

    get vId() {
        return this._vId;
    }

    /** get child by its vId
     * 
     * @param {string} vId - VElement.vId
     * @returns 
     */
    getChild(vId) {
        return this.state.children.get(vId);
    }

    /** render the virtual element to the DOM Element
     * 
     * @returns  
     */
    render() {
        console.log(`start render: `, this);

        if (this.state.tag === undefined || this.state.tag == '') {
            return document.createTextNode(this.state.content);
        }

        const $elem = document.createElement(this.state.tag);

        for (const [k, v] of Object.entries(this.state.attrs)) {
            $elem.setAttribute(k, v);
        }

        console.log(`render: content is ${this.state.content}`);
        if (this.state.content !== undefined && this.state.content !== '') {
            console.log(`render: content is ${this.state.content}`);
            $elem.innerHTML = this.state.content;
        }

        this.state.children.forEach((child) => { $elem.appendChild(child.render().$elem); console.log(`render: child - `, child); });

        this.$elem = $elem;
        console.log(`render: this is ${this.vId}, this.$elem`, this.$elem);

        this.$elem.setAttribute('vId', this.vId);
        return this;
    }

    /** mount - mount the virtual element to the given DOM Element (replace the existing DOM Element with rendered virtual Element)
     * 
     * @param {Element} $elem 
     * @returns 
     */

    mount($elem) {
        console.log(`mounting: this is :${this.state.tag}, ${this.$elem}`, this);
        console.log(`mounting: $elem`, $elem);
        $elem.replaceWith(this.render().$elem);
        console.log(`mounting: this is :${this.state.tag}, ${this.$elem}`, this);
        return this;
    }

    /** adds/replaces virtual element's attributes 
     * 
     * @param {Object.<string, string>} attrs - attributes of the element
     * @returns 
     */
    setAttr(attrs = {}) {
        Object.assign(this.state.attrs, attrs)
        if (this.$elem) {
            for (const [k, v] of Object.entries(attrs)) {
                this.$elem.setAttribute(k, v);
            }
        }
        return this;
    }

    //TODO
    addClass(className) {
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

        if (vNode instanceof VElement) {
            this.state.children.set(vNode._vId, vNode);
            if (this.$elem) {
                const $node = vNode.render()
                this.$elem.appendChild($node);
            }
        }

        return this
    }

    /** removes a child with given vId from the virtual element's children Map
     * 
     * @param {string} vId - VElement.vId
     * @returns 
     */
    delChild(vId) {
        this.state.children.delete(vId);
        return this;
    }

    /** remove attribute with given name
     * 
     * @param {string} key - name of the attribute
     * @returns
     */
    delAttribute(key) {
        this.state.attrs.delete(key);
        return this;
    }

    /** adds listener (callback) to an event
     * 
     * @param {string} eventType 
     * @param {function} callback 
     * @returns 
     */
    on(eventType, callback) {
        if (!eventType.startsWith("@")) {
            return this;
        }
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push(callback);
        return this;
    }

    /** fire an event 
     * 
     * @param {string} eventType 
     * @returns 
     */
    emit(eventType) {
        this.events[eventType].forEach((callback) => callback());
        return this;
    }
}