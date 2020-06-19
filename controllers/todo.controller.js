/**
 * @class Controller
 *
 * Links the todo input and the view output.
 *
 * @param model
 * @param view
 */
class TodoController {
	constructor(todoService, todoView) {
		this.todoService = todoService
		this.todoView = todoView

		// Explicit this binding
		this.todoService.bindTodoListChanged(this.onTodoListChanged)
		this.todoView.bindAddTodo(this.handleAddTodo)
		this.todoView.bindEditTodo(this.handleEditTodo)
		this.todoView.bindDeleteTodo(this.handleDeleteTodo)
		this.todoView.bindToggleTodo(this.handleToggleTodo)

		// Display initial todos
		this.onTodoListChanged(this.todoService.todos)
	}

	onTodoListChanged = (todos) => {
		this.todoView.displayTodos(todos)
	}

	handleAddTodo = (todo) => {
		this.todoService.add(todo)
	}

	handleEditTodo = (id, todo) => {
		this.todoService.edit(id, todo)
	}

	handleDeleteTodo = (id) => {
		this.todoService.delete(id)
	}

	handleToggleTodo = (id) => {
		this.todoService.toggle(id)
	}
}
