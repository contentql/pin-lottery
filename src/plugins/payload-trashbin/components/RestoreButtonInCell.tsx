import { Props } from 'payload/components/views/Cell'
import React, { useState } from 'react'
import { MdRestore } from 'react-icons/md'
import { toast } from 'react-toastify'

const RestoreButtonInCell: React.FC<Props> = ({ rowData }) => {
  const [restored, setRestored] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRestore = async () => {
    await fetch(`/api/trash/restore/${rowData?.id}`, {
      method: 'GET',
    })
    setRestored(true)
    setLoading(false)
    toast.success('Successfully Restored')
  }

  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: restored || loading ? 'not-allowed' : 'pointer',
        color: restored ? '#9a9a9a' : loading ? '#ff8c91' : '#c1ffde',
      }}
      onClick={() => {
        toast.info('Restore button clicked')
        setLoading(true)
        handleRestore()
      }}
      disabled={restored || loading}>
      <MdRestore size={40} />
    </button>
  )
}

export default RestoreButtonInCell
