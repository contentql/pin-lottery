import { AfterDeleteHook } from 'payload/dist/collections/config/types'

export const deleteRelatedDocsAfterDelete: AfterDeleteHook = async ({
  req, // full express request
  id, // id of document to delete
  doc, // deleted document
}) => {
  const { payload } = req

  //Todo: Initiate refund if applicable
  try {
    await payload.delete({
      collection: 'tickets',
      where: {
        'contest_id.value': {
          equals: id,
        },
      },
    })
  } catch (error: any) {
    console.error(
      'Error deleting related documents from "tickets" collection:',
      error,
    )
    throw new Error(
      'Failed to delete related documents from "tickets" collection.',
    )
  }

  try {
    await payload.delete({
      collection: 'winner',
      where: {
        'contest.value': {
          equals: id,
        },
      },
    })
  } catch (error) {
    console.error(
      'Error deleting related documents from "winner" collection:',
      error,
    )
    throw new Error(
      'Failed to delete related documents from "winner" collection.',
    )
  }
}
