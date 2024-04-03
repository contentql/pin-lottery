import { FieldHook } from 'payload/types'

export const assignUserId: FieldHook = async ({ req, operation, data }) => {
  if (operation === 'create' && data && !data.user) {
    data.user = { relationTo: 'users', value: req.user.id }
  }
}
