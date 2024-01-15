import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';

const App = new Frame()
const vElem = new VElement({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text', })
App.addVElement(vElem)
const vUl = new VElement({ tag: 'ul', attrs: { ID: 'list', class: 'cl' }, content: 'in 3 seconds ul innerHTML will be replaced', })
vUl.addChild(new VElement({ tag: 'li', attrs: { ID: 'li1', class: 'cl' }, content: 'text1', }))
vUl.addChild(new VElement({ tag: 'li', attrs: { ID: 'li2', class: 'cl' }, content: 'text2', }))
const mim = new VElement({ tag: 'input', attrs: { type: 'text', class: 'cl' , value: 'change in 6 sec'}, })
App.addVElement(vUl)
App.addVElement(mim)
App.useEvents("click", "keydown")
App.mount(document.getElementById('app'))

vUl.attrs = { n: "natt" } // repllace all vUl attributes with this
const out = document.getElementById('out')
out.innerHTML = "<p>in 3 seconds ul innerHTML will be replaced with this text</p>"
setTimeout(() => {
    vUl.content = "I replaced ul innerHTML with this text"
    const p = document.createElement("p");
    p.append(document.createTextNode(`ul's content is replaced and = ${vUl.content}`)); // test getter btw
    out.append(p);
}, 3000)
setTimeout(() => {
    mim.attrs = { type: "button", value: 'new change in 3 sec' };
    mim.content = "changed, next change in 3 sec";
    const p = document.createElement("p");
    p.append(document.createTextNode(`attr changed text -> button (attrs: ${mim.attrs} ), next change in 3 sec`));
    out.append(p);
}, 6000)
setTimeout(() => {
    mim.tag = 'h3'

    const p = document.createElement("p");
    p.append(document.createTextNode(`tagchanged input -> h3 (tag: ${mim.tag})` ));
    out.append(p);
}, 9000)

const newVElm = new VElement({ tag: 'div', attrs: { ID: 'list', class: 'cl' } })
newVElm.mount(document.getElementById('lis'))

