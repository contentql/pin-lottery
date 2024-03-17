import { FieldHook } from 'payload/types'

export const assignUserId: FieldHook = async ({ req, operation, data }) => {
  if (operation === 'create' && data && !data.purchased_by) {
    data.purchased_by = { relationTo: 'users', value: req.user.id }
  }
}
