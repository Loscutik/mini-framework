// on event

import { vApp } from "../app";
import { ChrisFramework } from "./classes";

// create new vApp

// then compare the old vApp to the new vApp

// then replace the old vApp with the new vApp

//? then mount somehow only the items that have changed? so we can't use vApp.mount()


/**
 * 
 * @param {{}} oldAttrs 
 * @param {{}} newAttrs 
 */
function diffAttrs(oldAttrs, newAttrs) {
    const patches = []

    // set new attributes for elem
    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push(n => {
            n.setAttribute(k, v)
            return n
        })
    }

    // delete old attributes
    for (const [k, v] of Object.entries(oldAttrs)) {
        if (!(k in newAttrs)) {
            patches.push(n => {
                n.removeAttributes(k)
                return n
            })
        }
    }

    return n => {
        for (const patch of patches) {
            patch(n)
        }
    }
}

/**
 * 
 * @param {[]} oldVChildren 
 * @param {[]} newVChildren 
 */
function diffChildren(oldVChildren, newVChildren) {
    const childPatches = []
  for (const oldVChild of oldVChildren) {

  }
}
/**
 * 
 * @param {ChrisFramework} vOldNode 
 * @param {ChrisFramework} vNewNode 
 */
function diff(vOldNode, vNewNode) {
    if (vNewNode.state === undefined) {
        return n => {
            n.remove();
            return undefined
        }
    }
    if (vOldNode.state.tag !== vNewNode.state.tag) {
        return n => {
            const replaced = vNewNode.render()
            return replaced
        }
    }
    if (typeof vOldNode.state === "string" || typeof vNewNode==="string") {
        if (vOldNode.state!==vNewNode.state) {
            return n => {
                const newNode = vNewNode.render()
                n.replaceWith(newNode)
                return newNode
            }
        } else {
            return n => undefined
        }
    }
    const patchArrs = diffAttrs(vOldNode.state.attrs, vNewNode.state.attrs)

    const patchChildren = diffAttrs(vOldNode.state.children, vNewNode.state.children);

    return n => {
        patchArrs(n)
    }
}

function patch() {

}

function placeholderEventFunc() {
    const vNewApp = new ChrisFramework()
    const patch = diff(vApp, vNewApp)
    const rootElem = vApp.render()
    rootElem = patch(rootElem) // rootelem is the new DOM object of #app
}