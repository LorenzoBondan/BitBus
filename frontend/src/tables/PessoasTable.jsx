import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { Table, TableName, ManageControls } from '../components/tables'
import Pagination from '../components/ui/Pagination'
import { useDeletePessoa, useGetPessoas } from '../rest/pessoaRestHooks'

const propTypes = {
  filters: PT.object,
}

const PessoasTable = ({ filters }) => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetPessoas({
    queryParams: { page, size: 15, sort: 'nome,ASC', ...filters },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters])

  // dynamic columns
  const pessoaTableColumns = useMemo(
    () =>
      pipe(
        append({ Header: '', accessor: 'item' }),
        append({ Header: 'Função', accessor: 'funcao' }),
        append({ Header: 'Ações', accessor: 'manage' })
      )([]),
    []
  )

  // dynamic table content
  const pessoaTableData = data.content.map((pes) =>
    pipe(
      assoc('item', <PessoaTableName {...{ pes }} />),
      assoc('funcao', <Papeis papeis={pes?.papeis} />),
      assoc('manage', <PessoaManage {...{ pes }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && pessoaTableData.length === 0)
    return <div className={cn.noData}>Não foram encontradas pessoas.</div>

  return (
    <>
      <Table columns={pessoaTableColumns} data={pessoaTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

PessoasTable.propTypes = propTypes

export default PessoasTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const PessoaTableName = ({ pes }) => {
  return <TableName name={pes?.nome} subtext={`Email: ${pes.email}`} />
}

PessoaTableName.propTypes = {
  pes: PT.object.isRequired,
}

const Papeis = ({ papeis = [] }) => {
  return papeis.map((p) => p.descricao).join(', ')
}

Papeis.propTypes = {
  papeis: PT.arrayOf(PT.object),
}

const PessoaManage = ({ pes }) => {
  const navigate = useNavigate()
  const { nome } = pes
  const { deletePessoa } = useDeletePessoa()

  const onDelete = () => deletePessoa(pes?.id)

  const onView = () => navigate(`/pessoas/${pes?.id}`)

  const onEdit = () => navigate(`/pessoas/${pes?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

PessoaManage.propTypes = {
  pes: PT.object.isRequired,
}
