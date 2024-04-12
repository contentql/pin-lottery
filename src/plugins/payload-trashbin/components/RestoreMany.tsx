import { Modal, useModal } from '@faceless-ui/modal'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosWarning } from 'react-icons/io'
import { toast } from 'react-toastify'

import type { Props } from 'payload/dist/admin/components/elements/DeleteMany/types'

import Button from 'payload/dist/admin/components/elements/Button'
import 'payload/dist/admin/components/elements/DeleteMany/index.scss'
import Pill from 'payload/dist/admin/components/elements/Pill'
import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import {
  SelectAllStatus,
  useSelection,
} from 'payload/dist/admin/components/views/collections/List/SelectionProvider'

const baseClass = 'delete-documents'

const RestoreMany: React.FC<Props> = props => {
  const { collection: { labels, slug } = {}, resetParams } = props
  const plural = labels?.plural ?? ''

  const {
    routes: { api },
    serverURL,
  } = useConfig()
  const { toggleModal } = useModal()
  const { count, getQueryParams, selectAll, toggleAll } = useSelection()
  const { i18n, t } = useTranslation('general')
  const [restoring, setRestoring] = useState(false)

  const hasRestorePermission = true

  const modalSlug = `restore-${slug}`

  const addDefaultError = useCallback(() => {
    toast.error(t('error:unknown'))
  }, [t])

  const handleRestore = useCallback(async () => {
    setRestoring(true)

    fetch(`/api/trash/restore/${getQueryParams().substring(1)}`, {
      method: 'GET',
    }).then(async res => {
      try {
        const json = await res.json()
        toggleModal(modalSlug)
        if (res.status < 400) {
          toast.success(
            json.message ||
              `Restored ${count} ${count > 1 ? 'documents' : 'document'} successfully!`,
            {
              autoClose: 3000,
            },
          )
          toggleAll()
          resetParams({ page: selectAll ? 1 : undefined })
          return null
        }

        if (json.error) {
          toast.error(json.error)
        } else {
          addDefaultError()
        }
        return false
      } catch (e) {
        return addDefaultError()
      }
    })
  }, [
    addDefaultError,
    count,
    getQueryParams,
    modalSlug,
    resetParams,
    selectAll,
    toggleAll,
    toggleModal,
  ])

  if (selectAll === SelectAllStatus.None || !hasRestorePermission) {
    return null
  }

  return (
    <React.Fragment>
      <Pill
        className={`${baseClass}__toggle`}
        onClick={() => {
          setRestoring(false)
          toggleModal(modalSlug)
        }}>
        Restore
      </Pill>
      <Modal className={baseClass} slug={modalSlug}>
        <MinimalTemplate className={`${baseClass}__template`}>
          <h1>Confirm Restoration</h1>
          <p>{`You are about to Restore ${count} ${count > 1 ? 'documents' : 'document'} from ${plural}`}</p>
          <p>
            <IoIosWarning
              color='orange'
              size={16}
              style={{ marginRight: 6, marginBottom: 4 }}
            />
            {count > 1 ? 'These documents' : 'This document'} will not be
            restored if {count > 1 ? 'they are' : 'it is'} related to other
            deleted documents.
          </p>
          <Button
            buttonStyle='secondary'
            id='confirm-cancel'
            onClick={restoring ? undefined : () => toggleModal(modalSlug)}
            type='button'>
            {t('cancel')}
          </Button>
          <Button
            id='confirm-restore'
            onClick={restoring ? undefined : handleRestore}>
            {restoring ? 'Restoring...' : t('confirm')}
          </Button>
        </MinimalTemplate>
      </Modal>
    </React.Fragment>
  )
}

export default RestoreMany
