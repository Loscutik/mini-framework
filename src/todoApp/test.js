import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';

const App = new Frame()

App.useEvents("click", "keydown")


App.mount(document.getElementById('test'))
const vUl = new VElement({
    tag: "ul",
    attrs: { ID: "list", class: "cl" },
    content: "in 7 seconds ul innerHTML will be replaced with a text",
    '@click': (velm) => { velm.setAttr({ style: "color: yellow;" }) },
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
    attrs: { type: "text", class: "cl", value: "change in 4 sec" },
});
const lbl = new VElement({
    tag: "label",
    attrs: { for: "inp2", },
});
const inp = new VElement({
    tag: "input",
    attrs: { id: "inp2", type: "text", class: "cl", },
    '@keydown': (vElem, event) => { vElem.setAttr({ style: "color: blue;" }); 
    let text = event.target.value; //

    vElem.setAttr({value: text+event.key});
    lbl.content="you pressed: " + event.keyCode;}
});
App.addVElement(inp).addVElement(lbl);
App.addVElement(vUl);
App.addVElement(mim);




vUl.on('@keydown', (vElem, event) => { vElem.setAttr({ style: "color: blue;" }); console.log("you pressed: ", event.keyCode); });

//after mounting, test reactive
vUl.attrs = { n: "natt" } // repllace all vUl attributes with this
const out = new VElement({ tag: 'div', attrs: { ID: 'out', style: "border: solid; margin: 5px;" } })
out.mount(document.getElementById('out')).createElement({ tag: 'div', content: "in 7 seconds ul innerHTML will be replaced with this text" })

setTimeout(() => {
    vUl.addChild(new VElement({ tag: 'li', attrs: { ID: 'li3', class: 'cl' }, content: 'new element added', '@click': (velm) => { velm.setAttr({ style: "color: green;" }) } }))
    out.addChild(new VElement({ tag: 'p', content: `added new li in ul, ul's children are ${vUl.children}` }));
}, 2000)

setTimeout(() => {
    mim.attrs = { type: "button", value: 'new change in 2 sec' };
    mim.content = "changed, next change in 2 sec";

    out.addChild(new VElement({ tag: 'p', content: `attr changed text -> button (attrs: ${mim.attrs} ), next change in 2 sec` }));
}, 4000)

setTimeout(() => {
    mim.tag = 'h3'

    out.addChild(new VElement({ tag: 'p', content: `tag changed input -> h3 (tag: ${mim.tag})` }));
}, 6000)

// setTimeout(() => {
//     vUl.content = "I replaced ul innerHTML with this text"
//     out.addChild(new VElement({ tag: 'p', content: `ul's content is replaced and = ${vUl.content}` }));
// }, 7000)

setTimeout(() => {
    let events = getEvents(App._state);

    out.addChild(new VElement({ tag: 'p', content: `events = ${events}` }));
}, 8000)

function getEvents(vEl) {
    let events = ''
    events += 'elm: ' + vEl.tag + ': '
    for (const [event, funcs] of vEl.events) {
        events += event + ': '
        for (const func of funcs) {
            events += func + ' | '
        }
        events += `\n`
    }
    events += `\n\n`
    console.log(vEl)
    console.log(vEl.children)
    if (vEl.children) {
        for (const [vId, child] of vEl.children) {
            events += getEvents(child)
        }
    }
    return events

}