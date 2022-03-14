import type { ProgressIndicatorType } from '../types'
import { useState, useEffect, useRef, useContext } from 'react'
import { ProgressIndicatorsContext } from '../providers/ProgressIndicatorsProvider'
import { randomInt } from '../utils'

export default function ProgressIndicators() {
  const { state } = useContext(ProgressIndicatorsContext)

  return (
    <div className="progressIndicatorsList">
      {state.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )
}

function Item({ id, status, percentage }: ProgressIndicatorType) {
  const timeoutRef = useRef<number>()
  const [isFinished, setIsFinished] = useState(false)
  const { dispatch } = useContext(ProgressIndicatorsContext)

  const cancel = () => {
    // Here we should also inform the backend that the upload should be cancelled.
    // We may also have separate actions for cancelling the upload and clicking "Done" button.
    dispatch({ type: 'cancel', payload: { id } })
  }

  useEffect(() => {
    if (status === 'success') {
      timeoutRef.current = window.setTimeout(() => setIsFinished(true), 1000)
      return
    }

    if (percentage === 100) {
      // Instead of waiting for progress to be 100, we can also wait for the backend to respond with status 'success'.
      // But for this proof of concept we need to mock that response.
      dispatch({ type: 'updateStatus', payload: { id, status: 'success' } })

      return
    }

    if (status === 'pending') {
      // Instead of this mocked timeout here, we would subscribe to some backend event.
      timeoutRef.current = window.setTimeout(
        () => dispatch({ type: 'updatePercentage', payload: { id, percentage: randomInt() } }),
        500
      )
    }
  }, [id, status, percentage, dispatch])

  // We need to clear the timeout on unmount.
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <div className="progressIndicator">
      <span>{isFinished ? 'Done' : percentage + '%'}</span>
      <button onClick={cancel}>{isFinished ? 'Close' : 'Cancel'}</button>
    </div>
  )
}
