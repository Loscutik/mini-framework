import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';

const App = new Frame()
const vElem = new VElement({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text', })
App.addVElement(vElem)
const vUl = new VElement({ tag: 'ul', attrs: { ID: 'list', class: 'cl' }, content: 'text', })
vUl.addChild(new VElement({ tag: 'li', attrs: { ID: 'li1', class: 'cl' }, content: 'text1', }))
vUl.addChild(new VElement({ tag: 'li', attrs: { ID: 'li2', class: 'cl' }, content: 'text2', }))
App.addVElement(vUl)
App.useEvents("click", "keydown")
App.mount(document.getElementById('app'))

const newVElm = new VElement({ tag: 'div', attrs: { ID: 'list', class: 'cl' } })
newVElm.mount(document.getElementById('lis'))

