const Todo = require('./todos.js');

const actions = {
  getTodos: async () => {
    try {
      console.log("gettingtodos--------")
      const todos = await Todo.find();
      return todos.map(todo => ({ id: todo._id.toString(), message: todo.message }));
    } catch (error) {
      console.error('Error getting todos:', error);
      return { result: 'error', message: 'Failed to get todos' };
    }
  },

  createTodo: async (payload) => {
    try {
      console.log("mypayloadis",payload.message)
      const newTodo = await Todo.create(payload);
      console.log("____________________",newTodo);
      return { result: 'success', todo: { id: newTodo._id.toString(), message: newTodo.message } };
    } catch (error) {
      console.error('Error creating todo:', error);
      return { result: 'error', message: 'Failed to create todo' };
    }
  },

  getTodoById: async (payload) => {
    try {
      const todo = await Todo.findById(payload.id);
      return todo ? { result: 'success', todo: { id: todo._id.toString(), message: todo.message } }
                   : { result: 'error', message: 'Todo not found' };
    } catch (error) {
      console.error('Error getting todo by ID:', error);
      return { result: 'error', message: 'Failed to get todo by ID' };
    }
  },

  updateTodoById: async (payload) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        payload.id,
        { message: payload.message },
        { new: true } // Return the modified document
      );

      return updatedTodo
        ? { result: 'success', todo: { id: updatedTodo._id.toString(), message: updatedTodo.message } }
        : { result: 'error', message: 'Todo not found' };
    } catch (error) {
      console.error('Error updating todo by ID:', error);
      return { result: 'error', message: 'Failed to update todo by ID' };
    }
  },

  deleteTodoById: async (payload) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(payload.id);

      return deletedTodo
        ? { result: 'success', todo: { id: deletedTodo._id.toString(), message: 'Todo deleted' } }
        : { result: 'error', message: 'Todo not found' };
    } catch (error) {
      console.error('Error deleting todo by ID:', error);
      return { result: 'error', message: 'Failed to delete todo by ID' };
    }
  },
  add: (payload) => payload.num1 + payload.num2,
  subtract: (payload) => payload.num1 - payload.num2,
  multiply: (payload) => payload.num1 * payload.num2,
  divide: (payload) => (payload.num2 !== 0 ? payload.num1 / payload.num2 : "Cannot divide by zero"),
};

module.exports = actions;
