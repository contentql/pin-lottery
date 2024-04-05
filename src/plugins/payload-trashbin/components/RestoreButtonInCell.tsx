import { Props } from 'payload/components/views/Cell'
import React, { useState } from 'react'
import { MdRestore } from 'react-icons/md'
import { Id, ToastContainer, toast } from 'react-toastify'

const RestoreButtonInCell: React.FC<Props> = ({ rowData }) => {
  const [restored, setRestored] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRestore = async () => {
    await fetch(`/api/trash/restore/${rowData?.id}`, {
      method: 'GET',
    })

    toast.success(
      'Successfully Restored! Refresh the Trash to see the updated Trash',
      {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: rowData.id as Id,
      },
    )
    setRestored(true)
    setLoading(false)
  }

  return (
    <>
      <style>
        {`
          @keyframes rotateAnimation {
              from {
                  transform: rotate(360deg);
              }
              to {
                  transform: rotate(0deg);
              }
          }
        `}
      </style>
      <ToastContainer />
      <button
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: restored || loading ? 'not-allowed' : 'pointer',
          color: restored ? '#656565' : loading ? '#cc595e' : '#8eccab',
        }}
        onClick={() => {
          setLoading(true)
          handleRestore()
        }}
        title={
          restored
            ? 'Restored Successfully'
            : loading
              ? 'Restoring...'
              : 'Click To Restore'
        }
        disabled={restored || loading}>
        <MdRestore
          size={24}
          style={{
            animation: loading ? 'rotateAnimation 2s linear infinite' : '',
          }}
        />
      </button>
    </>
  )
}

export default RestoreButtonInCell
