import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import Pessoa from '../views/pessoa/Pessoa'
import { useGetPessoaById } from '../rest/pessoaRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewPessoa = ({ className }) => {
  const { id } = useParams()

  const { pessoa, isLoading } = useGetPessoaById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }
  console.log(pessoa)
  return (
    <div className={cn.root}>
      <PageTitle upperText="Pessoa" title={pessoa?.nome || ''} />
      <Pessoa {...{ pessoa }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/pessoas/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/pessoas'} />
    </div>
  )
}

ViewPessoa.propTypes = propTypes

export default ViewPessoa
