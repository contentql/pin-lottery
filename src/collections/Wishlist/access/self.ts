import { Access } from 'payload/config'

export const self: Access = ({ req: { user } }) => {
  if (user) {
    return {
      'user.value': {
        equals: user.id,
      },
    }
  }

  return false
}
