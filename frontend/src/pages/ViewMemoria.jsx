import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import Memoria from '../views/acervo/memoria/Memoria'
import { useGetMemoriaById } from '../rest/memoriaRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewMemoria = ({ className }) => {
  const { id } = useParams()

  const { memoria, isLoading } = useGetMemoriaById(id)

  if (isLoading) return <div>Loading...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Memória (Acervo)" title={memoria?.nome || ''} />
      <Memoria {...{ memoria }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/acervo/memoria/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/acervo'} />
    </div>
  )
}

ViewMemoria.propTypes = propTypes

export default ViewMemoria
