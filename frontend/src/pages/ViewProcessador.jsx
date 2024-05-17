import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import Processador from '../views/acervo/processador/Processador'
import { useGetProcessadorById } from '../rest/processadorRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewProcessador = ({ className }) => {
  const { id } = useParams()

  const { processador, isLoading } = useGetProcessadorById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Processador (Acervo)" title={processador?.nome || ''} />
      <Processador {...{ processador }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/acervo/processador/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/acervo'} />
    </div>
  )
}

ViewProcessador.propTypes = propTypes

export default ViewProcessador
