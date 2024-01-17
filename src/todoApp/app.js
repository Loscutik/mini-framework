import { Frame } from '../../framework/Frame.js';
import { VElement } from '../../framework/VElement.js';
import createRouter from '../../framework/router.js';
import { vTodoList } from './templates/main/insideUpperSection/todo_container_items/todoList.js';
import { routes } from './routes.js';
import { newVMain} from './templates/mainPage_old.js';
import { mainDiv } from './templates/vMainPage.js';


export const router = createRouter(routes);
export const App = new Frame()

App.useEvents("click", "keydown")

App.mount(document.getElementById('app'))

App.addVElement(mainDiv);

