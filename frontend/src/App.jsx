import { BrowserRouter } from 'react-router-dom'
import AppContainer from './layout/AppContainer'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const client = new QueryClient()

  return (
    <QueryClientProvider {...{ client }}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
