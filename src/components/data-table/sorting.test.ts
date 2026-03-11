import { describe, expect, it } from 'vitest'
import { getNextSortState, sortData } from './sorting'
import type { DataTableColumn } from './types'

type Row = {
  amount: string
  name: string
  rank?: number | null
}

const columns: DataTableColumn<Row>[] = [
  { accessorKey: 'name', header: 'Name', sortable: true },
  { accessorKey: 'amount', header: 'Amount', sortable: true },
]

describe('sorting helpers', () => {
  it('cycles sort state asc -> desc -> off', () => {
    expect(getNextSortState(null, 'name')).toEqual({ key: 'name', direction: 'asc' })
    expect(getNextSortState({ key: 'name', direction: 'asc' }, 'name')).toEqual({
      key: 'name',
      direction: 'desc',
    })
    expect(getNextSortState({ key: 'name', direction: 'desc' }, 'name')).toBeNull()
    expect(getNextSortState({ key: 'name', direction: 'asc' }, 'amount')).toEqual({
      key: 'amount',
      direction: 'asc',
    })
  })

  it('sorts rows by accessor value and preserves stable order on ties', () => {
    const data: Row[] = [
      { name: 'Charlie', amount: '30' },
      { name: 'Alpha', amount: '10' },
      { name: 'Alpha', amount: '20' },
    ]

    const asc = sortData(data, columns, { key: 'name', direction: 'asc' })
    expect(asc.map((row) => row.amount)).toEqual(['10', '20', '30'])

    const desc = sortData(data, columns, { key: 'name', direction: 'desc' })
    expect(desc.map((row) => row.name)).toEqual(['Charlie', 'Alpha', 'Alpha'])
    expect(desc[1]?.amount).toBe('10')
    expect(desc[2]?.amount).toBe('20')
  })

  it('supports custom sortAccessor', () => {
    const data: Row[] = [
      { name: 'A', amount: '30 GBP' },
      { name: 'B', amount: '5 GBP' },
      { name: 'C', amount: '12 GBP' },
    ]
    const sortColumns: DataTableColumn<Row>[] = [
      {
        accessorKey: 'amount',
        header: 'Amount',
        sortable: true,
        sortAccessor: (row) => Number(row.amount.split(' ')[0]),
      },
    ]

    const asc = sortData(data, sortColumns, { key: 'amount', direction: 'asc' })
    expect(asc.map((row) => row.amount)).toEqual(['5 GBP', '12 GBP', '30 GBP'])
  })
})

