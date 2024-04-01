import { Access } from 'payload/config'

export const isManagerOrAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    const { roles } = user

    if (roles?.includes('manager')) return true
    if (roles?.includes('admin')) return true

    return {
      'purchased_by.value': {
        equals: user.id,
      },
    }
  }

  return false
}
