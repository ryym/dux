import { Dispatch } from './store'

type EffectProcess<S> = (
  dispatch: Dispatch<S>,
  getState: () => S
) => void

export class Effect<S> {
  constructor(
    public process: EffectProcess<S>
  ) {}
}

type HandlerExtraArgs<S> = {
  getState: () => S
}

export type Handler0<S> = (
  state: S,
  // d: Dispatch<S>,
  // args: HandlerExtraArgs<S>,
) => void | S | Effect<S>
export type Handler1<S, P> = (
  state: S,
  payload: P,
  // d: Dispatch<S>,
  // args: HandlerExtraArgs<S>,
) => void | S | Effect<S>

type AnyHandler<S, P> = Handler0<S> | Handler1<S, P>;

export type Command<S, P = void> = {
    name: string,
    payload: P,
    handler: AnyHandler<S, P>,
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

export const effect = <S>(process: EffectProcess<S>) =>
  new Effect(process)
