import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import { useGetOficinaById } from '../rest/oficinaRestHooks'
import Oficina from '../views/oficina/Oficina'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewOficina = ({ className }) => {
  const { id } = useParams()

  const { oficina, isLoading } = useGetOficinaById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Oficina" title={Oficina.titulo} />
      <Oficina {...{ oficina }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/oficinas/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/oficinas'} />
    </div>
  )
}

ViewOficina.propTypes = propTypes

export default ViewOficina
