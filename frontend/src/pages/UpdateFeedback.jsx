import { useParams } from 'react-router-dom'
import {
  useGetFeedbackById,
  useUpdateFeedback,
} from '../rest/feedbackRestHooks'
import FeedbackForm from '../forms/FeedbackForm'

const UpdateFeedback = () => {
  const { idVisita, idFeedback } = useParams()

  const { feedback, isLoading } = useGetFeedbackById(idFeedback)

  const { updateFeedback } = useUpdateFeedback(idFeedback, {
    onSuccess: { routeTo: `/visitas/${idVisita}/feedbacks` },
  })

  const onSubmit = async (data) => {
    await updateFeedback(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <FeedbackForm
      navToOnCancel={`/visitas/${idVisita}/feedbacks`}
      initialFeedbackData={feedback}
      title={'Alterar Feedback'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateFeedback
