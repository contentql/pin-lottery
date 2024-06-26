import { Modal, useModal } from '@faceless-ui/modal'
import { requests } from 'payload/dist/admin/api'
import Button from 'payload/dist/admin/components/elements/Button'
import 'payload/dist/admin/components/elements/DeleteDocument/index.scss'
import type { Props } from 'payload/dist/admin/components/elements/DeleteDocument/types'
import * as PopupList from 'payload/dist/admin/components/elements/Popup/PopupButtonList'
import { useForm } from 'payload/dist/admin/components/forms/Form/context'
import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import useTitle from 'payload/dist/admin/hooks/useTitle'
import { getTranslation } from 'payload/dist/utilities/getTranslation'
import React, { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
// custom
import { IoIosWarning } from 'react-icons/io'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const baseClass = 'delete-document'

const DeleteDocument: React.FC<Props> = props => {
  const {
    id,
    buttonId,
    collection: { labels = {}, slug } = {},
    collection,
    title: titleFromProps,
  } = props

  const { singular } = labels as any

  const {
    routes: { admin, api },
    serverURL,
  } = useConfig()

  const { setModified } = useForm()
  const [deleting, setDeleting] = useState(false)
  const { toggleModal } = useModal()
  const history = useHistory()
  const { i18n, t } = useTranslation('general')
  const title = useTitle({ collection })
  const titleToRender = titleFromProps || title || id

  const modalSlug = `delete-${id}`

  const addDefaultError = useCallback(() => {
    setDeleting(false)
    toast.error(t('error:deletingTitle', { title }))
  }, [t, title])

  const handleDelete = useCallback(async () => {
    setDeleting(true)
    setModified(false)
    try {
      await requests
        .delete(`${serverURL}${api}/${slug}/${id}`, {
          headers: {
            'Accept-Language': i18n.language,
            'Content-Type': 'application/json',
          },
        })
        .then(async res => {
          try {
            const json = await res.json()
            if (res.status < 400) {
              setDeleting(false)
              toggleModal(modalSlug)
              toast.success(
                json.message ||
                  t('titleDeleted', {
                    label: getTranslation(singular, i18n),
                    title,
                  }),
              )
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
    setModified,
    serverURL,
    api,
    slug,
    id,
    toggleModal,
    modalSlug,
    t,
    singular,
    i18n,
    title,
    history,
    admin,
    addDefaultError,
  ])

  if (id) {
    return (
      <React.Fragment>
        <PopupList.Button
          id={buttonId}
          onClick={() => {
            setDeleting(false)
            toggleModal(modalSlug)
          }}
        >
          {t('delete')}
          <IoIosWarning
            color='orange'
            size={20}
            style={{ margin: 'auto', marginBottom: '3', width: '100%' }}
          />
        </PopupList.Button>
        <Modal className={baseClass} slug={modalSlug}>
          <MinimalTemplate className={`${baseClass}__template`}>
            <h1>{t('confirmDeletion')}</h1>
            <p>
              <Trans
                i18nKey='aboutToDelete'
                t={t}
                values={{
                  label: getTranslation(singular, i18n),
                  title: titleToRender,
                }}
              >
                aboutToDelete
                <strong>{titleToRender}</strong>
              </Trans>
            </p>
            <p>
              <IoIosWarning
                color='orange'
                size={16}
                style={{ marginRight: 6, marginBottom: 4 }}
              />
              Deleting <b>&ldquo;{titleToRender}&ldquo;</b> will trigger update
              to related contest by removing any winner relations and associated
              fields, if such contest exist.
            </p>
            <div className={`${baseClass}__actions`}>
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
            </div>
          </MinimalTemplate>
        </Modal>
      </React.Fragment>
    )
  }

  return null
}

export default DeleteDocument
