import { FieldHook } from 'payload/types'

export const assignUserId: FieldHook = async ({ req, operation, data }) => {
  if (operation === 'create' && data && !data.user_id) {
    data.user_id = { relationTo: 'users', value: req.user.id }
  }
}
