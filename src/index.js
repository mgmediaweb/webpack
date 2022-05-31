/* import _ from 'lodash'; */
import Sortable from 'sortablejs';
import TodoMaster from './todoClass.js';
import './style.css';

const form = document.getElementById('todoform');

const loadButtons = () => {
  const btnsInfo = document.querySelectorAll('.article-info');

  btnsInfo.forEach((btn) => {
    const todoClick = new TodoMaster();
    btn.addEventListener('click', () => {
      todoClick.complete(btn.getAttribute('id'));
      loadButtons();
    });
  });
};

class TodoClass extends TodoMaster {
  constructor() {
    super();
    return undefined;
  }

  addTask(task) {
    this.add(task);
    loadButtons();
  }

  listTask() {
    this.show();
    loadButtons();
  }
}

const todo = new TodoClass();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = document.getElementById('taskText');

  todo.addTask(task.value);
  task.value = '';
});

const el = document.getElementById('task-list');
Sortable.create(el, {
  onEnd() { todo.reorder(); },
});

todo.listTask();