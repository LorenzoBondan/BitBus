import { useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useGetMemorias, useDeleteMemoria } from '../rest/memoriaRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'

const MemoriasTable = () => {
  const { data, isLoading } = useGetMemorias()

  // dynamic columns
  const memoriaTableColumns = useMemo(() =>
    pipe(
      append({ Header: 'Nome', accessor: 'item' }),
      append({ Header: 'Dimensões', accessor: 'dimensions' }),
      append({
        Header: 'Quantidade',
        accessor: 'quantidade',
      }),
      append({ Header: 'Ações', accessor: 'manage' })
    )([])
  )

  // dynamic table content
  const memoriaTableData = data.content.map((mem) =>
    pipe(
      assoc('item', <MemoriaTableName {...{ mem }} />),
      assoc('dimensions', <Dimensions {...{ mem }} />),
      assoc('quantidade', mem?.quantidade),
      assoc('manage', <MemoriaManage {...{ mem }} />)
    )({})
  )

  if (isLoading) return <div>Loading...</div>

  return <Table columns={memoriaTableColumns} data={memoriaTableData} />
}

export default MemoriasTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const MemoriaTableName = ({ mem }) => {
  return <TableName name={mem?.nome} subtext={`Ano: ${mem.ano}`} />
}

MemoriaTableName.propTypes = {
  mem: PT.object.isRequired,
}

const Dimensions = ({ mem }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={mem?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={mem?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={mem?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  mem: PT.object.isRequired,
}

const MemoriaManage = ({ mem }) => {
  const navigate = useNavigate()
  const { nome } = mem
  const { deleteMemoria } = useDeleteMemoria()

  const onDelete = () => deleteMemoria(mem?.id)

  const onView = () => navigate(`/acervo/memoria/${mem?.id}`)

  const onEdit = () => navigate(`/acervo/memoria/${mem?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

MemoriaManage.propTypes = {
  mem: PT.object.isRequired,
}
