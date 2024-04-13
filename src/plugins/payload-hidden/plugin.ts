import type { Config, Plugin } from 'payload/config'

import { PluginTypes } from './types'

export const roleBasedVisibility =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const {
      hideForRole = {},
      hideAllForRole = {},
      hideForAllRoles = {},
    } = pluginOptions

    const allCollections =
      incomingConfig.collections?.map(collection => collection.slug) || []

    const allGlobals = incomingConfig.globals?.map(global => global.slug) || []

    const showForRole: any = {}

    Object.entries(hideForRole).forEach(([category, roles]) => {
      if (!showForRole[category]) showForRole[category] = {}

      Object.entries(roles).forEach(([role, itemsToHide]) => {
        if (!Array.isArray(itemsToHide)) return
        showForRole[category][role] =
          category === 'collections'
            ? allCollections.filter(
                collection => !itemsToHide.includes(collection),
              )
            : allGlobals.filter(global => !itemsToHide.includes(global))
      })
    })

    Object.entries(hideAllForRole).forEach(([category, roles]) => {
      if (!Array.isArray(roles)) return

      if (!showForRole[category]) showForRole[category] = {}

      roles.forEach(role => {
        showForRole[category][role] = []
      })
    })

    const updatedCollections = (incomingConfig.collections || []).map(
      collection => {
        const hideBasedOnRole = ({ user }: any) => {
          if (hideForAllRoles.collections?.includes(collection.slug))
            return true

          const { roles: userRoles } = user

          const combiningCollectionsBasedOnRole: string[] = []

          userRoles.forEach((userRole: string) => {
            if (showForRole.collections?.[userRole]) {
              combiningCollectionsBasedOnRole.push(
                ...showForRole.collections[userRole],
              )
            } else {
              combiningCollectionsBasedOnRole.push(
                ...allCollections.filter(
                  collection =>
                    !hideForAllRoles.collections?.includes(collection),
                ),
              )
            }
          })

          const uniqueCollectionsToShow = [
            ...new Set(combiningCollectionsBasedOnRole),
          ]

          return !uniqueCollectionsToShow.includes(collection.slug)
        }

        return {
          ...collection,
          admin: {
            ...collection.admin,
            hidden: hideBasedOnRole,
          },
        }
      },
    )

    const updatedGlobals = (incomingConfig.globals || []).map(global => {
      const hideBasedOnRole = ({ user }: any) => {
        if (hideForAllRoles.globals?.includes(global.slug)) return true

        const { roles: userRoles } = user

        const combiningGlobalsBasedOnRole: string[] = []

        userRoles.forEach((userRole: string) => {
          if (showForRole.globals?.[userRole]) {
            combiningGlobalsBasedOnRole.push(...showForRole.globals[userRole])
          } else {
            combiningGlobalsBasedOnRole.push(
              ...allGlobals.filter(
                global => !hideForAllRoles.globals?.includes(global),
              ),
            )
          }
        })

        const uniqueGlobalsToShow = [...new Set(combiningGlobalsBasedOnRole)]

        return !uniqueGlobalsToShow.includes(global.slug)
      }

      return {
        ...global,
        admin: {
          ...global.admin,
          hidden: hideBasedOnRole,
        },
      }
    })

    return {
      ...incomingConfig,
      collections: [...updatedCollections],
      globals: [...updatedGlobals],
    }
  }
