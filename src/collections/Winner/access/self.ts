import { Access } from 'payload/config'

export const self: Access = ({ req: { user, context } }) => {
  if (user) {
    const { roles } = user

    if (!context.allowCreate) return false

    return true
  }

  return false
}
