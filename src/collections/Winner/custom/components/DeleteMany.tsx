import { Modal, useModal } from '@faceless-ui/modal'
import { requests } from 'payload/dist/admin/api'
import Button from 'payload/dist/admin/components/elements/Button'
import 'payload/dist/admin/components/elements/DeleteMany/index.scss'
import type { Props } from 'payload/dist/admin/components/elements/DeleteMany/types'
import Pill from 'payload/dist/admin/components/elements/Pill'
import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal'
import { useAuth } from 'payload/dist/admin/components/utilities/Auth'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import {
  SelectAllStatus,
  useSelection,
} from 'payload/dist/admin/components/views/collections/List/SelectionProvider'
import { getTranslation } from 'payload/dist/utilities/getTranslation'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
// custom
import { IoIosWarning } from 'react-icons/io'
import { toast } from 'react-toastify'

const baseClass = 'delete-documents'

const DeleteMany: React.FC<Props> = props => {
  const { collection: { labels, slug } = {}, resetParams } = props

  const { plural } = labels!

  const { permissions } = useAuth()
  const {
    routes: { api },
    serverURL,
  } = useConfig()
  const { toggleModal } = useModal()
  const { count, getQueryParams, selectAll, toggleAll } = useSelection()
  const { i18n, t } = useTranslation('general')
  const [deleting, setDeleting] = useState(false)

  const collectionPermissions = permissions?.collections?.[slug!]
  const hasDeletePermission = collectionPermissions?.delete?.permission

  const modalSlug = `delete-${slug}`

  const addDefaultError = useCallback(() => {
    toast.error(t('error:unknown'))
  }, [t])

  const handleDelete = useCallback(() => {
    setDeleting(true)
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
            toast.success(json.message || t('deletedSuccessfully'), {
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

  if (selectAll === SelectAllStatus.None || !hasDeletePermission) {
    return null
  }

  return (
    <React.Fragment>
      <Pill
        className={`${baseClass}__toggle`}
        onClick={() => {
          setDeleting(false)
          toggleModal(modalSlug)
        }}
      >
        {t('delete')}
        <IoIosWarning color='orange' size={16} style={{ marginLeft: 3 }} />
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
          <p>
            <IoIosWarning
              color='orange'
              size={16}
              style={{ marginRight: 6, marginBottom: 4 }}
            />
            Deleting {count > 1 ? 'these winners' : 'this winner'} will trigger
            update to related contests by removing any winner relations and
            associated fields, if such contests exist.
          </p>
          <Button
            buttonStyle='secondary'
            id='confirm-cancel'
            onClick={deleting ? undefined : () => toggleModal(modalSlug)}
            type='button'
          >
            {t('cancel')}
          </Button>
          <Button
            id='confirm-delete'
            onClick={deleting ? undefined : handleDelete}
          >
            {deleting ? t('deleting') : t('confirm')}
          </Button>
        </MinimalTemplate>
      </Modal>
    </React.Fragment>
  )
}

export default DeleteMany
