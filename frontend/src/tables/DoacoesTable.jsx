import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { Table, TableName, ManageControls } from '../components/tables'
import Pagination from '../components/ui/Pagination'
import { useDeleteDoacao, useGetDoacoes } from '../rest/doacaoRestHooks'
import { useDeleteItem } from '../rest/itemAcervoRestHooks'

const propTypes = {}

const DoacoesTable = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetDoacoes({
    queryParams: { page, size: 15, sort: 'id,ASC' },
  })

  useEffect(() => {
    refetch({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // dynamic columns
  const doacaoTableColumns = useMemo(
    () =>
      pipe(
        append({ Header: 'Doador', accessor: 'item' }),
        append({ Header: 'Descrição', accessor: 'description' }),
        append({ Header: 'Ações', accessor: 'manage' })
      )([]),
    []
  )

  // dynamic table content
  const doacaoTableData = data.content.map((doacao) =>
    pipe(
      assoc('item', <DoacaoTableName {...{ doacao }} />),
      assoc('description', doacao?.descricao),
      assoc('manage', <DoacaoManage {...{ doacao }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && doacaoTableData.length === 0)
    return <div className={cn.noData}>Não foram encontradas doações.</div>

  return (
    <>
      <Table columns={doacaoTableColumns} data={doacaoTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

DoacoesTable.propTypes = propTypes

export default DoacoesTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const DoacaoTableName = ({ doacao }) => {
  return (
    <TableName name={doacao?.doador?.nome} subtext={doacao?.doador?.email} />
  )
}

DoacaoTableName.propTypes = {
  doacao: PT.object.isRequired,
}

const DoacaoList = ({ doacao }) => {
  const cn = {
    root: 'leading-4 whitespace-pre-wrap truncate max-w-60  line-clamp-3',
  }

  let text = ''
  if (doacao.valor)
    text += `${doacao.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}, `

  text += doacao.itensIds.map((don) => don).join(', ')

  return (
    <div className={cn.root} title={text}>
      {text}
    </div>
  )
}

DoacaoList.propTypes = {
  doacao: PT.object.isRequired,
}

const DoacaoManage = ({ doacao }) => {
  const navigate = useNavigate()
  const { deleteDoacao } = useDeleteDoacao()
  const { deleteItemAsync } = useDeleteItem()

  const onDelete = async () => {
    for (let i = 0; i < doacao.itensIds.length; i++) {
      await deleteItemAsync(doacao.itensIds[i])
    }
    deleteDoacao(doacao?.id)
  }

  const onView = () => navigate(`/doacoes/${doacao?.id}`)

  const onEdit = () => navigate(`/doacoes/${doacao?.id}/alterar`)

  const name = `doação de ${doacao.doador.nome}`

  return <ManageControls {...{ name, onDelete, onEdit, onView }} />
}

DoacaoManage.propTypes = {
  doacao: PT.object.isRequired,
}
