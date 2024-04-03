import type { Config, Plugin } from 'payload/config'
import { PluginTypes } from './types'

export const roleBasedCollectionVisibility =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const {
      hideCollectionsForRole,
      hideAllCollectionsForRole,
      hideCollectionsForAllRoles,
    } = pluginOptions

    const allCollections = incomingConfig.collections?.map(
      collection => collection.slug,
    )

    const showCollectionsForRole: any = {}

    Object.entries(hideCollectionsForRole).forEach(
      ([role, hiddenCollections]) => {
        showCollectionsForRole[role] = allCollections?.filter(
          collection => !hiddenCollections?.includes(collection),
        )
      },
    )

    hideAllCollectionsForRole.forEach(role => {
      showCollectionsForRole[role] = []
    })

    const updatedCollections = incomingConfig.collections?.map(collection => {
      const hideBasedOnRole = ({ user }: any) => {
        if (hideCollectionsForAllRoles.includes(collection.slug)) return true

        const { roles: userRoles } = user

        const combiningCollectionsBasedOnRole: string[] = []

        userRoles.forEach((userRole: string) => {
          if (showCollectionsForRole[userRole]) {
            combiningCollectionsBasedOnRole.push(
              ...showCollectionsForRole[userRole],
            )
          } else {
            combiningCollectionsBasedOnRole.push(
              ...allCollections!.filter(
                (collection: string) =>
                  !hideCollectionsForAllRoles.includes(collection),
              ),
            )
          }
        })

        const uniqueCollectionsToShow = [
          ...new Set(combiningCollectionsBasedOnRole),
        ]

        if (uniqueCollectionsToShow.includes(collection.slug)) {
          return false
        }

        return true
      }

      return {
        ...collection,
        admin: {
          ...collection.admin,
          hidden: hideBasedOnRole,
        },
      }
    })

    return {
      ...incomingConfig,
      collections: updatedCollections,
    }
  }
