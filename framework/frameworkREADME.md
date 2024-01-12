# V

Many variables here are written with v in the name. The v stands for virtual, as in an object{} representation of the DOM eg virtual DOM.
This is to not confuse the actual HTML DOM elements and their object representations.






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