import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';

const App = new Frame()
const vElem = new VElement({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text', })
App.addVElement(vElem)
App.useEvents("click", "keydown")
App.mount(document.getElementById('app'))

const newVElm = new VElement({ tag: 'div', attrs: { ID: 'list', class: 'cl' } })
newVElm.mount(document.getElementById('lis'))