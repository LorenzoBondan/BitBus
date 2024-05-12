import { Route, Routes, Navigate } from 'react-router-dom'
import Acervo from '../pages/Acervo'
import Visitas from '../pages/Visitas'
import Oficinas from '../pages/Oficinas'
import Doacoes from '../pages/Doacoes'
import CreateMemoria from '../pages/CreateMemoria'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'acervo'} />} />
      <Route path="acervo">
        <Route index element={<Acervo />} />
        <Route path="memoria">
          <Route path="novo" element={<CreateMemoria />} />
        </Route>
        <Route path="disco_removivel">
          <Route path="novo" element={<CreateMemoria />} />
        </Route>
        <Route path="periferico">
          <Route path="novo" element={<CreateMemoria />} />
        </Route>
        <Route path="placa">
          <Route path="novo" element={<CreateMemoria />} />
        </Route>
        <Route path="processador">
          <Route path="novo" element={<CreateMemoria />} />
        </Route>
        <Route path="software">
          <Route path="novo" element={<CreateMemoria />} />
        </Route>
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
  )
}

export default AppRoutes
