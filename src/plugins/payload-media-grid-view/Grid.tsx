import 'payload/dist/admin/components/elements/Table/index.scss'
import { Column } from 'payload/dist/admin/components/elements/Table/types'
import { useTableColumns } from 'payload/dist/admin/components/elements/TableColumns'
import { SanitizedCollectionConfig } from 'payload/types'
import React from 'react'

import './grid.scss'

const baseClass = 'grid'

type Props = {
  data: any[]
  collection: SanitizedCollectionConfig
}

const fieldNames = {
  filename: 'filename',
  select: '_select',
}

export const Grid: React.FC<Props> = ({ data, collection }) => {
  const { columns: columnsFromContext } = useTableColumns()

  const fields = columnsFromContext
  const otherFields = fields?.filter(
    col =>
      col.active &&
      ![fieldNames.filename, fieldNames.select].includes(col.accessor),
  )

  const filenameField = fields.find(col => col.accessor === fieldNames.filename)
  const selectorField = fields.find(col => col.accessor === fieldNames.select)

  const headerColumns = fields
    .sort((a, b) => {
      const sortingValue = (value: Column) => {
        switch (value.accessor) {
          case fieldNames.select:
            return 2
          case fieldNames.filename:
            return 1
          default:
            return 0
        }
      }
      return sortingValue(b) - sortingValue(a)
    })
    .filter(
      ({ active, accessor }) => active || accessor === fieldNames.filename,
    )

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__header`}>
        {headerColumns.map((col, index) => {
          return (
            <div key={index} id={`heading-${col.accessor}`}>
              {col.components.Heading}
            </div>
          )
        })}
      </div>
      <div className={`${baseClass}__cells`}>
        {data &&
          data.map((gridCell, cellIndex) => (
            <div key={cellIndex} className={`${baseClass}__cells__cell`}>
              {filenameField && (
                <div className={`${baseClass}__cells__cell__filename`}>
                  {filenameField.components.renderCell(
                    gridCell,
                    gridCell[filenameField.accessor],
                  )}
                </div>
              )}
              {selectorField && (
                <div className={`${baseClass}__cells__cell__selector`}>
                  {selectorField.components.renderCell(
                    gridCell,
                    gridCell[selectorField.accessor],
                  )}
                </div>
              )}
              {/* <div className={`${baseClass}__cells__cell__info`}>
                {filenameField && (
                  <div className={`${baseClass}__cells__cell__title`}>
                    {String(gridCell[filenameField.accessor])}
                  </div>
                )}
                {otherFields.length > 0 && (
                  <div className={`${baseClass}__cells__cell__others`}>
                    {otherFields.map((col, colIndex) => (
                      <Fragment key={colIndex}>
                        {col.components.renderCell(
                          gridCell,
                          gridCell[col.accessor],
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Grid
