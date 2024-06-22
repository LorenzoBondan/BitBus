import PT from 'prop-types'
import { useGetVisitaById } from '../../../rest/visitaRestHooks'
import { useGetPessoaById } from '../../../rest/pessoaRestHooks'
import DeleteIcon from '../../../components/icons/DeleteIcon'
import Confirm from '../../../components/ui/Confirm'
import { useDeleteFeedback } from '../../../rest/feedbackRestHooks'
import { useState } from 'react'
import altImage from '../../../assets/no-image.jpg'

const propTypes = {
  idVisita: PT.string,
}

const FeedbacksList = ({ idVisita }) => {
  const { isLoading, visita } = useGetVisitaById(idVisita)
  const { feedbacks = [] } = visita

  const cn = {
    noData: 'text-center',
    loading: 'text-center',
    grid: 'grid grid-cols-* sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2',
  }

  if (isLoading) return <div className={cn.loading}>Carregando...</div>
  if (!isLoading && feedbacks.length === 0)
    return <div className={cn.noData}>Não foram encontradas avaliações.</div>

  return (
    <div className={cn.grid}>
      {feedbacks.map((feedback) => (
        <CardFeedback
          key={feedback.id}
          idVisita={idVisita}
          feedback={feedback}
        />
      ))}
    </div>
  )
}

FeedbacksList.propTypes = propTypes
export default FeedbacksList

const CardFeedback = ({ feedback, idVisita }) => {
  const { isLoading, pessoa } = useGetPessoaById(feedback.autorId)
  const { deleteFeedback } = useDeleteFeedback(idVisita)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const cn = {
    container:
      'group bg-gray-600 relative rounded-lg max-w-sm overflow-hidden flex items-center flex-col',
    skeleton: 'animate-pulse bg-gray-600/50 w-[80px] h-[18px] rounded-lg',
    imageContainer: 'max-h-36 flex-1 flex items-center justify-center',
    image: '',
    content: 'p-2 w-full bg-gray-200 flex-1',
    autor: 'font-semibold text-gray-800',
    comentario: 'text-sm text-gray-700',
    actions:
      'hidden absolute top-1 right-1 gap-2 group-hover:flex bg-black/50 rounded-lg p-1 cursor-pointer',
    icons: '',
  }

  return (
    <div className={cn.container}>
      <Confirm
        modalTitle="Confirmar Remoção"
        modalSubtitle={`Você tem certeza que deseja deletar a avaliação de ${pessoa.nome}?`}
        modalIsOpen={confirmModalOpen}
        onDeny={() => setConfirmModalOpen(false)}
        onAccept={() => {
          setConfirmModalOpen(false)
          deleteFeedback(feedback.id)
        }}
      />
      <div className={cn.imageContainer}>
        <div
          className={cn.actions}
          onClick={() => setConfirmModalOpen(true)}
          title="Deletar"
        >
          <DeleteIcon />
        </div>
        <img className={cn.image} src={feedback.imgUrl || altImage} />
      </div>
      <div className={cn.content}>
        <div className={cn.autor}>
          {isLoading ? <div className={cn.skeleton} /> : pessoa.nome}
        </div>
        <div className={cn.comentario}>&quot;{feedback.comentario}&quot;</div>
      </div>
    </div>
  )
}

CardFeedback.propTypes = {
  feedback: PT.object,
  idVisita: PT.string,
}
