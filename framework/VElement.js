import { diffAttrs, diffChildren } from './functions.js';

export class VElement {
    /**create an element with the tag, attributes and possible children at once
     *
     *
     * 
     * @param {Object} options  
     * @param {string=} options.tag  - ex. 'div', 'span' etc
     * @param {{}=} options.attrs - ex. `{id: 'container'}`
     * @param {string= } options.content  - plain text or html
     * @param {VElement[]=} options.children  can add children recursively by making new Elements in the children
     */
    constructor({ tag = "", attrs = {}, content = "", children = [] }) {
        this.state = new Proxy(
            {
                tag: tag,
                attrs: attrs,
                content: content,
                children: children,
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
                        stateObj.children = value;
                        patch = diffChildren(oldChildren, stateObj.children);
                        this.$elem = patch(this.$elem);
                    }


                }
            }
        );
        this.events = {}
    }
    render() {
        if (this.state.tag === undefined || this.state.tag == '') {
            return document.createTextNode(this.state.content);
        }

        const $elem = document.createElement(this.state.tag);

        for (const [k, v] of Object.entries(this.state.attrs)) {
            $elem.setAttribute(k, v);
        }

        if (this.state.content === undefined || this.state.content == '')  {
            $elem.innerHTML = this.state.content;
            return $elem;
        }

        for (const child of this.state.children) {
            $elem.appendChild(child.render());
        }

        this.$elem = $elem;
        return this;
    }

    mount($elem) {
        $elem.replaceWith(this.render().$elem);
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
            this.state.children.push(vNode);
            if (this.$elem) {
                const $node = vNode.render()
                this.$elem.appendChild($node);
            }
        }

        return this
    }
    on(event, callback) { 
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
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