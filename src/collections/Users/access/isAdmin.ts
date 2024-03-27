import { Access } from 'payload/types'

export const isAdmin: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('admin')) return true
  }

  return false
}
