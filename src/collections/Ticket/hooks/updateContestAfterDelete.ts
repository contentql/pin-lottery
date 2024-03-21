import { CollectionAfterOperationHook } from 'payload/types'

export const updateContestAfterDelete: CollectionAfterOperationHook = async ({
  result,
  req,
  operation,
}) => {
  if (operation === 'delete' || operation === 'deleteByID') {
    const { payload } = req
    // read total tickets and
  }
  return result
}
