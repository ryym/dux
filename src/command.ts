import { Dispatch } from './store'

export type Effect<S> = (
  dispatch: Dispatch<S>,
  getState: () => S
) => void

export type Handler0<S> = (state: S) => S | Effect<S>
export type Handler1<S, P> = (state: S, payload: P) => S | Effect<S>
type AnyHandler<S, P> = Handler0<S> | Handler1<S, P>;

export interface Command<S, P = void> {
    name: string
    payload: P
    handler: AnyHandler<S, P>
    creator: (p: P) => Command<S, P>
}

export function command<S>(
  handler: Handler0<S>,
  name?: string
): () => Command<S>;
export function command<S, P>(
  handler: Handler1<S, P>,
  name?: string
): (payload: P) => Command<S, P>;
export function command(handler: any, name: any): any {
    const creator = (payload: any) => ({
      name: handler.name || name,
      payload,
      handler,
      creator
    })
    return creator
}
