import { Access } from 'payload/types'

export const isAdmin: Access = ({ req: { user } }) => {
  if (user) {
    const { roles } = user

    if (roles?.includes('admin')) return true
  }

  return false
}
