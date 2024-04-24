import { Access } from 'payload/config'

export const self: Access = ({ req: { user, context } }) => {
  if (user) {
    const { roles } = user

    if (!context.allowCreate) return false

    return {
      'purchased_by.value': {
        equals: user.id,
      },
    }
  }

  return false
}
