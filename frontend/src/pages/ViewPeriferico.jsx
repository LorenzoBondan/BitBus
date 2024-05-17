import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import Periferico from '../views/acervo/periferico/Periferico'
import { useGetPerifericoById } from '../rest/perifericoRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewPeriferico = ({ className }) => {
  const { id } = useParams()

  const { periferico, isLoading } = useGetPerifericoById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Periférico (Acervo)" title={periferico?.nome || ''} />
      <Periferico {...{ periferico }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/acervo/periferico/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/acervo'} />
    </div>
  )
}

ViewPeriferico.propTypes = propTypes

export default ViewPeriferico
