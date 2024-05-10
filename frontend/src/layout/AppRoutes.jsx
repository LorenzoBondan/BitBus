import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import Acervo from '../pages/Acervo'
import Visitas from '../pages/Visitas'
import Oficinas from '../pages/Oficinas'
import Doacoes from '../pages/Doacoes'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={'acervo'} />} />
        <Route path="acervo">
          <Route index element={<Acervo />} />
        </Route>
        <Route path="visitas">
          <Route index element={<Visitas />} />
        </Route>
        <Route path="oficinas">
          <Route index element={<Oficinas />} />
        </Route>
        <Route path="doacoes">
          <Route index element={<Doacoes />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
