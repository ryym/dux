import Todo from '../lib/todo'
import { SHOW_ALL } from '../lib/todo-filters'

// readonly
export interface State {
  todos: Todo[],
  filter: string,
  editedId: number | null
}

export const makeInitialState = (): State => ({
  todos: [],
  filter: SHOW_ALL,
  editedId: null,
})
