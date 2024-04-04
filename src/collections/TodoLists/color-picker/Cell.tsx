import { Props } from 'payload/components/views/Cell'
import React from 'react'
import './styles.scss'

const Cell: React.FC<Props> = props => {
  const { cellData, rowData } = props

  if (!cellData) return null

  return <button onClick={() => console.log(rowData.id)}>x</button>
}

export default Cell
