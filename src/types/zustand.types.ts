import { StoreApi, UseBoundStore } from 'zustand'

export interface ZustandFuncSelectors<StateType> {
  use: {
    [key in keyof StateType]: () => StateType[key]
  }
}

export function createSelectors<StateType extends object>(store: StateType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeIn = store as any

  storeIn.use = {}

  Object.keys(storeIn.getState()).forEach(key => {
    const selector = (state: StateType) => state[key as keyof StateType]
    storeIn.use[key] = () => storeIn(selector)
  })

  return store as UseBoundStore<StoreApi<StateType>> &
    ZustandFuncSelectors<StateType>
}
