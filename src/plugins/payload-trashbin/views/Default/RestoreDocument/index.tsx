import { Modal, useModal } from '@faceless-ui/modal'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import type { Props } from 'payload/dist/admin/components/elements/DeleteDocument/types'

import Button from 'payload/dist/admin/components/elements/Button'
import * as PopupList from 'payload/dist/admin/components/elements/Popup/PopupButtonList'
import { useForm } from 'payload/dist/admin/components/forms/Form/context'
import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import useTitle from 'payload/dist/admin/hooks/useTitle'

import 'payload/dist/admin/components/elements/DeleteDocument/index.scss'

const baseClass = 'delete-document'

const RestoreDocument: React.FC<Props> = props => {
  const {
    id,
    buttonId,
    collection: { labels, slug } = {},
    collection,
    title: titleFromProps,
  } = props

  const { singular } = labels as any

  const {
    routes: { admin, api },
    serverURL,
  } = useConfig()

  const { setModified } = useForm()
  const [restoring, setRestoring] = useState(false)
  const { toggleModal } = useModal()
  const history = useHistory()
  const { i18n, t } = useTranslation('general')
  const title = useTitle({ collection })
  const titleToRender = titleFromProps || title || id

  const modalSlug = `restore-${id}`

  const addDefaultError = useCallback(() => {
    setRestoring(false)
    toast.error(
      `There was an error while restoring ${title}. Please check your connection and try again.`,
    )
  }, [title])

  const handleRestore = useCallback(async () => {
    setRestoring(true)
    setModified(false)

    try {
      await fetch(`/api/trash/restore/where[id][in][0]=${id}sacasjdjl`, {
        method: 'GET',
      }).then(async res => {
        try {
          const json = await res.json()
          if (res.status < 400) {
            setRestoring(false)
            toggleModal(modalSlug)
            toast.success(json.message || `"${title}" successfully restored.`)
            return history.push(`${admin}/collections/${slug}`)
          }

          toggleModal(modalSlug)

          if (json.errors) {
            json.errors.forEach((error: any) => toast.error(error.message))
          } else {
            addDefaultError()
          }
          return false
        } catch (e) {
          return addDefaultError()
        }
      })
    } catch (e) {
      addDefaultError()
    }
  }, [
    addDefaultError,
    admin,
    history,
    id,
    modalSlug,
    setModified,
    slug,
    title,
    toggleModal,
  ])

  if (id) {
    return (
      <React.Fragment>
        <PopupList.Button
          id={buttonId}
          onClick={() => {
            setRestoring(false)
            toggleModal(modalSlug)
          }}>
          Restore
        </PopupList.Button>
        <Modal className={baseClass} slug={modalSlug}>
          <MinimalTemplate className={`${baseClass}__template`}>
            <h1>Confirm restoration</h1>
            <p>
              You are about to restore the <strong>{titleToRender}</strong>. Are
              you sure?
            </p>
            <div className={`${baseClass}__actions`}>
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
            </div>
          </MinimalTemplate>
        </Modal>
      </React.Fragment>
    )
  }

  return null
}

export default RestoreDocument
