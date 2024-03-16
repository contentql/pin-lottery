import { Access } from 'payload/config'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('admin')) {
      return true
    }

    return {
      'purchased_by.value': {
        equals: user.id,
      },
    }
  }

  return false
}
