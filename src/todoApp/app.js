import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';
import createRouter from '../../framework/router.js';
import { vTodoList } from './templates/main/insideUpperSection/todo_container_items/todoList.js';
import { routes } from './routes.js';
import { newVMain} from './templates/mainPage_old.js';
import { mainDiv } from './templates/vMainPage.js';
import { reactives } from '../../framework/functions.js';
import { updateReactiveValues } from './helpers/updateReactiveValues.js';


export const router = createRouter(routes);
export const App = new Frame()

App.useEvents("click", "keydown", "dblclick")

reactives.push(updateReactiveValues)

App.mount(document.getElementById('app'))

App.addVElement(mainDiv);

