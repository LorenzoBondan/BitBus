import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const ItemAcervoTabAtom = atomWithStorage('itemAcervoTab', 'memoria')
export const useItemAcervoTab = () => {
  const [itemAcervoTab, setItemAcervoTab] = useAtom(ItemAcervoTabAtom)

  return { itemAcervoTab, setItemAcervoTab }
}

const PessoaTabAtom = atomWithStorage('pessoaTab', '')
export const usePessoaTab = () => {
  const [pessoaTab, setPessoaTab] = useAtom(PessoaTabAtom)

  return { pessoaTab, setPessoaTab }
}

const OpenTipoItemFormAtom = atom(false)
const OpenPapelFormAtom = atom(false)
const OpenItemAcervoFormAtom = atom(false)
export const useHandleOpenForm = () => {
  const [openTipoItemForm, setOpenTipoItemForm] = useAtom(OpenTipoItemFormAtom)
  const [openPapelForm, setOpenPapelForm] = useAtom(OpenPapelFormAtom)
  const [openItemAcervoForm, setOpenItemAcervoForm] = useAtom(
    OpenItemAcervoFormAtom
  )

  const toogleForm = (form) => {
    switch (form) {
      case 'tipoItem':
        setOpenTipoItemForm(!openTipoItemForm)
        break
      case 'papel':
        setOpenPapelForm(!openPapelForm)
        break
      case 'itemAcervo':
        setOpenItemAcervoForm(!openItemAcervoForm)
    }
  }

  return {
    openPapelForm,
    openTipoItemForm,
    openItemAcervoForm,
    toogleForm,
    setOpenPapelForm,
    setOpenTipoItemForm,
    setOpenItemAcervoForm,
  }
}
