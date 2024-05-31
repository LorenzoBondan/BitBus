import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const ItemAcervoTabAtom = atomWithStorage('itemAcervoTab', 'memoria')
export const useItemAcervoTab = () => {
  const [itemAcervoTab, setItemAcervoTab] = useAtom(ItemAcervoTabAtom)

  return { itemAcervoTab, setItemAcervoTab }
}

const OpenTipoItemFormAtom = atom(false)
export const useOpenTipoItemForm = () => {
  const [openTipoItemForm, setOpenTipoItemForm] = useAtom(OpenTipoItemFormAtom)

  return { openTipoItemForm, setOpenTipoItemForm }
}
