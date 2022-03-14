import { useContext } from 'react'
import { ProgressIndicatorsContext } from '../providers/ProgressIndicatorsProvider'

export default function App() {
  const { dispatch } = useContext(ProgressIndicatorsContext)

  const spawnProgress = () => {
    dispatch({ type: 'create' })
  }

  return <button onClick={spawnProgress}>Spawn progress indicator</button>
}
