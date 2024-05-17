import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import Placa from '../views/acervo/placa/Placa'
import { useGetPlacaById } from '../rest/placaRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewPlaca = ({ className }) => {
  const { id } = useParams()

  const { placa, isLoading } = useGetPlacaById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Placa (Acervo)" title={placa?.nome || ''} />
      <Placa {...{ placa }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/acervo/placa/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/acervo'} />
    </div>
  )
}

ViewPlaca.propTypes = propTypes

export default ViewPlaca
