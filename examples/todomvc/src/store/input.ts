import { command } from '../dux'
import { State } from './state'

export const changeFilter = (state: State, filter: string): State => {
  return { ...state, filter }
}
export const ChangeFilter = command(changeFilter)

export const startEditing = (state: State, id: number): State => {
  return { ...state, editedId: id }
}
export const StartEditing = command(startEditing)

export const finishEditing = (state: State): State => {
  return { ...state, editedId: null }
}
export const FinishEditing = command(finishEditing)
