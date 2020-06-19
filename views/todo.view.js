/**
 * @class View
 *
 * Visual representation of the model.
 */
class TodoView {
  constructor() {
    this.app = this.getElement('#root');

    this.form = this.createElement('form');
    this.createInput({
      key: 'inputName',
      type: 'text',
      placeholder: 'Title',
      name: 'name',
    });
    this.createInput({
      key: 'inputAge',
      type: 'text',
      placeholder: 'Description',
      name: 'description',
    });

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.form.append(this.inputName, this.inputAge, this.submitButton);

    this.title = this.createElement('h1');
    this.title.textContent = 'Todos';
    this.todoList = this.createElement('ul', 'todo-list');
    this.app.append(this.title, this.form, this.todoList);

    this._temporaryAgeText = '';
    this._initLocalListeners();
  }

  get _nameText() {
    return this.inputName.value;
  }
  get _ageText() {
    return this.inputAge.value;
  }

  _resetInput() {
    this.inputName.value = '';
    this.inputAge.value = '';
  }

  createInput(
    { key, type, placeholder, name } = {
      key: 'default',
      type: 'text',
      placeholder: 'default',
      name: 'default',
    },
  ) {
    this[key] = this.createElement('input');
    this[key].type = type;
    this[key].placeholder = placeholder;
    this[key].name = name;
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  displayTodos(todos) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (todos.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a todo?';
      this.todoList.append(p);
    } else {
      // Create nodes
      todos.forEach((todo) => {
        const li = this.createElement('li');
        li.id = todo.id;

        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;

        const spanTodo = this.createElement('span');

        const spanAge = this.createElement('span');
        spanAge.contentEditable = true;
        spanAge.classList.add('editable');

        if (todo.complete) {
          const strikeName = this.createElement('s');
          strikeName.textContent = todo.name;
          spanTodo.append(strikeName);

          const strikeAge = this.createElement('s');
          strikeAge.textContent = todo.description;
          spanAge.append(strikeAge);
        } else {
          spanTodo.textContent = todo.name;
          spanAge.textContent = todo.description;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, spanTodo, spanAge, deleteButton);

        // Append nodes
        this.todoList.append(li);
      });
    }
  }

  _initLocalListeners() {
    this.todoList.addEventListener('input', (event) => {
      if (event.target.className === 'editable') {
        this._temporaryAgeText = event.target.innerText;
      }
    });
  }

  bindAddTodo(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._nameText) {
        handler({
          name: this._nameText,
          description: this._ageText,
        });
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener('click', (event) => {
      if (event.target.className === 'delete') {
        const id = event.target.parentElement.id;

        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener('focusout', (event) => {
      if (this._temporaryAgeText) {
        const id = event.target.parentElement.id;
        const key = 'description';

        handler(id, { [key]: this._temporaryAgeText });
        this._temporaryAgeText = '';
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const id = event.target.parentElement.id;

        handler(id);
      }
    });
  }
}
