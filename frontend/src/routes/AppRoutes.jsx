import { Route, Routes, Navigate } from 'react-router-dom'
import Acervo from '../pages/Acervo'
import Visitas from '../pages/Visitas'
import Oficinas from '../pages/Oficinas'
import Doacoes from '../pages/Doacoes'
import CreateMemoria from '../pages/CreateMemoria'
import UpdateMemoria from '../pages/UpdateMemoria'
import ViewMemoria from '../pages/ViewMemoria'
import UpdateProcessador from '../pages/UpdateProcessador'
import CreateProcessador from '../pages/CreateProcessador'
import ViewProcessador from '../pages/ViewProcessador'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'acervo'} />} />
      <Route path="acervo">
        <Route index element={<Acervo />} />
        <Route path="memoria">
          <Route path="novo" element={<CreateMemoria />} />
          <Route path=":id" element={<ViewMemoria />} />
          <Route path=":id/alterar" element={<UpdateMemoria />} />
        </Route>
        <Route path="disco_removivel">
        <Route path="novo" element={<CreateMemoria />} />
          <Route path=":id" element={<ViewMemoria />} />
          <Route path=":id/alterar" element={<UpdateMemoria />} />
        </Route>
        <Route path="periferico">
        <Route path="novo" element={<CreateMemoria />} />
          <Route path=":id" element={<ViewMemoria />} />
          <Route path=":id/alterar" element={<UpdateMemoria />} />
        </Route>
        <Route path="placa">
        <Route path="novo" element={<CreateMemoria />} />
          <Route path=":id" element={<ViewMemoria />} />
          <Route path=":id/alterar" element={<UpdateMemoria />} />
        </Route>
        <Route path="processador">
          <Route path="novo" element={<CreateProcessador />} />
          <Route path=":id" element={<ViewProcessador />} />
          <Route path=":id/alterar" element={<UpdateProcessador />} />
        </Route>
        <Route path="software">
        <Route path="novo" element={<CreateMemoria />} />
          <Route path=":id" element={<ViewMemoria />} />
          <Route path=":id/alterar" element={<UpdateMemoria />} />
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
