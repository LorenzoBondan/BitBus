import { makeRestClient } from '../rest/core/restClient'
import { atom, useAtom } from 'jotai'

const HOST = import.meta.env.VITE_BITBUS_BACKEND_HOST || 'http://localhost'
const PORT = import.meta.env.VITE_BITBUS_BACKEND_PORT || '8080'
const BACKEND_URL = `${HOST}:${PORT}`
const API_WAIT_TIMEOUT = import.meta.env.VITE_API_WAIT_TIMEOUT || 5000

const serverConfig = {
  defaultBaseUrl: BACKEND_URL,
  timeout: API_WAIT_TIMEOUT,
  verbose: false,
}

const restClientAtom = atom(makeRestClient(serverConfig))
export const useRestClient = () => {
  const [restClient, setRestClient] = useAtom(restClientAtom)

  return { restClient, setRestClient }
}
