import PT from 'prop-types'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import NavButton from '../components/buttons/NavButton'
import { useGetVisitaById } from '../rest/visitaRestHooks'
import Visita from '../views/visita/Visita'
import { dateTimeFormatter } from '../utils/generalUtils'

const propTypes = {
  className: PT.string, // applied to root container
}

const ViewVisita = ({ className }) => {
  const { idVisita } = useParams()

  const { visita, isLoading } = useGetVisitaById(idVisita)

  if (isLoading) return <div>Carregando...</div>

  const cn = {
    root: ` ${className}`,
    editButton: 'mt-8 mr-4 float-right',
    header: 'flex justify-between',
  }

  const title = dateTimeFormatter(visita.dataInicio)

  return (
    <div className={cn.root}>
      <div className={cn.header}>
        <PageTitle upperText="Visita" title={title} />
        <NavButton linkto={'feedbacks'} text="Feedbacks" />
      </div>
      <Visita {...{ visita }} />

      <NavButton
        className={cn.editButton}
        text="Editar"
        linkto={`/visitas/${idVisita}/alterar`}
      />
      <NavButton className={cn.editButton} text="Voltar" linkto={'/visitas'} />
    </div>
  )
}

ViewVisita.propTypes = propTypes

export default ViewVisita
