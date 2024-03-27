import { FieldAccess } from 'payload/types'

export const isAdmin: FieldAccess = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('admin')) return true
  }

  return false
}
