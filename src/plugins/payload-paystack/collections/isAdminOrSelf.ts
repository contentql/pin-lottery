import { Access } from 'payload/config'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    const { roles } = user

    if (roles?.includes('admin')) return true

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
