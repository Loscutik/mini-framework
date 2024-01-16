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

vElem.setAttr({ ID: 'li1', class: 'cl' }) //add/replace velement's attributes
vElem.delAttribute(attrName) //remove attribute
vElem.addChild(newVElem or string) //add new child to vElem
vElem.delChild(vId) //remove child from vElem, vId=chilToDelete.vId
// each vElem has its own vId and it is set as vId attribute in the corresponding real Element
// v.Elem.$elem - corresponding real Element
vElem.on(eventType, callback)  // add listener (callback) to an event, eventType is a string starting with @ (@click, @myEvent)
vElem.emit(eventType) // fire your own event(or not yours - @click - immitate click) - vElem.emit(@myEvent) - will call the callback addded with on method

# V

Many variables here are written with v in the name. The v stands for virtual, as in an object{} representation of the DOM eg virtual DOM.
This is to not confuse the actual HTML DOM elements and their object representations.

Quick copy-paste to create new vElement attributes:  {tag: "div", attrs: {}, content: "", children: []}




# To add paths to the routes, define them as objects inside an array. Each object should have a 'path' attribute and a callback, ex:

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