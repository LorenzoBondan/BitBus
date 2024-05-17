import PT from 'prop-types'
import { TextInput, nullFormContext } from '../components/forms/Form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from '../components/buttons/Button'
import EditIcon from '../components/icons/EditIcon'
import DeleteIcon from '../components/icons/DeleteIcon'

const propTypes = {
  className: PT.string,
}

const LinksForm = ({ className }) => {
  const { control, getValues, register, setValue, setError } =
    useFormContext() || nullFormContext
  const { append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  const cn = {
    root: `max-w-lg mt-8 ${className}`,
    title: 'my-3 text-slate-400 text-lg',
    listTitle: 'text-slate-500 text-right',
    list: 'mt-3 mb-8',
    listItem:
      'flex justify-between border-slate-600 border-t last:border-b py-2',
    infoContainer:
      'flex flex-col items-start justify-center text-sm text-zinc-400 break-all w-3/4 max-w-72 ',
    linkTag: 'hover:text-zinc-200',
    actionContainer: 'flex items-center',
    form: 'flex items-center gap-2',
    input: 'grow',
    button: 'mt-1',
    icon: 'cursor-pointer',
  }

  const onSubmit = async () => {
    const valid = await validateLink(getValues().temp_link, setError)

    if (valid) {
      const link = getValues().temp_link
      append(link)

      // Reset input values
      setValue('temp_link', { url: '' })
    }
  }

  const values = getValues()
  const showList = values.links && values.links.length > 0

  return (
    <div className={cn.root}>
      <div className={cn.title}>Links</div>
      <div className={cn.form}>
        <div className={cn.input}>
          <TextInput {...register('temp_link.url')} label="Link" />
        </div>
        <Button
          className={cn.button}
          text="Adicionar Link"
          onClick={onSubmit}
        />
      </div>

      {showList && (
        <div className={cn.list}>
          <div className={cn.listTitle}>Added links</div>
          {values.links.map((link, i) => (
            <div key={i} className={cn.listItem}>
              <div className={cn.infoContainer}>
                <a className={cn.linkTag} href={link.url} target="_blank">
                  {link.url}
                </a>
              </div>

              <div className={cn.actionContainer}>
                <EditIcon
                  highlightOnHover
                  className={cn.icon}
                  onClick={() => {
                    remove(i)
                    setValue('temp_link', link)
                  }}
                />
                <DeleteIcon
                  highlightOnHover
                  className={cn.icon}
                  onClick={() => {
                    remove(i)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

LinksForm.propTypes = propTypes

export default LinksForm

//*****************************************************************************
// Helper
//*****************************************************************************

function validateLink(link, setError) {
  let valid = true

  if (!link.url) {
    valid = false
    setError(`temp_link.url`, {
      message: 'Link é obrigatório',
      type: 'required',
    })
  }

  return valid
}
