export const classificacaoPlaca = {
  EATX: 'EATX',
  ATX: 'ATX',
  MICROATX: 'MICROATX',
  MINIATX: 'MINIATX',
}

export const classificacaoPlacaSelectOptions = Object.keys(
  classificacaoPlaca
).map((k) => {
  return { label: k, value: k }
})
