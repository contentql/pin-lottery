import React from 'react'
import { useDocumentInfo } from 'payload/components/utilities'
import { Field } from 'payload/types'

export const RestoreButton: React.FC = props => {
  const { id } = useDocumentInfo()
  return (
    <button
      onClick={async () => {
        await fetch(`/api/trash/restore/${id}`, {
          method: 'GET',
        })

        window.location.href = `/admin`
      }}>
      Restore
    </button>
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
