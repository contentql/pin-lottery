import React from 'react'
import { useDocumentInfo } from 'payload/components/utilities'
import { Field } from 'payload/types'
import { Button } from 'payload/components/elements'

export const RestoreButton: React.FC = props => {
  const { id } = useDocumentInfo()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row-reverse',
      }}>
      <Button
        onClick={async () => {
          await fetch(`/api/trash/restore/${id}`, {
            method: 'GET',
          })

          window.location.href = `/admin`
        }}>
        Restore
      </Button>
    </div>
  )
}

const customTextField: Field = {
  name: 'collectionName',
  type: 'text',
  admin: {
    components: {
      afterInput: [RestoreButton],
    },
  },
}

export default customTextField
