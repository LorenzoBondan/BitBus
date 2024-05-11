import Table from './Table'

const AcervoTable = () => {
  const columns = [{ accessorKey: 'ID', header: 'id' }]
  const data = []

  return <Table columns={columns} data={data} />
}

export default AcervoTable
