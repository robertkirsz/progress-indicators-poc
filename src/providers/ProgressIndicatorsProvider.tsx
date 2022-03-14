import type { ProgressIndicatorType, ActionTypes, ContextType } from '../types'
import { createContext, useReducer } from 'react'
import { clamp } from '../utils'

function reducer(state: ProgressIndicatorType[], action: ActionTypes): ProgressIndicatorType[] {
  if (action.type === 'create') {
    return [...state, { id: Date.now(), status: 'pending', percentage: 0 }]
  }

  if (action.type === 'updateStatus') {
    return state.map(item => (item.id === action.payload.id ? { ...item, status: action.payload.status } : item))
  }

  if (action.type === 'updatePercentage') {
    return state.map(item =>
      item.id === action.payload.id
        ? { ...item, percentage: clamp(0, item.percentage + action.payload.percentage, 100) }
        : item
    )
  }

  if (action.type === 'cancel') {
    return state.filter(item => item.id !== action.payload.id)
  }

  return state
}

const initialState: ProgressIndicatorType[] = []

export const ProgressIndicatorsContext = createContext<ContextType>({ state: initialState, dispatch: () => {} })

export default function ProgressIndicatorsProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <ProgressIndicatorsContext.Provider value={{ state, dispatch }} {...props} />
}
