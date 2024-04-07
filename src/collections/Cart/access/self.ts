import { Access } from 'payload/config'

export const self: Access = ({ req: { user } }) => {
  if (user) {
    return {
      'user_id.value': {
        equals: user.id,
      },
    }
  }

  return false
}
