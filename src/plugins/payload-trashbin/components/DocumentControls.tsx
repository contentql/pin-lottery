import Autosave from 'payload/dist/admin/components/elements/Autosave'
import DeleteDocument from 'payload/dist/admin/components/elements/DeleteDocument'
import 'payload/dist/admin/components/elements/DocumentControls/index.scss'
import DuplicateDocument from 'payload/dist/admin/components/elements/DuplicateDocument'
import { Gutter } from 'payload/dist/admin/components/elements/Gutter'
import Popup from 'payload/dist/admin/components/elements/Popup'
import * as PopupList from 'payload/dist/admin/components/elements/Popup/PopupButtonList'
import PreviewButton from 'payload/dist/admin/components/elements/PreviewButton'
import { Publish } from 'payload/dist/admin/components/elements/Publish'
import { Save } from 'payload/dist/admin/components/elements/Save'
import { SaveDraft } from 'payload/dist/admin/components/elements/SaveDraft'
import Status from 'payload/dist/admin/components/elements/Status'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import { useDocumentInfo } from 'payload/dist/admin/components/utilities/DocumentInfo'
import { formatDate } from 'payload/dist/admin/utilities/formatDate'
import type { CollectionPermission, GlobalPermission } from 'payload/dist/auth'
import type { SanitizedCollectionConfig } from 'payload/dist/collections/config/types'
import type { SanitizedGlobalConfig } from 'payload/dist/globals/config/types'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import RestoreDocument from './RestoreDocument'

const baseClass = 'doc-controls'

export const DocumentControls: React.FC<{
  apiURL: string
  collection?: SanitizedCollectionConfig
  data?: any
  disableActions?: boolean
  global?: SanitizedGlobalConfig
  hasSavePermission?: boolean
  id?: string
  isAccountView?: boolean
  isEditing?: boolean
  permissions?: CollectionPermission | GlobalPermission
}> = props => {
  const {
    id,
    collection,
    data,
    disableActions,
    global,
    hasSavePermission,
    isAccountView,
    isEditing,
    permissions,
  } = props

  const { publishedDoc } = useDocumentInfo()

  const {
    admin: { dateFormat },
    routes: { admin: adminRoute },
  } = useConfig()

  const { i18n, t } = useTranslation('general')

  const hasCreatePermission =
    'create' in permissions! && permissions.create?.permission
  const hasDeletePermission =
    'delete' in permissions! && permissions.delete?.permission
  const hasRestorePermission = true

  const showDotMenu = Boolean(
    collection &&
      id &&
      !disableActions &&
      (hasCreatePermission || hasDeletePermission),
  )

  return (
    <Gutter className={baseClass}>
      <div className={`${baseClass}__wrapper`}>
        <div className={`${baseClass}__content`}>
          <ul className={`${baseClass}__meta`}>
            {collection && !isEditing && !isAccountView && (
              <li className={`${baseClass}__list-item`}>
                <p className={`${baseClass}__value`}>
                  {t('creatingNewLabel', {
                    label:
                      typeof collection?.labels?.singular === 'string'
                        ? collection.labels.singular
                        : 'document',
                  })}
                </p>
              </li>
            )}
            {(collection?.versions?.drafts || global?.versions?.drafts) && (
              <Fragment>
                {(global || (collection && isEditing)) && (
                  <li
                    className={[
                      `${baseClass}__status`,
                      `${baseClass}__list-item`,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <Status />
                  </li>
                )}
                {((collection?.versions?.drafts &&
                  collection?.versions?.drafts?.autosave) ||
                  (global?.versions?.drafts &&
                    global?.versions?.drafts?.autosave)) &&
                  hasSavePermission && (
                    <li className={`${baseClass}__list-item`}>
                      <Autosave
                        collection={collection}
                        global={global}
                        id={id}
                        publishedDocUpdatedAt={
                          publishedDoc?.updatedAt || data?.createdAt
                        }
                      />
                    </li>
                  )}
              </Fragment>
            )}
            {collection?.timestamps && (isEditing || isAccountView) && (
              <Fragment>
                <li
                  className={[
                    `${baseClass}__list-item`,
                    `${baseClass}__value-wrap`,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  title={
                    data?.updatedAt
                      ? formatDate(data?.updatedAt, dateFormat, i18n?.language)
                      : ''
                  }
                >
                  <p className={`${baseClass}__label`}>
                    {t('lastModified')}:&nbsp;
                  </p>
                  {data?.updatedAt && (
                    <p className={`${baseClass}__value`}>
                      {formatDate(data.updatedAt, dateFormat, i18n?.language)}
                    </p>
                  )}
                </li>
                <li
                  className={[
                    `${baseClass}__list-item`,
                    `${baseClass}__value-wrap`,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  title={
                    publishedDoc?.createdAt || data?.createdAt
                      ? formatDate(
                          publishedDoc?.createdAt || data?.createdAt,
                          dateFormat,
                          i18n?.language,
                        )
                      : ''
                  }
                >
                  <p className={`${baseClass}__label`}>{t('created')}:&nbsp;</p>
                  {(publishedDoc?.createdAt || data?.createdAt) && (
                    <p className={`${baseClass}__value`}>
                      {formatDate(
                        publishedDoc?.createdAt || data?.createdAt,
                        dateFormat,
                        i18n?.language,
                      )}
                    </p>
                  )}
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <div className={`${baseClass}__controls-wrapper`}>
          <div className={`${baseClass}__controls`}>
            {(collection?.admin?.preview || global?.admin?.preview) && (
              <PreviewButton
                CustomComponent={
                  collection?.admin?.components?.edit?.PreviewButton ||
                  global?.admin?.components?.elements?.PreviewButton
                }
                generatePreviewURL={
                  collection?.admin?.preview || global?.admin?.preview
                }
              />
            )}
            {hasSavePermission && (
              <React.Fragment>
                {collection?.versions?.drafts || global?.versions?.drafts ? (
                  <React.Fragment>
                    {((collection?.versions?.drafts &&
                      !collection?.versions?.drafts?.autosave) ||
                      (global?.versions?.drafts &&
                        !global?.versions?.drafts?.autosave)) && (
                      <SaveDraft
                        CustomComponent={
                          collection?.admin?.components?.edit
                            ?.SaveDraftButton ||
                          global?.admin?.components?.elements?.SaveDraftButton
                        }
                      />
                    )}
                    <Publish
                      CustomComponent={
                        collection?.admin?.components?.edit?.PublishButton ||
                        global?.admin?.components?.elements?.PublishButton
                      }
                    />
                  </React.Fragment>
                ) : (
                  <Save
                    CustomComponent={
                      collection?.admin?.components?.edit?.SaveButton ||
                      global?.admin?.components?.elements?.SaveButton
                    }
                  />
                )}
              </React.Fragment>
            )}
          </div>
          {showDotMenu && (
            <Popup
              button={
                <div className={`${baseClass}__dots`}>
                  <div />
                  <div />
                  <div />
                </div>
              }
              className={`${baseClass}__popup`}
              horizontalAlign='right'
              size='large'
              verticalAlign='bottom'
            >
              <PopupList.ButtonGroup>
                {hasCreatePermission && (
                  <React.Fragment>
                    <PopupList.Button
                      id='action-create'
                      to={`${adminRoute}/collections/${collection?.slug}/create`}
                    >
                      {t('createNew')}
                    </PopupList.Button>

                    {!collection?.admin?.disableDuplicate && isEditing && (
                      <DuplicateDocument
                        collection={collection!}
                        id={id!}
                        slug={collection?.slug!}
                      />
                    )}
                  </React.Fragment>
                )}
                {hasDeletePermission && (
                  <DeleteDocument
                    buttonId='action-delete'
                    collection={collection}
                    id={id}
                  />
                )}
                {hasRestorePermission && (
                  <RestoreDocument
                    buttonId='action-restore'
                    collection={collection}
                    id={id}
                  />
                )}
              </PopupList.ButtonGroup>
            </Popup>
          )}
        </div>
      </div>
      <div className={`${baseClass}__divider`} />
    </Gutter>
  )
}
