import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { DocumentFields } from 'payload/dist/admin/components/elements/DocumentFields'
import { LeaveWithoutSaving } from 'payload/dist/admin/components/modals/LeaveWithoutSaving'
import Meta from 'payload/dist/admin/components/utilities/Meta'
import Auth from 'payload/dist/admin/components/views/collections/Edit/Auth'
import 'payload/dist/admin/components/views/collections/Edit/Default/index.scss'
import { SetStepNav } from 'payload/dist/admin/components/views/collections/Edit/SetStepNav'
import { Upload } from 'payload/dist/admin/components/views/collections/Edit/Upload'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

import { DocumentControls } from '../../../components/DocumentControls'

const baseClass = 'collection-default-edit'

export const DefaultCollectionEdit: React.FC<any> = props => {
  const { i18n, t } = useTranslation('general')

  const {
    id,
    apiURL,
    collection,
    data,
    disableActions,
    disableLeaveWithoutSaving,
    fieldTypes,
    hasSavePermission,
    internalState,
    isEditing,
    permissions,
  } = props

  const { auth, fields, upload } = collection

  const operation = isEditing ? 'update' : 'create'

  return (
    <Fragment>
      <Meta
        description={`${isEditing ? t('editing') : t('creating')} - ${getTranslation(
          collection.labels.singular,
          i18n,
        )}`}
        keywords={`${getTranslation(collection.labels.singular, i18n)}, Payload, CMS`}
        title={`${isEditing ? t('editing') : t('creating')} - ${getTranslation(
          collection.labels.singular,
          i18n,
        )}`}
      />
      {!(
        collection.versions?.drafts && collection.versions?.drafts?.autosave
      ) &&
        !disableLeaveWithoutSaving && <LeaveWithoutSaving />}
      <SetStepNav collection={collection} id={id} isEditing={isEditing!} />
      <DocumentControls
        apiURL={apiURL}
        collection={collection}
        data={data}
        disableActions={disableActions}
        hasSavePermission={hasSavePermission}
        id={id}
        isEditing={isEditing}
        permissions={permissions!}
      />
      <DocumentFields
        BeforeFields={
          <Fragment>
            {auth && (
              <Auth
                className={`${baseClass}__auth`}
                collection={collection}
                email={data?.email}
                operation={operation}
                readOnly={!hasSavePermission}
                requirePassword={!isEditing}
                useAPIKey={auth.useAPIKey}
                verify={auth.verify}
              />
            )}
            {upload && (
              <Upload collection={collection} internalState={internalState} />
            )}
          </Fragment>
        }
        fieldTypes={fieldTypes}
        fields={fields}
        hasSavePermission={hasSavePermission!}
        permissions={permissions!}
      />
    </Fragment>
  )
}
