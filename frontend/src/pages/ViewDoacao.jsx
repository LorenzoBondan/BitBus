import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import { useGetDoacaoById } from '../rest/doacaoRestHooks'
import Doacao from '../views/doacao/Doacao'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewDoacao = ({ className }) => {
  const { id } = useParams()

  const { doacao, isLoading } = useGetDoacaoById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Doação" title={doacao?.descricao || ''} />
      <Doacao {...{ doacao }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/doacoes/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/doacoes'} />
    </div>
  )
}

ViewDoacao.propTypes = propTypes

export default ViewDoacao
