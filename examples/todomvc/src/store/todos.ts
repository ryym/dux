import { command } from '../dux'
import Todo from '../lib/todo'
import * as TodoFilter from '../lib/todo-filters'
import { TodoCounts } from '../lib/todo-counts'
import { State } from './state'

export const getTodoCounts = ({ todos }: State): TodoCounts => {
  const nActives = todos.filter(t => !t.completed).length
  return {
    all: todos.length,
    active: nActives,
    completed: todos.length - nActives,
  }
}

export const getFilteredTodos = ({ todos, filter }: State): Todo[] => {
  if (filter === TodoFilter.SHOW_ALL) {
    return todos
  }
  const completed = filter === TodoFilter.SHOW_ACTIVE
  return todos.filter(t => t.completed === completed)
}

// mutable for now

export const addTodo = (state: State, title: string): State => {
  const todo = Todo.create({ title })
  state.todos = state.todos.concat(todo)
  return state
}
export const AddTodo = command(addTodo)

// export const updateTodo = (
//   id: number, title: string
// ) => (state: State): State => {
// }

export const updateTodo = (
  state: State,
  { id, title }: { id: number, title: string }
): State => {
  const idx = state.todos.map(t => t.id).indexOf(id)
  if (idx >= 0) {
    state.todos[idx].title = title
  }
  return state
}
export const UpdateTodo = command(updateTodo)

export const deleteTodo = (state: State, id: number): State => {
  const idx = state.todos.map(t => t.id).indexOf(id)
  if (idx >= 0) {
    state.todos = state.todos.filter(todo => todo.id !== id)
  }
  return state
}
export const DeleteTodo = command(deleteTodo)

// XXX: 結局こっちの方が書きやすいかも
// export const toggleCompleted = command(
//   'toggleCompleted',
//   using(api)(
//     (id: number) => (state: State): State => {
//       const idx = findIndex(state.todos, id)
//       if (idx >= 0) {
//         state.todos = state.todos.slice()
//         const todo = state.todos[idx]
//         state.todos[idx].completed = !todo.completed
//       }
//       return state
//     }
//   ),
// )

export const toggleCompleted = (state: State, id: number): State => {
  const idx = findIndex(state.todos, id)
  if (idx >= 0) {
    state.todos = state.todos.slice()
    const todo = state.todos[idx]
    state.todos[idx].completed = !todo.completed
  }
  return state
}
export const ToggleCompleted = command(toggleCompleted)

export const toggleCompletedAll = (state: State, completed: boolean): State => {
  state.todos = state.todos.map(todo => {
    todo.completed = completed
    return todo
  })
  return state
}
export const ToggleCompletedAll = command(toggleCompletedAll)

const findIndex = (todos: Todo[], id: number) => todos.map(t => t.id).indexOf(id)
