
import { VElement } from "./VElement.js";
import render from "./render.js"

// compare the old vApp to the new vApp

// then replace the old vApp with the new vApp

//? then mount somehow only the items that have changed? so we can't use vApp.mount()

export const reactives = []

export function updateReactives() {
    reactives.forEach(reactive => {
        reactive()
    })
}

/**
 * 
 * @param {{}} oldAttrs 
 * @param {{}} newAttrs 
 */
export function diffAttrs(oldAttrs, newAttrs) {
    const patches = []

    // set new attributes for elem
    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push($node => {
            $node.setAttribute(k, v)
            return $node;
        })
    }

    // delete old attributes
    for (const [k, v] of Object.entries(oldAttrs)) {
        if (!(k in newAttrs)) {
            patches.push($node => {
                $node.removeAttribute(k)
                return $node;
            })
        }
    }

    return $node => {
        for (const patch of patches) {
            patch($node)
        }
        return $node;
    }
}

/**
 * 
 * @param {Map.<VElement.vId, VElement>} oldVChildren 
 * @param {Map.<VElement.vId, VElement>} newVChildren 
 */
export function diffChildren(oldVChildren, newVChildren) {
    if (oldVChildren == null && newVChildren == null) {
        return () => { }
    }

    if (newVChildren == null) {
        return ($parent) => {
            $parent.replaceChildren();
        }
    }

    // from this momemt newChilden is not null or undefined
    const childrenPatches = new Map();
    const additionalPatches = [];

    if (oldVChildren == null) {
        newVChildren.forEach(newVChild => {
            additionalPatches.push($node => {
                $node.appendChild(newVChild.render().$elem);
                return $node;
            });
        });
    } else { // oldVChildren also != null
        oldVChildren.forEach((oldVChild, vId) => {
            childrenPatches.set(vId, diff(oldVChild, newVChildren.get(vId)));
        });

        newVChildren.forEach(newVChild => {
            if (!oldVChildren.has(newVChild.vId)) {
                additionalPatches.push($node => {
                    $node.appendChild(newVChild.render().$elem);
                    return $node;
                });
            }
        });
    }

    return $parent => {
        childrenPatches.forEach((patch, vId) => {
            patch($parent.querySelector(`[vId='${vId}']`));
        });

        for (const patch of additionalPatches) {
            patch($parent);
        }
        return $parent;
    };
}
/**
 * 
 * @param {VElement} vOldNode 
 * @param {VElement} vNewNode 
 */
function diff(vOldNode, vNewNode) {
    // launch the callback for reactive values
    
    if (vNewNode === undefined) {
        return $n => {
            $n.remove();
            return undefined
        }
    }

    if (typeof vOldNode === "string" || typeof vNewNode === "string") {
        if (vOldNode !== vNewNode) {
            return $n => {
                const newNode = render(vNewNode)
                $n.replaceWith(newNode)
                return newNode
            }
        } else {
            // vOldNode and vNewNode are the same string
            return $n => $n
        }
    }

    if (vOldNode.state.tag !== vNewNode.state.tag) {
        return $n => {
            const $newNode = vNewNode.render().$elem;
            $n.replaceWith($newNode);
            return $n;
        }
    }

    const patchArrs = diffAttrs(vOldNode.state.attrs, vNewNode.state.attrs);
    const patchChildren = diffAttrs(vOldNode.state.children, vNewNode.state.children);

    return $n => {
        patchArrs($n);
        patchChildren($n);
        return $n;

    }
}


export function convertDOMtoVDOM(HTMLElement) {
    const vElem = new VElement({
        tag: HTMLElement.nodeName.toLowerCase(),
        attrs: getHTMLProps(HTMLElement.attributes),
        content: HTMLElement.children.length == 0 ? HTMLElement.textContent : "", // if an element has children HTML elements, we don't count it as innerHTML
        children: returnChildren(HTMLElement),
    });
    return vElem;
}
function getHTMLProps(attributes) {
    const props = {};
    for (let i = 0; i < attributes.length; i++) {
        props[attributes[i].name] = attributes[i].value;
    }
    return props;
}

function returnChildren(HTMLElement) {
    const vChildren = [];
    for (const child of HTMLElement.children) {
        const vChild = convertDOMtoVDOM(child);
        vChildren.push(vChild);
    }
    return vChildren;
}

export function convertStringTemplateToVDOM(template) {
    var wrapper = document.createElement("div");
    const finalDiv = document.createElement("div");
    wrapper.innerHTML = template;
    for (const child of wrapper.childNodes) {
        finalDiv.appendChild(child)
    }
    return convertDOMtoVDOM(finalDiv);
}