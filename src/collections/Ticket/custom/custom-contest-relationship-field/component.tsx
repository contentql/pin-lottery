import {
  Props,
  RelationshipComponent,
  ValueWithRelation,
} from 'payload/components/fields/Relationship'
import { useFormFields } from 'payload/components/forms'
import { Fields } from 'payload/types'
import * as React from 'react'

export const CustomContestRelationshipComponent: React.FC<Props> = props => {
  // Field values can be accessed and updated using the commented `useField` function as well.

  // const { value: relationship, setValue: setRelationShip } =
  //   useField<ValueWithRelation>({ path: path || '' })

  // const { value: ticketPrice, setValue: setTicketPrice } = useField<number>({
  //   path: 'ticket_price',
  // })

  // Retrieve field state and dispatch function using useFormFields hook
  const { fields, dispatch } = useFormFields(([fields, dispatch]) => ({
    fields,
    dispatch,
  }))

  // Extract contest_id field value from fields object
  const { contest_id: contestId } = fields as Fields

  // Fetch contest data when contestId value changes
  React.useEffect(() => {
    const fetchContest = async () => {
      try {
        const req = await fetch(
          `/api/contest/${(contestId.value as ValueWithRelation).value}`,
        )
        const contest = await req.json()

        // Dispatch an action to update the ticket_price field value
        dispatch({
          type: 'UPDATE',
          path: 'ticket_price',
          value: contest?.ticket_price,
        })
      } catch (error) {
        console.log(
          'Error fetching contest in custom relationship component: ',
          error,
        )
      }
    }

    fetchContest()
  }, [contestId.value, dispatch])

  return (
    // Render the RelationshipComponent with provided props
    <RelationshipComponent
      key={'custom-relation-component-for-contest'}
      {...props}
    />
  )
}
