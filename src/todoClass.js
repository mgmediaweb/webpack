export default class TodoMaster {
  constructor() {
    return null;
  }

  add(task = null) {
    if (task) {
      const taskMem = this.constructor.get();

      const newTask = {
        completed: false,
        description: task,
        index: taskMem.length,
      };

      taskMem.push(newTask);
      this.constructor.set(taskMem);
      this.show();
    }
  }

  complete(id = null) {
    const tasks = this.constructor.get();

    const newTasks = tasks.filter((item) => {
      if (Number(id) === item.index) {
        item.completed = !item.completed;
        return item;
      }
      return item;
    });

    this.constructor.set(newTasks);
    this.show();
  }

  del(id = null) {
    if (id != null) {
      const books = this.constructor.get();

      const newBooks = books.filter((item, key) => {
        if (Number(id) !== key) return true;
        return null;
      });

      this.constructor.set(newBooks);
      this.show();
    }
  }

  static get() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) return tasks;
    return [];
  }

  static set(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static reorder() {

  }

  show() {
    const task = this.constructor.get();
    const taskList = document.getElementById('task-list');

    if (task.length) {
      let tasklist = '';

      task.forEach((item) => {
        let showIcon = 'far fa-square icon icon-disabled';
        let showText = '';

        if (item.completed) {
          showIcon = 'fas fa-check icon icon-activated';
          showText = 'class="text-completed"';
        }

        tasklist += `<li draggable="true" id="task${item.index}">
              <div id="${item.index}" class="article-info">
                <i id="icon${item.index}" class="${showIcon}"></i>
                <p id="title${item.index}" ${showText}>${item.description} - ${item.index}</p>
              </div>
              
              <div class="article-btn" title="Delete Task">
                <i id="menu${item.index}" class="fas fa-trash-alt icon"></i>
              </div>            
              
          </li>`;
      });

      taskList.innerHTML = tasklist;
    } else {
      taskList.innerHTML = '<li class="win-empty">No task availables</ñi>';
    }

    return true;
  }
}