import { Store, command, Dispatch } from './dux'

export type State = {
  count: number,
}

const add = (s: State, n: number) => {
  s.count += n
  return s
}
export const Add = command(add)

const addAfter = (
  s: State, { time, n }: { time: number, n: number }
) => (dispatch: Dispatch<State>) => {
  setTimeout(() => dispatch(Add(n)), time)
}
export const AddAfter = command(addAfter)

export default new Store({ count: 0 })
