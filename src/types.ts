export type ProgressIndicatorType = {
  id: number
  status: 'pending' | 'success' | 'error'
  percentage: number
}

export type ActionTypes =
  | { type: 'create' }
  | { type: 'updateStatus'; payload: { id: ProgressIndicatorType['id']; status: ProgressIndicatorType['status'] } }
  | {
      type: 'updatePercentage'
      payload: { id: ProgressIndicatorType['id']; percentage: ProgressIndicatorType['percentage'] }
    }
  | { type: 'cancel'; payload: { id: ProgressIndicatorType['id'] } }

export type ContextType = {
  state: ProgressIndicatorType[]
  dispatch: (action: ActionTypes) => void
}
