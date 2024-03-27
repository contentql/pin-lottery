import { Access } from 'payload/config'

export const isManagerOrAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('manager')) return true
    if (user.roles?.includes('admin')) return true

    return {
      'purchased_by.value': {
        equals: user.id,
      },
    }
  }

  return false
}
