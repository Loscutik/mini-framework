// on event

// import { vApp } from "../app"; //  we must not use app in framwork, but use framework in app (like vue doesn't know about our app)
import { ChrisFramework } from "./classes.js";
import render  from "./render.js"

// compare the old vApp to the new vApp

// then replace the old vApp with the new vApp

//? then mount somehow only the items that have changed? so we can't use vApp.mount()


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
                $node.removeAttributes(k)
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
 * @param {[]} oldVChildren 
 * @param {[]} newVChildren 
 */
export function diffChildren(oldVChildren, newVChildren) {
    const childrenPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childrenPatches.push(diff(oldVChild, newVChildren[i]));
    });

    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(additionalVChild.render().$elem);
            return $node;
        });
    }

    return $parent => {

        $parent.childNodes.forEach(($child, i) => {
            childrenPatches[i]($child);
        });

        for (const patch of additionalPatches) {
            patch($parent);
        }
        return $parent;
    };
}
/**
 * 
 * @param {ChrisFramework} vOldNode 
 * @param {ChrisFramework} vNewNode 
 */
function diff(vOldNode, vNewNode) {
    if (vNewNode.state === undefined) {
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

function patch() {

}

function placeholderDOMModifyFunction() {
    const vNewApp = new ChrisFramework()
    const patch = diff(vApp, vNewApp)
    const rootElem = vApp.render()
    rootElem = patch(rootElem) // rootelem is the new DOM object of #app
}