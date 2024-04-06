import { Modal, useModal } from '@faceless-ui/modal'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import type { Props } from 'payload/dist/admin/components/elements/DeleteMany/types'

import { requests } from 'payload/dist/admin/api'
import Button from 'payload/dist/admin/components/elements/Button'
import 'payload/dist/admin/components/elements/DeleteMany/index.scss'
import Pill from 'payload/dist/admin/components/elements/Pill'
import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import {
  SelectAllStatus,
  useSelection,
} from 'payload/dist/admin/components/views/collections/List/SelectionProvider'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

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

  const hasRestorePermissions = true

  const modalSlug = `restore-${slug}`

  const addDefaultError = useCallback(() => {
    toast.error(t('error:unknown'))
  }, [t])

  const handleDelete = useCallback(() => {
    setRestoring(true)
    requests
      .delete(`${serverURL}${api}/${slug}${getQueryParams()}`, {
        headers: {
          'Accept-Language': i18n.language,
          'Content-Type': 'application/json',
        },
      })
      .then(async res => {
        try {
          const json = await res.json()
          toggleModal(modalSlug)
          if (res.status < 400) {
            toast.success(json.message || t('restoredSuccessfully'), {
              autoClose: 3000,
            })
            toggleAll()
            resetParams({ page: selectAll ? 1 : undefined })
            return null
          }

          if (json.errors) {
            toast.error(json.message)
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
    api,
    getQueryParams,
    i18n.language,
    modalSlug,
    resetParams,
    selectAll,
    serverURL,
    slug,
    t,
    toggleAll,
    toggleModal,
  ])

  if (selectAll === SelectAllStatus.None || !hasRestorePermissions) {
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
        {t('restore')}
      </Pill>
      <Modal className={baseClass} slug={modalSlug}>
        <MinimalTemplate className={`${baseClass}__template`}>
          <h1>{t('confirmDeletion')}</h1>
          <p>
            {t('aboutToDeleteCount', {
              count,
              label: getTranslation(plural, i18n),
            })}
          </p>
          <Button
            buttonStyle='secondary'
            id='confirm-cancel'
            onClick={restoring ? undefined : () => toggleModal(modalSlug)}
            type='button'>
            {t('cancel')}
          </Button>
          <Button
            id='confirm-delete'
            onClick={restoring ? undefined : handleDelete}>
            {restoring ? t('restoring') : t('confirm')}
          </Button>
        </MinimalTemplate>
      </Modal>
    </React.Fragment>
  )
}

export default RestoreMany
