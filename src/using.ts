export type FuncWithDep<F, D> = F & { using: (dep: D) => F }

export default function using<D>(dep: D) {
  return <R>(f: (dep: D) => R): FuncWithDep<R, D> => {
    return Object.assign(f(dep), { using: f })
  }
}
