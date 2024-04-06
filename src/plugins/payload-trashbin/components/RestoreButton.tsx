import { Button } from 'payload/components/elements'
import { useDocumentInfo } from 'payload/components/utilities'
import { Field } from 'payload/types'
import React from 'react'
import { toast } from 'react-toastify'

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
          fetch(`/api/trash/restore/where[id][in][0]=${id}`, {
            method: 'GET',
          })
            .then(() => {
              window.location.href = `/admin/collections/trash`
            })
            .catch(error => {
              console.log(error)
              toast.error(error.message)
            })
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
