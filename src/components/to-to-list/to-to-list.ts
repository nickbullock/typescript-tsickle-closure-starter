import * as styles from './to-do-list.scss';

export interface IToDo {
  id: number;
  value: string;
}

export declare interface ToDoListPublic {
  add(): void;
  remove(): void;
}

export class ToDoList {
  private element: HTMLElement;
  private container: HTMLElement;
  private input: any;
  private list: Array<IToDo> = [];
  private lastId = 0;

  constructor(element: HTMLElement) {
    this.element = element;
    this.input = document.createElement('input');
    this.container = this.createContainer();

    this.element.appendChild(this.createButton('add', this.onAdd.bind(this)));
    this.element.appendChild(this.input);
    this.element.appendChild(this.container);
  }

  public add(value: string): void {
    if (!value) return;
    const item = { id: this.lastId + 1, value } as IToDo;
    this.list.push(item);
    this.addNode(item);
    this.lastId++;
    this.input.value = null;
  }

  public remove(todoId: number): void {
    const index = this.list.findIndex(item => item.id === todoId);
    if (index === -1) return;
    this.list.splice(index, 1);
    this.removeNode(todoId);
  }

  private onAdd(event: MouseEvent): void {
    this.add(this.input.value);
  }

  private onRemove(event: MouseEvent) {
    const node = (event.target as any).parentNode;
    const todoId = +node.getAttribute('data-id');

    this.remove(todoId);
  }

  private addNode(todo: IToDo): void {
    const item = document.createElement('div');
    const remove = this.createButton('x', this.onRemove.bind(this));

    remove.classList.add(styles.remove);
    item.innerText = todo.value;
    item.setAttribute('data-id', todo.id.toString());
    item.classList.add(styles.item);

    item.appendChild(remove);
    this.container.appendChild(item);
  }

  private removeNode(id: number): void {
    const node = this.container.querySelector(`[data-id="${id}"]`);
    if (!node) return;
    this.container.removeChild(node);
  }

  private createContainer(): HTMLElement {
    const div = document.createElement('div');

    div.classList.add(styles.container);

    return div;
  }

  private createButton(value: string, listener: Function): HTMLElement {
    const btn = document.createElement('button');

    btn.innerText = value;
    btn.classList.add(styles[value]);
    btn.onclick = listener as any;

    return btn;
  }
}
