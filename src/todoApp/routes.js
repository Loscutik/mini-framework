import createRouter from "../../framework/router.js";
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from "./consts.js";
import { filters } from "./models/filter_model.js";
import { todoList } from "./models/todo_model.js";
import { vTodoList } from "./templates/main/insideUpperSection/todo_container_items/todoList.js";

export const routes = [
  {
    path: "/completed",
    callback: function () {
      filters.setCurrent = FILTER_COMPLETED
      vTodoList.children = todoList.getByFilter();
      // maybe have it work with templates instead?
      console.log("displaying completed now"); // modify the state here ig
      // handle completed list
    },
  },
  {
    path: "/active",
    callback: function () {

      filters.setCurrent = FILTER_ACTIVE
      vTodoList.children = todoList.getByFilter();
      console.log("displaying active now"); // modify the state here ig
      // handle active list
    },
  },
  {
    path: "/",
    callback: function () {
      filters.setCurrent = FILTER_ALL
      vTodoList.children = todoList.getByFilter();
      // maybe have it work with templates instead?
      console.log("displaying main page now"); // modify the state here ig
      // handle completed list
    },
  },
];
