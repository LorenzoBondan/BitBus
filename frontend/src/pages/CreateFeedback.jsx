import { useParams } from 'react-router-dom'
import { useCreateFeedback } from '../rest/feedbackRestHooks'
import FeedbackForm from '../forms/FeedbackForm'

const CreateFeedback = () => {
  const { idVisita } = useParams()
  const { createFeedback } = useCreateFeedback({
    onSuccess: { routeTo: `/visitas/${idVisita}/feedbacks` },
  })

  const onSubmit = async (data) => {
    const feedback = { ...data, visitaId: idVisita }
    await createFeedback(feedback)
  }

  return (
    <FeedbackForm
      navToOnCancel={`/visitas/${idVisita}/feedbacks`}
      title={'Novo Feedback'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateFeedback
