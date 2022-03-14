import { render } from 'react-dom'
import App from './components/App'
import ProgressIndicatorsProvider from './providers/ProgressIndicatorsProvider'
import ProgressIndicators from './components/ProgressIndicators'
import './index.css'

render(
  <ProgressIndicatorsProvider>
    <>
      <App />
      <ProgressIndicators />
    </>
  </ProgressIndicatorsProvider>,
  document.getElementById('root')
)
