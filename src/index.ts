import { ToDoList } from './components/to-to-list';

let app: Application;

class Application {
  toDoList: ToDoList;
  constructor() {
    this.toDoList = new ToDoList(document.body);
  }

  public destroy() {
    document.body.innerHTML = '';
    this.toDoList = null;
  }
}

function createApp() {
  app = new Application();
}
function destroyApp() {
  app.destroy();
  app = null;
}

createApp();

if (module['hot']) {
  module['hot'].accept();
  destroyApp();
  createApp();
}
