import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import Software from '../views/acervo/software/Software'
import { useGetSoftwareById } from '../rest/softwareRestHooks'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewSoftware = ({ className }) => {
  const { id } = useParams()

  const { software, isLoading } = useGetSoftwareById(id)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
  }

  return (
    <div className={cn.root}>
      <PageTitle upperText="Software (Acervo)" title={software?.nome || ''} />
      <Software {...{ software }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/acervo/software/${id}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/acervo'} />
    </div>
  )
}

ViewSoftware.propTypes = propTypes

export default ViewSoftware
