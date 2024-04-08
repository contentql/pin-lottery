import { CollectionAfterDeleteHook } from 'payload/types'

export const updateContestAfterDelete: CollectionAfterDeleteHook = async ({
  req, // full express request
  id, // id of document to delete
  doc, // deleted document
}) => {
  const { payload } = req

  const latestData = {
    contest_timer_status: false,
    contest_status: false,
    winner_ticket: null,
  }

  try {
    await payload.update({
      collection: 'contest',
      data: { ...latestData },
      where: {
        'winner_ticket.value': {
          equals: doc?.id,
        },
      },
    })
  } catch (error) {
    console.error(
      'Error updating contest after deletion of winner document:',
      error,
    )
    // throw new Error(
    //   'Failed to update contest after deletion of winner document: ' +
    //     error.message,
    // )
  }
}
