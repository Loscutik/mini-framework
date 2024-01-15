# Framework Documentation

## Introduction
This documentation provides an overview of the functionalities and usage of the `Frame` and `VElement` classes in the framework. These classes allow for the creation and manipulation of a virtual DOM, handling events, and mounting to the actual DOM.

## Using the Frame Class

### Initialization
To begin, create a new `Frame` instance. This will serve as the container for all virtual elements (`VElement`).
```javascript
const App = new Frame(); // Create a new Frame
```

### Creating and Adding Virtual Elements
Virtual elements can be created and added to the `Frame` in two ways:
```javascript
// Directly creating a new VElement
const vElem = new VElement({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text' });
App.addVElement(vElem); // Add the element to the Frame

// Using the createElement method of the Frame
App.createElement({ tag: 'div', attrs: { ID: 'item', class: 'cl' }, content: 'text' });
```

### Event Handling
Declare the DOM events that the `Frame` should handle:
```javascript
App.useEvents("click", "keydown"); // Declare DOM events
```

### Mounting to the DOM
Mount the `Frame` to a DOM element:
```javascript
App.mount(document.getElementById('app')); // Mount the App frame
```

### Manipulating Virtual Elements
Examples of various operations on `VElement`:
```javascript
const newVElmLi = new VElement({ tag: 'li', attrs: { ID: 'li1', class: 'cl' } });
const newVElmU = new VElement({ tag: 'ul', attrs: { ID: 'list', class: 'cl' }, children: [newVElmLi]});
App.addVElement(newVElmU); // Add new elements to App

vElem.setAttr({ ID: 'li1', class: 'cl' }); // Modify attributes
vElem.delAttribute(attrName); // Remove an attribute
vElem.addChild(newVElem or string); // Add a child
vElem.delChild(vId); // Remove a child, where vId is the child's vId

// Event handling on virtual elements
vElem.on(eventType, callback); // Add event listener
vElem.emit(eventType); // Emit an event
```

## Understanding 'v' Prefix in Variable Names

Variables in this framework often have a 'v' prefix, standing for 'virtual'. This is to distinguish between actual HTML DOM elements and their object representations in the virtual DOM.

## Routing

To add paths to the routes, define them as objects inside an array. Each object should have a 'path' attribute and a callback. Example:

```javascript
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
];
```