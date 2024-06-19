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
import CreateDiscoRemovivel from '../pages/CreateDiscoRemovivel'
import ViewDiscoRemovivel from '../pages/ViewDiscoRemovivel'
import UpdateDiscoRemovivel from '../pages/UpdateDiscoRemovivel'
import UpdatePeriferico from '../pages/UpdatePeriferico'
import ViewPeriferico from '../pages/ViewPeriferico'
import CreatePeriferico from '../pages/CreatePeriferico'
import CreatePlaca from '../pages/CreatePlaca'
import ViewPlaca from '../pages/ViewPlaca'
import UpdatePlaca from '../pages/UpdatePlaca'
import CreateSoftware from '../pages/CreateSoftware'
import ViewSoftware from '../pages/ViewSoftware'
import UpdateSoftware from '../pages/UpdateSoftware'
import Pessoas from '../pages/Pessoas'
import CreatePessoa from '../pages/CreatePessoa'
import UpdatePessoa from '../pages/UpdatePessoa'
import ViewPessoa from '../pages/ViewPessoa'
import CreateDoacao from '../pages/CreateDoacao'
import ViewDoacao from '../pages/ViewDoacao'
import UpdateDoacao from '../pages/UpdateDoacao'
import CreateVisita from '../pages/CreateVisita'
import ViewVisita from '../pages/ViewVisita'
import UpdateVisita from '../pages/UpdateVisita'
import CreateOficina from '../pages/CreateOficina'
import ViewOficina from '../pages/ViewOficina'
import UpdateOficina from '../pages/UpdateOficina'

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
          <Route path="novo" element={<CreateDiscoRemovivel />} />
          <Route path=":id" element={<ViewDiscoRemovivel />} />
          <Route path=":id/alterar" element={<UpdateDiscoRemovivel />} />
        </Route>
        <Route path="periferico">
          <Route path="novo" element={<CreatePeriferico />} />
          <Route path=":id" element={<ViewPeriferico />} />
          <Route path=":id/alterar" element={<UpdatePeriferico />} />
        </Route>
        <Route path="placa">
          <Route path="novo" element={<CreatePlaca />} />
          <Route path=":id" element={<ViewPlaca />} />
          <Route path=":id/alterar" element={<UpdatePlaca />} />
        </Route>
        <Route path="processador">
          <Route path="novo" element={<CreateProcessador />} />
          <Route path=":id" element={<ViewProcessador />} />
          <Route path=":id/alterar" element={<UpdateProcessador />} />
        </Route>
        <Route path="software">
          <Route path="novo" element={<CreateSoftware />} />
          <Route path=":id" element={<ViewSoftware />} />
          <Route path=":id/alterar" element={<UpdateSoftware />} />
        </Route>
      </Route>
      <Route path="visitas">
        <Route index element={<Visitas />} />
        <Route path="nova" element={<CreateVisita />} />
        <Route path=":idVisita" element={<ViewVisita />} />
        <Route path=":idVisita/alterar" element={<UpdateVisita />} />
        <Route path="feedbacks">
          <Route index element={<></>} />
          <Route path="nova" element={<></>} />
          <Route path=":idFeedback" element={<></>} />
          <Route path=":idFeedback/alterar" element={<></>} />
        </Route>
      </Route>
      <Route path="pessoas">
        <Route index element={<Pessoas />} />
        <Route path="nova" element={<CreatePessoa />} />
        <Route path=":id" element={<ViewPessoa />} />
        <Route path=":id/alterar" element={<UpdatePessoa />} />
      </Route>
      <Route path="oficinas">
        <Route index element={<Oficinas />} />
        <Route path="nova" element={<CreateOficina />} />
        <Route path=":id" element={<ViewOficina />} />
        <Route path=":id/alterar" element={<UpdateOficina />} />
      </Route>
      <Route path="doacoes">
        <Route index element={<Doacoes />} />
        <Route path="nova" element={<CreateDoacao />} />
        <Route path=":id" element={<ViewDoacao />} />
        <Route path=":id/alterar" element={<UpdateDoacao />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
