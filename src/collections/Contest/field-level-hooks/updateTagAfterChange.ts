import { FieldHook } from 'payload/types'

export const updateTagAfterChange: FieldHook = async ({
  value,
  previousValue,
  req,
}) => {
  const { payload } = req
  try {
    await payload.update({
      collection: 'tags',
      data: { is_coming_soon: false },
      where: {
        tag: {
          equals: value,
        },
      },
    })
  } catch (error) {
    console.log('Error while updating tags: ', error)
    // throw new Error('Error while updating tags after product type changes')
  }
}
