# Use
const App = new Frame() //  create a new Frame, all virtual Elements will be added to it

const vElem = new VElement({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text', })// don't need to declare all those properties here

App.addVElement(vElem) // add the element to the App

App.createElement(({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text', })) //another way to add the element to the App

App.useEvents("click", "keydown") // declare which DOM events you want to use, you have to add listeners to a vElement

App.mount(document.getElementById('app')) // mount the App frame to the DOM element


const newVElmLi = new VElement({ tag: 'li', attrs: { ID: 'li1', class: 'cl' } })

const newVElmU = new VElement({ tag: 'ul', attrs: { ID: 'list', class: 'cl' }, children: [newVElmLi]})

App.ddVElement(newVElmU)  // add new elements to App,it must change real DOM



# V

Many variables here are written with v in the name. The v stands for virtual, as in an object{} representation of the DOM eg virtual DOM.
This is to not confuse the actual HTML DOM elements and their object representations.

Quick copy-paste to create new vElement attributes:  {tag: "div", attrs: {}, content: "", children: []}

# TUTORIAL

## TEMPLATES

The main structure for your project should be in a `templates` folder. In this folder you will have templates that contain VElements and their children.
These VElements and their children nesting will define the structure of your page. To define a VElement, you will use the following structure:

```
const newVElement = new VElement({
    tag: "div",
    attrs: {class: "hello"},
    content: "Hello world", // InnerHTML of this element
    children: [VElementChild, AnotherVElementChild]
})
```

An example by importing components from other files: 

```
import { VElementChild } from "./module.js";
import { AnotherVElementChild } from "./module.js";

const section = new VElement({
  tag: "section",
  attrs: { class: "container" },
  children: [   // VElements that are defined in other .js files
    VElementChild, 
    AnotherVElementChild,
  ],
});
```

To add or remove elements conditionally, you can use `VElement.addChild(newVElement)`, where `newVElement` is another VElement. For example:

```
function addVElement() {
  condition = someCondition;
  if (condition) {
    myVElement.addChild(newVElement); 
  } else if (!condition) {
    myVElement.delChild(newVElement._vId)
  }
}

const myVElement = new VElement({
  tag: "section",
  attrs: { class: "todoapp" },
  children: [
    VElementChild, 
    AnotherVElementChild,
  ],
});
```

## EVENTS

To define which events the framework can use, you add them in your App variable:

`App.useEvents("click", "keydown", "dblclick")`

To use these events in your components, simply add an attribute to a VElement with a callback function to them like this:
`@click: (velem, event) => { console.log("hello") }`

Example:

```

const newVElement = new VElement({
    tag: "div",
    attrs: {class: "hello"},
    content: "Hello world",
    children: [VElementChild, AnotherVElementChild]
    '@click': (velem, event) => {
        velem.content = "Hello again world"
        // or 
        newVElem.content = "Hello again world"
    }
})

```

## UPDATING DOM IN REAL TIME

Most operations that you do with VElements will affect the DOM as you modify them, for examle:

`VElement.setAttrs({class: "world"})` will change the class of that corresponding HTMLElement to `world`.

Some available operations:

```
vElem.setAttr({ ID: 'li1', class: 'cl' }) //add/replace velement's attributes

vElem.delAttribute(attrName) //remove attribute

vElem.addChild(newVElem or string) //add new child to vElem

vElem.delChild(vId) //remove child from vElem, vId=chilToDelete.vId

// each vElem has its own vId and it is set as vId attribute in the corresponding real Element

// v.Elem.$elem - corresponding real Element

vElem.on(eventType, callback)  // add listener (callback) to an event, eventType is a string starting with @ (@click, @myEvent)

vElem.emit(eventType) // fire your own event(or not yours - @click - immitate click) - vElem.emit(@myEvent) - will call the callback addded with on method
```


## ROUTER

To add paths to the routes, define them as objects inside an array. Each object should have a 'path' attribute and a callback/handler, ex:

```
const routes = [
    {
        path: "hello",
        callback: function() {
            console.log("hello world")
        }
    },
    {
        path: "again",
        callback: function() {
            console.log("hello again world")
        }
    },
    {
        path: "/",
        callback: function() {
            console.log("main page")
        }
    },
]
```

You are free to do in the callbacks whatever you need.
Then in your router, you add the routes array into `createRouter()` function:

`const router = createRouter(routes);`

You can use this router variable to go to routes and set parameters in one method call.

`router.routeTo("#hello", "world")`

