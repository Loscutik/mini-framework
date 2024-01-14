import { diffAttrs, diffChildren } from './functions.js';

export class VElement {
    /**create an element with the tag, attributes and possible children at once
     *
     *
     * 
     * @param {Object} options  
     * @param {string=} options.tag  - ex. 'div', 'span' etc
     * @param {{}=} options.attrs - ex. `{id: 'container'}` , attribute vID is reserved for internal use only (keep id of the corresponding vElement)
     * @param {string= } options.content  - plain text or html
     * @param {VElement[]=} options.children  can add children recursively by making new Elements in the children
     */
    constructor({ tag = "", attrs = {}, content = "", children = [] }) {
        this._vId = crypto.randomUUID();

        const preparedChildren = children.reduce((acc, child) =>{
            acc.push([child._vId, child])
        },[]);
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
                        const preparedChildren = children.reduce((acc, child) =>{
                            acc.push([child._vId, child])
                        },[]);
                        stateObj.children = new Map(preparedChildren);
                        patch = diffChildren(oldChildren, stateObj.children);
                        this.$elem = patch(this.$elem);
                    }


                }
            }
        );
        this.events = new Proxy({},
            {
               set: (target, eventType, callback)=>{
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

    getChild(vId){
        return this.state.children.get(vId);
    }

    render() {
        console.log(`start render: `,this);
        
        if (this.state.tag === undefined || this.state.tag == '') {
            return document.createTextNode(this.state.content);
        }
        
        const $elem = document.createElement(this.state.tag);

        for (const [k, v] of Object.entries(this.state.attrs)) {
            $elem.setAttribute(k, v);
        }

        console.log(`render: content is ${this.state.content}`);
        if (this.state.content !== undefined && this.state.content !== '')  {
            console.log(`render: content is ${this.state.content}`);
            $elem.innerHTML = this.state.content;
        }

        this.state.children.forEach((child) => {$elem.appendChild(child.render().$elem);  console.log(`render: child - `,child);});

        this.$elem = $elem;
        console.log(`render: this is ${this.vId}, this.$elem`,this.$elem);

        this.$elem.setAttribute('vId', this.vId);
        return this;
    }

    mount($elem) {
        console.log(`mounting: this is :${this.state.tag}, ${this.$elem}`, this);
        console.log(`mounting: $elem`, $elem);
        $elem.replaceWith(this.render().$elem);
        console.log(`mounting: this is :${this.state.tag}, ${this.$elem}`, this);
        return this;
    }

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

    delChild(vId){
        this.state.children.delete(vId);
    }

    delAttribute(key){
        this.state.attrs.delete(key);
    }

    on(eventType, callback) { 
        if (!eventType.startsWith("@")) {
            return
        }
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push(callback);
    }

    emit(event){
        this.events[event].forEach((callback) => callback());
    } 


    createEvent(name) {
        //TODO
        this.events[name] = new Event(name);
    }
    listen(name, condition, callback) {
        //TODO
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