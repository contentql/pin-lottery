import { CollectionConfig } from 'payload/types'

import { self } from './access/self'
import { DefaultCollectionEdit } from './custom/views/Edit/Default'
import DefaultListView from './custom/views/List/DefaultListView'
import { updateContestAfterDelete } from './hooks/updateContestAfterDelete'
import { updateWinnerAfterChange } from './hooks/updateWinnnerAfterChange'
import { WinnerEmail } from './hooks/winnerEmail'

const Winner: CollectionConfig = {
  slug: 'winner',
  admin: {
    components: {
      views: {
        List: {
          Component: DefaultListView,
        },
        Edit: {
          Default: {
            Component: DefaultCollectionEdit,
          },
        },
      },
    },
  },
  access: {
    create: self,
    update: () => true,
  },
  hooks: {
    afterDelete: [updateContestAfterDelete],
    afterChange:[WinnerEmail,updateWinnerAfterChange]
  },
  fields: [
    {
      name: 'contest',
      type: 'relationship',
      label: 'Contest',
      unique: true,
      relationTo: ['contest'],
      hasMany: false,
    },
    {
      name: 'ticket',
      type: 'relationship',
      relationTo: ['tickets'],
      label: 'Winner Ticket',
      unique: true,
      hasMany: false,
      filterOptions: ({ relationTo, data }) => {
        const selectedContestId = data?.contest?.value
        if (relationTo === 'tickets' && selectedContestId) {
          return {
            'contest_id.value': {
              equals: selectedContestId,
            },
          }
        } else {
          return false
        }
      },
    },
    {
      name:'send_otp',
      type:'checkbox',
      label:'Send OTP',
      defaultValue:false,
      admin:{
        description:'Send otp to verify user',
        position:'sidebar'
      }
    },
    {
      name:'winner_otp',
      type:'text',
      label:'Winner OTP',
      admin:{
        description:'User OTP',
        position:'sidebar',
        readOnly:true
      }
    },
    {
      name:'dispatched',
      type:'checkbox',
      label:'Dispatched',
      defaultValue:false,
      admin:{
        description:'is product dispatched',
        position:'sidebar'
      }
    },
  ],
}

export default Winner
