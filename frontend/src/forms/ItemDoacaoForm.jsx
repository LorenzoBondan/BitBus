import PT from 'prop-types'
import { SubmitButton } from '../components/forms/Form'
import Button from '../components/buttons/Button'
import { useState } from 'react'
import MemoriaoForm from './MemoriaForm'
import ProcessadorForm from './ProcessadorForm'
import DiscoRemovivelForm from './DiscoRemovivelForm'
import PerifericoForm from './PerifericoForm'
import SoftwareForm from './SoftwareForm'
import PlacaForm from './PlacaForm'
import Panel from '../components/ui/Panel'
import PanelTitle from '../components/ui/PanelTitle'
import { useHandleOpenForm } from '../state/appState'
import { useCreateMemoria } from '../rest/memoriaRestHooks'
import { useCreateDiscoRemovivel } from '../rest/discoRemovivelRestHooks'
import { useCreatePeriferico } from '../rest/perifericoRestHooks'
import { useCreatePlaca } from '../rest/placaRestHooks'
import { useCreateProcessador } from '../rest/processadorRestHooks'
import { useCreateSoftware } from '../rest/softwareRestHooks'

const propTypes = {
  className: PT.string,
}

const ItemDoacaoForm = ({ className }) => {
  const { setOpenItemAcervoForm } = useHandleOpenForm()
  const { createMemoria } = useCreateMemoria()
  const { createDiscoRemovivel } = useCreateDiscoRemovivel()
  const { createPeriferico } = useCreatePeriferico()
  const { createPlaca } = useCreatePlaca()
  const { createProcessador } = useCreateProcessador()
  const { createSoftware } = useCreateSoftware()
  const [step, setStep] = useState(0)
  const [itemType, setItemType] = useState('')

  const nextStep = (value) => {
    setItemType(value)
    setStep(1)
  }

  const onSubmit = async (data) => {
    switch (itemType) {
      case 'memoria':
        await createMemoria(data)
        break
      case 'processador':
        await createProcessador(data)
        break
      case 'discoRemovivel':
        await createDiscoRemovivel(data)
        break
      case 'periferico':
        await createPeriferico(data)
        break
      case 'software':
        await createSoftware(data)
        break
      case 'placa':
        await createPlaca(data)
        break
    }
    setOpenItemAcervoForm(false)
  }

  const cn = {
    root: `${className}`,
    buttonContainer: 'flex justify-end gap-2',
  }

  const buttonContainer = (
    <div className={cn.buttonContainer}>
      <Button
        onClick={() => {
          setStep(0)
          setOpenItemAcervoForm(false)
        }}
        text="Cancelar"
      />
      <SubmitButton />
    </div>
  )

  const getFormFromType = () => {
    switch (itemType) {
      case 'memoria':
        return (
          <MemoriaoForm onSubmit={onSubmit} buttonContainer={buttonContainer} />
        )
      case 'processador':
        return (
          <ProcessadorForm
            onSubmit={onSubmit}
            buttonContainer={buttonContainer}
          />
        )
      case 'discoRemovivel':
        return (
          <DiscoRemovivelForm
            onSubmit={onSubmit}
            buttonContainer={buttonContainer}
          />
        )
      case 'periferico':
        return (
          <PerifericoForm
            onSubmit={onSubmit}
            buttonContainer={buttonContainer}
          />
        )
      case 'software':
        return (
          <SoftwareForm onSubmit={onSubmit} buttonContainer={buttonContainer} />
        )
      case 'placa':
        return (
          <PlacaForm onSubmit={onSubmit} buttonContainer={buttonContainer} />
        )
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <ItemTypeSelection
            setItemType={nextStep}
            onCancel={() => setOpenItemAcervoForm(false)}
          />
        )
      case 1:
        return getFormFromType()
    }
  }

  return (
    <div className={cn.root}>
      <div>{renderStep()}</div>
    </div>
  )
}

ItemDoacaoForm.propTypes = propTypes

export default ItemDoacaoForm

//*****************************************************************************
// Helper
//*****************************************************************************

const ItemTypeSelection = ({ setItemType, onCancel }) => {
  const cn = {
    container: '',
    grid: 'grid gap-2 grid-cols-2 mt-4',
    item: 'hover:bg-slate-600 cursor-pointer w-40 text-center rounded bg-slate-700 p-3',
    buttonContainer: 'flex mt-4 justify-end',
  }

  const types = [
    { text: 'Memória', value: 'memoria' },
    { text: 'Processador', value: 'processador' },
    { text: 'Disco removível', value: 'discoRemovivel' },
    { text: 'Periférico', value: 'periferico' },
    { text: 'Software', value: 'software' },
    { text: 'Placa', value: 'placa' },
  ]

  return (
    <Panel className={cn.container}>
      <PanelTitle text="Escolha o tipo do item doado" />
      <div className={cn.grid}>
        {types.map((type) => (
          <div
            className={cn.item}
            key={type.value}
            onClick={() => setItemType(type.value)}
          >
            {type.text}
          </div>
        ))}
      </div>
      <div className={cn.buttonContainer}>
        <Button text="Cancelar" onClick={onCancel} />
      </div>
    </Panel>
  )
}

ItemTypeSelection.propTypes = {
  setItemType: PT.func,
  onCancel: PT.func,
}
