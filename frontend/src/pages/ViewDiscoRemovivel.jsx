import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import DiscoRemovivel from '../views/acervo/discoRemovivel/DiscoRemovivel'
import { useGetDiscoRemovivelById } from '../rest/discoRemovivelRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewDiscoRemovivel = ({ className }) => {
  const { id } = useParams()

  const { discoRemovivel, isLoading } = useGetDiscoRemovivelById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Disco Removível (Acervo)" title={discoRemovivel?.nome || ''} />
      <DiscoRemovivel {...{ discoRemovivel }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/acervo/disco_removivel/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/acervo'} />
    </div>
  )
}

ViewDiscoRemovivel.propTypes = propTypes

export default ViewDiscoRemovivel
