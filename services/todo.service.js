/**
 * @class Service
 *
 * Manages the data of the application.
 */
class TodoService {
	constructor() {
		const todos = JSON.parse(localStorage.getItem("todos")) || []
		this.todos = todos.map((todo) => new Todo(todo))
	}

	bindTodoListChanged(callback) {
		this.onTodoListChanged = callback
	}

	_commit(todos) {
		this.onTodoListChanged(todos)
		localStorage.setItem("todos", JSON.stringify(todos))
	}

	add(todo) {
		this.todos.push(new Todo(todo))

		this._commit(this.todos)
	}

	edit(id, userToEdit) {
		this.todos = this.todos.map((todo) =>
			todo.id === id
				? new Todo({
						...todo,
						...userToEdit,
				  })
				: todo,
		)

		this._commit(this.todos)
	}

	delete(_id) {
		this.todos = this.todos.filter(({ id }) => id !== _id)

		this._commit(this.todos)
	}

	toggle(_id) {
		this.todos = this.todos.map((todo) =>
			todo.id === _id
				? new Todo({ ...todo, complete: !todo.complete })
				: todo,
		)

		this._commit(this.todos)
	}
}
