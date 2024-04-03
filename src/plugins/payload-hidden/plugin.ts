import type { Config, Plugin } from 'payload/config'
import { PluginTypes } from './types'

export const roleBasedCollectionVisibility =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const { hideCollectionsForRole } = pluginOptions

    const roles = Object.keys(hideCollectionsForRole)

    const allCollections = incomingConfig.collections?.map(
      collection => collection.slug,
    )

    const showCollectionsForRole: any = {}

    Object.entries(hideCollectionsForRole).forEach(
      ([role, hiddenCollections]) => {
        showCollectionsForRole[role] = allCollections?.filter(
          collection => !hiddenCollections.includes(collection),
        )
      },
    )

    const updatedCollections = incomingConfig.collections?.map(collection => {
      const hideBasedOnRole = ({ user }: any) => {
        const { roles: userRoles } = user

        return false
      }

      return {
        ...collection,
        admin: {
          ...collection.admin,
          hidden: hideBasedOnRole,
        },
      }
    })

    // const updatedCollections = incomingConfig.collections?.map(collection => {
    //   const hiddenRoles = ({ user }: { user: any }) => {
    //     // Check if user object and user roles exist
    //     if (user && user.roles) {
    //       // Iterate over each role specified in the plugin options
    //       for (const role of roles) {
    //         // Check if the user has the current role being iterated
    //         if (user.roles.includes(role)) {
    //           // If the collection is not in the hidden list for the role, show the collection
    //           if (!hideCollectionsForRole[role]?.includes(collection.slug)) {
    //             return false // Return false to show the collection
    //           }
    //           // If the collection is in the hidden list for the role, hide the collection
    //           else if (
    //             hideCollectionsForRole[role]?.includes(collection.slug)
    //           ) {
    //             return true // Return true to hide the collection
    //           }
    //         }
    //       }
    //     }

    //     // Default to true (hide collection) if user or user.roles is not defined, or if role is not found in hidden object
    //     return true
    //   }

    //   return {
    //     ...collection,
    //     admin: {
    //       ...collection.admin,
    //       hidden: hiddenRoles,
    //     },
    //   }
    // })

    return {
      ...incomingConfig,
      collections: updatedCollections,
    }
  }
