import { CollectionConfig } from 'payload/types';
const Contest: CollectionConfig = {
  slug: 'contest',

  fields: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'ticket_price', type: 'text', label: 'Ticket Price' },
    { name: 'img', type: 'text', label: 'Image' },
    { name: 'contest_no', type: 'text', label: 'Contest Number' },
    { name: 'day_remain', type: 'number', label: 'Day Remain' },
    { name: 'ticket_remain', type: 'number', label: 'Ticket Remain' },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: ['tags'],
      hasMany: false,
      label: 'Tag',
    },
  ],
};

export default Contest;
