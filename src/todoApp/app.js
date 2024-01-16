import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';
import createRouter from '../../framework/router.js';
import { vTodoList } from './reactive_objects/todoList.js';
import { routes } from './routes.js';
import { newVMain} from './templates/mainPage.js';
import { mainDiv } from './templates/vMainPage.js';


const router = createRouter(routes);
export const App = new Frame()

App.useEvents("click", "keydown")

App.mount(document.getElementById('app'))

App.addVElement(mainDiv);

// add todo list

/* App.addVElement(newVMain);
const todoContainer = App.getVElementByID("todo-container");
todoContainer.addChild(vTodoList); */


// testing stuff

/* 
const vUl = new VElement({
  tag: "ul",
  attrs: { ID: "list", class: "cl" },
  content: "in 11 seconds ul innerHTML will be replaced with a text",
});
vUl.addChild(
  new VElement({
    tag: "li",
    attrs: { ID: "li1", class: "cl" },
    content: "text1",
  })
);
vUl.addChild(
  new VElement({
    tag: "li",
    attrs: { ID: "li2", class: "cl" },
    content: "text2",
  })
);
const mim = new VElement({
  tag: "input",
  attrs: { type: "text", class: "cl", value: "change in 6 sec" },
});
App.addVElement(vUl);
App.addVElement(mim);
 */


/* 
vUl.on('@click', ()=>{vUl.setAttr({style: "color: red;"})}); 

//after mounting, test reactive
vUl.attrs = { n: "natt" } // repllace all vUl attributes with this
const out = new  VElement({ tag: 'div', attrs: { ID: 'out', style: "border: solid; margin: 5px;" } })
out.mount(document.getElementById('out')).createElement({tag: 'div', content: "in 11 seconds ul innerHTML will be replaced with this text"})

setTimeout(() => {
    vUl.addChild (new VElement({ tag: 'li', attrs: { ID: 'li3', class: 'cl' }, content: 'new element added', }))
    out.addChild(new VElement({tag: 'p', content: `added new li in ul, ul's children are ${vUl.children}`}));
}, 3000)
setTimeout(() => {
    vUl.content = "I replaced ul innerHTML with this text"
    out.addChild(new VElement({tag: 'p', content: `ul's content is replaced and = ${vUl.content}`}));
}, 11000)

setTimeout(() => {
    mim.attrs = { type: "button", value: 'new change in 3 sec' };
    mim.content = "changed, next change in 3 sec";

    out.addChild(new VElement({tag: 'p', content: `attr changed text -> button (attrs: ${mim.attrs} ), next change in 3 sec`}));
}, 6000)
setTimeout(() => {
    mim.tag = 'h3'

    out.addChild(new VElement({tag: 'p', content:`tag changed input -> h3 (tag: ${mim.tag})` }));
}, 9000)

 */

