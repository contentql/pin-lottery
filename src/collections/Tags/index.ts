import { CollectionConfig } from 'payload/types';
const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
  },
  fields: [{ name: 'tag', type: 'text', label: 'Tag' }],
};

export default Tags;
