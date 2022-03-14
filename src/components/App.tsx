import { useContext } from 'react'
import { ProgressIndicatorsContext } from '../providers/ProgressIndicatorsProvider'

export default function App() {
  const { dispatch } = useContext(ProgressIndicatorsContext)

  const spawnProgress = () => {
    // This will happen, for example, when user uploads a file.
    // We may pass here and ID we get from the backend and some other metadata.
    dispatch({ type: 'create' })
  }

  return <button onClick={spawnProgress}>Spawn progress indicator</button>
}
