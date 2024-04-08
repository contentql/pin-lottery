import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import type { FieldTypes } from 'payload/dist/admin/components/forms/field-types'
import type { CollectionEditViewProps } from 'payload/dist/admin/components/views/types'

import { DocumentHeader } from 'payload/dist/admin/components/elements/DocumentHeader'
import { FormLoadingOverlayToggle } from 'payload/dist/admin/components/elements/Loading'
import Form from 'payload/dist/admin/components/forms/Form'
import { useActions } from 'payload/dist/admin/components/utilities/ActionsProvider'
import { useAuth } from 'payload/dist/admin/components/utilities/Auth'
import { useDocumentEvents } from 'payload/dist/admin/components/utilities/DocumentEvents'
import { OperationContext } from 'payload/dist/admin/components/utilities/OperationProvider'
import { CollectionRoutes } from 'payload/dist/admin/components/views/collections/edit/Routes'
import { CustomCollectionComponent } from 'payload/dist/admin/components/views/collections/edit/Routes/CustomComponent'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

const baseClass = 'collection-edit'

export type DefaultEditViewProps = CollectionEditViewProps & {
  customHeader?: React.ReactNode
  disableRoutes?: boolean
  fieldTypes: FieldTypes
}

const DefaultEditView: React.FC<any> = props => {
  const { i18n } = useTranslation('general')
  const { refreshCookieAsync, user } = useAuth()

  const {
    id,
    action,
    apiURL,
    collection,
    customHeader,
    data,
    disableRoutes,
    fieldTypes,
    hasSavePermission,
    internalState,
    isEditing,
    isLoading,
    onSave: onSaveFromProps,
  } = props

  const { setViewActions } = useActions()

  const { reportUpdate } = useDocumentEvents()

  const { auth } = collection

  const classes = [baseClass, isEditing && `${baseClass}--is-editing`]
    .filter(Boolean)
    .join(' ')

  const location = useLocation()

  const onSave = useCallback(
    async (json: any) => {
      reportUpdate({
        id,
        entitySlug: collection.slug,
        updatedAt: json?.result?.updatedAt || new Date().toISOString(),
      })
      if (auth && id === user?.id) {
        await refreshCookieAsync()
      }

      if (typeof onSaveFromProps === 'function') {
        onSaveFromProps({
          ...json,
          operation: id ? 'update' : 'create',
        })
      }
    },
    [
      id,
      onSaveFromProps,
      auth,
      user,
      refreshCookieAsync,
      collection,
      reportUpdate,
    ],
  )

  const operation = isEditing ? 'update' : 'create'

  useEffect(() => {
    const path = location.pathname

    if (!(path.endsWith(id) || path.endsWith('/create'))) {
      return
    }
    const editConfig = collection?.admin?.components?.views?.Edit
    const defaultActions =
      editConfig && 'Default' in editConfig && 'actions' in editConfig.Default
        ? editConfig.Default.actions
        : []

    setViewActions(defaultActions)

    return () => {
      setViewActions([])
    }
  }, [
    id,
    location.pathname,
    collection?.admin?.components?.views?.Edit,
    setViewActions,
  ])

  return (
    <main className={classes}>
      <OperationContext.Provider value={operation}>
        <Form
          action={action}
          className={`${baseClass}__form`}
          disabled={!hasSavePermission}
          initialState={internalState}
          method={id ? 'patch' : 'post'}
          onSuccess={onSave}>
          <FormLoadingOverlayToggle
            action={isLoading ? 'loading' : operation}
            formIsLoading={isLoading}
            loadingSuffix={getTranslation(collection.labels.singular, i18n)}
            name={`collection-edit--${
              typeof collection?.labels?.singular === 'string'
                ? collection.labels.singular
                : 'document'
            }`}
            type='withoutNav'
          />
          {!isLoading && (
            <React.Fragment>
              <DocumentHeader
                apiURL={apiURL}
                collection={collection}
                customHeader={customHeader}
                data={data}
                id={id}
                isEditing={isEditing}
              />
              {disableRoutes ? (
                <CustomCollectionComponent view='Default' {...props} />
              ) : (
                <CollectionRoutes {...props} fieldTypes={fieldTypes} />
              )}
            </React.Fragment>
          )}
        </Form>
      </OperationContext.Provider>
    </main>
  )
}

export default DefaultEditView
