import { CollectionConfig } from 'payload/types'
const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
  },
  fields: [{ name: 'tag', type: 'text', label: 'Product Type' ,required:true},
    {name:'img',type:'upload',label:'icon',relationTo:'media',required:true}
  ],
}

export default Tags
