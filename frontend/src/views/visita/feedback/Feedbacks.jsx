import { useParams } from 'react-router-dom'
import PageTitle from '../../../components/ui/PageTitle'
import NavButton from '../../../components/buttons/NavButton'
import FeedbacksList from './FeedbacksList'

const Feedbacks = () => {
  const { idVisita } = useParams()

  const cn = {
    header: 'flex justify-between',
  }

  return (
    <div>
      <div className={cn.header}>
        <PageTitle title="Avaliações" />
        <NavButton linkto={'nova'} text={'Nova avaliação'} />
      </div>
      <FeedbacksList idVisita={idVisita} />
    </div>
  )
}

export default Feedbacks
