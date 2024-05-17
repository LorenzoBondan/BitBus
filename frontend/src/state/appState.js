import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const ItemAcervoTabAtom = atomWithStorage('itemAcervoTab', 'memoria')
export const useItemAcervoTab = () => {
    const [itemAcervoTab, setItemAcervoTab] = useAtom(ItemAcervoTabAtom)

    return {itemAcervoTab, setItemAcervoTab}
}

